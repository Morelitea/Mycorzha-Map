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
    xRange: [600, 600] as [number, number],
    yRange: [1100, 1200] as [number, number],
    region: {
      name: "Cove City",
      id: "cove-city",
      bannerImage: "/images/banners/cove-city-banner.png",
    },
    regionData: coveCity,
  },
  {
    xRange: [200, 700] as [number, number],
    yRange: [1500, 1600] as [number, number],
    region: {
      name: "Crescent Mountains and the White Plateau",
      id: "crescent-mountains",
      bannerImage: "/images/banners/crescent-mountains-banner.png",
    },
    regionData: crescentMountains,
  },
  {
    xRange: [300, 900] as [number, number],
    yRange: [700, 1000] as [number, number],
    region: {
      name: "Dreamer Tree and Greater Mycorzha",
      id: "dreamer-tree",
      bannerImage: "/images/banners/dreamer-tree-banner.png",
    },
    regionData: dreamerTree,
  },
  {
    xRange: [1000, 1300] as [number, number],
    yRange: [900, 1500] as [number, number],
    region: {
      name: "Fern Leaf Forest",
      id: "fern-leaf-forest",
      bannerImage: "/images/banners/fern-leaf-forest-banner.png",
    },
    regionData: fernLeafForest,
  },
  {
    xRange: [1000, 1200] as [number, number],
    yRange: [1600, 1800] as [number, number],
    region: {
      name: "Frostfire Forest",
      id: "frostfire-forest",
      bannerImage: "/images/banners/frostfire-forest-banner.png",
    },
    regionData: frostfireForest,
  },
  {
    xRange: [400, 900] as [number, number],
    yRange: [400, 600] as [number, number],
    region: {
      name: "Hazelmoss Woods",
      id: "hazelmoss-woods",
      bannerImage: "/images/banners/hazelmoss-woods-banner.png",
    },
    regionData: hazelmossWoods,
  },
  {
    xRange: [600, 800] as [number, number],
    yRange: [1300, 1500] as [number, number],
    region: {
      name: "Luna Valley",
      id: "luna-valley",
      bannerImage: "/images/banners/luna-valley-banner.png",
    },
    regionData: lunaValley,
  },
  {
    xRange: [300, 500] as [number, number],
    yRange: [1700, 1800] as [number, number],
    region: {
      name: "Mossy Cup Lagoon",
      id: "mossy-cup-lagoon",
      bannerImage: "/images/banners/mossy-cup-lagoon-banner.png",
    },
    regionData: mossyCupLagoon,
  },
  {
    xRange: [200, 900] as [number, number],
    yRange: [0, 200] as [number, number],
    region: {
      name: "Saffron Spore Islands and the Morel Marsh",
      id: "saffron-spore-islands",
      bannerImage: "/images/banners/saffron-spore-islands-banner.png",
    },
    regionData: saffronSporeIslands,
  },
  {
    xRange: [900, 900] as [number, number],
    yRange: [1200, 1400] as [number, number],
    region: {
      name: "Selene Cliffs",
      id: "selene-cliffs",
      bannerImage: "/images/banners/selene-cliffs-banner.png",
    },
    regionData: seleneCliffs,
  },
  {
    xRange: [600, 600] as [number, number],
    yRange: [1400, 1400] as [number, number],
    region: {
      name: "Shadow Moss Caves",
      id: "shadow-moss-caves",
      bannerImage: "/images/banners/shadow-moss-caves-banner.png",
    },
    regionData: shadowMossCaves,
  },
  {
    xRange: [800, 900] as [number, number],
    yRange: [1600, 1700] as [number, number],
    region: {
      name: "Starlit Stone Ruins",
      id: "starlit-stone-ruins",
      bannerImage: "/images/banners/starlit-stone-ruins-banner.png",
    },
    regionData: starlitStoneRuins,
  },
];
