export interface Subsection {
  name: string;
  id: string;
  content: string; // This can also be a link to a JSON data object
  subsections?: Subsection[];
}

export interface RegionData {
  majorContent: string;
  subsections: Subsection[];
}
export interface SectionProps {
  title: string;
  jsonData: {
    subSections: {
      title: string;
      link: string;
    }[];
  };
}

export interface Region {
  name: string;
  id: string;
  bannerImage: string;
}

export interface RegionDefinition {
  xRange: [number, number];
  yRange: [number, number];
  region: Region;
  regionData: RegionData;
}

export const regionDefinitions = [
  {
    xRange: [600, 600] as [number, number],
    yRange: [1100, 1200] as [number, number],
    region: {
      name: "Cove City",
      id: "cove-city",
      bannerImage: "/assets/banners/cove-city-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [200, 700] as [number, number],
    yRange: [1500, 1600] as [number, number],
    region: {
      name: "Crescent Mountains and the White Plateau",
      id: "crescent-mountains",
      bannerImage: "/assets/banners/crescent-mountains-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [300, 900] as [number, number],
    yRange: [700, 1000] as [number, number],
    region: {
      name: "Dreamer Tree and Greater Mycorzha",
      id: "dreamer-tree",
      bannerImage: "/assets/banners/dreamer-tree-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [1000, 1300] as [number, number],
    yRange: [900, 1500] as [number, number],
    region: {
      name: "Fern Leaf Forest",
      id: "fern-leaf-forest",
      bannerImage: "/assets/banners/fernleaf-forest-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [1000, 1200] as [number, number],
    yRange: [1600, 1800] as [number, number],
    region: {
      name: "Frostfire Forest",
      id: "frostfire-forest",
      bannerImage: "/assets/banners/frostfire-forest-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [400, 900] as [number, number],
    yRange: [400, 600] as [number, number],
    region: {
      name: "Hazelmoss Woods",
      id: "hazelmoss-woods",
      bannerImage: "/assets/banners/hazelmoss-woods-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [600, 800] as [number, number],
    yRange: [1300, 1500] as [number, number],
    region: {
      name: "Luna Valley",
      id: "luna-valley",
      bannerImage: "/assets/banners/luna-valley-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [300, 500] as [number, number],
    yRange: [1700, 1800] as [number, number],
    region: {
      name: "Mossy Cup Lagoon",
      id: "mossy-cup-lagoon",
      bannerImage: "/assets/banners/mossy-cup-lagoon-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [200, 900] as [number, number],
    yRange: [0, 200] as [number, number],
    region: {
      name: "Saffron Spore Islands",
      id: "saffron-spore-islands",
      bannerImage: "/assets/banners/saffron-spore-islands-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [900, 900] as [number, number],
    yRange: [1200, 1400] as [number, number],
    region: {
      name: "Selene Cliffs",
      id: "selene-cliffs",
      bannerImage: "/assets/banners/selene-cliffs-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [600, 600] as [number, number],
    yRange: [1400, 1400] as [number, number],
    region: {
      name: "Shadow Moss Caves",
      id: "shadow-moss-caves",
      bannerImage: "/assets/banners/shadow-moss-caves-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
  {
    xRange: [800, 900] as [number, number],
    yRange: [1600, 1700] as [number, number],
    region: {
      name: "Starlit Stone Ruins",
      id: "starlit-stone-ruins",
      bannerImage: "/assets/banners/starlit-stone-ruins-banner.png",
    },
    regionData: {
      majorContent:
        "Cove City is known for its beautiful coastal views and bustling port. It's a hub of commerce and culture.",
      subsections: [
        {
          name: "Culture",
          id: "culture",
          content: "Foo",
          subsections: [
            {
              name: "Subsection 1",
              id: "subsection-1",
              content: "Subsection 1 content",
            },
            {
              name: "Subsection 2",
              id: "subsection-2",
              content: "Subsection 2 content",
            },
          ],
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content: "Foo",
        },
        {
          name: "Known Residents",
          id: "known-residents",
          content: "/data/lunaValley.json",
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content: "Foo",
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content: "Foo",
        },
      ],
    },
  },
];
