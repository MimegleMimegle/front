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
import AlertModal from '../../components/modal/AlertModal'

const DictWrite = (props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [doubleCheck, setDoubleCheck] = React.useState(null)
  const [checkedTitle, setCheckedTitle] = React.useState('')
  const [showInputAlert, setShowInputAlert] = React.useState(false)
  const [showDoubleCheckAlert, setShowDoubleCheckAlert] = React.useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (title === checkedTitle) {
      setShowModal(!showModal)
    } else {
      setShowDoubleCheckAlert(true)
      setTimeout(() => setShowDoubleCheckAlert(false), 2000)
    }
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
    dispatch(dictActions.addDictDB(title, summary, content), [])
    setShowModal(false)
  }

  const doubleCheckDict = async () => {
    const dictName = title
    // dispatch(dictActions.doubleCheckDictDB(dictName), [])
    if (title !== '') {
      dictApi
        .dobleCheckDict(dictName)
        .then((res) => {
          console.log(res.data.data.result)
          if (res.data.data.result === true) {
            setDoubleCheck(true)
            setCheckedTitle(title)
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
    } else {
      setShowInputAlert(true)
      setTimeout(() => setShowInputAlert(false), 2000)
    }
  }

  const handleMoveDictList = () => {
    history.push('/dict')
    setDoubleCheck(null)
  }

  return (
    <>
      <Header type="goBack" location="오픈 밈사전" />
      <div className="DictCardWritePageLayout">
        <div className="DictCardInputSection">
          <div className="DictCardInputTitleContainer">
            <div className="DictCardInputTitleGuideText">
              단어<span className="highlight">*</span>
            </div>{' '}
            <input
              className="DictCardInputTitle"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="등록할 단어를 입력해주세요"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  doubleCheckDict()
                }
              }}
            />
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
            <div className="DictCardInputSummaryGuideText">
              한줄설명<span className="highlight">*</span>
            </div>
            <input
              className="DictCardInputSummary"
              type="text"
              cols="40"
              rows="3"
              maxlength="25"
              value={summary}
              onChange={onChangeSummary}
              placeholder="단어의 뜻을 25자 이내로 요약하여 입력해주세요"
            />
          </div>
          <div className="DictCardInputContentContainer">
            <div className="DictCardInputContentGuideText">부가설명</div>
            <textarea className="DictCardInputContent" type="text" cols="40" rows="10" value={content} onChange={onChangeContent} placeholder="추가적인 설명이나 예시를 작성해 주세요" />
          </div>
        </div>
      </div>
      <div className="DictCardTemporaryOrSubmitButton">
        {/* <div className="DictCardTemporaryButton" onClick={allClearKeyword}>
            <div className="DictCardTemporaryButton_1">초기화</div>
            <div className="DictCardTemporaryButton_2"></div>
          </div> */}
        <div className="DictCardSubmitButton" type="submit">
          <button className="DictCardSubmitButton_1" onClick={handleShowModal} disabled={!(title !== '' && summary !== '' && content !== '')}>
            등록
          </button>
          <div className="DictCardSubmitButton_2"></div>
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
      <AlertModal showModal={showInputAlert}>먼저 단어를 입력해주세요!</AlertModal>
      <AlertModal showModal={showDoubleCheckAlert}>먼저 중복확인 버튼을 클릭해주세요!</AlertModal>
    </>
  )
}

export default DictWrite
