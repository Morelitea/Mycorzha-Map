export interface Region {
  name: string;
  route: string;
  description?: string;
}

export interface RegionDefinition {
  xRange: [number, number];
  yRange: [number, number];
  region: Region;
}

export const regionDefinitions = [
  {
    xRange: [600, 600],
    yRange: [1100, 1200],
    region: {
      name: "Cove City",
      route: "/cove-city",
      description:
        "The bustling heart of innovation in Mycorzha, where ideas flourish.",
    },
  },
  {
    xRange: [200, 700],
    yRange: [1500, 1600],
    region: {
      name: "Crescent Mountains and the White Plateau",
      route: "/crescent-mountains",
      description:
        "A majestic range of peaks crowned with snow, offering breathtaking vistas.",
    },
  },
  {
    xRange: [300, 900],
    yRange: [700, 1000],
    region: {
      name: "Dreamer Tree and Greater Mycorzha",
      route: "/dreamer-tree",
      description:
        "The central hub of Mycorzha, where the Dreamer Tree connects the realms.",
    },
  },
  {
    xRange: [1000, 1300],
    yRange: [900, 1500],
    region: {
      name: "Fernleaf Forest",
      route: "/fernleaf-forest",
      description:
        "A lush forest teeming with vibrant flora and gentle streams.",
    },
  },
  {
    xRange: [1000, 1200],
    yRange: [1600, 1800],
    region: {
      name: "Frostfire Forest",
      route: "/frostfire-forest",
      description:
        "An enchanted forest where frost and flame coexist in eerie harmony.",
    },
  },
  {
    xRange: [400, 900],
    yRange: [400, 600],
    region: {
      name: "Hazelmoss Woods",
      route: "/hazelmoss-woods",
      description:
        "A dense woodland known for its mysterious, moss-covered terrain.",
    },
  },
  {
    xRange: [600, 800],
    yRange: [1300, 1500],
    region: {
      name: "Luna Valley",
      route: "/luna-valley",
      description: "A serene valley that shimmers under the moonlight.",
    },
  },
  {
    xRange: [300, 500],
    yRange: [1700, 1800],
    region: {
      name: "Mossy Cup Lagoon",
      route: "/mossy-cup-lagoon",
      description:
        "A tranquil lagoon surrounded by moss-covered trees and wildlife.",
    },
  },
  {
    xRange: [200, 900],
    yRange: [0, 200],
    region: {
      name: "Saffron Spore Islands",
      route: "/saffron-spore-islands",
      description:
        "A cluster of vibrant islands blanketed with golden spores and rare fungi.",
    },
  },
  {
    xRange: [900, 900],
    yRange: [1200, 1400],
    region: {
      name: "Selene Cliffs",
      route: "/selene-cliffs",
      description: "Rugged cliffs that overlook the vast oceans of Mycorzha.",
    },
  },
  {
    xRange: [600, 600],
    yRange: [1400, 1400],
    region: {
      name: "Shadow Moss Caves",
      route: "/shadow-moss-caves",
      description: "A network of caves cloaked in darkness and glowing moss.",
    },
  },
  {
    xRange: [800, 900],
    yRange: [1600, 1700],
    region: {
      name: "Starlit Stone Ruins",
      route: "/starlit-stone-ruins",
      description:
        "Ancient ruins that glitter under the night sky, holding secrets of the past.",
    },
  },
];
