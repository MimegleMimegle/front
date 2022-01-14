import React, { useState, useEffect } from 'react'
import '../../styles/css/DictDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { dictApi } from '../../shared/api'
import { likeApi } from '../../shared/api'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import { actionCreators as likeActions } from '../../redux/modules/like'
import { ReactComponent as EmptyLikeIcon } from '../../styles/icons/좋아요 비활성_18dp.svg'
import { ReactComponent as FillLikeIcon } from '../../styles/icons/좋아요 활성_18dp.svg'
import swal from 'sweetalert'
import { BiLike } from 'react-icons/bi'
import 'moment'
import 'moment/locale/ko'
import moment from 'moment'
import { push } from 'connected-react-router'
import Header from '../../components/Header'
import SearchPage from '../../shared/SearchPage'

const DictDetail = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const [dict, setDict] = useState([])
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const [createdAt, setCreatedAt] = useState('')
  const [modifiedAt, setModifiedAt] = useState('')

  const getDictDetailDB = async () => {
    await dictApi
      .getDictDetail(dictId)
      .then((response) => {
        setDict(response.data.data)
        setLike(response.data.data.like)
        setLikeCount(response.data.data.likeCount)
        setCreatedAt(response.data.data.createdAt.split('T')[0])
        setModifiedAt(response.data.data.modifiedAt.split('T')[0])
      })
      .catch((error) => {
        console.log('밈 사전 상세 정보 불러오기 실패', error.response)
      })
  }

  const dictId = Number(props.match.params.dictId)

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (like) {
      await likeApi
        .likeDict(dictId)
        .then((response) => {
          setLike(false)
          setLikeCount(likeCount - 1)
          dispatch(getDictDetailDB(like, likeCount))
        })
        .catch((error) => {
          console.log('밈 사전 좋아요 취소 실패', error.response)
        })
    } else {
      await likeApi
        .likeDict(dictId)
        .then((response) => {
          setLike(true)
          setLikeCount(likeCount + 1)
          dispatch(getDictDetailDB(like, likeCount))
        })
        .catch((error) => {
          console.log('밈 사전 좋아요 문제 발생', error.response)
        })
    }
  }

  const currentUrl = window.location.href

  const [copyLink, setCopyLink] = useState(false)

  const closeCopied = () => {
    setTimeout(() => {
      setCopyLink(false)
    }, 2000)
  }

  const handleCopy = () => {
    setCopyLink(true)
    closeCopied()
    swal('링크가 복사되었습니다.', { timer: 1500 })
  }

  React.useEffect(() => {
    getDictDetailDB()
  }, [])

  return (
    <>
      <Header location="오픈 밈사전">
        <div
          className="DictPageSearchButton"
          onClick={() => {
            showSearchBar()
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </Header>
      <SearchBarSection>{show && <SearchPage />}</SearchBarSection>
      <div className="OneDictCardDetailPageLayout">
        <div className="OneDictCardDetailInfoSection">
          <div className="OneDictCardDetailInfoTitle">
            <div className="OneDictCardDetailInfoTitle_Guide">밈 단어</div>
            <div className="OneDictCardDetailInfoTitle_Vertical" />
            <div className="OneDictCardDetailInfoTitle_DictData">{dict.title}</div>
          </div>
          <div className="OneDictCardDetailInfoSummary">
            <div className="OneDictCardDetailInfoSummary_Guide">한줄설명</div>
            <div className="OneDictCardDetailInfoSummary_Vertical" />
            <div className="OneDictCardDetailInfoSummary_DictData">{dict.summary}</div>
          </div>
          <div className="OneDictCardDetailInfoContent">
            <div className="OneDictCardDetailInfoContent_Guide">상세설명</div>
            <div className="OneDictCardDetailInfoContent_Vertical" />
            <div className="OneDictCardDetailInfoContent_DictData">{dict.meaning}</div>
          </div>
          <div className="OneDictCardDetailInfoLikeAndCopyLink">
            <div className="OneDictCardDetailInfoLike" onClick={handleClickLike}>
              {like ? <FillLikeIcon /> : <EmptyLikeIcon />}
            </div>
            <div className="OneDictCardDetailInfoLikeCnt">{dict.likeCount}</div>
            <CopyToClipboard className="OneDictCardDetailInfoCopyLinkButton" onCopy={handleCopy} text={currentUrl}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgba(135, 140, 146, 1)">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
              </svg>
            </CopyToClipboard>
          </div>
          <div className="OneDictCardDetailInfoWriterAndAt">
            <div className="OneDictCardDetailInfoWriterAndAt First">
              <img className="OneDictCardDetailInfoFirstWriterProfileImage" src={dict.firstWriterProfileImage} />
              <div className="OneDictCardDetailInfoFirstWriterCreatedAt">
                <div className="OneDictCardDetailInfoFirstWriter">{dict.firstWriter}</div>
                <div className="OneDictCardDetailInfoCreatedAt">(최초 작성자) {createdAt}</div>
              </div>
            </div>
            <div className="OneDictCardDetailInfoWriterAndAt Recent">
              <img className="OneDictCardDetailInfoRecentWriterProfileImage" src={dict.recentWriterProfileImage} />
              <div className="OneDictCardDetailInfoRecentWriterModifiedAt">
                <div className="OneDictCardDetailInfoRecentWriter">{dict.recentWriter}</div>
                <div className="OneDictCardDetailInfoModifiedAt">(최근 작성자) {modifiedAt}</div>
              </div>
            </div>
          </div>
          <div className="OneDictCardDetailInfoModifiedGuideText">다른 유저들이 이전에 작성한 내용을 확인하거나 직접 편집 할 수 있어요!</div>
          <div className="OneDictCardDetailInfoModifiedAndHistoryButton">
            <div className="OneDictCardDetailInfoModifiedHistoryButton" onClick={() => history.push(`/dict/history/${dictId}`)}>
              <div className="OneDictCardDetailInfoModifiedHistoryButton_1">편집 기록</div>
              <div className="OneDictCardDetailInfoModifiedHistoryButton_2"></div>
            </div>
            <div
              className="OneDictCardDetailInfoModifiedButton"
              onClick={() => {
                history.push(`/dict/edit/${dictId}`)
              }}
            >
              <div className="OneDictCardDetailInfoModifiedButton_1">편집하기</div>
              <div className="OneDictCardDetailInfoModifiedButton_2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SearchBarSection = styled.div`
  position: absolute;
  top: 74px;
  width: 100%;
  height: fit-content;
  z-index: 5;
`

export default DictDetail
