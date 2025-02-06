export interface Subsection {
  name: string;
  id: string;
  content: string; // This can also be a link to a JSON data object
  image?: string;
  link?: string;
  subsectionType?: "table" | "creature" | "subculture";
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

export const regionDefinitions: RegionDefinition[] = [
  {
    xRange: [600, 600] as [number, number],
    yRange: [1100, 1200] as [number, number],
    region: {
      name: "Cove City",
      id: "cove-city",
      bannerImage: "/images/banners/cove-city-banner.png",
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
      bannerImage: "/images/banners/crescent-mountains-banner.png",
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
      bannerImage: "/images/banners/dreamer-tree-banner.png",
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
      bannerImage: "/images/banners/fernleaf-forest-banner.png",
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
      bannerImage: "/images/banners/frostfire-forest-banner.png",
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
      bannerImage: "/images/banners/hazelmoss-woods-banner.png",
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
      bannerImage: "/images/banners/luna-valley-banner.png",
    },
    regionData: {
      majorContent:
        "In Luna Valley, delicate pastel blossoms sway in the breeze, and every tea captures the spirit of tranquil meadows and sunlit springs. From floral motifs to soft hues of pink, lavender, and pale gold, Luna Valley’s wares reflect its peaceful charm and serene beauty. Made from fertile volcanic soil fed by streams from the surrounding mountain range Luna Valley has endless food and comfortable weather year round that makes it the most populated area in the Isles next to Cove City itself.",
      subsections: [
        {
          name: "Known Residents",
          id: "known-residents",
          subsectionType: "creature",
          content: "/data/lunaValley.json",
        },
        {
          name: "Culture",
          id: "culture",
          content: `Luna Valley rests in the crater like cliffs that are at the edge of the crescent mountains. The huge glacial peaks surrounding it do well at preventing bad weather, and so there is rarely a stormy night to worry about, with the sun shining 300+ days of the year overhead. The volcanic soil from the mountains surrounding it is filled with nutrients and food grows here freely and with great ease. Because of this most of the population of the Isles resides here or in Cove City nearby. So as not to disturb the top soil many who live here burrow underground to build permanent residences, finding the cool break from the sun refreshing, and the smell of the earth a comfort at the end of a long day. Much of the valley is covered in wild grasses and flowers, with a constant buzz of honey bees working away. Small pockets of fruit trees and bushes are interspersed throughout. There are many small creeks which stream throughout the area, all feeding into the main river network.\n\nFable falls, where the water feeds the river from the glaciers, is a sight to behold. Huge and roaring, anything nearby is covered in a fine mist, the river below deep from centuries of the raging water pounding against the ground. Luna Valley is deceptively large, and traveling from one end to the other takes 4-5 days so those who live this far upstream place trade goods in tight water weaved baskets and send them down to Coral Cap Cove to be retrieved and traded for them in exchange for whatever they indicate on the conveniently naturally waterproof mushroom paper. A pully system is erected along the rivers, which brings the baskets back up on hooks filled with the traded goods. The vine ropes holding the baskets are pulled along with a simple water wheel (think like a ski lift system). Occasionally mischievous little ones try to ride in the baskets, a fun past time until you stay in one a little too long and get lost. Some of the creeks through the valley are large enough to carry smaller baskets, which those who live along the riverbed will transfer into the heavier duty baskets to send along for trade. A few creatures do this full time, hiking to deliver the traded goods back to those who live on the edges of the valley.\n\nLocals here heavily value "doers" and so many here create primarily functional arts: blankets, baskets, pictography tiles, and so on. There is abundant natural clay, along with permanent settlements, and so brick and pottery is common. Due to the large river there are many river creatures in the area and a favorite food here is fish. The culture results in many desiring to find a problem and "solve it", with many tool inventors finding ways to work with the land and build creative new solutions. This can get out of hand with the young ones, who don't always value the traditional ways in which the elderly here tell them to temper their greed. Certainly after they invent the next amazing whosamawatsit they will all see that we are just making things *more efficient*.`,
        },
        {
          name: "Regional Differences",
          id: "regional-differences",
          content:
            "Each region of Mycorzha has many shared beliefs and values, but all the same each have aspects that make them unique.",
          subsectionType: "table",
          subsections: [
            {
              name: "Dialect",
              id: "dialect",
              content:
                "Not much of a strong accent due to the constant moving buzz that comes with being in a place like Luna Valley. A lot of words are borrowed from the Beyonders, making their way into local slang and confusing folks that aren't from around there.",
            },
            {
              name: "Spirituality",
              id: "spirituality",
              content: `Luna Valley is a less spiritual part of the land, due in part to the blended cultures, but also because it can be more disconnected from natures cycles in the ever plentiful valley. That said, one would never take a mushroom without telling the land thank you for its blessings, even though at this point its as normal as saying "bless you" after a sneeze. Like many cultures which rely on a key water source funerals are held by boat crafts sent out to sea. Creatures are wrapped in a clean mushroom cloth and adorned with their favorite teas, flowers, and other things from life. The River goddess is believed to carry you down Luna and into the mysts, a place "in between" which cannot be accessed by the living. The River creatures of Luna Valley have a unique religious belief you can learn more about under their subculture section.`,
            },
            {
              name: "Art",
              id: "art",
              content: `Art here is heavily influenced by the city, colorful and bright with distinct geometric patterns throughout, but the tones are softened into pastels to blend with the flower fields that cover much of the valley. Creatures that live here tend to value symmetry and practicality to their designs. Clutter is generally frowned upon and so grand ornate designs are seen as rather eccentric. As one of the few places with permanent residences, some going back many generations in one family, the homes found here tend to be very self expressive from the many years of careful cultivation. Simple braids made from old vines pulled from the river shores are used as accents, and river baskets that once carried trade goods but sprung a leak are reused as plant pots where many grow delightful herbs and flowers not from the valley for year round enjoyment.`,
            },
            {
              name: "Holidays",
              id: "holidays",
              content: `Like all of the land Luna Valley celebrates the 4 major turns of the season. Holidays here are HUGE, with each day celebrating the turn of the season often having the burrows and nests adorned with natural seasonal decor, and community feasts held outside where people share their personal food and teas with others freely. Some of the more competitive individuals go all out and try to create new and artistic food presentations for these to wow their neighbors, even planning for just one holiday for a whole year to pull this off.Those who are religious or spiritual, and many who just culturally feel its a little whimsical, will make these foods from the blessed objects of that given holiday. Traditionally in Luna valley a blessing is baked (or steeped) into the dishes you prepare and thought to bring good (or bad...) luck to those who partake in your food. This is mostly taken as a silly thought, but its not abnormal to blame a bit of bad luck on your neighbors cooking in a playful jab. Those who are trying to impress the parents of a lover would always be sure to say that the parents food was to blame for all their recent success.`,
            },
            {
              name: "Common Activities and Interests",
              id: "common-activities-and-interests",
              content: `Luna valley is a bit more fast paced than most of the land, with people who really enjoy exploring, river tubing, and creating community events to celebrate holidays or simple play some games together that keeps people out and about. It is not uncommon here for people to create hobby groups that meet just to do a shared activity like painting, trivia nights, or creating tea blends together. The blend of cultures and creatures through the area means most people have friends of all types, and the shared hobbies help them to build the closer bonds that are more common for the less populated areas.`,
            },
          ],
        },
        {
          name: "Flora and Fauna",
          id: "flora-and-fauna",
          content:
            "The Isles of Mycorzha share the climate of the Northern Americas. While they have some unique plants or mushrooms that only grow on the Isles you might know a few of these plants. Maybe you can find them where you live?\n\nIf you find some share your photos with us on Instagram by tagging us @morelitea! Remember to take nothing but photos and leave nothing but footprints.",
          subsectionType: "table",
          subsections: [
            {
              name: "Mushrooms",
              id: "mushrooms",
              content:
                "✦ Fairy Ring (Marasmius oreades) ✦ Field Mushroom (Agaricus campestris) ✦ Shaggy Ink Cap (Coprinus comatus) ✦ False Parasol (Chlorophyllum molybdites) ✦ White Dunce Cap (Conocybe apala) ✦ Weeping Widow (Lacrymaria velutina) ✦ Parasol Mushroom (Macrolepiota procera) ✦ Scruffy Twiglet Mushroom (Tubaria furfuracea) ✦ Common Brown Morel (Morchella esculenta) ✦ Destroying Angel (Amanita bisporigera) ✦ Puffball (Calvatia gigantea) ✦ Basket Stinkhorn (Lysurus cruciatus) ✦ Pinwheel (Marasmius rotula) ✦ White Dapperling (Leucoagaricus leucothites) ✦ Fly Agaric (Amanita muscaria) – Known for its iconic red-and-white cap.",
            },
            {
              name: "Flowers",
              id: "flowers",
              content:
                "✦ Echinacea (Echinacea purpurea) – Purple coneflower, loved by pollinators. ✦ Gloriosa Daisy (Rudbeckia hirta) – Bright yellow petals with dark centers. ✦ False Indigo (Baptisia australis) – Tall blue flowers in early summer. ✦ Aromatic Aster (Symphyotrichum oblongifolium) – Pale lavender flowers, blooming in fall. ✦ False Sunflower (Heliopsis helianthoides) – Bright yellow flowers resembling true sunflowers. ✦ Butterfly Weed (Asclepias tuberosa) – Bright orange flowers, a favorite of monarch butterflies. ✦ Wild Bergamot (Monarda fistulosa) – Light purple flowers with a strong fragrance, attracting bees and butterflies.",
            },
            {
              name: "Fruits",
              id: "fruits",
              content:
                "✦ Chokeberries (Aronia melanocarpa) – Produces small, dark, antioxidant-rich berries. ✦ Persimmons (Diospyros virginiana) – Small, sweet fruits that ripen in the fall. ✦ Wild Grapes (Vitis riparia) – Vines that produce small, tart grapes, often found climbing trees. ✦ Pawpaws (Asimina triloba) – Edible tropical-like fruit with custardy texture. ✦ Purple Passionfruit (Passiflora incarnata) – Vining plant with edible fruits and beautiful purple flowers.",
            },
            {
              name: "Grasses and Shrubs",
              id: "grasses-and-shrubs",
              content:
                "✦ Wild Oat (Chasmanthium latifolium) – A tough, graceful grass with arching seed heads. ✦ Little Bluestem (Schizachyrium scoparium) – A tall, clumping grass often found in open woodlands. ✦ Switchgrass (Panicum virgatum) – Tolerates poor soils and provides excellent cover for wildlife. ✦ Indian Grass (Sorghastrum nutans) – Tall, golden grass found in dry, sunny woodland meadows. ✦ Eastern Redbud (Cercis canadensis) – A small, understory tree with bright pink flowers in the spring, often found along woodland edges. ✦ American Hazelnut (Corylus americana) – A shrub with edible nuts, growing in sunny, open spaces of woodlands. ✦ New Jersey Tea (Ceanothus americanus) – A low, deciduous shrub with white flowers, thriving in dry, rocky soils along the cliff edges of the valley. ✦ Witch Hazel (Hamamelis virginiana) – A shrub with yellow flowers in the fall, known for its medicinal properties. ✦ Ninebark (Physocarpus opulifolius) – A tough shrub with peeling bark, found in rocky or sandy soils, providing cover for wildlife.",
            },
            {
              name: "Other Plants",
              id: "other-plants",
              content:
                "✦ Bur Oak (Quercus macrocarpa) – A drought-tolerant oak, often found in savannas and open woodlands. ✦ Shagbark Hickory (Carya ovata) – A tall, open-grown tree with peeling bark, thriving in well-drained soils. ✦ Black Walnut (Juglans nigra) – Often found along streams or in fertile soils, providing dappled shade. ✦ Hackberry (Celtis occidentalis) – Tolerant of poor soils and windy conditions, with small fruits that attract wildlife.",
            },
          ],
        },
        {
          name: "Subcultures",
          id: "subcultures",
          content:
            "Luna valley is large enough that some of it's subcultures are also considered regions.",
          subsectionType: "subculture",
          subsections: [
            {
              name: "Selene Cliffs",
              id: "selene-cliffs",
              link: "/region/selene-cliffs",
              // image: "selene-cliffs.png",
              content:
                "Surrounding cliffs often populated by the birds of the Isles.",
            },
          ],
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
      bannerImage: "/images/banners/mossy-cup-lagoon-banner.png",
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
      bannerImage: "/images/banners/saffron-spore-islands-banner.png",
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
      bannerImage: "/images/banners/selene-cliffs-banner.png",
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
      bannerImage: "/images/banners/shadow-moss-caves-banner.png",
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
      bannerImage: "/images/banners/starlit-stone-ruins-banner.png",
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
