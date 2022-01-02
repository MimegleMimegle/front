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

  console.log(dict)
  console.log(dictId)

  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')

  const onChangeSummary = (e) => {
    setSummary(e.target.value)
  }

  console.log(summary)

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  console.log(content)

  const editDict = () => {
    if (summary === '' || content === '') {
      swal('빈칸을 모두 입력해주세요!')
      return
    }
    dispatch(dictActions.editDictDB(dictId, summary, content))
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
          <div className="DictCardEditTemporaryButton">
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
