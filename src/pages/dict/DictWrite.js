import React from 'react'
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
        <text className="DictCardPreviewGuideText">예시</text>
        <div className="DictCardPreviewSection">
          <div className="DictionaryCardPreview WordCard1">
            <div className="DictCardPreviewTitle">단어 : 알잘딱깔센</div>
            <div className="DictCardPreviewSummary">요약 : 알아서 잘 딱 깔끔하고 센스있게</div>
          </div>
        </div>
        <div className="DictCardInputSection">
          <p>단어</p> <input className="DictCardInputTitle" type="text" value={title} onChange={onChangeTitle} placeholder="단어를 입력하세요" />
          <br></br>
          <p>한줄 요약</p>
          <input className="DictCardInputSummary" type="text" value={summary} onChange={onChangeSummary} placeholder="한줄 요약을 입력하세요" />
          <br></br>
          <p>TMI</p>
          <input className="DictCardInputContent" type="text" value={content} onChange={onChangeContent} placeholder="설명을 입력하세요" />
          <br></br>
        </div>
        <div className="DictCardSubmitSection">
          ㅗ
          <button className="DictCardSubmitButton1" type="submit" onClick={addDict}>
            단어 등록하기
          </button>
          <button className="DictCardSubmitButton2"></button>
        </div>
      </div>
    </>
  )
}

export default DictWrite
