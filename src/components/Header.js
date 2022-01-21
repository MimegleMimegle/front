import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as mypageActions } from '../redux/modules/mypage'

import Grid from '../elements/Grid'
import ProfileBottom from './ProfileBottom'
import AlarmModal from './modal/AlarmModal'
import ConfirmModal from './modal/ConfirmModal'
import MemegleIcon from '../styles/image/smileIcon_Yellow.png'
import { FaRegBell, FaBell } from 'react-icons/fa'
import { ReactComponent as ArrowBackIcon } from '../styles/icons/arrow_back_ios_black_24dp.svg'

const Header = ({ children, location, type }) => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.mypage.myProfile)
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  // const cookieList = document.cookie.split('=')
  // const token = cookieList.length === 2 ? cookieList[1] : cookieList[2]
  const isLogin = userId !== null && token !== null ? true : false

  const [showProfile, setShowProfile] = useState(false)
  const [showAlarm, setShowAlarm] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }

  const handleShowAlarm = () => {
    if (isLogin) {
      setShowAlarm(!showAlarm)
    } else {
      setShowModal(true)
    }
  }

  useEffect(() => {
    if (profile === null) {
      dispatch(mypageActions.getUserProfileDB())
    }
  }, [handleShowAlarm, showAlarm])

  if (type === 'goBack') {
    return (
      <>
        <NavHeader>
          <Grid flex_between height="100%">
            <ArrowBackIcon className="arrow-back-icon" onClick={() => history.goBack()} />
            <div className="header-location">{location}</div>
            <div className="header-back-empty"></div>
          </Grid>
        </NavHeader>
      </>
    )
  }

  return (
    <>
      <NavHeader>
        <Grid flex_between height="100%">
          <div className="header-empty"></div>
          <div className="header-location">{location}</div>
          <div className="header-icon">
            <div className="header-bell-box" onClick={handleShowAlarm}>
              {showAlarm ? (
                <FaBell className="header-bell shown" />
              ) : profile && profile.alarm.length > 0 ? (
                <>
                  <UpdateCircle />
                  <FaRegBell className="header-bell hidden" />
                </>
              ) : (
                <FaRegBell className="header-bell hidden" />
              )}
            </div>
            {isLogin ? <ProfileImage src={profile?.profileImage} onClick={handleShowProfile} /> : <ProfileImage src={MemegleIcon} onClick={() => history.push('/login')} />}
          </div>
        </Grid>
      </NavHeader>
      <ProfileBottom profile={profile} showProfile={showProfile} setShowProfile={setShowProfile} />
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용 가능합니다!" question="로그인 페이지로 이동하시겠어요?">
        <MoveLoginButton onClick={() => history.push('/login')}>이동</MoveLoginButton>
      </ConfirmModal>
      {showAlarm && <AlarmModal showAlarm={showAlarm} setShowAlarm={setShowAlarm} profile={profile} />}
    </>
  )
}

const NavHeader = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  z-index: 1000;
  transition: 0.4s ease;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.08);
  .header-empty {
    width: 76px;
    height: 100%;
  }
  .header-location {
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    cursor: default;
  }
  .header-icon {
    display: flex;
    align-items: center;
  }
  .header-bell-box {
    width: 36px;
    height: 36px;
    border-radius: 20px;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #e9e9e9;
    }
    .header-bell {
      font-size: 20px;
      &.shown {
        color: ${({ theme }) => theme.colors.blue};
      }
      &.hidden {
        color: #000;
      }
    }
  }
  .arrow-back-icon {
    cursor: pointer;
  }
  .header-back-empty {
    width: 24px;
    height: 100%;
  }
`

const UpdateCircle = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  position: absolute;
  top: 8px;
  right: 8px;
`

const ProfileImage = styled.div`
  margin: 0 0 0 8px;
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
`
const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default Header
