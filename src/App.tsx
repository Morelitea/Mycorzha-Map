import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { exists, readTextFile } from "@tauri-apps/plugin-fs";
import { ThemeProvider } from "@mui/material/styles";
import MapComponent from "./components/MapComponent";
import RegionPage from "./components/RegionPage";
import useIdleNavigation from "./utils/useIdleNavigation";
import useFullscreenGesture from "./utils/useFullscreenGesture";
import { regionDefinitions } from "./data/regionDefinitions";
import { Region } from "./types/Regions";
import { CreatureData } from "./types/Creatures";
import ImportButton from "./components/ImportButton";
import sampleData from "./data/creatureData.json";
import { BASE_DIR, CREATURE_DATA_FILE } from "./data/consts";
import theme from "./theme";

const { DEV } = import.meta.env;

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
  useIdleNavigation();
  useFullscreenGesture();
  const navigate = useNavigate();
  const [creatureFileExists, setCreatureFileExists] = useState<boolean>(false); // State to track if the file exists
  const [creatureData, setCreatureData] = useState<CreatureData>({
    regions: [],
  }); // State to store file data
  const [showImportPanel, setShowImportPanel] = useState<boolean>(false);

  const initialize = useCallback(async () => {
    if (DEV) {
      setCreatureFileExists(true);
      setCreatureData(sampleData);
      return;
    }

    const doesExist = await exists(CREATURE_DATA_FILE, { baseDir: BASE_DIR });
    if (doesExist) {
      setCreatureFileExists(true);
      const data = await readTextFile(CREATURE_DATA_FILE, {
        baseDir: BASE_DIR,
      });
      setCreatureData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (!creatureFileExists) {
      initialize();
    }
  }, [creatureFileExists, initialize]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
        setShowImportPanel(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGridClick = (gridCoordinates: { x: number; y: number }) => {
    const region = getRegionFromCoordinates(
      gridCoordinates.x,
      gridCoordinates.y
    );
    if (region) {
      navigate(`/region/${region.id}`);
    } else {
      navigate(`/region/dreamer-tree`); // Default navigate to Dreamer Tree and Greater Mycorzha
      // alert(
      //   `No region defined for this grid cell. X: ${gridCoordinates.x}, Y: ${gridCoordinates.y}`
      // );
    }
  };

  const shouldShowImporter = !creatureFileExists || showImportPanel;

  return (
    <ThemeProvider theme={theme}>
      <div className="appContainer">
        {shouldShowImporter ? (
          <ImportButton
            onClose={
              creatureFileExists ? () => setShowImportPanel(false) : undefined
            }
            canClose={creatureFileExists}
          />
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
    </ThemeProvider>
  );
};

export default App;
