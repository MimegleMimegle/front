import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { actionCreators as commentActions } from '../redux/modules/comment'

import ModalWrapper from './ModalWrapper'

const OneComment = (props) => {
  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = React.useState(false)

  const handleOpenModal = (e) => {
    setModalVisible(true)
  }
  const handleCloseModal = (e) => {
    setModalVisible(false)
  }

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
        <button onClick={handleOpenModal}>댓글 삭제</button>
      </div>
      {modalVisible && (
        <ModalWrapper visible={true} maskClosable={false} onClose={handleCloseModal}>
          <ModalDelComment>
            <div>
              <h4>댓글 삭제</h4>
              <p>댓글을 삭제하시겠습니까?</p>
              <div>
                <button>취소</button>
                <button>삭제</button>
              </div>
            </div>
          </ModalDelComment>
        </ModalWrapper>
      )}
    </>
  )
}

const ModalDelComment = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 120px;
  background-color: #fff;
  padding: 20px;
`

export default OneComment
