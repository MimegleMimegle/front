import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import SidebarItem from './SidebarItem'

const Sidebar = ({ showSidebar }) => {
  const _pathname = useLocation().pathname
  const menus = [
    { name: '퀴즈', path: '/quiz' },
    { name: '용어 사전', path: '/dict' },
    { name: '커뮤니티', path: '/post' },
    { name: '로그인', path: '/login' },
    { name: '로그아웃', path: '/' },
    { name: '회원가입', path: '/join' },
  ]
  return (
    <>
      <Wrapper className={`${showSidebar ? 'open' : ''}`}>
        <div>프로필사진</div>
        <p>닉네임</p>
        <div>
          {/* 로그인 상태면 로그아웃 */}
          <button>로그인</button>
          <button>회원가입</button>
        </div>
        {menus.map((menu, index) => {
          return (
            <NavLink to={menu.path} key={index} className="menu-item">
              <SidebarItem menu={menu} isActive={_pathname === menu.path ? true : false} />
            </NavLink>
          )
        })}
        <div>
          {/* 로그인 상태면 로그아웃 */}
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 150px;
  height: calc(100% - 74px);
  position: absolute;
  top: 74px;
  left: -150px;
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
    -webkit-transform: translateX(150px);
    transform: translateX(150px);
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

export default Sidebar
