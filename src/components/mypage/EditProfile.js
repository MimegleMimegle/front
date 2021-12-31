import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { userApi } from '../../shared/api'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'

import ModalWrapper from '../../components/ModalWrapper'

const EditProfile = ({ setShowModal, my }) => {
  const dispatch = useDispatch()

  const userId = localStorage.getItem('id')

  const [imageFile, setImageFile] = React.useState(null)
  const [nickname, setNickname] = React.useState('')
  const [isNickname, setIsNickname] = React.useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = React.useState(false)

  const fileInput = React.useRef('')

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

  return (
    <>
      <ModalWrapper visible={true}>
        <ModalContainer>
          <ModalBody>
            <div>
              <ProfileImagePreview src={imageFile ? imageFile : my.profileImageUrl} />
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
    </>
  )
}

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

export default EditProfile
