import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { history } from '../redux/ConfigureStore'

import ModalContainer from './ModalContainer'
import ModalWrapper from './ModalWrapper'
import { ReactComponent as DustBinIcon } from '../styles/icons/delete_black_18dp.svg'

const OneComment = (props) => {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  const commentWriterId = props.commentWriterId
  const commentId = props.commentId
  const createdAt = props.createdAt.split('T')[0] + ' ' + props.createdAt.split('T')[1].split(':')[0] + ':' + props.createdAt.split('T')[1].split(':')[1]

  console.log(commentId)

  const [modalDeleteVisible, setModalDeleteVisible] = React.useState(false)

  const handleOpenModalDelete = (e) => {
    setModalDeleteVisible(true)
  }
  const handleCloseModalDelete = (e) => {
    setModalDeleteVisible(false)
  }

  window.addEventListener('keyup', (e) => {
    if (modalDeleteVisible && e.key === 'Escape') {
      setModalDeleteVisible(false)
    }
  })

  /* 삭제는 되는데 리프레쉬해야만 반영됨 -> 삭제할 건지 확인하는 모달 생성 후 확인 버튼 누르면 dispatch & history.push로 댓글 페이지로 돌아가게 하기? */
  const delComment = (commentId) => {
    dispatch(commentActions.delCommentDB(commentId))
    setModalDeleteVisible(false)
    console.log(commentId)
  }

  return (
    <>
      <Wrap>
        <div style={{ display: 'flex' }}>
          <Commentprofile src={props.profileImageUrl} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', margin: '0 0 0 16px' }}>
            <div style={{ display: 'flex' }}>
              <UserName>{props.commentWriter}</UserName>
              <CreatedAt>{createdAt}</CreatedAt>
            </div>
            <Content>{props.commentContent}</Content>
          </div>
        </div>
        {commentWriterId === username ? (
          <button style={{ height: '100%' }} onClick={handleOpenModalDelete}>
            <DustBinIcon />
          </button>
        ) : null}
      </Wrap>
      {modalDeleteVisible && (
        <ModalWrapper visible={true} maskClosable={false}>
          <ModalContainer>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4>삭제</h4>
              <p style={{ padding: '10px 0 20px' }}>댓글을 삭제하시겠습니까?</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button onClick={handleCloseModalDelete}>취소</button>
                <button onClick={delComment}>삭제</button>
              </div>
            </div>
          </ModalContainer>
        </ModalWrapper>
      )}
    </>
  )
}

const Wrap = styled.div`
  padding: 0 16px 16px;
  display: flex;
  justify-content: space-between;
`

const Commentprofile = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 150px;
  border: 1px solid black;
`

const UserName = styled.div`
  font-size: 9px;
  padding: 0 8px 0 0;
`

const CreatedAt = styled.div`
  font-size: 9px;
`
const Content = styled.div`
  font-size: 12px;
`
export default OneComment
