import { RegionDefinition } from "../types/Regions";
import coveCity from "./regionData/coveCity";
import crescentMountains from "./regionData/crescentMountains";
import dreamerTree from "./regionData/dreamerTree";
import fernLeafForest from "./regionData/fernLeafForest";
import frostfireForest from "./regionData/frostfireForest";
import hazelmossWoods from "./regionData/hazelmossWoods";
import lunaValley from "./regionData/lunaValley";
import mossyCupLagoon from "./regionData/mossyCupLagoon";
import saffronSporeIslands from "./regionData/saffronSporeIslands";
import seleneCliffs from "./regionData/seleneCliffs";
import shadowMossCaves from "./regionData/shadowMossCaves";
import starlitStoneRuins from "./regionData/starlitStoneRuins";

export const regionDefinitions: RegionDefinition[] = [
  {
    xRange: [800, 1000] as [number, number],
    yRange: [2600, 2700] as [number, number],
    region: {
      name: "Cove City",
      id: "cove-city",
      bannerImage: "/images/banners/cove-city-banner.png",
    },
    regionData: coveCity,
  },
  {
    xRange: [0, 700] as [number, number],
    yRange: [3200, 3400] as [number, number],
    region: {
      name: "Crescent Mountains and the White Plateau",
      id: "crescent-mountains",
      bannerImage: "/images/banners/crescent-mountains-banner.png",
    },
    regionData: crescentMountains,
  },
  {
    xRange: [1000, 1200] as [number, number],
    yRange: [2000, 2200] as [number, number],
    region: {
      name: "Dreamer Tree and Greater Mycorzha",
      id: "dreamer-tree",
      bannerImage: "/images/banners/dreamer-tree-banner.png",
    },
    regionData: dreamerTree,
  },
  {
    xRange: [1500, 2100] as [number, number],
    yRange: [2600, 3200] as [number, number],
    region: {
      name: "Fern Leaf Forest",
      id: "fern-leaf-forest",
      bannerImage: "/images/banners/fern-leaf-forest-banner.png",
    },
    regionData: fernLeafForest,
  },
  {
    xRange: [1400, 2100] as [number, number],
    yRange: [3300, 3900] as [number, number],
    region: {
      name: "Frostfire Forest",
      id: "frostfire-forest",
      bannerImage: "/images/banners/frostfire-forest-banner.png",
    },
    regionData: frostfireForest,
  },
  {
    xRange: [400, 1300] as [number, number],
    yRange: [1300, 1800] as [number, number],
    region: {
      name: "Hazelmoss Woods",
      id: "hazelmoss-woods",
      bannerImage: "/images/banners/hazelmoss-woods-banner.png",
    },
    regionData: hazelmossWoods,
  },
  {
    xRange: [800, 1200] as [number, number],
    yRange: [2800, 3000] as [number, number],
    region: {
      name: "Luna Valley",
      id: "luna-valley",
      bannerImage: "/images/banners/luna-valley-banner.png",
    },
    regionData: lunaValley,
  },
  {
    xRange: [300, 600] as [number, number],
    yRange: [3500, 3800] as [number, number],
    region: {
      name: "Mossy Cup Lagoon",
      id: "mossy-cup-lagoon",
      bannerImage: "/images/banners/mossy-cup-lagoon-banner.png",
    },
    regionData: mossyCupLagoon,
  },
  {
    xRange: [100, 1400] as [number, number],
    yRange: [700, 1200] as [number, number],
    region: {
      name: "Saffron Spore Islands and the Morel Marsh",
      id: "saffron-spore-islands",
      bannerImage: "/images/banners/saffron-spore-islands-banner.png",
    },
    regionData: saffronSporeIslands,
  },
  {
    xRange: [1300, 1400] as [number, number],
    yRange: [2700, 3100] as [number, number],
    region: {
      name: "Selene Cliffs",
      id: "selene-cliffs",
      bannerImage: "/images/banners/selene-cliffs-banner.png",
    },
    regionData: seleneCliffs,
  },
  {
    xRange: [800, 900] as [number, number],
    yRange: [3100, 3100] as [number, number],
    region: {
      name: "Shadow Moss Caves",
      id: "shadow-moss-caves",
      bannerImage: "/images/banners/shadow-moss-caves-banner.png",
    },
    regionData: shadowMossCaves,
  },
  {
    xRange: [1200, 1300] as [number, number],
    yRange: [3500, 3600] as [number, number],
    region: {
      name: "Starlit Stone Ruins",
      id: "starlit-stone-ruins",
      bannerImage: "/images/banners/starlit-stone-ruins-banner.png",
    },
    regionData: starlitStoneRuins,
  },
];
