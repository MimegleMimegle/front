import React from 'react'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import HeaderLogo from './HeaderLogo'
import HeaderHamburder from './HeaderHamburger'
import HeaderGoBack from './HeaderGoBack'

const Header = ({ type, children, location }) => {
  const [showSidebar, setShowSidebar] = React.useState(false)
  const handleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  if (type === 'PostEdit' || type === 'DictWrite' || type === 'DictEdit') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderGoBack type={type} />
            </li>
            <li style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Location>{location}</Location>
            </li>
            <li>
              <div style={{ width: '40px', height: '100%' }}></div>
            </li>
          </ul>
        </NavHeader>
      </>
    )
  }

  if (type === 'PostWrite' || type === 'DictSearchResult' || type === 'DictHistory' || type === 'DictDetail') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderGoBack />
            </li>
            <li style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Location>{location}</Location>
            </li>
            <li>
              <div>{children}</div>
            </li>
          </ul>
        </NavHeader>
      </>
    )
  }

  if (type === 'MyPage' || type === 'DictList') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderHamburder handleSidebar={handleSidebar} />
            </li>
            <li style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Location>{location}</Location>
            </li>
            <li>
              <div style={{ width: '40px', height: '100%' }}></div>
            </li>
          </ul>
        </NavHeader>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </>
    )
  }

  if (type === 'PostList' || type === 'PostSearchResult' || type === 'ImageList' || type === 'PostSearch') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderHamburder handleSidebar={handleSidebar} />
            </li>
            <li style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Location>{location}</Location>
            </li>
            <li>
              <div>{children}</div>
            </li>
          </ul>
        </NavHeader>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </>
    )
  }

  if (type === 'QuizIntro') {
    return (
      <>
        <NavHeader>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Location>{location}</Location>
          </div>
        </NavHeader>
      </>
    )
  }

  return (
    <>
      <NavHeader>
        <ul className="nav-list">
          <li>
            <HeaderHamburder handleSidebar={handleSidebar} />
          </li>
          <li style={{ width: '100px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeaderLogo />
          </li>
          <li>
            <div style={{ width: '40px', height: '100%' }}></div>
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
  border-bottom: 1px solid #111;
  /* padding: 10px 0 12px; */
  z-index: 1000;
  .nav-list {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const Location = styled.h2`
  font-weight: 700;
  font-size: 18px;
`

export default Header
