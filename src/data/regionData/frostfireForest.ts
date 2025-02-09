import { RegionData } from "../../types/Regions";

export const frostfireForest: RegionData = {
  majorContent:
    "Frostfire Forest is in the far north east of the Isles where creatures do not travel for no food grows here and the black of night is ever present. Evergreen trees grow beyond reasonable comprehension creating a dark canopy that blocks all light. Decay is all that remains of once lush underbrush, save for the bio-luminescent mushrooms that cause a glow of purples and oranges against the stark black shadow. This strange unearthly glow gives Frostfire its name, the flickering light in the distance looking akin to an approaching wildfire. The deeper one wanders the more trees seems to close in, their blacked bark etched with patterns that resemble twisted faces.",
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
      content: `The creatures of the Isles cannot easily get to Frostfire, the Crescent Mountains dangerous and near impossible to cross even for birds, the White Plateau dangerous both due to the Banished as well as the bitter cold winds and desolate waste, and the wall of thorns that grows against the Glow Lantern River makes entering from the south east border impossible. As such to much of the Isles it is little more then legend in their favorite stories. Jack seems to be the only critter able to survive around here, and no one knows how or how he manages to even arrive at the forests safely. He isn't one to speak much, so it all remains a mystery, or perhaps just a grand tale he has made up.

Those who survive in the nearby Starlit Stone Ruins however often must enter into the forest surrounding it. And they know of its dangers - shadows that come alive in the darkness, taking on the shapes and forms of grotesque, unnatural beings. While the danger is immense so is the desperation of those who live here, and the mushrooms that grow in the forests are highly valuable for trade on the Black Market. Left with little choice critters venture into the darkness and often never return.`,
    },
    {
      name: "Flora and Fauna",
      id: "flora-and-fauna",
      content:
        "The Isles of Mycorzha share the climate of the Northern Americas. While they have some unique plants or mushrooms that only grow on the Isles you might know a few of these plants. Maybe you can find them where you live?\n\nIf you find some share your photos with us on Instagram by tagging us @morelitea! Remember to take nothing but photos and leave nothing but footprints.",
      subsectionType: "tabs",
      subsections: [
        {
          name: "Mushrooms",
          id: "mushrooms",
          content: `✦ Jack-o’-Lantern (Omphalotus olearius)

✦ Western Jack-o’-Lantern (Omphalotus olivascens)

✦ Bitter Oyster (Panellus stipticus)

✦ Honey Mushroom (Armillaria mellea)

✦ Foxfire Fungus (Mycena chlorophos)

✦ Blue-Green Mycena (Mycena cyanorrhiza)

✦ Luminescent Panellus (Panellus pusillus)`,
        },
        {
          name: "Trees",
          id: "trees",
          content: `✦ Douglas Fir (Pseudotsuga menziesii)

✦ Western Red Cedar (Thuja plicata)

✦ Coast Redwood (Sequoia sempervirens)

✦ Giant Sequoia (Sequoiadendron giganteum)`,
        },
      ],
    },
  ],
};

export default frostfireForest;
