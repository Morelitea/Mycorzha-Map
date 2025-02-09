import { RegionData } from "../../types/Regions";

export const shadowMossCaves: RegionData = {
  majorContent: "Coming soon!",
  subsections: [
    {
      name: "Known Residents",
      id: "known-residents",
      subsectionType: "creature",
      content: "",
    },
    {
      name: "Culture",
      id: "culture",
      content: ``,
    },
    {
      name: "Regional Differences",
      id: "regional-differences",
      content:
        "Each region of Mycorzha has many shared beliefs and values, but all the same each have aspects that make them unique.",
      subsectionType: "tabs",
      subsections: [
        {
          name: "Dialect",
          id: "dialect",
          content: ``,
        },
        {
          name: "Spirituality",
          id: "spirituality",
          content: ``,
        },
        {
          name: "Art",
          id: "art",
          content: ``,
        },
        {
          name: "Holidays",
          id: "holidays",
          content: ``,
        },
        {
          name: "Common Activities and Interests",
          id: "common-activities-and-interests",
          content: ``,
        },
      ],
    },
    {
      name: "Flora and Fauna",
      id: "flora-and-fauna",
      content: `The Isles of Mycorzha share the climate of the Northern Americas. While they have some unique plants or mushrooms that only grow on the Isles you might know a few of these plants. Maybe you can find them where you live?\n\nIf you find some share your photos with us on Instagram by tagging us @morelitea! Remember to take nothing but photos and leave nothing but footprints.`,
      subsectionType: "tabs",
      subsections: [
        {
          name: "Mushrooms",
          id: "mushrooms",
          content: ``,
        },
        {
          name: "Flowers",
          id: "flowers",
          content: ``,
        },
        {
          name: "Trees",
          id: "trees",
          content: ``,
        },
        {
          name: "Grasses and Shrubs",
          id: "grasses-and-shrubs",
          content: ``,
        },
        {
          name: "Other Plants",
          id: "other-plants",
          content: ``,
        },
      ],
    },
    // {
    //   name: "Subcultures",
    //   id: "subcultures",
    //   content: "",
    //   subsectionType: "subculture",
    //   subsections: [
    //     {
    //       name: "Selene Cliffs",
    //       id: "selene-cliffs",
    //       link: "/region/selene-cliffs",
    //       image: "selene-cliffs.png",
    //       content:
    //         "Surrounding cliffs often populated by the birds of the Isles.",
    //     },
    //   ],
    // },
  ],
};

export default shadowMossCaves;
