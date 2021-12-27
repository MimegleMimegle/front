import React from 'react'
import '../../styles/css/DictWrite.css'

const DictWrite = (props) => {
  return (
    <>
      <div className="DictionaryCardWriteLayout">
        <div className="DictCardPreviewSection">
          <div className="DictionaryCardPreview WordCard1">
            <div className="DictCardPreviewTitle">단어 : 알잘딱깔센</div>
            <div className="DictCardPreviewSummary">요약 : 알아서 잘 딱 깔끔하고 센스있게</div>
          </div>
          <div className="DictionaryCardPreview WordCard2"></div>
        </div>
        <div className="DictCardInputSection">
          <p>단어</p> <input className="DictCardInputTitle" />
          <br></br>
          <p>요약</p>
          <textarea className="DictCardInputSummary" />
          <br></br>
          <p>설명</p>
          <textarea className="DictCardInputContent" />
          <br></br>
        </div>
        <button className="DictCardSubmitButton">단어 등록하기</button>
      </div>
    </>
  )
}

export default DictWrite
