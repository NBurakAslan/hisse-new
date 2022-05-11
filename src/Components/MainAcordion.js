import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IsAcordian from "./IsAcordian";
import SekerAcordian from "./SekerAcordian";

function MainAcordion(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Hisse Adı
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {props.id}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.isHisse ? (
            <IsAcordian hisse={props.isHisse} />
          ) : (
            "İşBank Yatırım Öneri yok"
          )}

          {props.sekerHisse ? (
            <SekerAcordian hisse={props.sekerHisse} />
          ) : (
            "Şeker Yatırım Öneri yok"
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MainAcordion;
