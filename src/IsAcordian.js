import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Aciklama from "./Aciklama";

function IsAcordian(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const {
    Title,
    F_K,
    Fiyat_TL_Price_TL,
    Son_Hedef_Fiyat_Target_Price,
    F_DD,
    ONERI_ACIKLAMA,
    CARI_FK,
    CARI_PD_DD,
    ACIKLAMA_TR,
  } = props.hisse;

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
            İş Yatırım
          </Typography>
          <Typography
            sx={{ color: "text.secondary" }}
          >{`${Title}        Öneri:${ONERI_ACIKLAMA}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{`F/K:${Number(F_K).toFixed(
            2
          )} `}</Typography>
          <Typography>{`Hedef Fiyat ${Son_Hedef_Fiyat_Target_Price}`}</Typography>
          <Aciklama aciklama={ACIKLAMA_TR} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default IsAcordian;
