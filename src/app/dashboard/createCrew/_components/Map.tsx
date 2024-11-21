"use client";

import { memo, useEffect, useRef } from "react";

type MapProps = {
  center?: { lat: number; lng: number };
  zoom?: number;
  onMapLoad?: (map: any) => void;
  markerPosition?: { lat: number; lng: number };
  className?: string;
  style?: React.CSSProperties;
};

const Map: React.FC<MapProps> = memo(
  ({
    center = { lat: 37.5665, lng: 126.978 },
    zoom = 12,
    onMapLoad,
    markerPosition,
    className,
    style,
  }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null); // DOM 접근용 ref
    const mapRef = useRef<any | null>(null); // 네이버 지도 인스턴스 ref
    const markerRef = useRef<any | null>(null); // 마커 인스턴스 ref

    // 지도 초기화 (한 번만 실행)
    useEffect(() => {
      const initializeMap = () => {
        if (!window.naver || !window.naver.maps || !mapContainerRef.current) return;

        const mapOptions = {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom,
          zoomControl: false,
          mapTypeControl: false,
          logoControl: false,
          scaleControl: false,
          mapDataControl: false,
        };

        const map = new window.naver.maps.Map(mapContainerRef.current, mapOptions);
        mapRef.current = map;

        if (onMapLoad) {
          onMapLoad(map);
        }
      };

      if (window.naver) {
        initializeMap();
      } else {
        window.addEventListener("load", initializeMap);
        return () => window.removeEventListener("load", initializeMap);
      }
    }, [center, zoom, onMapLoad]);

    // 마커 업데이트 (markerPosition 변경 시만 실행)
    useEffect(() => {
      if (mapRef.current && markerPosition) {
        const map = mapRef.current;
        const newLatLng = new window.naver.maps.LatLng(markerPosition.lat, markerPosition.lng);

        // 마커가 이미 있으면 위치만 업데이트
        if (markerRef.current) {
          markerRef.current.setPosition(newLatLng);
        } else {
          // 마커가 없으면 새로 생성
          markerRef.current = new window.naver.maps.Marker({
            position: newLatLng,
            map,
            icon: {
              url: "/icons/icon-marker.svg",
              size: new window.naver.maps.Size(48, 48),
              anchor: new window.naver.maps.Point(24, 48),
            },
          });
        }

        // 지도 중심 이동
        map.setCenter(newLatLng);
      }
    }, [markerPosition]);

    return (
      <div
        ref={mapContainerRef} // `id` 대신 ref 사용
        className={className}
        style={{
          width: "100%",
          height: "100%",
          minWidth: "240px",
          minHeight: "240px",
          borderRadius: "8px",
        }}
      />
    );
  }
);

export default Map;
