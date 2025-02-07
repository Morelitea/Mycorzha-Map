import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Subsection } from "../types/Regions";

interface ISubsectionAccordionProps {
  section: Subsection;
}

export const SubsectionAccordion: React.FC<ISubsectionAccordionProps> = ({
  section,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {section.subsections?.map((subsection) => (
        <Accordion
          id={subsection.id}
          expanded={expanded === subsection.id}
          onChange={handleChange(subsection.id)}
        >
          <AccordionSummary
            id={`${subsection.id}-header`}
            expandIcon={<ExpandMoreIcon />}
          >
            {subsection.name}
          </AccordionSummary>
          <AccordionDetails>
            <ReactMarkdown>{subsection.content}</ReactMarkdown>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default SubsectionAccordion;
