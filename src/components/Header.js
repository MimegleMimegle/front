import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as mypageAction } from '../redux/modules/mypage'

import Grid from '../elements/Grid'
import ProfileBottom from './ProfileBottom'
import AlarmModal from './modal/AlarmModal'
import MemegleIcon from '../styles/image/smileIcon_Yellow.png'
import { BsBell, BsBellFill } from 'react-icons/bs'

const Header = ({ type, children, location }) => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.mypage.myProfile)
  const userId = localStorage.getItem('id')
  const token = document.cookie.split('=')[2]
  const isLogin = userId !== null && token !== undefined ? true : false

  const documentRef = useRef(document)

  const [showProfile, setShowProfile] = useState(false)
  const [showAlarm, setShowAlarm] = useState(false)
  const [hide, setHide] = useState(false)
  const [pageY, setPageY] = useState(0)

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }

  const handleShowModal = () => {
    setShowAlarm(!showAlarm)
  }

  const throttle = (callback, waitTime) => {
    let timerId = null
    return (e) => {
      if (timerId) return
      timerId = setTimeout(() => {
        callback.call(this, e)
        timerId = null
      }, waitTime)
    }
  }

  const handleScroll = () => {
    const { pageYOffset } = window
    const deltaY = pageYOffset - pageY
    const hide = pageYOffset !== 0 && deltaY >= 0
    setHide(hide)
    setPageY(pageYOffset)
  }

  const throttleScroll = throttle(handleScroll, 50)

  useEffect(() => {
    if (profile === null) {
      dispatch(mypageAction.getUserProfileDB())
    }
  }, [])

  useEffect(() => {
    documentRef.current.addEventListener('scroll', throttleScroll)
    return () => documentRef.current.removeEventListener('scroll', throttleScroll)
  }, [pageY])

  if (type === 'main') {
    return (
      <>
        <NavHeader className={hide && 'hide'} ref={documentRef}>
          <Grid flex_between height="100%">
            <div className="header-title">Memegle</div>
            <Grid flex_end height="100%">
              <div className="header-bell-box" onClick={handleShowModal}>
                {showAlarm ? <BsBellFill className="header-bell shown" /> : <BsBell className="header-bell hidden" />}
              </div>
              {isLogin ? <ProfileImage src={profile?.profileImage} onClick={handleShowProfile} /> : <ProfileImage src={MemegleIcon} onClick={() => history.push('/login')} />}
            </Grid>
          </Grid>
        </NavHeader>
        <ProfileBottom profile={profile} showProfile={showProfile} setShowProfile={setShowProfile} />
        {showAlarm && (
          <AlarmModal
            onClose={() => {
              setShowAlarm(false)
            }}
          />
        )}
      </>
    )
  }

  return (
    <>
      <NavHeader className={hide && 'hide'} ref={documentRef}>
        <Grid flex_between height="100%">
          <div className="header-empty"></div>
          <div className="header-location">{location}</div>
          <div className="header-icon">
            <div className="header-bell-box" onClick={handleShowModal}>
              {showAlarm ? <BsBellFill className="header-bell shown" /> : <BsBell className="header-bell hidden" />}
            </div>
            {isLogin ? <ProfileImage src={profile?.profileImage} onClick={handleShowProfile} /> : <ProfileImage src={MemegleIcon} onClick={() => history.push('/login')} />}
          </div>
        </Grid>
      </NavHeader>

      <ProfileBottom profile={profile} showProfile={showProfile} setShowProfile={setShowProfile} />
      {showAlarm && (
        <AlarmModal
          onClose={() => {
            setShowAlarm(false)
          }}
        />
      )}
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
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom: ${(props) => (props.noBorder ? 'none' : '1px solid  #e5e5e5')};
  z-index: 1000;
  transition: 0.4s ease;
  &.hide {
    transform: translateY(-60px);
  }
  .header-title {
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    cursor: default;
  }
  .header-empty {
    width: 76px;
    height: 100%;
  }
  .header-location {
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xl};
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
      background-color: #eeeeee;
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
