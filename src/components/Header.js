import React from 'react'
import styled from 'styled-components'

import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <NavHeader>
        <ul className="nav-list">
          <h2>Logo</h2>
          <li className="nav-item">
            <GiHamburgerMenu />
          </li>
        </ul>
      </NavHeader>
    </>
  )
}

const NavHeader = styled.nav`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 50px;
  background-color: #d1d1d1;
  padding: 10px 0 12px;
  z-index: 1000;

  .nav-list {
    height: 100%;
    margin: 0;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .nav-item {
      padding-top: 5px;
      font-size: 30px;
    }
  }
`

export default Header
