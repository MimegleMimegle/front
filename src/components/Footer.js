import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Grid from '../elements/Grid'
import SmileIcon from '../styles/image/smileIcon_Blue.png'
import { RiBookMarkLine, RiGamepadLine } from 'react-icons/ri'
import { MdOutlinePhotoLibrary } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const Footer = (props) => {
  const activeStyle = {
    color: '#6698FC',
  }
  return (
    <>
      <NavContainer>
        <NavBar>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/dict" className="nav-link" activeStyle={activeStyle}>
                <Grid flex_center column>
                  <RiBookMarkLine className="nav-icon" />
                  <div className="nav-link__text">사전</div>
                </Grid>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/image" className="nav-link" activeStyle={activeStyle}>
                <Grid flex_center column>
                  <MdOutlinePhotoLibrary className="nav-icon" />
                  <div className="nav-link__text">짤방</div>
                </Grid>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link fixed">
                <Grid flex_center column>
                  <Logo src={SmileIcon} />
                </Grid>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/quiz" className="nav-link" activeStyle={activeStyle}>
                <Grid flex_center column>
                  <RiGamepadLine className="nav-icon" />
                  <div className="nav-link__text">퀴즈</div>
                </Grid>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mypage" className="nav-link" activeStyle={activeStyle}>
                <Grid flex_center column>
                  <CgProfile className="nav-icon" />
                  <div className="nav-link__text">MY</div>
                </Grid>
              </NavLink>
            </li>
          </ul>
        </NavBar>
      </NavContainer>
    </>
  )
}

const NavContainer = styled.div`
  width: 100%;
  padding: 0 16px 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const NavBar = styled.nav`
  width: 100%;
  height: 74px;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 20px;
  border: 2px solid #111;
  padding: 12px 10px 10px;
  z-index: 1000;

  .nav-list {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .nav-item {
      max-width: 50px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .nav-link {
        .nav-icon {
          font-size: 26px;
        }
        &:visited,
        &:link {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.black};
        }
        .nav-link__text {
          font-size: ${({ theme }) => theme.fontSizes.lg};
          font-weight: 500;
          padding: 3px 0 0;
        }
      }

      .fixed {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
      }
    }
  }
`

const Logo = styled.div`
  width: 52px;
  height: 52px;
  border: 2px solid #111;
  cursor: pointer;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

export default Footer
