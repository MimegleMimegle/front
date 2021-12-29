import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { userApi } from '../../shared/api'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'
import { history } from '../../redux/ConfigureStore'

import '../../styles/css/Mypage.css'

import PostCard from '../../components/PostCard'
import ModalWrapper from '../../components/ModalWrapper'

import { AiOutlineEdit } from 'react-icons/ai'

const Mypage = ({ profileImgUrl }) => {
  const dispatch = useDispatch()

  const userId = localStorage.getItem('id')

  const fileInput = React.useRef('')

  const [showModal, setShowModal] = React.useState(false)
  const [imageFile, setImageFile] = React.useState(null)
  const [nickname, setNickname] = React.useState('')
  const [isNickname, setIsNickname] = React.useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = React.useState(false)

  const [showDictionary, setShowDictionary] = React.useState(true)
  const [showBoard, setShowBoard] = React.useState(false)
  const [showPhoto, setShowPhoto] = React.useState(false)

  const user_info = useSelector((state) => state.mypage.user_info)

  const editProfile = () => {
    setShowModal(true)
  }

  window.addEventListener('keyup', (e) => {
    if (showModal && e.key === 'Escape') {
      setShowModal(false)
    }
  })

  const handleChangeFile = (e) => {
    setImageFile(e.target.files)
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      const file = reader.result

      if (file) {
        let fileInfo = file.toString()
        setImageFile(fileInfo)
      }
    }
  }

  const handleChangeNickname = (e) => {
    const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
    const currentNickname = e.target.value
    setNickname(currentNickname)
    if (!nicknameRegExp.test(currentNickname)) {
      setIsNickname(false)
    } else {
      setIsNickname(true)
    }
  }

  const checkNickname = async () => {
    await userApi
      .checkNickname(nickname)
      .then((response) => {
        console.log(response.data)
        if (response.data.result === true) {
          window.alert('사용 가능한 닉네임입니다.')
          setIsNicknameChecked(true)
        } else {
          window.alert('사용 중인 닉네임입니다.')
          setIsNicknameChecked(false)
        }
      })
      .catch((error) => {
        console.log('닉네임을 중복확인하는 데 문제가 발생했습니다.', error.response)
      })
  }

  const _editProfile = async () => {
    if (imageFile) {
      const uploadFile = fileInput.current.files[0]
      dispatch(mypageActions.editProfileImageDB(userId, uploadFile))
    }
    if (nickname && isNickname && isNicknameChecked) {
      dispatch(mypageActions.editNicknameDB(userId, nickname))
    } else {
      window.alert('닉네임을 확인해주세요!')
    }
    setShowModal(false)
    setImageFile(null)
    setNickname('')
    setIsNickname(false)
    setIsNicknameChecked(false)
  }

  const handleShowDictionary = () => {
    setShowDictionary(true)
    setShowBoard(false)
    setShowPhoto(false)
  }
  const handleShowBoard = () => {
    setShowDictionary(false)
    setShowBoard(true)
    setShowPhoto(false)
  }
  const handleShowPhoto = () => {
    setShowDictionary(false)
    setShowBoard(false)
    setShowPhoto(true)
  }

  React.useEffect(() => {
    dispatch(mypageActions.getUserInfoDB())
  }, [dispatch, setShowDictionary, setShowBoard, setShowPhoto])

  return (
    <>
      <Wrapper>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
          <UserProfile>
            <ProfileImage src={profileImgUrl} />
            <div className="profile-info box-1">
              <div style={{ padding: '50px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="user-info">nickname</div>
                <button className="user-info" onClick={editProfile}>
                  <AiOutlineEdit />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="user-activity-info">
                  <div>단어장</div>
                  <div>35</div>
                </div>
                <div className="user-activity-info">
                  <div>게시글</div>
                  <div>2</div>
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
            <button className={`filter-button ${showPhoto ? 'filter-button-active' : ''}`} onClick={handleShowPhoto}>
              짤방
            </button>
          </Filter>
          <UserActivity>
            {/* Dictionary */}
            {showDictionary && <div>내가 등록한 단어</div>}
            {/* Board */}
            {showBoard && <div>내가 작성한 밈글</div>}
            {/* Photo */}
            {showPhoto && <div>내가 올린 짤</div>}
          </UserActivity>
        </div>
        {showModal && (
          <ModalWrapper visible={true}>
            <ModalContainer>
              <ModalBody>
                <div style={{ padding: '20px 0 10px' }}>
                  <ProfileImagePreview src={imageFile ? imageFile : profileImgUrl} />
                </div>
                <input type="file" ref={fileInput} onChange={handleChangeFile} accept="image/jpeg, image/jpg" />
                <div>
                  <input type="text" onChange={handleChangeNickname} />
                  <button onClick={checkNickname}>중복확인</button>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn cancel-btn"
                  onClick={() => {
                    setShowModal(false)
                  }}
                >
                  취소
                </button>
                <button className="btn upload-btn" onClick={_editProfile}>
                  프로필 변경
                </button>
              </ModalFooter>
            </ModalContainer>
          </ModalWrapper>
        )}
      </Wrapper>
      {/* <div className="MypageLayout">
        <div className="UserProfileBox">
          <div className="UserProfileImage" />
          <div className="userProfileNameTag">
            <text className="UserProfileName">Username</text>
            <div className="VerticalLine" />
            <text className="UserProfileAge">20대</text>
          </div>
          <div className="UserActivityInfo">
            <div className="UserMyDictTag">
              <text className="UserMyDict">단어</text>
              <text className="UserMyDictCount">5개</text>
            </div>
            <div className="UserMyPostTag">
              <text className="UserMyPost">게시물</text>
              <text className="UserMyPostCount">10개</text>
            </div>
            <div className="UserGetMyLikeTag">
              <text className="UserGetMyLike">좋아요</text>
              <text className="USerGetMyLikeCount">3개</text>
            </div>
          </div>
        </div>
        <div className="UserMyPostList">
          <div className="UserMyPostListButton1">전체</div>
          <div className="UserMyPostListButton2">최신순</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
      </div> */}
    </>
  )
}

Mypage.defaultProps = {
  profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdd3u5NqCQXagF3DlT5PqENDPrUx_Dy4BNF0l3v44cFnSOnrIU1JJXnCYtqovHd7lVY8&usqp=CAU',
}

const Wrapper = styled.div`
  padding: 0 20px;
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
    width: 98%;
    max-height: 150px;
    height: 100%;
    border: 1px solid #111;
    position: absolute;

    .user-info {
      padding: 0 5px;
      font-size: 18px;
    }

    .user-activity-info {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .box-1 {
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 999;
  }
  .box-2 {
    left: 7px;
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
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  /* background-color: #fff; */
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const Filter = styled.div`
  width: 100%;
  padding: 30px 0 10px;

  .filter-button {
    width: 56px;
    height: 28px;
    border: 1px solid #111;
    border-radius: 14px;
    font-size: 12px;
    margin-right: 13px;
  }
  .filter-button-active {
    background-color: #00a0ff;
  }
`

const UserActivity = styled.div`
  width: 100%;
`

const ModalContainer = styled.div`
  width: 70%;
  height: 300px;
  background-color: #fff;
  /* border-radius: 10px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModalBody = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProfileImagePreview = styled.div`
  width: 80px;
  height: 80px;
  /* border: 1px solid #111; */
  border-radius: 40px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const ModalFooter = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    height: 100%;
  }

  .cancel-btn {
    width: 35%;
    background-color: #e8e8e8;
  }
  .upload-btn {
    width: 65%;
    background-color: #faea59;
  }
`
export default Mypage
