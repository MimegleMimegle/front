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

const DictDetail = (props) => {
  const dispatch = useDispatch()

  const [dict, setDict] = useState([])
  const [isLike, setIsLike] = React.useState(false)

  const getDictListDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/dict/${dictId}`)
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

  return (
    <>
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
            <BiLike className="OneDictCardDetailInfoLike" onClick={likeDict} />
            <div className="OneDictCardDetailInfoLikeCnt">{dict.likeCount}</div>
            <div className="OneDictCardDetailInfoCopyLinkButton">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
              </svg>
            </div>
          </div>
          <div className="OneDictCardDetailInfoWriterAndAt">
            <img className="OneDictCardDetailInfoFirstWriterProfileImage" src={dict.firstWriterProfileImage} />
            <div className="OneDictCardDetailInfoFirstWriterCreatedAt">
              <div className="OneDictCardDetailInfoFirstWriter">{dict.firstWriter}(최초 작성자)</div>
              <div className="OneDictCardDetailInfoCreatedAt">{dict.createdAt}</div>
            </div>
            <div className="OneDictCardDetailInfoWriterAndAtLine" />
            <img className="OneDictCardDetailInfoRecentWriterProfileImage" src={dict.recentWriterProfileImage} />
            <div className="OneDictCardDetailInfoRecentWriterModifiedAt">
              <div className="OneDictCardDetailInfoRecentWriter">{dict.recentWriter}(최근 작성자)</div>
              <div className="OneDictCardDetailInfoModifiedAt">{dict.modifiedAt}</div>
            </div>
          </div>
          <div className="OneDictCardDetailInfoModifiedGuideText">다른 유저들이 이전에 작성한 내용을 확인하거나 직접 편집 할 수 있어요!</div>
          <div className="OneDictCardDetailInfoModifiedButtonAndHistory">
            <div className="OneDictCardDetailInfoModifiedHistoryButton">
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
