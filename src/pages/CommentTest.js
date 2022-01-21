import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { actionCreators as mypageActions } from '../redux/modules/mypage'
import OneComment from '../components/OneComment'
import { MdOutlineSend } from 'react-icons/md'
import styled from 'styled-components'
import MemegleLogo from '../styles/image/smileIcon_Yellow.png'
import { commentApi } from '../shared/api'
const CommentTest = ({ question }) => {
  const dispatch = useDispatch()
  // const questionId = question.questionId
  const comment_list = question.commentList
  const now_profile = useSelector((state) => state.mypage.myProfile)
  const [comment, setComment] = React.useState('')
  const userId = localStorage.getItem('id')
  const cookieList = document.cookie.split('=')
  const token = cookieList.length === 2 ? cookieList[1] : cookieList[2]
  const isLogin = userId !== null && token !== undefined ? true : false
  const commentId = question.commentId
  
  const onChangeComment = (e) => {
    setComment(e.target.value)
    console.log(e.target.value)
  }

  const addComment = () => {
    dispatch(commentActions.addCommentDB(question.questionId, comment))
    setComment('')
    console.log(question.questionId)
  }

  

  React.useEffect(() => {
    if (now_profile === null) {
      dispatch(mypageActions.getUserProfileDB())
    }
  }, [])

  return (
    <>
      <CommentWrite>
        <ImgInput>
          <img className="commentImg" src={isLogin ? now_profile && now_profile.profileImage : MemegleLogo} alt="" />
          <input
            className="writebox"
            placeholder="답변을 남겨주세요!"
            type="text"
            value={comment}
            onChange={onChangeComment}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addComment()
              }
            }}
          ></input>
        </ImgInput>
        <MdOutlineSend style={{ fontSize: '24px', cursor: 'pointer', width: 'fit-content' }} onClick={addComment} />
      </CommentWrite>
      {/* {comment_list.filter(v=>v.isSelected===true)} */}
      {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} questionId={question.questionId} {...c} username={question.username} selectedComment={question.selectedComment} />
          })
        : null}
      {/* {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} questionId={question.questionId} {...c} username={question.username} selectedComment={question.selectedComment} />
          })
        : null} */}
        <div style={{width:'100%', height:'63px'}}></div>
    </>
  )
}

const CommentWrite = styled.div`
  position : fixed;
  bottom : 0;
  width: 100%;
  padding: 20px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid black;
  background: #FCFCFC;
`
const ImgInput = styled.div`
  width: 100%;
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  align-items: center;

  .commentImg {
    width: 30px;
    height: 30px;
    border-radius: 150px;
    border: 2px solid black;
  }
  .writebox {
    border: none;
    font-size: 16px;
    padding:0 20px;    
    background-color: ${({ theme }) => theme.colors.bg};
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

export default CommentTest
