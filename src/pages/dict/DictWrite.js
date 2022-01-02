import React, { useState, useEffect, useRef, TextareaHTMLAttributes } from 'react'
import '../../styles/css/DictWrite.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import swal from 'sweetalert'

const DictWrite = (props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeSummary = (e) => {
    setSummary(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const addDict = () => {
    if (title === '' || summary === '' || content === '') {
      swal('빈칸을 모두 입력해주세요!')
      return
    }
    dispatch(dictActions.addDictDB(title, summary, content), [])
  }

  return (
    <>
      <div className="DictCardWritePageLayout">
        <div className="DictCardInputSection">
          <div className="DictCardInputTitleContainer">
            <div className="DictCardInputTitleGuideText">단어</div> <input className="DictCardInputTitle" type="text" value={title} onChange={onChangeTitle} placeholder="등록할 단어를 입력해주세요" />
          </div>
          <div className="DictCardInputSummaryContainer">
            <div className="DictCardInputSummaryGuideText">한줄설명</div>
            <textarea className="DictCardInputSummary" type="text" cols="40" rows="3" value={summary} onChange={onChangeSummary} placeholder="단어의 뜻을 25자 이내로 요약하여 입력해주세요" />
          </div>
          <div className="DictCardInputContentContainer">
            <div className="DictCardInputContentGuideText">부가설명</div>
            <textarea className="DictCardInputContent" type="text" cols="40" rows="5" value={content} onChange={onChangeContent} placeholder="추가적인 설명이나 예시를 작성해 주세요" />
          </div>
        </div>
        <div className="DictCardTemporaryOrSubmitButton">
          <div className="DictCardTemporaryButton">
            <div className="DictCardTemporaryButton_1">삭제</div>
            <div className="DictCardTemporaryButton_2"></div>
          </div>
          <div className="DictCardSubmitButton" type="submit" onClick={addDict}>
            <div className="DictCardSubmitButton_1">저장</div>
            <div className="DictCardSubmitButton_2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DictWrite
