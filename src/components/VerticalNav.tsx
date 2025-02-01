import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VerticalNav.module.scss";
import {
  RegionDefinition,
  regionDefinitions,
  Subsection,
} from "../types/RegionMapping";
import { Creature } from "../types/Creatures";

// No API call needed, we will directly load the data from the file.
const VerticalNav: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const [regionData, setRegionData] = useState<RegionDefinition | null>(null);

  useEffect(() => {
    const region = regionDefinitions.find(
      (region) => region.region.id === regionId
    );
    if (region) {
      setRegionData(region);
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
          <Section key={section.id} section={section} />
        ))}
      </ul>
    </nav>
  );
};

const Section: React.FC<{ section: Subsection }> = ({ section }) => {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    // Check if the content is a valid file path and ends with .json
    if (section.content && section.content.endsWith(".json")) {
      import(`../data/${section.content}`) // Dynamically import the JSON file
        .then((module) => {
          // Assuming the file exports an array of creatures
          setCreatures(module.default);
        })
        .catch((error) => console.error("Error loading creature data:", error));
    }
  }, [section.content]);

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
