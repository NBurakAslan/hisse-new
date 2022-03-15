import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Aciklama from "./Aciklama";

function SekerAcordian(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
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
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Şeker Yatırım
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {`${props.hisse[0]}         Öneri:${props.hisse[1]}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{`F/K ${props.hisse[8]} `}</Typography>
          <Typography>{`Hedef Fiyat ${props.hisse[3]}`}</Typography>
          <Typography>{`Kazandırma Potansiyeli ${props.hisse[7]}`}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SekerAcordian;
