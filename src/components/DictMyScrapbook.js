import React from 'react'
import '../styles/css/DictMyScrapbook.css'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ReactComponent as EmptyBookMarkIcon } from '../styles/icons/북마크 비활성_18dp.svg'
import { ReactComponent as FillBookMarkIcon } from '../styles/icons/북마크 활성_18dp.svg'
import { ReactComponent as DictLinkCopyIcon } from '../styles/icons/링크복사_24dp.svg'

export default function DictMyScrapbook() {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <div className="DictMyScrapbook">
        <Accordion sx={{ backgroundColor: 'white' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <div className={expanded === 'panel1' ? 'DictMyScrapTitle activeTitle' : 'DictMyScrapTitle'}>단어</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="DictMyScrapSummarySection">
              <div className="DictMyScrapSummaryText">한줄설명</div>
              <div className="DictMyScrapSummary">한줄설명입니다</div>
            </div>
            <div className="DictMyScrapDescriptionSection">
              <div className="DictMyScrapDescriptionText">상세설명</div>
              <div className="DictMyScrapDescription">상세설명입니다</div>
            </div>
            <div className="DictMyScrapInfoSection">
              <div className="DictMyScrapInfo">
                <FillBookMarkIcon fill="#878C92" />
                <div className="DictMyScrapCount">스크랩</div>
              </div>
              <div className="DictLinkCopyButton">
                <DictLinkCopyIcon fill="#878C92" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="DictMyScrapbook">
        <Accordion sx={{ backgroundColor: 'white' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <div className={expanded === 'panel2' ? 'DictMyScrapTitle activeTitle' : 'DictMyScrapTitle'}>단어</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="DictMyScrapSummarySection">
              <div className="DictMyScrapSummaryText">한줄설명</div>
              <div className="DictMyScrapSummary">한줄설명입니다</div>
            </div>
            <div className="DictMyScrapDescriptionSection">
              <div className="DictMyScrapDescriptionText">상세설명</div>
              <div className="DictMyScrapDescription">상세설명입니다</div>
            </div>
            <div className="DictMyScrapInfoSection">
              <div className="DictMyScrapInfo">
                <FillBookMarkIcon fill="#878C92" />
                <div className="DictMyScrapCount">스크랩</div>
              </div>
              <div className="DictLinkCopyButton">
                <DictLinkCopyIcon fill="#878C92" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="DictMyScrapbook">
        <Accordion sx={{ backgroundColor: 'white' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
            <div className={expanded === 'panel3' ? 'DictMyScrapTitle activeTitle' : 'DictMyScrapTitle'}>단어</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="DictMyScrapSummarySection">
              <div className="DictMyScrapSummaryText">한줄설명</div>
              <div className="DictMyScrapSummary">한줄설명입니다</div>
            </div>
            <div className="DictMyScrapDescriptionSection">
              <div className="DictMyScrapDescriptionText">상세설명</div>
              <div className="DictMyScrapDescription">상세설명입니다</div>
            </div>
            <div className="DictMyScrapInfoSection">
              <div className="DictMyScrapInfo">
                <FillBookMarkIcon fill="#878C92" />
                <div className="DictMyScrapCount">스크랩</div>
              </div>
              <div className="DictLinkCopyButton">
                <DictLinkCopyIcon fill="#878C92" />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}
