import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import RegionPage from "./components/RegionPage";
import { Region, regionDefinitions } from "./types/RegionMapping";

// Function to get region from coordinates
export const getRegionFromCoordinates = (
  x: number,
  y: number
): Region | null => {
  for (const definition of regionDefinitions) {
    const { xRange, yRange, region } = definition;
    // Ensure the region always has an `id`
    if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
      // If there's no `id`, fallback to using `route` (if needed)
      const regionWithId: Region = {
        ...region,
        id: region.id || "default-id", // Ensure an `id` exists
      };
      return regionWithId;
    }
  }
  return null; // No matching region found
};

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleGridClick = (gridCoordinates: { x: number; y: number }) => {
    const region = getRegionFromCoordinates(
      gridCoordinates.x,
      gridCoordinates.y
    );
    if (region) {
      navigate(`/region/${region.id}`);
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
          key={region.id}
          path={`region/:regionId`}
          element={<RegionPage />}
        />
      ))}
    </Routes>
  );
};

export default App;
