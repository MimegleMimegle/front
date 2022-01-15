import React from 'react'
import '../styles/css/DictMyScrapbook.css'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function DictMyScrapbook() {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className="DictMyScrapbook">
      <Accordion sx={{ backgroundColor: 'white' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ width: '33%', flexShrink: 0 }}>단어</Typography>
          <Typography sx={{ color: 'text.secondary' }}>한줄설명</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>어쩌고 저쩌고</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
