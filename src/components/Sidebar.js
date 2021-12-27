import React from 'react'
import styled from 'styled-components'

import SidebarItem from './SidebarItem'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const menus = [
    { name: '퀴즈', path: '/quiz' },
    { name: '용어 사전', path: '/dict' },
    { name: '커뮤니티', path: '/post' },
  ]
  return (
    <>
      <Wrapper className={`${showSidebar ? 'open' : ''}`}>
        <div style={{ width: '100%', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>프로필사진</div>
          <p>닉네임</p>
          <button
            onClick={() => {
              setShowSidebar(false)
            }}
          >
            X
          </button>
        </div>
        {menus.map((menu, index) => {
          return <SidebarItem key={index} menu={menu} setShowSidebar={setShowSidebar} />
        })}
        <div>
          {/* 로그인 상태면 로그아웃 */}
          <button>로그인</button>
          <button>회원가입</button>
        </div>
        <div>
          <button>로그아웃</button>
        </div>
      </Wrapper>
    </>
  )
}

Sidebar.defaultProps = {}

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
  padding: 20px;
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

export default Sidebar
