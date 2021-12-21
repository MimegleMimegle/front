import React from 'react'
import styled from 'styled-components'

import { IoSearch } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

const Footer = (props) => {
  return (
    <>
      <NavFooter>
        <ul className="nav-list">
          <li className="nav-item">
            <IoSearch />
          </li>
          <li className="nav-item">
            <AiOutlineHome />
          </li>
          <li className="nav-item">
            <CgProfile />
          </li>
        </ul>
      </NavFooter>
    </>
  )
}

const NavFooter = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  height: 72px;
  background-color: #d1d1d1;
  padding: 12px 0 10px;
  z-index: 1;

  .nav-list {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    .nav-item {
      padding-top: 5px;
      font-size: 30px;
    }
  }
`

export default Footer
