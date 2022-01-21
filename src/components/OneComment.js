import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { dictQuestionApi } from '../shared/api'
import ConfirmModal from '../components/modal/ConfirmModal'
import AlertModal from '../components/modal/AlertModal'
import { ReactComponent as DustBinIcon } from '../styles/icons/delete_black_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/하트 비활성_24dp.svg'
import { ReactComponent as FullHeartIcon } from '../styles/icons/하트 활성_24dp.svg'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
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
          window.location.reload();

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
          <div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0 18px 8px' }}>
            <UserName>{props.commentWriter}</UserName>
            <CreatedAt>{createdAt}</CreatedAt>
          </div>
        </div>

        {props.selectedComment===commentId?
          <Select>
            <IoMdCheckmarkCircleOutline fill="#FFFFFF" size='27px'/>
            <SelectTextTure>채택</SelectTextTure>
          </Select> :
          questionUser!==username?
          <Select>
            <IoMdCheckmarkCircleOutline size='27px'/>
            <SelectText >채택</SelectText>
          </Select> :
          questionUser===commentWriterId?
          null:
          <Select onClick={handleSelectModal}>
        <IoMdCheckmarkCircleOutline size='27px'/>
        <SelectText>채택</SelectText>
        </Select>
        }

        {selectModal && (
          <ConfirmModal question="채택 후 변경이 불가합니다. 이 답변을 채택하시겠습니까?" showModal={selectModal} handleShowModal={handleSelectModal} setShowModal={setSelectModal}>
            <DeleteButton onClick={handleClickIsSelected}>채택</DeleteButton>
          </ConfirmModal>
        )}
        {alreadySelectModal && (
        <AlertModal showModal={alreadySelectModal}>
            답변 채택 후 변경할 수 없습니다.
        </AlertModal>
        )}
      </Wrap>
      <ContentWrap>
        <Content>{props.commentContent}</Content>
        <IconBox>
              <div style={{display:'flex'}}>
                {isLiked ? <FullHeartIcon height="20px" width="20px" fill="#333" onClick={handleClickLike} /> : <EmptyHeartIcon height="20px" width="20px" fill="#333" onClick={handleClickLike} />}
                <Number className="like-count">{likeCount}</Number>
              </div>  
              {props.selectedComment!==commentId && commentWriterId === username? (
                <button onClick={handleShowModal}>
                  <DustBinIcon height='20px' width='20px' />
                </button>
              ) : null}
        </IconBox>
        
        {showModal && (
            <ConfirmModal question="댓글을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
              <DeleteButton onClick={delComment}>삭제</DeleteButton>
            </ConfirmModal>
          )}
        </ContentWrap>
    </>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
`

const Commentprofile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 150px;
  border: 2px solid black;
  margin: 20px 0 20px 20px
`

const UserName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
`

const CreatedAt = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  margin: 6px 0 0;
`
const Select = styled.div`
  width: 80px;
  height: 83px;
  background: #00A0FF;
  padding: 11px 24px;
  cursor: pointer;
`
const SelectTextTure = styled.div`
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: white;
`

const SelectText =  styled.div`
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
`

const ContentWrap = styled.div`
  border-bottom: 10px solid #e5e5e5;
`

const Content = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  padding: 32px 20px 27px 20px;
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 22px 22px;
`
const Number = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;  
  color: #333;
  margin: 0 0 0 10px;
`

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`
export default OneComment
