"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import UserAuthForm from "./_components/UserAuthForm";
import AuthFormHeader from "./_components/AuthFormHeader";
import DarkModeToggle from "@/app/_components/DarkModeToggle";

export default function LoginPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 2, 3);
    camera.lookAt(0, -1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "/three/glb_running_girl.glb",
      (gltf) => {
        const model = gltf.scene;

        model.scale.set(55, 55, 55);
        model.position.set(0, -5, 0);
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer.update(delta);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    const handleResize = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 lg:px-0 overflow-hidden">
      {/* 왼쪽 캔버스 섹션 */}
      <div className="relative h-full w-full z-999" ref={mountRef}>
        <img
          src="/images/bg-run-4.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-[-1] filter brightness-75 blur-[2px]"
        />

        {/* 로고 및 기업명 */}
        <div className="absolute top-10 left-10 z-20 text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="text-lg font-medium">RUNTIME</span>
        </div>
        <div className="absolute top-6 right-6 z-20">
          <DarkModeToggle />
        </div>
        {/* 명언 */}
        <div className="absolute bottom-10 left-10 z-20 text-white">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;누가 먼저 도착했는지는 중요하지 않다. 중요한 건 누가 덜
              힘들어 보이느냐이다.&rdquo;
            </p>
            <footer className="text-sm">&ndash;이가영&ndash;</footer>
          </blockquote>
        </div>
      </div>
      {/* 오른쪽 폼 섹션 */}
      <div className="flex flex-col items-center justify-center w-full p-6 lg:p-8 gap-y-8">
        <AuthFormHeader />
        <UserAuthForm />
      </div>
    </div>
  );
}
