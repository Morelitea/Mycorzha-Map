import React, { useEffect, useState } from "react";
import { MapContainer, ImageOverlay, Rectangle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ImageDimensions {
  width: number;
  height: number;
}

interface MapComponentProps {
  onGridClick: (gridCoordinates: { x: number; y: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onGridClick }) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [gridSize, setGridSize] = useState<number>(100); // Grid cell size in pixels

  useEffect(() => {
    const img = new Image();
    img.src = "/map.webp";
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });

      const windowWidth = window.innerWidth;
      const scaleFactor = windowWidth / img.width;
      const calculatedZoom = Math.log2(scaleFactor);
      setZoomLevel(Math.min(Math.max(calculatedZoom, -4), 4));
    };
  }, []);

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
        rectangles.push(
          <Rectangle
            key={`${x}-${y}`}
            bounds={bounds}
            pathOptions={{
              weight: 0,
              fillOpacity: 0,
            }}
            eventHandlers={{
              click: () => onGridClick({ x, y }),
            }}
          />
        );
      }
    }
    return rectangles;
  };

  return (
    <MapContainer
      center={[imageDimensions.height, imageDimensions.width / 2]}
      zoom={zoomLevel}
      minZoom={zoomLevel}
      maxZoom={zoomLevel}
      crs={L.CRS.Simple}
      style={{ height: "100vh", width: "100%" }}
      bounds={mapBounds}
      maxBounds={mapBounds}
      zoomControl={false}
    >
      <ImageOverlay url="/map.webp" bounds={imageBounds} opacity={1} />
      {createGrid()}
    </MapContainer>
  );
};

export default MapComponent;
