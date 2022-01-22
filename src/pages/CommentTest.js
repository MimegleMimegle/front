import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { actionCreators as mypageActions } from '../redux/modules/mypage'
import OneComment from '../components/OneComment'
import { MdOutlineSend } from 'react-icons/md'
import { ReactComponent as SendIcon } from '../styles/icons/send.svg'
import styled from 'styled-components'
import MemegleLogo from '../styles/image/smileIcon_Yellow.png'
import { commentApi } from '../shared/api'
import { useHistory } from 'react-router'
import ConfirmModal from '../components/modal/ConfirmModal'


const CommentTest = ({ question }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const comment_list = question.commentList
  const now_profile = useSelector((state) => state.mypage.myProfile)
  const [comment, setComment] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)

  const userId = localStorage.getItem('id')
  const cookieList = document.cookie.split('=')
  const token = cookieList.length === 2 ? cookieList[1] : cookieList[2]
  const isLogin = userId !== null && token !== undefined ? true : false
  const commentId = question.commentId

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const addComment = () => {
    if(!isLogin){
      setShowModal(true)
    }else{
    dispatch(commentActions.addCommentDB(question.questionId, comment))
    setComment('')
    }
  }
  
  comment_list&&comment_list.sort((a,b)=>{
    if(a.isSelected && !b.isSelected){
      return -1;
    } else if (!a.isSelected && b.isSelected){
      return 1;
    } return 0;
  })
  

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
          <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용 가능합니다!" question="로그인 페이지로 이동하시겠어요?">
            <MoveLoginButton onClick={() => history.push('/login')}>이동</MoveLoginButton>
          </ConfirmModal>
        </ImgInput>
        <SendIcon style={{ cursor: 'pointer' }} onClick={addComment} />
      </CommentWrite>
      {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} questionId={question.questionId} {...c} username={question.username} selectedComment={question.selectedComment} />
          })
        : null}
      
        <div style={{width:'100%', height:'63px'}}></div>
    </>
  )
}

const CommentWrite = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid black;
  background: #fcfcfc;
`
const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
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
    padding: 0 20px;
    background-color: ${({ theme }) => theme.colors.bg};
    width: 100%;
    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

export default CommentTest
