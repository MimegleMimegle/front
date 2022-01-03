import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionCreators as commentActions } from '../redux/modules/comment'

import OneComment from '../components/OneComment'

const CommentTest = ({post}) => {
  const dispatch = useDispatch()
  // 추후 postId 수정해야 함! url 파라미터나 props로 정보 받아오기
  const boardId = post.boardId;
  const comment_list =post.commentList
  console.log(boardId)
  console.log(post.commentList);

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
      <div>
        <input type="text" value={comment} onChange={onChangeComment}></input>
        <button onClick={addComment}>댓글 등록</button>
      </div>
      {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} boardId={boardId} {...c} />
          })
        : null}
    </>
  )
}

export default CommentTest
