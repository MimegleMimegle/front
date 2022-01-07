import React, { useState, useEffect, useRef, useCallback, TextareaHTMLAttributes } from 'react'
import '../../styles/css/DictWrite.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import swal from 'sweetalert'
import Header from '../../components/Header'
import { debounce } from 'lodash'
import axios from 'axios'
import { dictApi } from '../../shared/api'
import ConfirmModal from '../../components/modal/ConfirmModal'
import DoubleCheckModal from '../../components/modal/DoubleCheckModal'

const DictWrite = (props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [doubleCheck, setDoubleCheck] = React.useState(null)
  console.log(doubleCheck)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  console.log(title)
  console.log(summary)
  console.log(content)

  const onChangeSummary = async (e) => {
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
    setShowModal(false)
  }

  const doubleCheckDict = async () => {
    const dictName = title
    // dispatch(dictActions.doubleCheckDictDB(dictName), [])
    dictApi
      .dobleCheckDict(dictName)
      .then((res) => {
        console.log(res.data.data.result)
        if (res.data.data.result === true) {
          setDoubleCheck(true)
        } else if (res.data.data.result === false) {
          setDoubleCheck(false)
        }
      })
      .catch((err) => {
        if (err.res) {
          console.log(err.res.data)
          console.log(err.res.status)
          console.log(err.res.headers)
        }
      })
  }

  const handleMoveDictList = () => {
    history.push('/dict')
    setDoubleCheck(null)
  }

  // const allClearKeyword = () => {
  //   swal({
  //     title: '초기화를 하시면 작성하신 모든 내용이 사라집니다.',
  //     text: '그래도 초기화 하시겠습니까?',
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((allClearKeyword) => {
  //     if (allClearKeyword) {
  //       swal('작성하신 모든 내용이 초기화되었습니다.', {
  //         icon: 'success',
  //       })
  //       setTitle('')
  //       setSummary('')
  //       setContent('')
  //     } else {
  //       swal('초기화가 취소되었습니다.')
  //     }
  //   })
  // }

  return (
    <>
      <Header type="DictWrite" location="오픈 밈사전"></Header>
      <div className="DictCardWritePageLayout">
        <div className="DictCardInputSection">
          <div className="DictCardInputTitleContainer">
            <div className="DictCardInputTitleGuideText">단어</div> <input className="DictCardInputTitle" type="text" value={title} onChange={onChangeTitle} placeholder="등록할 단어를 입력해주세요" />
            <div
              className="DictCardInputTitleDoubleCheck"
              onClick={() => {
                doubleCheckDict()
              }}
            >
              중복확인
            </div>
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
          {/* <div className="DictCardTemporaryButton" onClick={allClearKeyword}>
            <div className="DictCardTemporaryButton_1">초기화</div>
            <div className="DictCardTemporaryButton_2"></div>
          </div> */}
          <div className="DictCardSubmitButton" type="submit" onClick={handleShowModal}>
            <div className="DictCardSubmitButton_1">저장</div>
            <div className="DictCardSubmitButton_2"></div>
          </div>
        </div>
      </div>
      {doubleCheck === null && null}
      {doubleCheck === true && (
        <DoubleCheckModal title="등록되지 않은 단어입니다." question="최초 등록자가 되어보세요!" doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <button className="DictWriteMoveButton" onClick={() => setDoubleCheck(null)}>
            확인
          </button>
        </DoubleCheckModal>
      )}
      {doubleCheck === false && (
        <DoubleCheckModal type="exist" title="이미 등록된 단어입니다." question="검색 화면으로 이동하시겠어요?" doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <button className="DictListMoveButton" onClick={handleMoveDictList}>
            이동
          </button>
        </DoubleCheckModal>
      )}
      {showModal && (
        <ConfirmModal question="작성하신 밈단어를 게시하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <button onClick={addDict}>게시</button>
        </ConfirmModal>
      )}
    </>
  )
}

export default DictWrite
