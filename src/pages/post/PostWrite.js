import React, { useRef, useState, createRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { actionCreators as questionActions } from '../../redux/modules/dictquestion'
import { ReactComponent as ArrowBackIcon } from '../../styles/icons/arrow_back_ios_black_24dp.svg'
import { history } from '../../redux/ConfigureStore'

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
      <Header>
        <ArrowBackIcon className="arrow-back-icon" onClick={() => history.goBack()} />
        <h2 className="location">질문 수정하기</h2>
        <div className="empty"></div>
      </Header>
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
            <img src={thumbNail} className="thumbNail" alt="" />
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

const Header = styled.header`
  width: 100%;
  height: 56px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg};
  z-index: 1000;
  .arrow-back-icon {
    cursor: pointer;
    font-size: 20px;
  }
  .location {
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    cursor: default;
  }
  .empty {
    width: 24px;
    height: 100%;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 56px 0 0;
`

const PWHeader = styled.div`
  border-top: 1px solid #444;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  .writetitle {
    width: 100%;
    border: none;
    padding: 16px;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    word-spacing: 1;
    background-color: ${({ theme }) => theme.colors.bg};

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

const PWBody = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #444;
  .writedesc {
    width: 100%;
    /* min-height: 10rem; */
    border: none;
    padding: 16px;
    resize: none;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.black};
    overflow-y: hidden;
    word-spacing: 1;
    background-color: ${({ theme }) => theme.colors.bg};

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
