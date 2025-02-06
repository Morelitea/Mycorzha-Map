import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { exists, BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import { ThemeProvider } from "@mui/material/styles";
import MapComponent from "./components/MapComponent";
import RegionPage from "./components/RegionPage";
import { regionDefinitions } from "./data/regionDefinitions";
import { Region } from "./types/Regions";
import { CreatureData } from "./types/Creatures";
import ImportButton from "./components/ImportButton";
import sampleData from "./data/creatureData.json";
import theme from "./theme";

const CREATURE_DATA_FILE = "creatureData.json";
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
  const navigate = useNavigate();
  const [creatureFileExists, setCreatureFileExists] = useState<boolean>(false); // State to track if the file exists
  const [creatureData, setCreatureData] = useState<CreatureData>({
    regions: [],
  }); // State to store file data

  const initialize = async () => {
    if (DEV) {
      setCreatureFileExists(true);
      setCreatureData(sampleData);
    } else {
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
      // alert("No region defined for this grid cell.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
