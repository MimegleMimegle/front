import React, { useState, createRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { actionCreators as QuestionActions } from '../../redux/modules/dictquestion'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { dictQuestionApi } from '../../shared/api'
import '../../components/Header'

const PostEdit = (props) => {
  const dispatch = useDispatch()
  const username = localStorage.getItem('username')
  const questionId = Number(props.match.params.questionId)

  const textRef = createRef()
  const fileInput = React.useRef('')

  const [post, setPost] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbNail, setThumbNail] = useState('')


  const getOneQuestionDB = async () => {
    await dictQuestionApi
      .getOneQuestion(questionId)
      .then((response) => {
        const _question = response.data.data
        setPost(response.data.data)
        setTitle(_question.title)
        setContent(_question.content)
        setThumbNail(_question.thumbNail)
      })
      .catch((error) => {
        console.log('게시글 상세 조회 문제 발생', error.response)
      })
  }

  React.useEffect(() => {
    getOneQuestionDB()
  }, [])

  const handleTextareaResize = () => {
    const obj = textRef.current
    obj.style.height = 'auto'
    obj.style.height = obj.scrollHeight + 'px'
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
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

  const editQuestion = () => {
    if (title === '' || content === '') {
      window.alert('게시물을 모두 작성해주세요')
      return
    }
    if (fileInput.current.files.length === 0) {
      const uploadFile = post.thumbNail
      dispatch(QuestionActions.editQuestionDB(questionId, title, uploadFile, content))
    } else {
      const uploadFile = fileInput.current.files[0]
      dispatch(QuestionActions.editQuestionDB(questionId, title, uploadFile, content))
    }
  }

  return (
    <>
      <>
        {/* <Header type="PostEdit" location="밈+글 수정하기"></Header> */}
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
            <button className="postbtn btn-1" onClick={editQuestion}>
              수정
            </button>
            <div className="postbtn btn-2"></div>
          </PWFooter>
        </Container>
      </>
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
    font-family: 'Pretendard-Medium';
    word-spacing: 1;

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
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.black};
    overflow-y: hidden;
    word-spacing: 1;

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
  .hashWrap {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.base};
    display: flex;
    flex-wrap: wrap;
    letter-spacing: -0.5px;

    .hashWrapOutter,
    .originHashWrapOutter {
      display: flex;
      flex-wrap: wrap;
      padding: 5px 0;
    }

    .hashWrapInner,
    .originHashWrapInner {
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
        color: ${({ theme }) => theme.colors.grey};
      }
    }
  }
  .originHashWrap {
    padding: 0 16px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }
  .newHashWrap {
    padding: 10px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
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
      top: 4px;
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

export default PostEdit
