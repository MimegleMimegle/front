import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { userApi } from '../../shared/api'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'
import { history } from '../../redux/ConfigureStore'

import '../../styles/css/Mypage.css'

import PostCard from '../../components/PostCard'
import MyPageOneImageCard from '../../components/image/MypageOneImageCard'
import ModalWrapper from '../../components/ModalWrapper'

import { AiOutlineEdit } from 'react-icons/ai'

const Mypage = (props) => {
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

  const user = useSelector((state) => state.mypage.user_info)
  console.log(user)

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
    if (user === null) {
      dispatch(mypageActions.getUserInfoDB())
    }
  }, [])

  return (
    <Wrapper>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
        <UserProfile>
          <ProfileImage src={user.profileImageUrl} />
          <div className="profile-info box-1">
            <div style={{ padding: '50px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="user-nickname">{user.nickname}</div>
              <button onClick={editProfile}>
                <AiOutlineEdit fontSize="20px" />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="user-activity-info">
                <div className="user-activity-info-subject">단어장</div>
                <div className="user-activity-info-count">{user.dictCount}</div>
              </div>
              <div className="user-activity-info">
                <div className="user-activity-info-subject">게시글</div>
                <div className="user-activity-info-count">{user.postCount}</div>
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
          {showBoard && user.postBoards
            ? user.postBoards.map((post) => {
                return (
                  <div key={post.postId}>
                    <PostCard post={post} />
                  </div>
                )
              })
            : null}
          {/* Photo */}
          {showPhoto && (
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
      {showModal && (
        <ModalWrapper visible={true}>
          <ModalContainer>
            <ModalBody>
              <div>
                <ProfileImagePreview src={imageFile ? imageFile : user.profileImageUrl} />
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
