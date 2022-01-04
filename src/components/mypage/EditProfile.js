import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { userApi } from '../../shared/api'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'

import ModalWrapper from '../../components/ModalWrapper'

import { IoCloseOutline } from 'react-icons/io5'
import { MdPhotoCamera } from 'react-icons/md'

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
    const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/
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
    if (nickname !== '' && isNickname && isNicknameChecked) {
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
            <div style={{ width: '100%', padding: '10px 14px 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={() => {
                  setShowModal(false)
                }}
              >
                <IoCloseOutline style={{ fontSize: '24px' }} />
              </button>
              <button className="submit-button" onClick={_editProfile}>
                완료
              </button>
            </div>
            <ProfileImagePreview src={imageFile ? imageFile : my.profileImageUrl} />
            <div className="file">
              <label for="file" className="upload-label">
                <MdPhotoCamera style={{ fontSize: '20px', marginTop: '4px' }} />
              </label>
              <input type="file" id="file" className="upload-file" ref={fileInput} onChange={handleChangeFile} accept="image/jpeg, image/jpg, image/png" />
            </div>
            <div style={{ padding: '20px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input type="text" className="input-nickname" onChange={handleChangeNickname} />
                <button onClick={checkNickname} style={{ marginLeft: '12px', fontSize: '9px', fontWeight: '700', textDecoration: 'underline' }}>
                  중복확인
                </button>
              </div>
              <div style={{ padding: '10px 0' }}>
                <p style={{ fontSize: '12px' }}>10자 이하로 입력해주세요.</p>
                <p style={{ fontSize: '12px', color: '#878C92' }}>(한글, 영어, 대소문자, 숫자 사용 가능)</p>
              </div>
            </div>
          </ModalBody>
        </ModalContainer>
      </ModalWrapper>
    </>
  )
}

const ModalContainer = styled.div`
  width: 330px;
  height: 170px;
  border: 1px solid #111;
  background-color: #fff;
  /* border-radius: 10px; */
  position: absolute;
  top: 26%;
  left: 50%;
  transform: translate(-50%, -26%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModalBody = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .submit-button {
    font-size: 14px;
    color: #878c92;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: #00a0ff;
    }
  }
  .file {
    .upload-label {
      display: inline-block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 15px;
      left: 60%;
      transform: translateX(-60%);
      overflow: hidden;
      border: 1px solid #111;
      border-radius: 20px;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
    }
    .upload-file {
      position: absolute;
      overflow: hidden;
      padding: 0;
      margin: -1px;
      width: 1px;
      height: 1px;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
  .input-nickname {
    border: 1px solid #878c92;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
    &:focus {
      border: 1px solid #111;
    }
  }
`

const ProfileImagePreview = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border: 1px solid #111;
  border-radius: 40px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: #fff;
`

export default EditProfile
