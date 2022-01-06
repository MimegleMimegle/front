import React, { useState, useEffect } from 'react'
import '../../styles/css/DictDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import { actionCreators as likeActions } from '../../redux/modules/like'
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
  const [isLike, setIsLike] = React.useState(false)

  const getDictListDB = async () => {
    let response = await axios.get(`http://54.180.150.230/api/dict/${dictId}`)
    console.log(response)
    setDict(response.data.data)
  }

  React.useEffect(() => {
    getDictListDB()
  }, [])

  const dictId = Number(props.match.params.dictId)

  console.log(dict)
  console.log(dictId)

  const likeDict = async () => {
    await dispatch(likeActions.changeLikeDictDB(dictId))
    setIsLike()

    // console.log(response.data.data.like)
  }

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  // const pushDictHistory = (dictId) => (e) => {
  //   history.push(`/dict/history/${dictId}`)
  // }

  // let createdAt = dict.createdAt.split('T', 1)

  // let modifiedAt = dict.modifiedAt.split('T', 1)

  return (
    <>
      <Header type="DictDetail" location="오픈 밈사전">
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
      {show && <SearchPage />}
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
            <div className="OneDictCardDetailInfoLike" onClick={likeDict}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            </div>
            <div className="OneDictCardDetailInfoLikeCnt">{dict.likeCount}</div>
            <div className="OneDictCardDetailInfoCopyLinkButton">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
              </svg>
            </div>
          </div>
          <div className="OneDictCardDetailInfoWriterAndAt">
            <div className="OneDictCardDetailInfoWriterAndAt First">
              <img className="OneDictCardDetailInfoFirstWriterProfileImage" src={dict.firstWriterProfileImage} />
              <div className="OneDictCardDetailInfoFirstWriterCreatedAt">
                <div className="OneDictCardDetailInfoFirstWriter">{dict.firstWriter}</div>
                <div className="OneDictCardDetailInfoCreatedAt">(최초 작성자) {dict.createdAt}</div>
              </div>
            </div>
            <div className="OneDictCardDetailInfoWriterAndAt Recent">
              <img className="OneDictCardDetailInfoRecentWriterProfileImage" src={dict.recentWriterProfileImage} />
              <div className="OneDictCardDetailInfoRecentWriterModifiedAt">
                <div className="OneDictCardDetailInfoRecentWriter">{dict.recentWriter}</div>
                <div className="OneDictCardDetailInfoModifiedAt">(최근 작성자) {dict.modifiedAt}</div>
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

export default DictDetail
