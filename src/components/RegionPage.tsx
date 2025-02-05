import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RegionHeader from "./RegionHeader";
import VerticalNav from "./VerticalNav"; // Importing the dynamic VerticalNav component
import {
  RegionDefinition,
  regionDefinitions,
  Subsection,
} from "../types/RegionMapping";
import styles from "./RegionPage.module.scss";
import { Creature, CreatureData } from "../types/Creatures";

interface IRegionPageProps {
  creatureData: CreatureData;
}
const RegionPage: React.FC<IRegionPageProps> = ({ creatureData }) => {
  const { regionId } = useParams<{ regionId: string }>();
  const [regionData, setRegionData] = useState<RegionDefinition | null>(null);
  const [creatures, setCreatures] = useState<Creature[]>([]);

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
          <h1>{region.name}</h1>
          <p>{majorContent}</p>

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
  creatures: Creature[];
}

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  creatures,
}) => {
  // Render section normally if not JSON, otherwise render creature names
  if (section.content && section.content.endsWith(".json")) {
    return (
      <section id={section.id} key={section.id} className={styles.section}>
        <h2>{section.name}</h2>
        {/* Render creature names as anchor links */}
        {creatures.length > 0 ? (
          <div className={styles.creatures}>
            {creatures.map((creature) => (
              <div
                key={creature.id}
                id={`${creature.id}`}
                className={styles.creature}
              >
                <h3>{creature.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading creatures...</p>
        )}
      </section>
    );
  }

  return (
    <section id={section.id} key={section.id} className={styles.section}>
      <h2>{section.name}</h2>
      <p>{section.content}</p>

      {/* Render subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className={styles.subsections}>
          {section.subsections.map((subSection) => (
            <div
              key={subSection.id}
              id={subSection.id}
              className={styles.subsection}
            >
              <h3>{subSection.name}</h3>
              <p>{subSection.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RegionPage;
