import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import styles from "./VerticalNav.module.scss";
import { regionDefinitions } from "../data/regionDefinitions";
import { RegionDefinition, Subsection } from "../types/Regions";
import { TCreature, CreatureData } from "../types/Creatures";
import handleScrollClick from "../utils/handleScrollClick";

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
    <Paper className={styles.navContainer} elevation={3}>
      <nav>
        <div className={styles.navHeader}>
          <Link to={`#${regionId}`} onClick={handleScrollClick}>
            <h2>{regionData.region.name}</h2>
          </Link>
        </div>
        <ul className={styles.navList}>
          {regionData.regionData.subsections.map((section) => (
            <Section key={section.id} section={section} creatures={creatures} />
          ))}
        </ul>
      </nav>
    </Paper>
  );
};

const Section: React.FC<{ section: Subsection; creatures: TCreature[] }> = ({
  section,
  creatures,
}) => {
  // Ensure subsections is treated as an array
  const subsections = section.subsections || [];

  // Don't show Known Residents if there are no creatures
  if (section.subsectionType === "creature" && creatures.length < 1) {
    return;
  }
  return (
    <li className={styles.sectionItem}>
      <div>
        <Link
          to={`#${section.id}`}
          className={styles.mainLink}
          onClick={handleScrollClick}
        >
          {section.name}
        </Link>
      </div>
      {(subsections.length > 0 || creatures.length > 0) &&
      section.subsectionType !== "tabs" &&
      section.subsectionType !== "subculture" ? (
        <ul className={styles.subSectionList}>
          {subsections.map((subSection) => (
            <li key={subSection.id}>
              <Link
                to={`#${subSection.id}`}
                className={styles.subLink}
                onClick={handleScrollClick}
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
                  onClick={handleScrollClick}
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
