import React, { useRef, useState, createRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { actionCreators as questionActions } from '../../redux/modules/dictquestion'
import '../../components/Header'

const PostWrite = (props) => {
  const dispatch = useDispatch()

  const textRef = createRef()
  const fileInput = useRef('')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbNail, setThumbNail] = useState(null)


  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }


  const handleTextareaResize = () => {
    const obj = textRef.current
    obj.style.height = 'auto'
    obj.style.height = obj.scrollHeight + 'px'
  }

  const onChangeFile = (e) => {
    setThumbNail(e.target.files)
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      const file = reader.result

      if (file) {
        let fileInfo = file.toString()
        setThumbNail(fileInfo)
      }
    }
  }

  const addQuestion = () => {
    if (title === '' || content === '') {
      window.alert('제목 혹은 내용을 작성해주세요.')
      return
    }

    const uploadFile = thumbNail ? fileInput.current.files[0] : ''
    dispatch(questionActions.addQuestionDB(title, content, uploadFile))
  }

  return (
    <>
      {/* <Header type="PostWrite" location="밈+글 등록하기"></Header> */}
      <Container>
        <PWHeader>
          <input type="text" className="writetitle" placeholder="제목을 입력하세요" value={title} onChange={onChangeTitle} />
        </PWHeader>
        <PWBody>
          <textarea
            value={content}
            onChange={onChangeContent}
            className="writedesc"
            placeholder="내용을 입력하세요"
            ref={textRef}
            onKeyDown={handleTextareaResize}
            onKeyUp={handleTextareaResize}
          ></textarea>
          <Preview>
            <img src={thumbNail} className="thumbNail" alt=""/>
          </Preview>
          <UploadSection>
            <label htmlFor="file" className="upload-label">
              <MdOutlinePhotoSizeSelectActual size="25" />
            </label>
            <input type="file" id="file" className="upload-input" ref={fileInput} accept="image/jpeg, image/jpg" onChange={onChangeFile} />
          </UploadSection>
        </PWBody>
        <PWFooter>
          <button className="postbtn btn-1" onClick={addQuestion}>
            등록
          </button>
          <div className="postbtn btn-2"></div>
        </PWFooter>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 74px 0 0;
`

const PWHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  .writetitle {
    width: 100%;
    border: none;
    padding: 16px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.black};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

const PWBody = styled.div`
  display: flex;
  flex-direction: column;
  .plustfuction {
    margin: 0px 15px 10px 15px;
  }
  .writedesc {
    width: 100%;
    min-height: 10rem;
    border: none;
    padding: 16px;
    resize: none;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.black};
    overflow-y: hidden;
    line-height: 1.6;

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

const Preview = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .thumbNail {
    width: 100%;
    object-fit: cover;
  }
`

const UploadSection = styled.div`
  width: 100%;
  padding: 16px 16px 6px;
  .upload-label {
    height: 100%;
    cursor: pointer;
  }
  .upload-input {
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: -1px;
    width: 1px;
    height: 1px;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`

const HashDivWrap = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 10px 16px;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.5px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  .hashWrapOutter {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
  }

  .hashWrapInner {
    padding: 5px 7px 5px 0;
    height: 24px;
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 24px;
    cursor: pointer;
  }

  .hashInput {
    width: 100%;
    padding: 0;
    font-size: ${({ theme }) => theme.fontSizes.base};
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    min-width: 100%;
    border: none;
    &::placeholder {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`

const PWFooter = styled.div`
  position: relative;
  margin: 20px 0;

  .postbtn {
    position: absolute;
    width: 100px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
  .btn-1 {
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.blue};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    z-index: 100;
    transition-duration: 0.3s;
    &:active {
      margin-top: 4px;
      left: calc(50%);
      transform: translateX(calc(-50% + 4px));
    }
  }
  .btn-2 {
    top: 4px;
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
  }
`

export default PostWrite
