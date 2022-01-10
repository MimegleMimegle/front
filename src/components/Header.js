import React from 'react'
import styled from 'styled-components'

import Sidebar from './Sidebar'
import HeaderLogo from './HeaderLogo'
import HeaderHamburder from './HeaderHamburger'
import HeaderGoBack from './HeaderGoBack'
import HeaderClose from './HeaderClose'

const Header = ({ type, children, location, low, noBorder }) => {
  const [showSidebar, setShowSidebar] = React.useState(false)
  const handleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const styles = { low: low, noBorder: noBorder }

  if (type === 'QuizPaper') {
    return (
      <>
        <NavHeader {...styles}>
          <ul style={{ height: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
            <li>
              <QuizLocation>{location}</QuizLocation>
            </li>
          </ul>
        </NavHeader>
      </>
    )
  }

  if (type === 'PostDetail') {
    return (
      <>
        <NavHeader {...styles}>
          <ul className="nav-list">
            <li>
              <HeaderGoBack />
            </li>
            <li className="nav-item-middle">
              <Location>{location}</Location>
            </li>
            <li>
              <div className="nav-item-right"></div>
            </li>
          </ul>
        </NavHeader>
      </>
    )
  }

  if (type === 'DictWrite' || type === 'DictEdit') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderClose />
            </li>
            <li className="nav-item-middle">
              <Location>{location}</Location>
            </li>
            <li>
              <div className="nav-item-right"></div>
            </li>
          </ul>
        </NavHeader>
      </>
    )
  }

  if (type === 'PostWrite' || type === 'DictSearchResult' || type === 'DictHistory' || type === 'DictDetail' || type === 'QuizIntro' || type === 'PostEdit') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderGoBack />
            </li>
            <li className="nav-item-middle">
              <Location>{location}</Location>
            </li>
            <li>
              <div className="nav-item-right">{children}</div>
            </li>
          </ul>
        </NavHeader>
      </>
    )
  }

  if (type === 'PostList' || type === 'PostSearchResult' || type === 'ImageList' || type === 'PostSearch' || type === 'MyPage' || type === 'DictList' || type === 'QuizResult') {
    return (
      <>
        <NavHeader>
          <ul className="nav-list">
            <li>
              <HeaderHamburder handleSidebar={handleSidebar} />
            </li>
            <li className="nav-item-middle">
              <Location>{location}</Location>
            </li>
            <li>
              <div className="nav-item-right">{children}</div>
            </li>
          </ul>
        </NavHeader>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </>
    )
  }

  if (type === 'Join' || type === 'Login') {
    return (
      <>
        <NavHeader {...styles}>
          <ul className="nav-list">
            <li className="nav-item-middle">
              <HeaderLogo />
            </li>
          </ul>
        </NavHeader>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
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
          <li className="nav-item-middle">
            <HeaderLogo />
          </li>
          <li>
            <div className="nav-item-right"></div>
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
  height: ${(props) => (props.low ? '50px' : '74px')};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: ${(props) => (props.noBorder ? 'none' : '1px solid black')};
  /* padding: 10px 0 12px; */
  z-index: 1000;
  .nav-list {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-item-middle {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-item-right {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Location = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
  cursor: default;
`
const QuizLocation = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
  text-align: center;
`

export default Header
