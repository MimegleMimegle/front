import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { actionCreators as commentActions } from '../redux/modules/comment'
import { history } from '../redux/ConfigureStore'
import { BsPersonPlus } from 'react-icons/bs'
import { VscTrash } from 'react-icons/vsc'

import ModalContainer from './ModalContainer'
import ModalWrapper from './ModalWrapper'

const OneComment = (props) => {

  const dispatch = useDispatch()

  const nickName = window.localStorage.getItem('nickname')
  const commentId = props.commentId

  const [modalEditVisible, setModalEditVisible] = React.useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = React.useState(false)

  const handleOpenModalEdit = (e) => {
    setModalEditVisible(true)
  }
  const handleCloseModalEdit = (e) => {
    setModalEditVisible(false)
  }

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
    if (modalEditVisible && e.key === 'Escape') {
      setModalEditVisible(false)
    }
  })

  /* 삭제는 되는데 리프레쉬해야만 반영됨 -> 삭제할 건지 확인하는 모달 생성 후 확인 버튼 누르면 dispatch & history.push로 댓글 페이지로 돌아가게 하기? */
  const delComment = () => {
    dispatch(commentActions.delCommentDB(commentId))
    setModalDeleteVisible(false)
    console.log(commentId)
  }

  return (
    <>
      <div style={{margin: "10px", display: 'flex', alignItems:"center" }}>
        <img className="commentprofile" src={props.profileImageUrl} alt="" style={{width:"40px", height:"40px",borderRadius:"150px"}}/>
        <div style={{margin:"6px 20px"}}>
          <div style={{display: "flex" }}>
            <p style={{margin:"0 12px 0 0",}}>{props.commentWriter}</p>
            <p>{props.createdAt}</p>
          </div>
          <p>{props.commentContent}</p>
        </div>
        {nickName === props.commentWriter? 
        <VscTrash size="20" onClick={handleOpenModalDelete}삭제/> : null }
      </div>
      {modalEditVisible && (
        <ModalWrapper>
          <ModalContainer></ModalContainer>
        </ModalWrapper>
      )}
      {modalDeleteVisible && (
        <ModalWrapper visible={true} maskClosable={false} >
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
};




export default OneComment
