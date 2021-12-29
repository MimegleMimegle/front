import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { history } from '../redux/ConfigureStore'
import { actionCreators as mypageActions } from '../redux/modules/mypage'
import Sidebar from './Sidebar'

import { FiMenu } from 'react-icons/fi'

const Header = () => {
  const dispatch = useDispatch()

  const [showSidebar, setShowSidebar] = React.useState(false)
  const toggleMenu = () => {
    setShowSidebar(!showSidebar)
  }
  return (
    <>
      <NavHeader>
        <ul className="nav-list">
          <li>
            <button className="nav-item-menu" onClick={toggleMenu}>
              <FiMenu />
            </button>
          </li>
          <li style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Logo
              className="nav-item-logo"
              href="true"
              onClick={() => {
                history.push('/')
              }}
            >
              Logo
            </Logo>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </NavHeader>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </>
  )
}

const NavHeader = styled.nav`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 74px;
  background-color: #fff;
  border-bottom: 1px solid #767676;
  /* padding: 10px 0 12px; */
  z-index: 1000;
  .nav-list {
    height: 100%;
    margin: 0;
    padding-right: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .nav-item-menu {
      padding: 5px 10px 0;
      font-size: 20px;
    }
    .nav-item-logo {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 1px solid #767676;
      border-radius: 20px;
      background-color: #d1d1d1;
      text-align: center;
      font-size: 20px;
    }
  }
`

const Logo = styled.a`
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
    color: #111;
  }
`

export default Header
