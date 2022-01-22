import React, { useState, useEffect } from 'react'
import '../../styles/css/DictEdit.css'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { dictApi } from '../../shared/api'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import swal from 'sweetalert'
import Header from '../../components/Header'
import ConfirmModal from '../../components/modal/ConfirmModal'

const DictEdit = (props) => {
  const dispatch = useDispatch()

  const [dict, setDict] = useState([])
  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')
  const [recentWriter, setRecentWriter] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)

  const handleShowModal = (e) => {
    setShowModal(!showModal)
  }

  const getDictListDB = async () => {
    let response = await dictApi.getDictDetail(dictId)

    const _dict = response.data.data
    setDict(_dict)
    setSummary(_dict.summary)
    setContent(_dict.meaning)
  }

  React.useEffect(() => {
    getDictListDB()
  }, [])

  const dictId = Number(props.match.params.dictId)
  const newRecentWriter = window.localStorage.getItem('nickname')

  const onChangeSummary = (e) => {
    setSummary(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const editDict = () => {
    dispatch(dictActions.editDictDB(dictId, summary, content))
  }

  const allClearKeyword = () => {
    swal({
      title: '초기화를 하시면 작성하신 모든 내용이 사라집니다.',
      text: '그래도 초기화 하시겠습니까?',
      buttons: true,
      dangerMode: true,
    }).then((allClearKeyword) => {
      if (allClearKeyword) {
        swal('작성하신 모든 내용이 초기화되었습니다.', {
          icon: 'success',
        })
        setSummary('')
        setContent('')
      } else {
        swal('초기화가 취소되었습니다.')
      }
    })
  }

  return (
    <>
      <Header type="goBack" location="오픈 밈사전" />
      <div className="DictCardEditPageLayout">
        <div className="DictCardEditInputSection">
          <div className="DictCardEditInputTitleContainer">
            <div className="DictCardEditInputTitleGuideText">
              단어<span className="highlight">*</span>
            </div>
            <div className="DictCardEditInputTitle">{dict.title}</div>
          </div>
          <div className="DictCardEditInputSummaryContainer">
            <div className="DictCardEditInputSummaryGuideText">
              한줄설명<span className="highlight">*</span>
            </div>
            <input
              className="DictCardEditInputSummary"
              type="text"
              cols="40"
              rows="3"
              maxlength="25"
              value={summary}
              onChange={onChangeSummary}
              placeholder="단어의 뜻을 25자 이내로 요약하여 입력해주세요"
            />
          </div>
          <div className="DictCardEditInputContentContainer">
            <div className="DictCardEditInputContentGuideText">부가설명</div>
            <textarea className="DictCardEditInputContent" type="text" cols="40" rows="10" value={content} onChange={onChangeContent} placeholder="추가적인 설명이나 예시를 작성해 주세요">
              {dict.meaning}
            </textarea>
          </div>
        </div>
      </div>
      <div className="DictCardEditTemporaryOrSubmitButton">
        {/* <div className="DictCardEditTemporaryButton" onClick={allClearKeyword}>
            <div className="DictCardEditTemporaryButton_1">초기화</div>
            <div className="DictCardEditTemporaryButton_2"></div>
          </div> */}
        <div className="DictCardEditSubmitButton" type="submit">
          <button className="DictCardEditSubmitButton_1" onClick={handleShowModal} disabled={!(summary !== '' && content !== '')}>
            편집
          </button>
          <div className="DictCardEditSubmitButton_2"></div>
        </div>
      </div>
      {showModal && (
        <ConfirmModal question="편집하신 단어를 게시하시겠어요?" showModal={showModal} setShowModal={setShowModal}>
          <EditDictButton onClick={editDict}>게시</EditDictButton>
        </ConfirmModal>
      )}
    </>
  )
}

const EditDictButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default DictEdit
