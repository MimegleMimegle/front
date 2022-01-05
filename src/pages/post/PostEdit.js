import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import ReactQuill from 'react-quill'
import { actionCreators as postActions } from '../../redux/modules/post'
import { actionCreators as imageActions } from '../../redux/modules/image'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'

import HashTag from '../../components/HashTag'
import swal from 'sweetalert'
import Header from '../../components/Header'
import axios from 'axios'

const PostEdit = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const username = localStorage.getItem('username')

  const [post, setPost] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [thumbNail, setThumbNail] = useState("")
  const [hashTag, setHashTag] = useState("")
  const [hashTagList, setHashTagList] = useState([])
  console.log(post)
  console.log(title)
  console.log(content)
  console.log(thumbNail)
  console.log(hashTagList)

  const getOnePostDB = async () => {
    
    let response = await axios.get(`http://54.180.150.230/api/board/${boardId}`)
    
    const _post = response.data.data
    setPost(response.data.data)
    setTitle(_post.title)
    setContent(_post.content)
    setThumbNail(_post.thumbNail)
    setHashTag(_post.hashTag)
    setHashTagList(_post.hashTags)

  }

  const boardId = Number(props.match.params.boardId)


  React.useEffect(() => {
    getOnePostDB()
  }, [])

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

      /* 태그를 클릭 이벤트 관련 로직 */
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
    if (title ==='' || content === '') {
      window.alert('게시물을 모두 작성해주세요')
      return
    } 
    const uploadFile = thumbNail ? fileInput.current.files[0] : ''
      dispatch(postActions.editPostDB(boardId,hashTagList, title, thumbNail, content))
    
  }


  const fileInput = React.useRef('')

  return (
    <>
      <Header type="PostEdit" location="밈+글 수정하기"></Header>
      <Container>
        <PWHeader>
          <input type="text" className="writetitle" placeholder="제목을 입력하세요" value={title} onChange={onChangeTitle} />
        </PWHeader>
        <PWBody>
          <textarea value={content} onChange={onChangeContent} className="writedesc" placeholder="내용을 입력하세요."></textarea>
          <Preview src={thumbNail}></Preview>
          <MdOutlinePhotoSizeSelectActual size="25" />
          <input type="file" ref={fileInput} accept="image/jpeg, image/jpg" onChange={onChangeFile} />
          <HashDivWrap className="hashWrap">
            <div className="hashWrapOutter"></div>
            <input className="hashInput" type="text" placeholder="해시태그를 입력해주세요 (#으로 구분, 최대5개)" value={hashTag} onChange={onChangeHashTag} onKeyUp={onKeyUp}/>
          </HashDivWrap>
        </PWBody>
        <PWFooter>
          <button className="postbtn" onClick={editPost}>
            수정하기
          </button>
        </PWFooter>
      </Container>
    </>
  )
}

const Container = styled.div`
`

const PWHeader = styled.div`
  border-bottom: 0.5px solid lightgray;

  .writetitle {
    width: 100%;
    border: none;
    font-size: 20px;
  }

  hr {
    color: #e5e5e5;
  }
`

const PWBody = styled.div`
  margin: 10px 0px;
  .plustfuction {
    margin: 0px 15px 10px 15px;
  }
  .writedesc {
    width: 100%;
    height: 200px;
    border: none;
  }
`

const PWFooter = styled.div`
  display: flex;
  justify-content: center;
  .postbtn {
    width: 100px;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
`

const Preview = styled.div`
  width: 80px;
  height: 80px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const HashDivWrap = styled.div`
  margin-top: 24px;
  color: rgb(52, 58, 64);
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border-bottom: 1.6px solid #767676;
  padding: 2px 2px 8px 2px;

  .hashWrapOutter {
    display: flex;
    flex-wrap: wrap;
  }

  .hashWrapInner {
    margin: 5px 5px 0 0;
    height: 24px;
    background: #fff27b;
    border-radius: 56px;
    padding: 5px 10px;
    color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
  }

  .hashInput {
    width: auto;
    margin: 10px;
    display: inline-flex;
    outline: none;
    cursor: text;
    line-height: 2rem;
    margin-bottom: 0.75rem;
    min-width: 8rem;
    border: none;
  }
`

export default PostEdit
