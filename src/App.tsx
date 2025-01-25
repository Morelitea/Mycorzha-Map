import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import { Region, regionDefinitions } from "./types/RegionMapping";

// Function to get region from coordinates
export const getRegionFromCoordinates = (
  x: number,
  y: number
): Region | null => {
  for (const definition of regionDefinitions) {
    const { xRange, yRange, region } = definition;
    if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
      return region;
    }
  }
  return null; // No matching region found
};

// Region Page Component
const RegionPage: React.FC<{ region: Region }> = ({ region }) => (
  <div>
    <h1>{region.name}</h1>
    <p>{region.description}</p>
  </div>
);

const App: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const navigate = useNavigate();

  const handleGridClick = (gridCoordinates: { x: number; y: number }) => {
    const region = getRegionFromCoordinates(
      gridCoordinates.x,
      gridCoordinates.y
    );
    if (region) {
      setSelectedRegion(region);
      navigate(region.route); // Navigate to the region's route
    } else {
      alert("No region defined for this grid cell.");
    }
  };

  return (
    <Routes>
      {/* Home route to display the map */}
      <Route
        path="/"
        element={<MapComponent onGridClick={handleGridClick} />}
      />

      {/* Dynamically add routes for all regions */}
      {regionDefinitions.map(({ region }) => (
        <Route
          key={region.route}
          path={region.route}
          element={<RegionPage region={region} />}
        />
      ))}
    </Routes>
  );
};

export default App;
