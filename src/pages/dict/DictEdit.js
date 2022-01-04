import React, { useState, useEffect } from 'react'
import '../../styles/css/DictEdit.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import swal from 'sweetalert'
import Header from '../../components/Header'

const DictEdit = (props) => {
  const dispatch = useDispatch()

  const [dict, setDict] = useState([])

  const getDictListDB = async () => {
    let response = await axios.get(`http://54.180.150.230/api/dict/${dictId}`)
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
    swal({
      title: '작성하신 내용을 게시하시겠어요?',
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((editDict) => {
      if (editDict) {
        setRecentWriter(newRecentWriter)
        dispatch(dictActions.editDictDB(dictId, summary, content, recentWriter))
        swal('밈 단어 편집이 완료되었습니다.', {
          icon: 'success',
        })
      } else if (summary === '' || content === '') {
        swal('변경사항이 없습니다.')
        return
      }
    })
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
      <Header type="DictEdit" location="오픈 밈사전"></Header>
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
            <div className="DictCardEditTemporaryButton_1">초기화</div>
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
