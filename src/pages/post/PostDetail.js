import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as questionActions } from '../../redux/modules/dictquestion'
import styled from 'styled-components'
import { dictQuestionApi } from '../../shared/api'
import ConfirmModal from '../../components/modal/ConfirmModal'
import CommentTest from '../CommentTest'
import '../../components/Header'
import { ReactComponent as ViewIcon } from '../../styles/icons/조회_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../../styles/icons/좋아요 비활성_18dp.svg'
import { ReactComponent as FullHeartIcon } from '../../styles/icons/좋아요 활성_18dp.svg'
import { ReactComponent as CommentIcon } from '../../styles/icons/댓글_18dp.svg'
import { IoCloseOutline } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'
import '../../index.css'

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  const questionId = Number(props.match.params.questionId)

  const [question, setQuestion] = useState([])
  const [isCuriousToo, setIsCuriousToo] = useState(false)
  const [curiousTooCnt, setCuriousTooCnt] = useState(0)
  const [toggleModalChang, setToggleModalChang] = useState(false)
  const [createdAt, setCreatedAt] = useState('')
  const [showModal, setShowModal] = React.useState(false)
  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const getOneQuestionDB = async () => {
    await dictQuestionApi
      .getOneQuestion(questionId)
      .then((response) => {
        setQuestion(response.data.data)
        setIsCuriousToo(response.data.data.isCuriousToo)
        setCuriousTooCnt(response.data.data.curiousTooCnt)
        setCreatedAt(response.data.data.createdAt.split('T')[0])
      })
      .catch((error) => {
        console.log('게시글 상세 정보 불러오기 문제 발생', error.response)
      })
  }

  const handleDeleteQuestion = () => {
    dispatch(questionActions.delPostDB(questionId))
  }

  useEffect(() => {
    getOneQuestionDB()
  }, [])

  const handleClickCuriousToo = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCuriousToo) {
      await dictQuestionApi 
        .curiousToo(questionId)
        .then((response) => {
          console.log(response.data)
          setIsCuriousToo(false)
          console.log(isCuriousToo)
          setCuriousTooCnt(curiousTooCnt - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await dictQuestionApi
        .curiousToo(questionId)
        .then((response) => {
          console.log(response.data)
          setIsCuriousToo(true)
          setCuriousTooCnt(curiousTooCnt + 1)
          console.log(isCuriousToo)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }

  const clickToggleModalChang = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModalChang(!toggleModalChang)
  }

  return (
    <>
      {/* <Header type="PostDetail" low></Header> */}
      <PostWrap>
        <Profile>
          <UserInfo>
            <UserProfile src={question.profileImageUrl} alt="" />
            <div className="userinfo">
              <Writer>{question.writer}</Writer>
              <div className="createdate">{question && createdAt}</div>
            </div>
          </UserInfo>
          {username === question.username ? (
            <button style={{ padding: '5px 5px 0' }} onClick={clickToggleModalChang}>
              <BsThreeDotsVertical size="18" />
            </button>
          ) : null}
          {toggleModalChang && (
            <ModalChang>
              <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button style={{ padding: '0', height: '100%' }} onClick={clickToggleModalChang}>
                  <IoCloseOutline style={{ fontSize: '18px' }} />
                </button>
              </div>
              <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button
                  style={{ fontSize: '12px', padding: '0' }}
                  onClick={() => {
                    history.push(`/post/edit/${questionId}`)
                  }}
                >
                  수정하기
                </button>
              </div>
              <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button onClick={handleShowModal} style={{ fontSize: '12px', padding: '0' }}>
                  삭제하기
                </button>
              </div>
            </ModalChang>
          )}
        </Profile>

        <Middle>
          <Title>{question.title}</Title>

          <Content>{question.content}</Content>
          <ImageBox>
            <ContentImg src={question ? question.thumbNail : null} alt="" />
          </ImageBox>
          {/* <HashTagHere>
            {post.hashTags &&
              post.hashTags.map((hashTag, index) => {
                return (
                  <pre className="one-hashtag" key={index}>
                    #{hashTag}
                  </pre>
                )
              })}
          </HashTagHere> */}
        </Middle>

        <ViewLikeComment>
          <div className="icon-box">
            <button className="icon-box__button no-pointer">
              <ViewIcon />
            </button>
            <span className="icon-box__text">{question.views}</span>
          </div>
          <div className="icon-box">
            <button className="icon-box__button" onClick={handleClickCuriousToo}>
              {isCuriousToo ? <FullHeartIcon /> : <EmptyHeartIcon />}
            </button>
            <span className="icon-box__text">{curiousTooCnt}</span>
          </div>
          <div className="icon-box">
            <button className="icon-box__button no-pointer">
              <CommentIcon />
            </button>
            <span className="icon-box__text">{question.commentCnt ? question.commentCnt : 0}</span>
          </div>
        </ViewLikeComment>
      </PostWrap>

      <CommentTest question={question} />
      {showModal && (
        <ConfirmModal question="밈글을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <DeleteButton onClick={handleDeleteQuestion}>삭제</DeleteButton>
        </ConfirmModal>
      )}
    </>
  )
}

const PostWrap = styled.div`
  padding: 78px 16px 0;
`

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  .createdate {
    font-size: 9px;
    line-height: 11px;
  }
`

const UserProfile = styled.img`
  border-radius: 150px;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e5e5;
  margin: 0 8px 0 0;
`
const Writer = styled.div`
  font-size: 12px;
  line-height: 16p;
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
`

const Middle = styled.div`
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;
  padding: 0 0 8px;
`

const Content = styled.div`
  font-size: 12px;
  line-height: 12px;
`

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`

const ContentImg = styled.img`
  width: 100%;
  object-fit: cover;
`

const HashTagHere = styled.div`
  display: flex;
  font-size: 12px;
  .one-hashtag {
    padding: 0 7px 0 0;
  }
`

const ViewLikeComment = styled.div`
  display: flex;
  align-items: center;
  .icon-box {
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
    .icon-box__button {
      padding: 5px 4px 0 0;
    }
    .no-pointer {
      cursor: default;
    }
    .icon-box__text {
      font-size: ${({ theme }) => theme.fontSizes.base};
      line-height: 27px;
    }
  }
`

const ModalChang = styled.div`
  position: absolute;
  top: 70px;
  right: 16px;
  width: auto;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default PostDetail