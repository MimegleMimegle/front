import React, { useEffect, useRef, useState, createRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { actionCreators as postActions } from '../../redux/modules/post'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { boardApi } from '../../shared/api'

import Header from '../../components/Header'

const PostEdit = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const username = localStorage.getItem('username')
  const boardId = Number(props.match.params.boardId)

  const textRef = createRef()
  const fileInput = React.useRef('')

  const [post, setPost] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbNail, setThumbNail] = useState('')
  const [hashTag, setHashTag] = useState('')
  const [hashTagList, setHashTagList] = useState([])

  console.log(hashTagList)

  const getOnePostDB = async () => {
    await boardApi
      .getOnePost(boardId)
      .then((response) => {
        console.log(response.data)
        const _post = response.data.data
        setPost(response.data.data)
        setTitle(_post.title)
        setContent(_post.content)
        setThumbNail(_post.thumbNail)
        setHashTagList(_post.hashTags)
      })
      .catch((error) => {
        console.log('게시글 상세 조회 문제 발생', error.response)
      })
  }

  React.useEffect(() => {
    getOnePostDB()
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

  const onChangeHashTag = (e) => {
    setHashTag(e.target.value)
  }

  const onKeyUp = React.useCallback(
    (e) => {
      // if (process.browser) {
      /* 요소 불러오기, 만들기*/
      const $hashWrapOutter = document.querySelector('.hashWrapOutter')
      const $hashWrapInner = document.createElement('div')
      $hashWrapInner.className = 'hashWrapInner'

      const $originHashWrapOutter = document.querySelector('.originHashWrapOutter')
      const $originHashWrapInner = document.querySelector('.originHashWrapInner')

      /* 기존 태그 클릭 이벤트 관련 로직 */
      $originHashWrapInner.addEventListener('click', () => {
        $originHashWrapOutter?.removeChild($originHashWrapInner)
        console.log($originHashWrapInner.innerHTML)
        setHashTagList(hashTagList.filter((hashTag) => hashTag))
      })

      /* 새로운 태그 클릭 이벤트 관련 로직 */
      $hashWrapInner.addEventListener('click', () => {
        $hashWrapOutter?.removeChild($hashWrapInner)
        console.log($hashWrapInner.innerHTML)
        setHashTagList(hashTagList.filter((hashTag) => hashTag))
      })

      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
        console.log('Enter Key 입력됨!', e.target.value)
        $hashWrapInner.innerHTML = '#' + e.target.value
        $hashWrapOutter?.appendChild($hashWrapInner)
        setHashTagList((hashTagList) => [...hashTagList, hashTag])
        setHashTag('')
      }
    },
    // },
    [hashTag, hashTagList]
  )

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

  const editPost = () => {
    if (title === '' || content === '') {
      window.alert('게시물을 모두 작성해주세요')
      return
    }
    if (fileInput.current.files.length === 0) {
      const uploadFile = post.thumbNail
      dispatch(postActions.editPostDB(boardId, hashTagList, title, uploadFile, content))
    } else {
      const uploadFile = fileInput.current.files[0]
      dispatch(postActions.editPostDB(boardId, hashTagList, title, uploadFile, content))
    }
  }

  return (
    <>
      <>
        <Header type="PostEdit" location="밈+글 수정하기"></Header>
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
              <img src={thumbNail} className="thumbNail" />
            </Preview>
            <UploadSection>
              <label htmlFor="file" className="upload-label">
                <MdOutlinePhotoSizeSelectActual size="25" />
              </label>
              <input type="file" id="file" className="upload-input" ref={fileInput} accept="image/jpeg, image/jpg" onChange={onChangeFile} />
            </UploadSection>
            <HashTagInfo>
              <div>기존에 등록한 해시태그는 수정이 어렵습니다.</div>
            </HashTagInfo>
            <HashDivWrap className="hashWrap originHashWrap">
              {post.hashTags !== undefined &&
                post.hashTags.map((hashTag, idx) => {
                  return (
                    <div className="originHashWrapOutter" key={`hashTag-id-${idx}`}>
                      <div className="originHashWrapInner">#{hashTag}</div>
                    </div>
                  )
                })}
            </HashDivWrap>
            <HashDivWrap className="hashWrap newHashWrap">
              <div className="hashWrapOutter"></div>
              <input className="hashInput" type="text" placeholder="해시태그를 추가해주세요 (기존에 작성한 해시태그 포함 최대 5개)" value={hashTag} onChange={onChangeHashTag} onKeyUp={onKeyUp} />
            </HashDivWrap>
          </PWBody>
          <PWFooter>
            <button className="postbtn btn-1" onClick={editPost}>
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
  padding: 74px 0 40px;
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

const HashTagInfo = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 16px 16px 0;
  letter-spacing: -0.5px;
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

const HashDivWrap = styled.div``

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
