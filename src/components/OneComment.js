import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actionCreators as commentActions } from '../redux/modules/comment'

const OneComment = (props) => {
  const dispatch = useDispatch()

  /* 삭제는 되는데 리프레쉬해야만 반영됨 -> 삭제할 건지 확인하는 모달 생성 후 확인 버튼 누르면 dispatch & history.push로 댓글 페이지로 돌아가게 하기? */
  const delComment = () => {
    dispatch(commentActions.delCommentDB(props.postId, props.commentId))
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{props.commentWriter}</p>
        <p>{props.commentContent}</p>
        <p>{props.createdAt}</p>
        <button>댓글 수정</button>
        <button onClick={delComment}>댓글 삭제</button>
      </div>
    </>
  )
}

export default OneComment
