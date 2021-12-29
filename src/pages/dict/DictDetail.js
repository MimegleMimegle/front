import React, { useState, useEffect } from 'react'
import '../../styles/css/DictDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as dictActions } from '../../redux/modules/dict'
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
    let response = await axios.get(`http://52.78.155.185/api/dict/${dictId}`)
    setIsLike(response.data.data.like)

    console.log(response.data.data.createdAt)
  }

  function formatDate(date) {
    return date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 ' + date.getHours() + '시 ' + date.getMinutes() + '분'
  }

  let response = axios.get(`http://52.78.155.185/api/dict/${dictId}`)

  return (
    <>
      <div className="OneDictCardDetailPageLayout">
        <div className="OneDictCardDetailInfoSection">
          <div className="OneDictCardDetailInfoTitle">단어 : {dict.title}</div>
          <div className="OneDictCardDetailInfoSummary">한줄 요약 : {dict.summary}</div>
          <div className="OneDictCardDetailInfoContent">설명 : {dict.meaning}</div>
          <div className="OneDictCardDetailInfoLikeAndWriter">
            <BiLike className="OneDictCardDetailInfoLike" onClick={likeDict} />
            <div className="OneDictCardDetailInfoLikeCnt">좋아요 : {dict.likeCount}개</div>
            <div className="OneDictCardDetailInfoFirstWriter">최초작성자 : {dict.firstWriter}</div>
          </div>
          <div className="OneDictCardDetailInfoCreatedAt">최초 등록된 날짜 : {dict.createdAt}</div>
          <div className="OneDictCardDetailInfoModifiedAt">최근 수정된 날짜 : {dict.modifiedAt}</div>
        </div>
      </div>
    </>
  )
}

export default DictDetail
