"use client";

import { useEffect, useRef } from "react";

const districtCoordinates = {
  강남구: { lat: 37.5172363, lng: 127.0473248 },
  강서구: { lat: 37.5509645, lng: 126.849532 },
  강북구: { lat: 37.6397511, lng: 127.0251595 },
  강동구: { lat: 37.5301251, lng: 127.1237629 },
  관악구: { lat: 37.4787191, lng: 126.9519779 },
  노원구: { lat: 37.6542584, lng: 127.0565845 },
  마포구: { lat: 37.563761, lng: 126.908421 },
  서초구: { lat: 37.4835754, lng: 127.0326464 },
  송파구: { lat: 37.5145432, lng: 127.1059212 },
  영등포구: { lat: 37.5263943, lng: 126.8963031 },
  은평구: { lat: 37.6185557, lng: 126.9273747 },
  종로구: { lat: 37.5729503, lng: 126.9793579 },
};

// 지역 이름 타입
type Districts = keyof typeof districtCoordinates;

// NaverMapProps 타입 정의
type NaverMapProps = {
  onDistrictClick: (handler: (district: Districts) => void) => void;
};

const NaverMap: React.FC<NaverMapProps> = ({ onDistrictClick }) => {
  const mapRef = useRef<naver.maps.Map | null>(null);

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

      const map = new window.naver.maps.Map("map", mapOptions);
      mapRef.current = map as naver.maps.Map;

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
  }, []);

  const moveToDistrict = (district: Districts) => {
    if (mapRef.current && districtCoordinates[district]) {
      const { lat, lng } = districtCoordinates[district];
      mapRef.current.setCenter(
        new window.naver.maps.LatLng(lat, lng) as naver.maps.LatLng
      );
      mapRef.current.setZoom(14); // 줌 레벨 변경
    }
  };

  onDistrictClick(moveToDistrict);

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
