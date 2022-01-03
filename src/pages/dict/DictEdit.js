import React, { useState, useEffect } from 'react'
import '../../styles/css/DictEdit.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import swal from 'sweetalert'

const DictEdit = (props) => {
  const dispatch = useDispatch()

  const [dict, setDict] = useState([])

  const getDictListDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/dict/${dictId}`)
    console.log(response)
    setDict(response.data.data)
  }

  React.useEffect(() => {
    getDictListDB()
  }, [])

  const dictId = Number(props.match.params.dictId)
  const newRecentWriter = window.localStorage.getItem('nickname')

  console.log(dict)
  console.log(dictId)
  console.log(newRecentWriter)

  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')
  const [recentWriter, setRecentWriter] = React.useState('')

  const onChangeSummary = (e) => {
    setSummary(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }
  console.log(recentWriter)
  const editDict = () => {
    if (summary === '' || content === '') {
      swal('빈칸을 모두 입력해주세요!')
      return
    } else {
      setRecentWriter(newRecentWriter)
      swal({
        buttons: {
          cancel: false,
          confirm: true,
        },
      })
      dispatch(dictActions.editDictDB(dictId, summary, content, recentWriter))
    }
  }

  const allClearKeyword = () => {
    swal({
      title: '초기화를 하시면 작성하신 모든 내용이 사라집니다.',
      text: '그래도 초기화 하시겠습니까?',
      icon: 'warning',
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
      <div className="DictCardEditPageLayout">
        <div className="DictCardEditInputSection">
          <div className="DictCardEditInputTitleContainer">
            <div className="DictCardEditInputTitleGuideText">단어</div>
            <div className="DictCardEditInputTitle">{dict.title}</div>
          </div>
          <div className="DictCardEditInputSummaryContainer">
            <div className="DictCardEditInputSummaryGuideText">한줄설명</div>
            <textarea className="DictCardEditInputSummary" type="text" cols="40" rows="3" value={summary} onChange={onChangeSummary} placeholder={dict.summary}>
              {dict.summary}
            </textarea>
          </div>
          <div className="DictCardEditInputContentContainer">
            <div className="DictCardEditInputContentGuideText">부가설명</div>
            <textarea className="DictCardEditInputContent" type="text" cols="40" rows="5" value={content} onChange={onChangeContent} placeholder={dict.meaning}>
              {dict.meaning}
            </textarea>
          </div>
        </div>
        <div className="DictCardEditTemporaryOrSubmitButton">
          <div className="DictCardEditTemporaryButton" onClick={allClearKeyword}>
            <div className="DictCardEditTemporaryButton_1">삭제</div>
            <div className="DictCardEditTemporaryButton_2"></div>
          </div>
          <div className="DictCardEditSubmitButton" type="submit" onClick={editDict}>
            <div className="DictCardEditSubmitButton_1">편집</div>
            <div className="DictCardEditSubmitButton_2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DictEdit
