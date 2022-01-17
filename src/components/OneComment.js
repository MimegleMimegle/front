import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { history } from '../redux/ConfigureStore'
import { dictQuestionApi } from '../shared/api'
import ConfirmModal from '../components/modal/ConfirmModal'
import { ReactComponent as DustBinIcon } from '../styles/icons/delete_black_18dp.svg'
import { BiBadge, BiBadgeCheck } from 'react-icons/bi'
import Grid from '../elements/Grid'

const OneComment = (props) => {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  const questionUser=props.username //질문작성자
  const commentWriterId = props.commentWriterId 
  const questionId = props.questionId 
  const commentId = props.commentId 
  const createdAt = props.createdAt.split('T')[0] + ' ' + props.createdAt.split('T')[1].split(':')[0] + ':' + props.createdAt.split('T')[1].split(':')[1]

  console.log(props)
  console.log(questionUser,username,commentWriterId)

  const [isSelected, setIsSelected] = React.useState(props.isSelected)
  const [selectModal, setSelectModal] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)

  const handleClickIsSelected = async (e) => {
    if(props.isSelected === true){
      console.log('이미 채택된 질문입니다.')
    } else if(username === commentWriterId) {
      console.log('질문작성자는 자신의 답변을 채택할 수 없습니다.')
    } else if (!isSelected || username!==props.commentwriterId) {
      await dictQuestionApi 
        .selectQuestion(commentId)
        .then((response) => {
          console.log(response.data)
          setIsSelected(true)
          console.log(isSelected)
          setSelectModal(false)
        })
        .catch((error) => {
          console.log('질문채택 문제 발생', error.response)
          console.log(error.message)
        })
    } 
  }
  
  const handleSelectModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectModal(!selectModal)
  }

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const delComment = () => {
    dispatch(commentActions.delCommentDB(questionId, commentId))
    setShowModal(false)
  }

  return (
    <>
      <Wrap>
        <div style={{ display: 'flex' }}>
          <Commentprofile src={props.profileImageUrl} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', margin: '0 0 0 16px' }}>
            <Grid flex_align>
              <UserName>{props.commentWriter}</UserName>
              <CreatedAt>{createdAt}</CreatedAt>
            </Grid>
            <Content>{props.commentContent}</Content>
          </div>
        </div>
          
          {isSelected? 
        <text style={{ height: '100%', cursor:"pointer"}}onClick={handleClickIsSelected}><BiBadgeCheck/>채택완료</text> :null}
          {!isSelected && username!== commentWriterId && username===questionUser?
        <text style={{ height: '100%', cursor:"pointer"}} onClick={handleSelectModal} >
            <BiBadge />채택하기
        </text>  : null}
        {selectModal && (
          <ConfirmModal question="채택 후 변경이 불가합니다. 이 답변을 채택하시겠습니까?" showModal={selectModal} handleShowModal={handleSelectModal} setShowModal={setSelectModal}>
            <DeleteButton onClick={handleClickIsSelected}>채택</DeleteButton>
          </ConfirmModal>
        )}

        {commentWriterId === username ? (
          <button style={{ height: '100%' }} onClick={handleShowModal}>
            <DustBinIcon />
          </button>
        ) : null}
        {showModal && (
          <ConfirmModal question="댓글을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
            <DeleteButton onClick={delComment}>삭제</DeleteButton>
          </ConfirmModal>
        )}
      </Wrap>
    </>
  )
}

const Wrap = styled.div`
  padding: 0 16px 16px;
  display: flex;
  justify-content: space-between;
`

const Commentprofile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 150px;
`

const UserName = styled.div`
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 0 10px 0 0;
`

const CreatedAt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
`
const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`
export default OneComment
