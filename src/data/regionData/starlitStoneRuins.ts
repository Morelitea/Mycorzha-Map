import { RegionData } from "../../types/Regions";

export const starlitStoneRuins: RegionData = {
  majorContent:
    "An ancient walled off city ruin made of steel and decay rests to the north, forgotten and abandoned except for the few who use it's obscurity to hide themselves from sight.",
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
      content: `Now the ancient creaking bones of a once great and towering cityscape the Starlit Stone Ruins are all that remains of a time long since forgotten to the Mycorzhians of the south. Metal skyscrapers rust and collapse surrounded by towering defensive walls. Lights flicker on and off through the now half broken windows powered by rigged windmills on the building roofs in an attempt to make use of what was once a fully functional electric grid. The walls surrounding the city are all that defend it against the harsh northern winds and whatever beings lurk in the Frostfire Forest at it's edge. Nothing - and no one - good is to be found in the decay.

Few survive here and those that do must defend themselves just as much from the forest and lack of resources as their fellow critters. Those who live here are not only rejected by the southern isles, but also their fellow Banished, and even by the rag tag crews that reside to the northern Mossy Cup Lagoon. An amoral group of critters who value nothing but themselves and their own means. Yet even in this they find ways to survive, braving the forest for valuable rare mushrooms for black market trade, creating makeshift inventions to stave off the ever hungry dark that encroaches it's walls.`,
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
          content: `Dialect here is indistinct. Those who live here keep to themselves out of safety and may come from anywhere on the Isles.`,
        },
        {
          name: "Spirituality",
          id: "spirituality",
          content: `Spirituality is if anything mocked. Many here aim to fight the Isles for themselves, or believe themselves to have more power than the Mysts overhead. The Isle's here are more responsive than anywhere else, but even when faced with the monsters formed in the darkness of the hungry forest those who survive here believe themselves to be somehow stronger than the ancient power of their homeland.`,
        },
        {
          name: "Art",
          id: "art",
          content: `Art is replaced here by innovation. Inventors who felt limited by rules like not taking too much or producing too quickly come to the ruins believing that here they will finally show the others that progress is the true answer to societies challenges. More often than not this costs them their life.`,
        },
        {
          name: "Holidays",
          id: "holidays",
          content: `The seasons don't seem to exist here, the land is either stagnate or creates hundreds of yeas of growth overnight. The air itself somehow feels stale, and the sky always overcast. There is nothing worth celebrating in the bleak wastes.`,
        },
        {
          name: "Common Activities and Interests",
          id: "common-activities-and-interests",
          content: `Everyone here seems to have an interest in fortifying themselves into whatever hobble or abandoned apartment they now call home.`,
        },
      ],
    },
  ],
};

export default starlitStoneRuins;
