import React, { useState } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/plugin-fs"; // File handling with Tauri

const ImportButton: React.FC = () => {
  const [creatureData, setCreatureData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        // Use FileReader to read the file content
        const reader = new FileReader();

        reader.onload = async () => {
          const fileContent = reader.result as string; // The content of the file

          try {
            // Parse the file content as JSON
            const data = JSON.parse(fileContent);

            // Optionally, save this data in Tauri's local storage or a file
            try {
              await writeTextFile("creatureData.json", JSON.stringify(data), {
                baseDir: BaseDirectory.AppLocalData, // Or try other directories
              });
              setCreatureData(data);
              setError(null); // Clear any previous errors
              console.log("Data loaded successfully:", data);
            } catch (writeError) {
              setError(`Failed to write the file. Error: ${writeError}`);
              console.error("Write error:", writeError);
            }
          } catch (err) {
            setError("Failed to parse JSON. Please check the file format.");
            console.error("Error parsing file:", err);
          }
        };

        reader.onerror = () => {
          setError("Error reading the file. Please try again.");
        };

        reader.readAsText(file); // Read the file content as text
      } catch (err) {
        setError("Failed to read file. Please try again.");
        console.error("Error reading file:", err);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {creatureData && (
        <div>
          <h3>Creature Data</h3>
          <pre>{JSON.stringify(creatureData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImportButton;
