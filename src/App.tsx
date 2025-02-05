import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MapComponent from "./components/MapComponent";
import RegionPage from "./components/RegionPage";
import { Region, regionDefinitions } from "./types/RegionMapping";
import { exists, BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import ImportButton from "./components/ImportButton";

const CREATURE_DATA_FILE = "creatureData.json";

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
  const [creatureFileExists, setCreatureFileExists] = useState<boolean>(false); // State to track if the file exists
  const [creatureData, setCreatureData] = useState<any>(null); // State to store file data

  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = async () => {
  //       const fileContent = reader.result as string;
  //       try {
  //         // Optionally save this content to a file (e.g., avatar.png)
  //         await writeTextFile("creatureData.json", fileContent, {
  //           baseDir: BaseDirectory.Home,
  //         });

  //         // Check if the file exists in AppData directory
  //         const fileExistsResult = await exists("creatureData.json", {
  //           baseDir: BaseDirectory.Home,
  //         });
  //         setFileExists(fileExistsResult); // Update state based on file existence
  //         setFileData(fileContent); // Optionally store the file data
  //       } catch (err) {
  //         console.error("Error processing the file:", err);
  //       }
  //     };

  //     reader.onerror = () => {
  //       console.error("Error reading the file.");
  //     };

  //     reader.readAsText(file);
  //   }
  // };

  const initialize = async () => {
    const doesExist = await exists(CREATURE_DATA_FILE, {
      baseDir: BaseDirectory.AppLocalData,
    });
    if (doesExist) {
      setCreatureFileExists(doesExist);
      const data = await readTextFile(CREATURE_DATA_FILE, {
        baseDir: BaseDirectory.AppLocalData,
      });
      setCreatureData(JSON.parse(data));
    }
  };

  useEffect(() => {
    if (!creatureFileExists) {
      initialize();
    }
  }, [creatureFileExists, initialize]);

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
    <div className="appContainer">
      {!creatureFileExists ? (
        // Display import button if file doesn't exist
        <ImportButton />
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
              element={<RegionPage creatureData={creatureData} />}
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
