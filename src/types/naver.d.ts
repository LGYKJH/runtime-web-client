declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (el: string | HTMLElement, options: Record<string, unknown>) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: Record<string, unknown>) => unknown;
      };
    };
  }
}

export {};
