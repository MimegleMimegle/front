import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionCreators as commentActions } from '../redux/modules/comment'
import OneComment from '../components/OneComment'

const CommentTest = (props) => {
  const dispatch = useDispatch()
  const postId = 1

  const comment_list = useSelector((state) => state.comment.comment_list[postId])
  console.log(comment_list)

  const [comment, setComment] = React.useState('')

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const addComment = () => {
    dispatch(commentActions.addCommentDB(postId, comment))
  }

  React.useEffect(() => {
    dispatch(commentActions.getCommentsDB(postId))
  }, [dispatch])

  return (
    <>
      <div>
        <input type="text" value={comment} onChange={onChangeComment}></input>
        <button onClick={addComment}>댓글 등록</button>
      </div>
      {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} postId={postId} {...c} />
          })
        : null}
    </>
  )
}

export default CommentTest
