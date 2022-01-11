import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { userApi } from '../../shared/api'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'

import DoubleCheckModal from '../modal/DoubleCheckModal'
import Backdrop from '@mui/material/Backdrop'
import { IoCloseOutline } from 'react-icons/io5'
import { MdPhotoCamera } from 'react-icons/md'

const EditProfile = ({ showModal, setShowModal, my }) => {
  const dispatch = useDispatch()
  const userId = localStorage.getItem('id')

  const [imageFile, setImageFile] = useState(null)
  const [nickname, setNickname] = useState('')
  const [isNickname, setIsNickname] = useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [doubleCheck, setDoubleCheck] = useState(null)

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
        if (response.data.result === true) {
          setDoubleCheck(true)
          setIsNicknameChecked(true)
        } else if (response.data.result === false) {
          setDoubleCheck(false)
          setIsNicknameChecked(false)
        }
      })
      .catch((error) => {
        console.log('닉네임을 중복확인하는 데 문제가 발생했습니다.', error.response)
      })
  }

  // case 1. 닉네임만 수정한 경우
  // case 2. 프로필 이미지만 수정한 경우
  // case 3. 둘 다 수정한 경우

  const _editProfile = async () => {
    if (imageFile) {
      const uploadFile = fileInput.current.files[0]
      dispatch(mypageActions.editProfileImageDB(userId, uploadFile))
    }
    if (nickname !== '' && isNickname && isNicknameChecked) {
      dispatch(mypageActions.editNicknameDB(userId, nickname))
    }
    setShowModal(false)
    setImageFile(null)
    setNickname('')
    setIsNickname(false)
    setIsNicknameChecked(false)
  }

  window.addEventListener('keyup', (e) => {
    if (showModal && e.key === 'Escape') {
      setShowModal(false)
    }
  })

  return (
    <>
      <Backdrop open={showModal} sx={{ zIndex: '10000' }}>
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
              <label htmlFor="file" className="upload-label">
                <MdPhotoCamera style={{ fontSize: '20px', marginTop: '4px' }} />
              </label>
              <input type="file" id="file" className="upload-file" ref={fileInput} onChange={handleChangeFile} accept="image/jpeg, image/jpg, image/png" />
            </div>
            <div style={{ padding: '20px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                  type="text"
                  className="input-nickname"
                  onChange={handleChangeNickname}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      checkNickname()
                    }
                  }}
                />
                <DoubleCheckButton onClick={checkNickname}>중복확인</DoubleCheckButton>
              </div>
              <div style={{ padding: '10px 0' }}>
                <p style={{ fontSize: '12px' }}>10자 이하로 입력해주세요.</p>
                <p style={{ fontSize: '12px', color: '#878C92' }}>(한글, 영어, 대소문자, 숫자 사용 가능)</p>
              </div>
            </div>
          </ModalBody>
        </ModalContainer>
      </Backdrop>
      {doubleCheck === null && null}
      {doubleCheck === true && (
        <DoubleCheckModal title="사용 가능한 닉네임입니다." question="등록하러 가볼까요?" doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <ConfirmButton onClick={() => setDoubleCheck(null)}>확인</ConfirmButton>
        </DoubleCheckModal>
      )}
      {doubleCheck === false && (
        <DoubleCheckModal type="exist-onlyConfirm" title="이미 등록된 닉네임입니다." question="다른 닉네임으로 시도해 보세요!" doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <ConfirmButton onClick={() => setDoubleCheck(null)}>확인</ConfirmButton>
        </DoubleCheckModal>
      )}
    </>
  )
}

const ModalContainer = styled.div`
  width: 340px;
  height: 170px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
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
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.grey};
    transition: color 0.3s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
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
      border: 1px solid ${({ theme }) => theme.colors.black};
      border-radius: 20px;
      background-color: ${({ theme }) => theme.colors.white};
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
    border: 1px solid ${({ theme }) => theme.colors.grey};
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.black};
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
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 40px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white}; ;
`

const ConfirmButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

const DoubleCheckButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  margin: 0 0 0 12px;
  text-decoration: underline;
`

export default EditProfile
