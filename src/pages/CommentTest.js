import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import OneComment from '../components/OneComment'
import { MdOutlineSend } from 'react-icons/md'
import styled from '@emotion/styled'


const CommentTest = ({post}) => {
  const dispatch = useDispatch()
  // 추후 postId 수정해야 함! url 파라미터나 props로 정보 받아오기
  const boardId = post.boardId;
  const comment_list =post.commentList
  console.log(boardId)
  console.log(post.commentList);
  
  const now_profile = useSelector((state)=> state.user.profile)

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
        <img src={now_profile} alt="" style={{width:"40px", height:"40px", borderRadius:"150px" }}/>
        <input className="writebox" placeholder="댓글을 입력해주세요" type="text" value={comment} onChange={onChangeComment}></input>
        <MdOutlineSend size="23" onClick={addComment} style={{margin: "20px 30px 20px 0"}} />
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
  height: auto;
  padding: 0 5px;
  margin: 10px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;

  
  .writebox {
    border: none;
    width: 75%
    
  }
`

export default CommentTest
