import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as commentActions } from '../redux/modules/comment'
import { actionCreators as userActions } from '../redux/modules/user'
import OneComment from '../components/OneComment'
import { MdOutlineSend } from 'react-icons/md'
import styled from 'styled-components'

const CommentTest = ({ post }) => {
  const dispatch = useDispatch()
  const boardId = post.boardId
  const comment_list = post.commentList
  console.log(boardId)
  console.log(post.commentList)

  const now_profile = useSelector((state) => state.user.profile)
  console.log(now_profile)
  const [comment, setComment] = React.useState('')

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const addComment = () => {
    dispatch(commentActions.addCommentDB(boardId, comment))
    setComment('')
  }

  React.useEffect(() => {
    dispatch(userActions.getProfileInfoDB())
  }, [])

  return (
    <>
      <CommentWrite>
        <ImgInput>
          <img className="commentImg" src={now_profile && now_profile.profileImage} alt="" />
          <input className="writebox" placeholder="댓글을 입력해주세요" type="text" value={comment} onChange={onChangeComment}></input>
        </ImgInput>
        <MdOutlineSend style={{ fontSize: '18px', cursor: 'pointer' }} onClick={addComment} />
      </CommentWrite>
      {comment_list
        ? comment_list.map((c) => {
            return <OneComment key={c.commentId} boardId={boardId} {...c} />
          })
        : null}
    </>
  )
}

const CommentWrite = styled.div`
  width: 100%;
  padding: 16px;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`
const ImgInput = styled.div`
  display: flex;

  .commentImg {
    width: 20px;
    height: 20px;
    border-radius: 150px;
    margin: 0 16px 0 0;
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
  .writebox {
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: 0;
    width: 250px;
    &::placeholder {
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

export default CommentTest
