import React, { useEffect, useState } from "react";
import { MapContainer, ImageOverlay, Rectangle, Tooltip } from "react-leaflet";
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

const MapComponent: React.FC<MapComponentProps> = ({ onGridClick }) => {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [zoomLevel, setZoomLevel] = useState<number>(0);
  const [gridSize] = useState<number>(100); // Grid cell size in pixels

  useEffect(() => {
    const img = new Image();
    img.src = MAP_IMAGE;
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
              click: () => onGridClick({ x, y }),
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
      zoom={zoomLevel}
      minZoom={zoomLevel}
      maxZoom={zoomLevel}
      crs={L.CRS.Simple}
      style={{ height: "100vh", width: "100%" }}
      bounds={mapBounds}
      maxBounds={mapBounds}
      zoomControl={false}
      attributionControl={false}
    >
      <ImageOverlay url={MAP_IMAGE} bounds={imageBounds} opacity={1} />
      {createGrid()}
    </MapContainer>
  );
};

export default MapComponent;
