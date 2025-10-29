import { readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { BASE_DIR, CREATURES_DIR } from "../data/consts";
import type { CreaturesByRegion, TCreature } from "../types/Creatures";

const isJsonFile = (name: string) => name.toLowerCase().endsWith(".json");

const collectFilePaths = async (
  directory: string,
  acc: string[]
): Promise<void> => {
  const entries = await readDir(directory, { baseDir: BASE_DIR });

  for (const entry of entries) {
    if (!entry.name) {
      continue;
    }

    const currentPath = `${directory}/${entry.name}`;

    try {
      await readDir(currentPath, { baseDir: BASE_DIR });
      await collectFilePaths(currentPath, acc);
      continue;
    } catch {
      // Not a directory, fall through to JSON check below.
    }

    if (isJsonFile(entry.name)) {
      acc.push(currentPath.replace(/^\.?\//, ""));
    }
  }
};

const extractIdFromPath = (path: string): string => {
  const fileName = path.split(/[/\\\\]/).pop() ?? path;
  return fileName.replace(/\.json$/i, "");
};

const normalizeCreature = (
  data: Record<string, unknown>,
  fallbackId: string
): TCreature => {
  const regionId = data["regionId"];
  if (typeof regionId !== "string" || regionId.length === 0) {
    throw new Error(`Creature '${fallbackId}' is missing a valid regionId.`);
  }

  const id =
    typeof data["id"] === "string" && data["id"].length > 0
      ? (data["id"] as string)
      : fallbackId;

  return {
    ...(data as TCreature),
    id,
    regionId,
  };
};

export const groupCreaturesByRegion = (
  creatures: TCreature[]
): CreaturesByRegion => {
  return creatures.reduce<CreaturesByRegion>((acc, creature) => {
    const bucket = acc[creature.regionId] ?? [];
    bucket.push(creature);
    acc[creature.regionId] = bucket;
    return acc;
  }, {});
};

export const loadCreaturesFromDisk = async (): Promise<CreaturesByRegion> => {
  const relativePaths: string[] = [];
  await collectFilePaths(CREATURES_DIR, relativePaths);
  const creatures: TCreature[] = [];

  for (const relativePath of relativePaths) {
    const fallbackId = extractIdFromPath(relativePath);
    const fileContents = await readTextFile(relativePath, {
      baseDir: BASE_DIR,
    });
    const parsed = JSON.parse(fileContents) as Record<string, unknown>;
    const creature = normalizeCreature(parsed, fallbackId);
    creatures.push(creature);
  }

  return groupCreaturesByRegion(creatures);
};
