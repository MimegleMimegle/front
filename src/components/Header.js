import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as mypageActions } from '../redux/modules/mypage'

import Grid from '../elements/Grid'
import ProfileBottom from './ProfileBottom'
import AlarmModal from './modal/AlarmModal'
import AlertModal from './modal/AlertModal'
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
  const [showAlert, setShowAlert] = useState(false)

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }

  const handleShowAlarm = () => {
    if (isLogin) {
      setShowAlarm(!showAlarm)
    } else {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
    }
  }

  useEffect(() => {
    if (profile === null) {
      dispatch(mypageActions.getUserProfileDB())
    }
  }, [])

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
              {showAlarm ? <FaBell className="header-bell shown" /> : <FaRegBell className="header-bell hidden" />}
            </div>
            {isLogin ? <ProfileImage src={profile?.profileImage} onClick={handleShowProfile} /> : <ProfileImage src={MemegleIcon} onClick={() => history.push('/login')} />}
          </div>
        </Grid>
      </NavHeader>
      <ProfileBottom profile={profile} showProfile={showProfile} setShowProfile={setShowProfile} />
      <AlertModal showModal={showAlert}>로그인 후 이용하실 수 있습니다!</AlertModal>
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
  .header-empty {
    width: 80px;
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
        color: #333;
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

const ProfileImage = styled.div`
  margin: 0 0 0 8px;
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
`

export default Header
