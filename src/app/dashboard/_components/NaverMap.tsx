"use client";

import { useEffect, useRef } from "react";
import { districtCoordinates, Districts } from "@/lib/districts";

type NaverMapProps = {
  id: string;
  onDistrictClick: (handler: (district: Districts) => void) => void;
};

const NaverMap: React.FC<NaverMapProps> = ({ id, onDistrictClick }) => {
  const naverMapRef = useRef<naver.maps.Map | null>(null); // ref 이름 변경

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !window.naver.maps) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 12, // 초기 확대/축소 레벨
        zoomControl: false,
        mapTypeControl: false,
        logoControl: false,
        scaleControl: false,
        mapDataControl: false,
      };

      const map = new window.naver.maps.Map(id, mapOptions);
      naverMapRef.current = map as any;

      // 마커 추가
      Object.entries(districtCoordinates).forEach(([district, coord]) => {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(coord.lat, coord.lng),
          map,
          title: district,
          icon: {
            url: "/icons/icon-marker.svg", // 커스텀 마커 이미지 경로
            size: new window.naver.maps.Size(48, 48), // 이미지 크기
            anchor: new window.naver.maps.Point(24, 48), // 중심점 기준 앵커
          },
        });
      });
    };

    if (window.naver) {
      initializeMap();
    } else {
      window.addEventListener("load", initializeMap);
      return () => window.removeEventListener("load", initializeMap);
    }
  }, [id]);

  const moveToDistrict = (district: Districts) => {
    if (naverMapRef.current && districtCoordinates[district]) {
      const { lat, lng } = districtCoordinates[district];
      naverMapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng) as naver.maps.LatLng);
      naverMapRef.current.setZoom(14); // 줌 레벨 변경
    }
  };

  onDistrictClick(moveToDistrict);

  return (
    <div
      id={id} // 고유 ID 사용
      style={{
        width: "100%",
        height: "100%",
        minHeight: "200px",
        borderRadius: "8px",
      }}
    />
  );
};

export default NaverMap;
