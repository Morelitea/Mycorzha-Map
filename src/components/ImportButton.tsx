import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { CreaturesByRegion } from "../types/Creatures";
import { loadCreaturesFromDisk } from "../utils/creatureData";

type ImportSummary = {
  creatureCount: number;
  imageCount: number;
};

interface ImportButtonProps {
  onClose?: () => void;
  canClose?: boolean;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onClose, canClose }) => {
  const [creatureData, setCreatureData] = useState<CreaturesByRegion | null>(
    null
  );
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setError(
        "Please select a .zip archive containing per-creature JSON files and image folders."
      );
      fileInput.value = "";
      return;
    }

    setIsImporting(true);
    setError(null);
    setSummary(null);

    try {
      const buffer = await file.arrayBuffer();
      const archive = Array.from(new Uint8Array(buffer));
      const result = await invoke<ImportSummary>("import_creature_package", {
        archive,
      });

      const groupedCreatures = await loadCreaturesFromDisk();
      setCreatureData(groupedCreatures);
      setSummary(result);
    } catch (err) {
      console.error("Failed to import archive:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to import archive. Please try again."
      );
      setCreatureData(null);
      setSummary(null);
    } finally {
      setIsImporting(false);
      fileInput.value = "";
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <input type="file" accept=".zip" onChange={handleFileChange} />
      <p>
        Select a zip file that includes per-creature <code>.json</code> files
        along with updated <code>creatures/</code> and <code>spotify/</code>
        image folders.
      </p>
      {isImporting && <p>Importing archive…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {summary && (
        <Paper sx={{ overflow: "auto", p: 2, mb: 2 }}>
          <h3>Import Summary</h3>
          <p>
            Updated creature data with {summary.creatureCount} creatures and{" "}
            {summary.imageCount} image files.
          </p>
        </Paper>
      )}
      {creatureData && (
        <div>
          {canClose && onClose && (
            <Button
              sx={{ mb: 1 }}
              onClick={onClose}
              disabled={isImporting}
              variant="outlined"
            >
              Back to map
            </Button>
          )}
          <Button
            sx={{ mb: 2, mt: 2 }}
            onClick={() => window.location.reload()}
            variant="contained"
            disabled={isImporting}
          >
            Refresh to view map
          </Button>
          <Paper sx={{ overflow: "auto", p: 2 }}>
            <h3>Creature Data</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(creatureData, null, 2)}
            </pre>
          </Paper>
        </div>
      )}
    </Box>
  );
};

export default ImportButton;
