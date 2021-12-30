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
      <div className="DictCardEditLayout">
        <div className="DictCardEditPreviewSection">
          <div className="DictCardEditPreview">
            <div className="DictCardEditPreviewTitle">단어 : {dict.title}</div>
            <div className="DictCardEditPreviewSummary">요약 : {dict.summary}</div>
            <div className="DictCardEditPreviewContent">설명 : {dict.meaning}</div>
          </div>
        </div>
        <div className="DictCardEditInputSection">
          <p>한줄 요약</p>
          <input className="DictCardEditInputSummary" type="text" value={summary} onChange={onChangeSummary} placeholder="한줄 요약을 입력하세요" />
          <br></br>
          <p>설명</p>
          <input className="DictCardEditInputContent" type="text" value={content} onChange={onChangeContent} placeholder="설명을 입력하세요" />
          <br></br>
        </div>
        <div className="DictCardEditSubmitSection">
          <button className="DictCardEditSubmitButton1" type="submit" onClick={editDict}>
            단어 수정하기
          </button>
          <button className="DictCardEditSubmitButton2"></button>
        </div>
      </div>
    </>
  )
}

export default DictEdit
