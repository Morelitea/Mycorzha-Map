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
