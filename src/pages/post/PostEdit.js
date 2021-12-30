import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import ReactQuill from 'react-quill'
import { actionCreators as postActions } from '../../redux/modules/post'
import { actionCreators as imageActions } from '../../redux/modules/image'
import HashTag from '../../components/HashTag'
import swal from 'sweetalert'

const PostEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const username = window.localStorage.getItem('username')
  const post_list = useSelector((state)=> state.post.list)
  const post_id = props.match.params.boardId
  const is_edit= post_id? true: false

  const _post = is_edit? post_list.find((p)=>p.username === username) : null;

  useEffect(()=> {
    if(!_post){
      console.log('포스트 정보가 없어요!');
      history.goBack();

      return;
    }
    }, []); 



  const fileInput = React.useRef('')
  

  const [title, setTitle] = useState(_post.title)
  const [content, setContent] = useState(_post.content)
  const [thumbNail, setThumbNail] = useState(_post.thumbNail)
  const [hashTag, setHashTag] = useState(_post.thumbNail)
  const [hashTagList, setHashTagList] = useState([])


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
  console.log(title)
  console.log(content)
  console.log(hashTagList)

  
  // const editPost = (boardId) => {
  //   if (title === '' || content === '') {
  //     window.alert('제목 혹은 내용을 작성해주세요.')
  //     return
  //   }
  //   const uploadFile = thumbNail ? fileInput.current.files[0] : ''

  //   const editFormData = new FormData()

  //   const postData = [{
  //     title: title,
  //     content: content,
  //   }]

  //   editFormData.append('thumbNail', uploadFile)
  //   editFormData.append('boardUploadRequestDto', new Blob([JSON.stringify(postData)], { type: 'application/json' }))

  //   history.push(`/post/detail/${boardId}`)
  //   dispatch(postActions.editPostDB(boardId, {title:title, content:content}, editFormData))
  // }

  const editPost = () => {
    if (title == '' || content == '') {
      window.alert('게시물을 모두 작성해주세요')
      return
    } else {
      dispatch(postActions.editPostDB(post_id, hashTagList, title, content, ))
    }
  }



  return (
    <>
      <Container>
        <PWHeader>
          <input type="text" className="writetitle" placeholder="제목을 입력하세요" value={title} onChange={onChangeTitle}/>
        </PWHeader>
          <PWBody>
          <textarea value={content} onChange={onChangeContent} className="writedesc" placeholder="내용을 입력하세요."></textarea>
          <Preview src={thumbNail}></Preview>
          <input type="file" ref={fileInput} accept="image/jpeg, image/jpg" onChange={onChangeFile} />
          <HashDivWrap className="hashWrap">
            <div className="hashWrapOutter"></div>
            <input className="hashInput" type="text" placeholder="해시태그 입력" />
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
  margin: 10px 20px;
`

const PWHeader = styled.div`
  display: flex;

  .writectgr {
    width: 100px;
  }
  .writetitle {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    /* border-radius: 10px; */
    width: 200px;
  }
`

const PWBody = styled.div`
  margin: 10px 0px;
  .plustfuction {
    margin: 0px 15px 10px 15px;
  }
  .writedesc {
    width: 300px;
    height: 200px;
    border: 1px solid lightgray;
    border-radius: 10px;
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