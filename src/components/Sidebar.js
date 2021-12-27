import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { history } from '../redux/ConfigureStore'
import SidebarItem from './SidebarItem'

import { IoCloseOutline } from 'react-icons/io5'

const Sidebar = ({ showSidebar, setShowSidebar, profileImgUrl, nickname }) => {
  const dispatch = useDispatch()

  const moveToMypage = () => {
    history.push('/mypage')
    setShowSidebar(false)
  }

  const menus = [
    { name: '퀴즈', path: '/quiz' },
    { name: '용어 사전', path: '/dict' },
    { name: '커뮤니티', path: '/post' },
  ]
  return (
    <>
      <Wrapper className={`${showSidebar ? 'open' : ''}`}>
        <div style={{ width: '100%', padding: '48px 10px 16px 16px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProfileImage src={profileImgUrl} style={{ cursor: 'pointer' }} onClick={moveToMypage} />
            <p style={{ paddingLeft: '10px', cursor: 'pointer' }} onClick={moveToMypage}>
              {nickname}
            </p>
          </div>
          <button
            onClick={() => {
              setShowSidebar(false)
            }}
            style={{ height: '100%', padding: '0' }}
          >
            <IoCloseOutline style={{ fontSize: '30px', paddingTop: '4px' }} />
          </button>
        </div>
        {menus.map((menu, index) => {
          return <SidebarItem key={index} menu={menu} setShowSidebar={setShowSidebar} />
        })}
        <UserMenuBox>
          {/* 로그인 상태면 로그아웃 */}
          <UserMenu
            onClick={() => {
              history.push('/login')
            }}
          >
            로그인
          </UserMenu>
          <UserMenu
            onClick={() => {
              history.push('/join')
            }}
          >
            회원가입
          </UserMenu>
        </UserMenuBox>
        <UserMenuBox>
          <UserMenu>로그아웃</UserMenu>
        </UserMenuBox>
      </Wrapper>
    </>
  )
}

Sidebar.defaultProps = {
  profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdd3u5NqCQXagF3DlT5PqENDPrUx_Dy4BNF0l3v44cFnSOnrIU1JJXnCYtqovHd7lVY8&usqp=CAU',
  nickname: 'zubetcha',
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
