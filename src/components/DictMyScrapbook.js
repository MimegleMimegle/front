import React, { useState, useEffect } from 'react'
import '../styles/css/DictMyScrapbook.css'
import swal from 'sweetalert'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { likeApi } from '../shared/api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ReactComponent as EmptyBookMarkIcon } from '../styles/icons/북마크 비활성_18dp.svg'
import { ReactComponent as FillBookMarkIcon } from '../styles/icons/북마크 활성_18dp.svg'
import { ReactComponent as DictLinkCopyIcon } from '../styles/icons/링크복사_24dp.svg'
import { dictApi } from '../shared/api'
import AlertModal from './modal/AlertModal'

const DictMyScrapbook = (props) => {
  const dispatch = useDispatch()

  const [expanded, setExpanded] = React.useState(false)
  const [scrapList, setScrapList] = React.useState([])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const DictMySrcapListDB = async (userId) => {
    let response = await dictApi.dictMyScrapList(userId)

    setScrapList(response.data.data)
    console.log(response)
    console.log(response.data.data)
  }

  React.useEffect((userId) => {
    DictMySrcapListDB(userId)
  }, [])

  const currentUrl = window.location.href

  const [copyLink, setCopyLink] = useState(false)

  const handleCopy = () => {
    setCopyLink(true)
    setTimeout(() => setCopyLink(false), 2000)
  }

  return (
    <>
      {scrapList.map((scrapList) => (
        <div className="DictMyScrapbook" key={scrapList.id}>
          <Accordion sx={{ backgroundColor: 'white' }} expanded={expanded === `panel${scrapList.dictId}`} onChange={handleChange(`panel${scrapList.dictId}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <div className={expanded === `panel${scrapList.dictId}` ? 'DictMyScrapTitle activeTitle' : 'DictMyScrapTitle'}>{scrapList.title}</div>
            </AccordionSummary>
            <AccordionDetails>
              <div
                onClick={() => {
                  history.push(`/dict/detail/${scrapList.dictId}`)
                }}
              >
                <div className="DictMyScrapSummarySection">
                  <div className="DictMyScrapSummaryText">한줄설명</div>
                  <div className="DictMyScrapSummary">{scrapList.summary}</div>
                </div>
                <div className="DictMyScrapDescriptionSection">
                  <div className="DictMyScrapDescriptionText">상세설명</div>
                  <div className="DictMyScrapDescription">{scrapList.meaning}</div>
                </div>
              </div>
              <div className="DictMyScrapInfoSection">
                <div className="DictMyScrapInfo">
                  <FillBookMarkIcon fill="#878C92" />
                  <div className="DictMyScrapCount">스크랩</div>
                </div>
                <CopyToClipboard className="DictLinkCopyButton" onCopy={handleCopy} text={currentUrl}>
                  <DictLinkCopyIcon fill="#878C92" width="24px" height="24px" />
                </CopyToClipboard>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      <AlertModal showModal={copyLink}>링크 복사 완료!</AlertModal>
    </>
  )
}

export default DictMyScrapbook
