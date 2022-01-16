import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'
import '../../styles/css/Mypage.css'

import Masonry from 'react-masonry-css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import EditProfile from '../../components/mypage/EditProfile'
import PostCard from '../../components/PostCard'
import MyPageOneImageCard from '../../components/image/MypageOneImageCard'
import OneDictionaryCard from '../../components/OneDictionaryCard'
import { AiOutlineEdit } from 'react-icons/ai'
import Grid from '../../elements/Grid'

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

  const handleEditProfile = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(true)
  }

  window.addEventListener('keyup', (e) => {
    if (showModal && e.key === 'Escape') {
      setShowModal(false)
    }
  })

  const handleShowDictionary = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDictionary(true)
    setShowBoard(false)
    setShowImage(false)
  }
  const handleShowBoard = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDictionary(false)
    setShowBoard(true)
    setShowImage(false)
  }
  const handleShowPhoto = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDictionary(false)
    setShowBoard(false)
    setShowImage(true)
  }

  React.useEffect(() => {
    if (my == null) {
      dispatch(mypageActions.getMypageDataDB())
    }
  }, [])

  return (
    <>
      <Header type="MyPage" location="마이페이지"></Header>
      <Wrapper>
        <UserProfile>
          <ProfileImage src={my && my.profileImageUrl} />
          <div className="profile-info box-1">
            <div style={{ padding: '50px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="user-nickname">{my && my.nickname}</div>
              <button onClick={handleEditProfile}>
                <AiOutlineEdit fontSize="22px" />
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
          <Grid flex_center>
            <button className={`filter-button ${showDictionary ? 'filter-button-active' : ''}`} onClick={handleShowDictionary}>
              단어장
            </button>
          </Grid>
          <Grid flex_center>
            <button className={`filter-button ${showBoard ? 'filter-button-active' : ''}`} onClick={handleShowBoard}>
              밈글
            </button>
          </Grid>
          <Grid flex_center>
            <button className={`filter-button ${showImage ? 'filter-button-active' : ''}`} onClick={handleShowPhoto}>
              짤방
            </button>
          </Grid>
        </Filter>
        <UserActivity>
          {/* Dictionary */}
          {showDictionary && myMemeDictList !== null
            ? myMemeDictList.map((dict) => {
                return <OneDictionaryCard key={dict.dictId} dict={dict} />
              })
            : null}
          {/* Board */}
          {showBoard && myMemePostList.length > 0
            ? myMemePostList.map((question) => {
                return <PostCard key={question.boardId} question={question} />
              })
            : null}
          {/* Photo */}
          {showImage && (
            <MyImageList>
              <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {myMemeImageList.length > 0
                  ? myMemeImageList.map((image) => {
                      return <MyPageOneImageCard key={image.boardId} image={image} />
                    })
                  : null}
              </Masonry>
            </MyImageList>
          )}
        </UserActivity>
        {showModal && <EditProfile showModal={showModal} setShowModal={setShowModal} my={my} />}
      </Wrapper>
      <Footer />
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 60px 0 0;
`

const UserProfile = styled.div`
  position: relative;
  max-height: 160px;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  margin: 54px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 360px;

  .profile-info {
    width: calc(100% - 40px);
    max-height: 160px;
    height: 100%;
    border: 2px solid ${({ theme }) => theme.colors.black};
    position: absolute;

    .user-nickname {
      padding: 0 5px;
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: 700;
    }

    .user-activity-info {
      padding: 5px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .user-activity-info-subject {
        font-size: ${({ theme }) => theme.fontSizes.xl};
        font-family: 'YdestreetL';
        font-style: normal;
        font-weight: normal;
      }
      .user-activity-info-count {
        padding-top: 2px;
        font-size: ${({ theme }) => theme.fontSizes.lg};
      }
    }
  }
  .box-1 {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 500;
  }
  .box-2 {
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
    top: 4px;
    background-color: ${({ theme }) => theme.colors.yellow};
    border: none;
  }
`

const ProfileImage = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid ${({ theme }) => theme.colors.black};
  border-radius: 40px;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.white};
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const Filter = styled.div`
  width: 100%;
  padding: 32px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  .filter-button {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.grey};
    font-weight: 500;
    padding: 0 0 10px;
    border-bottom: 3px solid transparent;
  }
  .filter-button-active {
    transition: all 0.2s ease-in-out;
    border-bottom: 3px solid ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.black};
  }
`

const UserActivity = styled.div`
  width: 100%;
  padding: 24px 0 0;
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -16px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 16px; /* gutter size */
    background-clip: padding-box;
  }
`

const MyImageList = styled.div`
  width: 100%;
  padding: 0 16px 84px;
`

export default Mypage
