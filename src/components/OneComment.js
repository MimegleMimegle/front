import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { history } from '../redux/ConfigureStore'
import { dictQuestionApi } from '../shared/api'
import ConfirmModal from '../components/modal/ConfirmModal'
import { ReactComponent as DustBinIcon } from '../styles/icons/delete_black_18dp.svg'
import {BiBadge, BiBadgeCheck} from "react-icons/bi"



const OneComment = (props) => {
  const dispatch = useDispatch()
  
  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  const questionUser=props.username //질문작성자
  const commentWriterId = props.commentWriterId
  const questionId = props.questionId
  const commentId = props.commentId
  const createdAt = props.createdAt.split('T')[0] + ' ' + props.createdAt.split('T')[1].split(':')[0] + ':' + props.createdAt.split('T')[1].split(':')[1]

  console.log(props)
  console.log(questionUser,username)

  const [isSelected, setIsSelected] = React.useState(false)
  const [showSelectModal, setShowSelectModal] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  

  const handleClickIsSelected = async (e) => {
    if (!isSelected) {
      await dictQuestionApi 
        .selectQuestion(commentId)
        .then((response) => {
          console.log(response.data)
          setIsSelected(true)
          console.log(isSelected)
          setShowSelectModal(false)

        })
        .catch((error) => {    
          console.log('질문채택 문제 발생', error.response)
        })
    } else {
      console.log('이미 채택된 질문입니다.')
    }
  }
  
  const handleShowSelectModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowSelectModal(!showSelectModal)
  }

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  /* 삭제는 되는데 리프레쉬해야만 반영됨 -> 삭제할 건지 확인하는 모달 생성 후 확인 버튼 누르면 dispatch & history.push로 댓글 페이지로 돌아가게 하기? */
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
            <div style={{ display: 'flex' }}>
              <UserName>{props.commentWriter}</UserName>
              <CreatedAt>{createdAt}</CreatedAt>
            </div>
            <Content>{props.commentContent}</Content>
          </div>
        </div>
        
        {isSelected?
        <text><BiBadgeCheck/>채택완료</text>:
        <text style={{ height: '100%', cursor:"pointer"}} onClick={handleClickIsSelected} >
            <BiBadge />채택하기
          </text> 
        }
        {showSelectModal && (
          <ConfirmModal question="채택 후 변경이 불가합니다. 이 답변을 채택하시겠습니까?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
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
  width: 20px;
  height: 20px;
  border-radius: 150px;
  border: 1px solid #E5E5E5;
`

const UserName = styled.div`
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 12px;
  padding: 0 8px 0 0;
  display: flex;
  align-items: center;
`

const CreatedAt = styled.div`
  font-size: 9px;
  line-height: 11px;
  display: flex;
  align-items: center;
  
`
const Content = styled.div`
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  
`;

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`
export default OneComment
