import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { history } from '../redux/ConfigureStore'
import SidebarItem from './SidebarItem'
import { actionCreators as userActions } from '../redux/modules/user'

import { IoCloseOutline } from 'react-icons/io5'

const Sidebar = ({ showSidebar, setShowSidebar, profileImgUrl }) => {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username')
  const nickname = localStorage.getItem('nickname')
  const isLogin = username && nickname ? true : false
  const is_login = useSelector((state) => state.user.is_login)
  console.log(isLogin, is_login)

  const moveToMypage = () => {
    history.push('/mypage')
    setShowSidebar(false)
  }

  const moveToLogin = () => {
    history.push('/login')
    setShowSidebar(false)
  }

  const moveToJoin = () => {
    history.push('/join')
    setShowSidebar(false)
  }

  const clickLogOut = () => {
    dispatch(userActions.logOutDB())
    setShowSidebar(false)
  }

  window.addEventListener('keyup', (e) => {
    if (showSidebar && e.key === 'Escape') {
      setShowSidebar(false)
    }
  })

  const menu_list = [
    { name: '퀴즈', path: '/quiz' },
    { name: '용어 사전', path: '/dict' },
    { name: '커뮤니티', path: '/post' },
    { name: '짤방', path: '/image' },
  ]
  return (
    <>
      <Wrapper className={`${showSidebar ? 'open' : ''}`}>
        <div style={{ width: '100%', padding: '32px 10px 0 16px' }}>
          <button
            onClick={() => {
              setShowSidebar(false)
            }}
            style={{ width: '100%', height: '100%', padding: '0', textAlign: 'right' }}
          >
            <IoCloseOutline style={{ fontSize: '30px', paddingTop: '4px' }} />
          </button>
        </div>

        <div style={{ width: '100%', padding: '16px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isLogin ? (
              <>
                <ProfileImage src={profileImgUrl} style={{ cursor: 'pointer' }} onClick={moveToMypage} />
                <p style={{ paddingLeft: '10px', cursor: 'pointer' }} onClick={moveToMypage}>
                  {nickname}
                </p>
              </>
            ) : (
              <>
                <ProfileImage src={profileImgUrl} style={{ cursor: 'pointer' }} onClick={moveToLogin} />
                <p style={{ paddingLeft: '10px', cursor: 'pointer' }} onClick={moveToLogin}>
                  로그인이 필요합니다.
                </p>
              </>
            )}
          </div>
        </div>

        {menu_list.map((menu, index) => {
          return <SidebarItem key={index} menu={menu} setShowSidebar={setShowSidebar} />
        })}
        <UserMenuBox>
          {isLogin ? (
            <UserMenu onClick={clickLogOut}>로그아웃</UserMenu>
          ) : (
            <>
              <UserMenu onClick={moveToLogin}>로그인</UserMenu>
              <UserMenu onClick={moveToJoin}>회원가입</UserMenu>
            </>
          )}
        </UserMenuBox>
      </Wrapper>
    </>
  )
}

Sidebar.defaultProps = {
  profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdd3u5NqCQXagF3DlT5PqENDPrUx_Dy4BNF0l3v44cFnSOnrIU1JJXnCYtqovHd7lVY8&usqp=CAU',
}

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -240px;
  z-index: 2000;
  background-color: #fff;
  border-right: 1px solid #767676;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  z-index: 2000;

  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;

  &.open {
    -webkit-transform: translateX(240px);
    transform: translateX(240px);
  }

  .menu-item {
    text-decoration: none;
    cursor: pointer;
    padding: 5px 0;

    &:visited,
    &:link,
    &:active {
      color: #111;
    }
  }
`

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #111;
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const UserMenuBox = styled.div`
  width: 100%;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UserMenu = styled.button`
  border: 1px solid #111;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 10px;
`

export default Sidebar
