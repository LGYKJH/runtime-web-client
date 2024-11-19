"use client";

import { useEffect, useRef } from "react";

type MapProps = {
  id: string; // 고유한 ID
  center?: { lat: number; lng: number };
  zoom?: number;
  onMapLoad?: (map: any) => void;
  className?: string;
  style?: React.CSSProperties;
};

const Map: React.FC<MapProps> = ({
  id, // 고유한 ID 사용
  center = { lat: 37.5665, lng: 126.978 },
  zoom = 12,
  onMapLoad,
  className,
  style,
}) => {
  const mapRef = useRef<any | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !window.naver.maps) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom,
        zoomControl: false,
        mapTypeControl: false,
        logoControl: false,
        scaleControl: false,
        mapDataControl: false,
      };

      const map = new window.naver.maps.Map(id, mapOptions);
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
  }, [id, center, zoom, onMapLoad]);

  return (
    <div
      id={id} // 고유 ID 사용
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minWidth: "240px",
        minHeight: "240px",
        borderRadius: "8px",
        ...style,
      }}
    />
  );
};

export default Map;
