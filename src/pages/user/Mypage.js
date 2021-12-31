import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { actionCreators as mypageActions } from '../../redux/modules/mypage'

import '../../styles/css/Mypage.css'

import EditProfile from '../../components/mypage/EditProfile'
import PostCard from '../../components/PostCard'
import MyPageOneImageCard from '../../components/image/MypageOneImageCard'

import { AiOutlineEdit } from 'react-icons/ai'

const Mypage = (props) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = React.useState(false)
  const [showDictionary, setShowDictionary] = React.useState(true)
  const [showBoard, setShowBoard] = React.useState(false)
  const [showImage, setShowImage] = React.useState(false)

  const my = useSelector((state) => state.mypage.myPageData)
  const myMemeDictList = my && my.dict
  const myMemePostList = my && my.postBoards.filter((post) => post.category === 'FREEBOARD')
  const myMemeImageList = my && my.postBoards.filter((post) => post.category === 'IMAGEBOARD')

  const openEditProfile = () => {
    setShowModal(true)
  }

  window.addEventListener('keyup', (e) => {
    if (showModal && e.key === 'Escape') {
      setShowModal(false)
    }
  })

  const handleShowDictionary = () => {
    setShowDictionary(true)
    setShowBoard(false)
    setShowImage(false)
  }
  const handleShowBoard = () => {
    setShowDictionary(false)
    setShowBoard(true)
    setShowImage(false)
  }
  const handleShowPhoto = () => {
    setShowDictionary(false)
    setShowBoard(false)
    setShowImage(true)
  }

  React.useEffect(() => {
    if (my == null) {
      dispatch(mypageActions.getUserInfoDB())
    }
  }, [])

  return (
    <Wrapper>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
        <UserProfile>
          <ProfileImage src={my && my.profileImageUrl} />
          <div className="profile-info box-1">
            <div style={{ padding: '50px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="user-nickname">{my && my.nickname}</div>
              <button onClick={openEditProfile}>
                <AiOutlineEdit fontSize="20px" />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="user-activity-info">
                <div className="user-activity-info-subject">단어장</div>
                <div className="user-activity-info-count">{my && my.dictCount}</div>
              </div>
              <div className="user-activity-info">
                <div className="user-activity-info-subject">게시글</div>
                <div className="user-activity-info-count">{my && my.postCount}</div>
              </div>
            </div>
          </div>
          <div className="profile-info box-2"></div>
        </UserProfile>

        <Filter>
          <button className={`filter-button ${showDictionary ? 'filter-button-active' : ''}`} onClick={handleShowDictionary}>
            단어장
          </button>
          <button className={`filter-button ${showBoard ? 'filter-button-active' : ''}`} onClick={handleShowBoard}>
            밈글
          </button>
          <button className={`filter-button ${showImage ? 'filter-button-active' : ''}`} onClick={handleShowPhoto}>
            짤방
          </button>
        </Filter>
        <UserActivity>
          {/* Dictionary */}
          {showDictionary && <div>내가 등록한 단어</div>}
          {/* Board */}
          {showBoard && myMemePostList.length > 0
            ? myMemePostList.map((post) => {
                return <PostCard key={post.boardId} post={post} />
              })
            : null}
          {/* Photo */}
          {showImage && (
            <MyImageList>
              <MyPageOneImageCard />
              <MyPageOneImageCard />
              <MyPageOneImageCard />
              <MyPageOneImageCard />
              <MyPageOneImageCard />
            </MyImageList>
          )}
        </UserActivity>
      </div>
      {showModal && <EditProfile setShowModal={setShowModal} my={my} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  max-height: 545px;
  height: 100%;
`

const UserProfile = styled.div`
  position: relative;
  max-width: 360px;
  max-height: 150px;
  width: 100%;
  height: 100%;
  margin: 50px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 360px;

  .profile-info {
    /* max-width: 310px; */
    width: 90%;
    max-height: 150px;
    height: 100%;
    border: 1px solid #111;
    position: absolute;

    .user-nickname {
      padding: 0 5px;
      font-size: 16px;
      font-weight: 700;
    }

    .user-activity-info {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .user-activity-info-subject {
        font-size: 16px;
      }
      .user-activity-info-count {
        font-size: 14px;
      }
    }
  }
  .box-1 {
    top: 0;
    left: 40%;
    transform: translateX(-40%);
    background-color: #fff;
    z-index: 500;
  }
  .box-2 {
    left: 60%;
    transform: translateX(-60%);
    top: 7px;
    background-color: #fff27b;
  }
`

const ProfileImage = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid #111;
  border-radius: 40px;
  top: -40px;
  left: 49%;
  transform: translateX(-49%);
  z-index: 999;
  /* background-color: #fff; */
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const Filter = styled.div`
  width: 100%;
  padding: 40px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #c4c4c4;

  .filter-button {
    font-size: 16px;
    padding: 0;
    border-bottom: 2px solid transparent;
  }
  .filter-button-active {
    transition: all 0.2s ease-in-out;
    border-bottom: 2px solid #c4c4c4;
  }
`

const UserActivity = styled.div`
  width: 100%;
  padding: 30px 0 0;
`

const MyImageList = styled.div`
  width: 100%;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

export default Mypage
