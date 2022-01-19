import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/하트 비활성_24dp.svg'
import { ReactComponent as FullHeartIcon } from '../styles/icons/하트 활성_24dp.svg'
import { dictQuestionApi } from '../shared/api'
import ConfirmModal from '../components/modal/ConfirmModal'
import AlertModal from '../components/modal/AlertModal'
import { ReactComponent as DustBinIcon } from '../styles/icons/delete_black_18dp.svg'
import { BiBadge, BiBadgeCheck } from 'react-icons/bi'
import Grid from '../elements/Grid'
import { commentApi } from '../shared/api'

const OneComment = (props) => {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  const questionUser=props.username //질문작성자
  const commentWriterId = props.commentWriterId 
  const questionId = props.questionId 
  const commentId = props.commentId 
  const createdAt = props.createdAt.split('T')[0] + ' ' + props.createdAt.split('T')[1].split(':')[0] + ':' + props.createdAt.split('T')[1].split(':')[1]

  console.log(props)

  const [isLiked, setIsLiked] = React.useState(props.isLike)
  const [likeCount, setLikeCount] = React.useState(props.likeCount)
  const [isSelected, setIsSelected] = React.useState(props.isSelected)
  const [selectModal, setSelectModal] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [alreadySelectModal, setAlreadySelectModal] = React.useState(false)


  const handleCloseAlreadySelectModal = () => {
    setTimeout(()=> {
      setAlreadySelectModal(false)
    }, 1800)
  }

  const handleAlreadySelectModal = () => {
    setAlreadySelectModal(true)
    handleCloseAlreadySelectModal()
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await commentApi
        .likeComment(commentId)
        .then((response) => {
          setIsLiked(false)
          setLikeCount(likeCount - 1)
        })
        .catch((error) => {
          console.log('답변 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await commentApi
        .likeComment(commentId)
        .then((response) => {
          setIsLiked(true)
          setLikeCount(likeCount + 1)
        })
        .catch((error) => {
          console.log('답변 좋아요 문제 발생', error.response)
        })
    }
  }

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
            <UserName>{props.commentWriter}</UserName>
            <CreatedAt>{createdAt}</CreatedAt>
          </div>
        </div>
          
          {isSelected? 
        <text style={{ height: '100%', cursor:"pointer"}}onClick={handleClickIsSelected}><BiBadgeCheck/>채택완료</text> :null}
          {!isSelected && username!== commentWriterId && username===questionUser &&  props.selectedComment===0? 
        <text style={{ height: '100%', cursor:"pointer"}} onClick={handleSelectModal} >
            <BiBadge />채택하기
        </text>  : null}
        {selectModal && (
          <ConfirmModal question="채택 후 변경이 불가합니다. 이 답변을 채택하시겠습니까?" showModal={selectModal} handleShowModal={handleSelectModal} setShowModal={setSelectModal}>
            <DeleteButton onClick={handleClickIsSelected}>채택</DeleteButton>
          </ConfirmModal>
        )}
        {props.selectedComment!==commentId && commentWriterId === username? (
          <button style={{ height: '100%' }} onClick={handleShowModal}>
            <DustBinIcon />
          </button>
        ) : null}
        {alreadySelectModal && (
        <AlertModal showModal={alreadySelectModal}>
            답변 채택 후 변경할 수 없습니다.
        </AlertModal>
        )}
      </Wrap>
      <Content>{props.commentContent}</Content>
      <IconBox>
            {isLiked ? <FullHeartIcon fill="#333" onClick={handleClickLike} /> : <EmptyHeartIcon fill="#333" onClick={handleClickLike} />}
            <Number className="like-count">{likeCount}</Number>
      </IconBox>
      {showModal && (
          <ConfirmModal question="댓글을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
            <DeleteButton onClick={delComment}>삭제</DeleteButton>
          </ConfirmModal>
        )}
    </>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const Commentprofile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 150px;
  border: 2px solid black;
  margin: 20px 0 20px 20px
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
const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin:16px 0;
`
const Number = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: #333;
  margin: 0 9.5px 0 5px;
`

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`
export default OneComment
