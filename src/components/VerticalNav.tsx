import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VerticalNav.module.scss";
import {
  RegionDefinition,
  regionDefinitions,
  Subsection,
} from "../types/RegionMapping";
import { TCreature, CreatureData } from "../types/Creatures";

interface IVerticalNavProps {
  creatureData: CreatureData;
}

const VerticalNav: React.FC<IVerticalNavProps> = ({ creatureData }) => {
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

const handleClick = (ev: React.SyntheticEvent, id: string): void => {
  ev.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 20,
      behavior: "smooth",
    });
  }
};

const Section: React.FC<{ section: Subsection; creatures: TCreature[] }> = ({
  section,
  creatures,
}) => {
  // Ensure subsections is treated as an array
  const subsections = section.subsections || [];
  return (
    <li className={styles.sectionItem}>
      <div>
        <Link
          to={`#${section.id}`}
          className={styles.mainLink}
          onClick={(ev) => handleClick(ev, section.id)}
        >
          {section.name}
        </Link>
      </div>
      {subsections.length > 0 || creatures.length > 0 ? (
        <ul className={styles.subSectionList}>
          {subsections.map((subSection) => (
            <li key={subSection.id}>
              <Link
                to={`#${subSection.id}`}
                className={styles.subLink}
                onClick={(ev) => handleClick(ev, subSection.id)}
              >
                {subSection.name}
              </Link>
            </li>
          ))}

          {section.subsectionType &&
            section.subsectionType == "creature" &&
            creatures.map((creature) => (
              <li key={creature.id}>
                <Link
                  to={`#${creature.id}`}
                  className={styles.subLink}
                  onClick={(ev) => handleClick(ev, creature.id)}
                >
                  {creature.name}
                </Link>
              </li>
            ))}
        </ul>
      ) : null}
    </li>
  );
};

export default VerticalNav;
