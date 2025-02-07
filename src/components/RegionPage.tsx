import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import RegionHeader from "./RegionHeader";
import VerticalNav from "./VerticalNav"; // Importing the dynamic VerticalNav component
import Creature from "./Creature";
import { regionDefinitions } from "../data/regionDefinitions";
import { RegionDefinition, Subsection } from "../types/Regions";
import styles from "./RegionPage.module.scss";
import { TCreature, CreatureData } from "../types/Creatures";
import Subculture from "./Subculture";
import SubsectionTabs from "./SubsectionTabs";
import SubsectionAccordion from "./SubsectionAccordion";

interface IRegionPageProps {
  creatureData: CreatureData;
}
const RegionPage: React.FC<IRegionPageProps> = ({ creatureData }) => {
  const { regionId } = useParams<{ regionId: string }>();
  const [regionData, setRegionData] = useState<RegionDefinition | null>(null);
  const [creatures, setCreatures] = useState<TCreature[]>([]);

  useEffect(() => {
    const region = regionDefinitions.find(
      (region) => region.region.id === regionId
    );
    if (region) {
      setRegionData(region);
    }
    const regionCreatures = creatureData.regions.find(
      (region) => region.regionId === regionId
    );
    if (regionCreatures) {
      setCreatures(regionCreatures.creatures);
    }
  }, [regionId]);

  if (!regionData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const {
    region,
    regionData: { majorContent, subsections },
  } = regionData;

  return (
    <div className={styles.regionPage}>
      <RegionHeader regionName={region.name} bannerImage={region.bannerImage} />
      <div className={styles.regionContent}>
        <main className={styles.regionMainContent}>
          {/* <h1>{region.name}</h1> */}
          <ReactMarkdown>{majorContent}</ReactMarkdown>

          {/* Render subsection content dynamically with anchor tags */}
          {subsections.map((section) => (
            <SectionContent
              key={section.id}
              section={section} // Pass each section to be processed
              creatures={creatures}
            />
          ))}
        </main>
        <VerticalNav creatureData={creatureData} />
      </div>
    </div>
  );
};

interface SectionContentProps {
  section: Subsection;
  creatures: TCreature[];
}

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  creatures,
}) => {
  // Render section normally if not JSON, otherwise render creature names
  if (section.subsectionType === "creature") {
    return (
      creatures.length > 0 && (
        <section id={section.id} key={section.id} className={styles.section}>
          <h2>{section.name}</h2>
          <div className={styles.creatures}>
            {creatures.map((creature) => (
              <Creature key={creature.id} creature={creature} />
            ))}
          </div>
        </section>
      )
    );
  }

  if (section.subsectionType === "subculture") {
    return (
      <section id={section.id} className={styles.section}>
        <h2>{section.name}</h2>
        <ReactMarkdown>{section.content}</ReactMarkdown>

        {section.subsections && section.subsections.length > 0 && (
          <div className={styles.subcultures}>
            {section.subsections.map((subsection) => (
              <Subculture key={subsection.id} subsection={subsection} />
            ))}
          </div>
        )}
      </section>
    );
  }

  if (section.subsectionType === "tabs") {
    return (
      <section id={section.id} key={section.id} className={styles.section}>
        <h2>{section.name}</h2>
        <ReactMarkdown>{section.content}</ReactMarkdown>

        {/* Render subsections */}
        {section.subsections && section.subsections.length > 0 && (
          <div className={styles.subsections}>
            <SubsectionTabs section={section} />
          </div>
        )}
      </section>
    );
  }

  if (section.subsectionType === "accordion") {
    return (
      <section id={section.id} key={section.id} className={styles.section}>
        <h2>{section.name}</h2>
        <ReactMarkdown>{section.content}</ReactMarkdown>

        {/* Render subsections */}
        {section.subsections && section.subsections.length > 0 && (
          <div className={styles.subsections}>
            <SubsectionAccordion section={section} />
          </div>
        )}
      </section>
    );
  }

  return (
    <section id={section.id} key={section.id} className={styles.section}>
      <h2>{section.name}</h2>
      <ReactMarkdown>{section.content}</ReactMarkdown>

      {/* Render subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className={styles.subsections}>
          <ul>
            {section.subsections.map((subsection) => (
              <li key={subsection.id} id={subsection.id}>
                <h3>{subsection.name}</h3>
                <ReactMarkdown>{subsection.content}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default RegionPage;
