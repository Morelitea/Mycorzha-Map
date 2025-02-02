import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VerticalNav.module.scss";
import {
  RegionDefinition,
  regionDefinitions,
  Subsection,
} from "../types/RegionMapping";
import { Creature, CreatureData } from "../types/Creatures";

interface IVerticalNavProps {
  creatureData: CreatureData;
}

const VerticalNav: React.FC<IVerticalNavProps> = ({ creatureData }) => {
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

  if (!regionData || !regionData.regionData.subsections.length) {
    return null;
  }

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navHeader}>
        <h2>{regionData.region.name}</h2>
      </div>
      <ul className={styles.navList}>
        {regionData.regionData.subsections.map((section) => (
          <Section key={section.id} section={section} creatures={creatures} />
        ))}
      </ul>
    </nav>
  );
};

const Section: React.FC<{ section: Subsection; creatures: Creature[] }> = ({
  section,
  creatures,
}) => {
  // Ensure subsections is treated as an array
  const subsections = section.subsections || [];

  return (
    <li className={styles.sectionItem}>
      <div>
        <Link to={`#${section.id}`} className={styles.mainLink}>
          {section.name}
        </Link>
      </div>
      {subsections.length > 0 || creatures.length > 0 ? (
        <ul className={styles.subSectionList}>
          {subsections.map((subSection) => (
            <li key={subSection.id}>
              <Link to={`#${subSection.id}`} className={styles.subLink}>
                {subSection.name}
              </Link>
            </li>
          ))}
          {creatures.map(({ name, id }) => (
            <li key={id}>
              <Link to={`#${id}`} className={styles.subLink}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default VerticalNav;
