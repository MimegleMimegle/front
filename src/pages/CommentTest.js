import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import OneComment from '../components/OneComment'
import { MdOutlineSend } from 'react-icons/md'
import styled from '@emotion/styled'


const CommentTest = ({post}) => {
  const dispatch = useDispatch()
  const boardId = post.boardId;
  const comment_list =post.commentList
  console.log(boardId)
  console.log(post.commentList);
  
  const now_profile = useSelector((state)=> state.user.profile)
  console.log(now_profile)
  const [comment, setComment] = React.useState('')

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const addComment = () => {
    dispatch(commentActions.addCommentDB(boardId, comment))
    setComment('')
    window.location.reload()
  }

  React.useEffect(() => {
  }, [])

  return (
    <>
      <CommentWrite>
        <ImgInput>
        <img className="commentImg" src={now_profile} alt="" />
        <input className="writebox" placeholder="댓글을 입력해주세요" type="text" value={comment} onChange={onChangeComment}></input>
        </ImgInput>
        <MdOutlineSend size="23" onClick={addComment} style={{margin: "15px 21px"}} />
      </CommentWrite>
      {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} boardId={boardId} {...c} />
          })
        : null}
    </>
  )
};

const CommentWrite =styled.div`
  width:100%;
  height: 46px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;

  
`
const ImgInput = styled.div`
  display:flex;

  .commentImg{
    width:20px; 
    height:20px;
    border-radius:150px;
    margin: 12px 16px;
  }
  .writebox {
    border: none;
    font-size: 12px;
    padding: 0;
    width: 250px;
  }
`

export default CommentTest
