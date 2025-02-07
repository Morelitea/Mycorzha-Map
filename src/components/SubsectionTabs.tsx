import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Subsection } from "../types/Regions";

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

interface ISubsectionTabsProps {
  section: Subsection;
}
export const SubsectionTabs: React.FC<ISubsectionTabsProps> = ({ section }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {section.subsections?.map((subsection, index) => (
          <Tab
            key={subsection.id}
            label={subsection.name}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {section.subsections?.map((subsection, index) => (
        <SubsectionTabPanel key={subsection.id} value={value} index={index}>
          <ReactMarkdown>{subsection.content}</ReactMarkdown>
        </SubsectionTabPanel>
      ))}
    </>
  );
};

export default SubsectionTabs;
