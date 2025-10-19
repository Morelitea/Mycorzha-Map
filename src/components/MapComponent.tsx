import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  Rectangle,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MAP_IMAGE = "/MycorzhaWorldMap4k.webp";
const SHOW_GRID = false;

interface ImageDimensions {
  width: number;
  height: number;
}

interface MapComponentProps {
  onGridClick: (gridCoordinates: { x: number; y: number }) => void;
}

const BASE_MIN_ZOOM = -4;
const MAX_ALLOWED_ZOOM = 0;

const MapInitializer: React.FC<{
  onReady: (map: L.Map) => void;
  minZoom: number;
}> = ({ onReady, minZoom }) => {
  const map = useMap();

  useEffect(() => {
    onReady(map);
  }, [map, onReady]);

  useEffect(() => {
    map.setMinZoom(minZoom);
    if (map.getZoom() < minZoom) {
      map.setZoom(minZoom);
    }
  }, [map, minZoom]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ onGridClick }) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [baseZoom, setBaseZoom] = useState<number>(0);
  const [gridSize] = useState<number>(100);
  const mapRef = useRef<L.Map | null>(null);
  const moveEndHandlerRef = useRef<((event: L.LeafletEvent) => void) | null>(
    null
  );

  useEffect(() => {
    const img = new Image();
    img.src = MAP_IMAGE;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });

      const windowWidth = window.innerWidth;
      const scaleFactor = windowWidth / img.width;
      const calculatedZoom = Math.log2(scaleFactor);
      setBaseZoom(
        Math.min(Math.max(calculatedZoom, BASE_MIN_ZOOM), MAX_ALLOWED_ZOOM)
      );
    };
  }, []);

  const handleMapReady = useCallback((map: L.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    return () => {
      if (mapRef.current && moveEndHandlerRef.current) {
        mapRef.current.off("moveend", moveEndHandlerRef.current);
      }
    };
  }, []);

  const handleRectangleClick = useCallback(
    (x: number, y: number) => {
      if (!mapRef.current) {
        onGridClick({ x, y });
        return;
      }

      const map = mapRef.current;
      const targetCenter: L.LatLngExpression = [
        y + gridSize / 2,
        x + gridSize / 2,
      ];

      const currentZoom = map.getZoom();
      const currentCenter = map.getCenter();
      const maxZoom = Math.min(
        map.getMaxZoom() ?? MAX_ALLOWED_ZOOM,
        MAX_ALLOWED_ZOOM
      );
      const desiredZoom = Math.min(currentZoom + 1.5, maxZoom);
      const targetLatLng = L.latLng(targetCenter);

      const alreadyCentered =
        currentCenter.distanceTo(targetLatLng) < 1 &&
        Math.abs(currentZoom - desiredZoom) < 0.1;

      if (alreadyCentered) {
        onGridClick({ x, y });
        return;
      }

      if (moveEndHandlerRef.current) {
        map.off("moveend", moveEndHandlerRef.current);
        moveEndHandlerRef.current = null;
      }

      const handler = () => {
        moveEndHandlerRef.current = null;
        onGridClick({ x, y });
      };

      moveEndHandlerRef.current = handler;
      map.once("moveend", handler);

      map.flyTo(targetCenter, desiredZoom, {
        duration: 0.6,
        easeLinearity: 0.3,
      });

      window.setTimeout(() => {
        if (moveEndHandlerRef.current === handler) {
          map.off("moveend", handler);
          handler();
        }
      }, 400);
    },
    [gridSize, onGridClick]
  );

  if (!imageDimensions.width || !imageDimensions.height) {
    return <div>Loading map...</div>;
  }

  const imageBounds: [[number, number], [number, number]] = [
    [0, 0],
    [imageDimensions.height, imageDimensions.width],
  ];

  const mapBounds: [[number, number], [number, number]] = [
    [0, 0],
    [imageDimensions.height, imageDimensions.width],
  ];

  const createGrid = () => {
    const rectangles = [];
    for (let y = 0; y < imageDimensions.height; y += gridSize) {
      for (let x = 0; x < imageDimensions.width; x += gridSize) {
        const bounds: [[number, number], [number, number]] = [
          [y, x],
          [y + gridSize, x + gridSize],
        ];
        const gridXIndex = x / gridSize;
        const gridYIndex = y / gridSize;
        rectangles.push(
          <Rectangle
            key={`${x}-${y}`}
            bounds={bounds}
            pathOptions={
              SHOW_GRID
                ? {
                    weight: 0.5,
                    color: "rgba(255, 255, 255, 0.45)",
                    fillOpacity: 0,
                  }
                : {
                    weight: 0,
                    fillOpacity: 0,
                  }
            }
            eventHandlers={{
              click: () => handleRectangleClick(x, y),
            }}
          >
            {SHOW_GRID && (
              <Tooltip permanent direction="center" className="grid-label">
                {`${gridXIndex}, ${gridYIndex}`}
              </Tooltip>
            )}
          </Rectangle>
        );
      }
    }
    return rectangles;
  };

  return (
    <MapContainer
      center={[imageDimensions.height, imageDimensions.width / 2]}
      zoom={baseZoom}
      minZoom={baseZoom}
      maxZoom={Math.min(baseZoom + 2, MAX_ALLOWED_ZOOM)}
      crs={L.CRS.Simple}
      style={{ height: "100vh", width: "100%", background: "#a0b8b2" }}
      bounds={mapBounds}
      maxBounds={mapBounds}
      zoomControl={false}
      attributionControl={false}
    >
      <MapInitializer onReady={handleMapReady} minZoom={baseZoom} />
      <ImageOverlay url={MAP_IMAGE} bounds={imageBounds} opacity={1} />
      {createGrid()}
    </MapContainer>
  );
};

export default MapComponent;
