import React from 'react'
import '../../styles/css/DictWrite.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import swal from 'sweetalert'

const DictEdit = (props) => {
  const dispatch = useDispatch()

  const dictList = useSelector((state) => state.dict.list)
  const dictId = Number(props.match.params.dictId)
  const is_edit = dictId ? true : false

  console.log(props)

  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')

  const onChangeSummary = (e) => {
    setSummary(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  const editDict = (dictId, summary, content) => {
    if (summary === '' || content === '') {
      swal('빈칸을 모두 입력해주세요!')
      return
    }
    dispatch(dictActions.editDictDB(dictId, summary, content), [])
  }

  return (
    <>
      <div className="DictCardEditLayout">
        <div className="DictCardEditPreviewSection">
          <div className="DictCardEditPreview">
            <div className="DictCardEditPreviewTitle">단어 : {dictId.title}</div>
            <div className="DictCardEditPreviewSummary">요약 : {dictId.summary}</div>
            <div className="DictCardEditPreviewContent">설명 : {dictId.content}</div>
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
