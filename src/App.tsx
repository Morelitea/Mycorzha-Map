import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import RegionPage from "./components/RegionPage";
import { Region, regionDefinitions } from "./types/RegionMapping";
import { exists, BaseDirectory, writeTextFile } from "@tauri-apps/plugin-fs";

export const getRegionFromCoordinates = (
  x: number,
  y: number
): Region | null => {
  for (const definition of regionDefinitions) {
    const { xRange, yRange, region } = definition;
    if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
      return {
        ...region,
        id: region.id || "default-id", // Ensure an `id` exists
      };
    }
  }
  return null;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [fileExists, setFileExists] = useState<boolean>(false); // State to track if the file exists
  const [setFileData] = useState<any>(null); // State to store file data

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const fileContent = reader.result as string;
        try {
          // Optionally save this content to a file (e.g., avatar.png)
          await writeTextFile("creatureData.json", fileContent, {
            baseDir: BaseDirectory.Home,
          });

          // Check if the file exists in AppData directory
          const fileExistsResult = await exists("creatureData.json", {
            baseDir: BaseDirectory.Home,
          });
          setFileExists(fileExistsResult); // Update state based on file existence
          setFileData(fileContent); // Optionally store the file data
        } catch (err) {
          console.error("Error processing the file:", err);
        }
      };

      reader.onerror = () => {
        console.error("Error reading the file.");
      };

      reader.readAsText(file);
    }
  };

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
    <div>
      {!fileExists ? (
        // Display import button if file doesn't exist
        <input type="file" accept=".json" onChange={handleFileChange} />
      ) : (
        // If the file exists, render the map
        <Routes>
          <Route
            path="/"
            element={<MapComponent onGridClick={handleGridClick} />}
          />
          {regionDefinitions.map(({ region }) => (
            <Route
              key={region.id}
              path={`region/:regionId`}
              element={<RegionPage />}
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
