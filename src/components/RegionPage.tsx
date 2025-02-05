import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RegionHeader from "./RegionHeader";
import VerticalNav from "./VerticalNav"; // Importing the dynamic VerticalNav component
import Creature from "./Creature";
import {
  RegionDefinition,
  regionDefinitions,
  Subsection,
} from "../types/RegionMapping";
import styles from "./RegionPage.module.scss";
import { TCreature, CreatureData } from "../types/Creatures";

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

interface SubsectionTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const SubsectionTabPanel = (props: SubsectionTabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subsection-tabpanel-${index}`}
      aria-labelledby={`subsection-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Paper elevation={1} sx={{ mb: 2 }}>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Paper>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `subsection-tab-${index}`,
    "aria-controls": `subsection-tabpanel-${index}`,
  };
}

interface SectionContentProps {
  section: Subsection;
  creatures: TCreature[];
}

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  creatures,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Render section normally if not JSON, otherwise render creature names
  if (section.content && section.content.endsWith(".json")) {
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

  return (
    <section id={section.id} key={section.id} className={styles.section}>
      <h2>{section.name}</h2>
      <ReactMarkdown>{section.content}</ReactMarkdown>

      {/* Render subsections */}
      {section.subsections && section.subsections.length > 0 && (
        <div className={styles.subsections}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {section.subsections.map((subsection, index) => (
              <Tab label={subsection.name} {...a11yProps(index)} />
            ))}
          </Tabs>
          {section.subsections.map((subsection, index) => (
            <SubsectionTabPanel value={value} index={index}>
              <ReactMarkdown>{subsection.content}</ReactMarkdown>
            </SubsectionTabPanel>
          ))}
        </div>
      )}
    </section>
  );
};

export default RegionPage;
