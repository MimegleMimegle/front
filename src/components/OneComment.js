import React from 'react'

import { actionCreators as commentActions } from '../redux/modules/comment'

const OneComment = (props) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>{props.commentWriter}</p>
        <p>{props.commentContent}</p>
        <p>{props.createdAt}</p>
        <button>댓글 수정</button>
        <button>댓글 삭제</button>
      </div>
    </>
  )
}

export default OneComment
