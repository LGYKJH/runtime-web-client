"use client";

import { useEffect } from "react";

const NaverMap = () => {
  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 12, // 초기 확대/축소 레벨
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 예시: 마커 추가
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5665, 126.978),
        map,
        title: "서울특별시",
      });
    };

    if (window.naver) {
      initializeMap();
    } else {
      window.addEventListener("load", initializeMap);
      return () => window.removeEventListener("load", initializeMap);
    }
  }, []);

  return (
    <div
      id="map"
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
