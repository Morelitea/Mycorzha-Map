import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { exists } from "@tauri-apps/plugin-fs";
import { ThemeProvider } from "@mui/material/styles";
import useIdleNavigation from "./utils/useIdleNavigation";
import useFullscreenGesture from "./utils/useFullscreenGesture";
import { regionDefinitions } from "./data/regionDefinitions";
import { Region } from "./types/Regions";
import { BASE_DIR, CREATURES_DIR } from "./data/consts";
import type { CreaturesByRegion } from "./types/Creatures";
import { loadCreaturesFromDisk } from "./utils/creatureData";
import theme from "./theme";
import PageTransition from "./components/PageTransition";

const ImportButton = lazy(() => import("./components/ImportButton"));
const MapComponent = lazy(() => import("./components/MapComponent"));
const RegionPage = lazy(() => import("./components/RegionPage"));

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
  const location = useLocation();
  const [creatureSourceAvailable, setCreatureSourceAvailable] =
    useState<boolean>(false);
  const [creatureData, setCreatureData] = useState<CreaturesByRegion>({});
  const [showImportPanel, setShowImportPanel] = useState<boolean>(false);

  const initialize = useCallback(async () => {
    const directoryExists = await exists(CREATURES_DIR, {
      baseDir: BASE_DIR,
    });

    if (!directoryExists) {
      if (DEV) {
        setCreatureSourceAvailable(false);
      }
      return;
    }

    try {
      const grouped = await loadCreaturesFromDisk();
      setCreatureData(grouped);
      setCreatureSourceAvailable(true);
    } catch (err) {
      console.error("Failed to load creature data", err);
      if (DEV) {
        setCreatureSourceAvailable(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!creatureSourceAvailable) {
      initialize();
    }
  }, [creatureSourceAvailable, initialize]);

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

  const shouldShowImporter = !creatureSourceAvailable || showImportPanel;

  return (
    <ThemeProvider theme={theme}>
      <div className="appContainer">
        <AnimatePresence mode="wait" initial={false}>
          {shouldShowImporter ? (
            <PageTransition key="importer">
              <Suspense fallback={<div>Loading importer...</div>}>
                <ImportButton
                  onClose={
                    creatureSourceAvailable
                      ? () => setShowImportPanel(false)
                      : undefined
                  }
                  canClose={creatureSourceAvailable}
                />
              </Suspense>
            </PageTransition>
          ) : (
            <PageTransition key={location.pathname}>
              <Suspense fallback={<div>Loading region...</div>}>
                <Routes location={location}>
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
              </Suspense>
            </PageTransition>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
