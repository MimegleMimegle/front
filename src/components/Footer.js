import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Grid from '../elements/Grid'
import SmileIcon from '../styles/image/smileIcon_Yellow.png'

const Footer = (props) => {
  return (
    <>
      <NavFooter>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/dict" className="nav-link" activeClassName="is-active">
              <Grid flex_center column>
                <div>아이콘</div>
                <div className="nav-link__text">사전</div>
              </Grid>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/image" className="nav-link" activeClassName="is-active">
              <Grid flex_center column>
                <div>아이콘</div>
                <div className="nav-link__text">짤방</div>
              </Grid>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link fixed" activeClassName="is-active">
              <Grid flex_center column>
                <Logo src={SmileIcon} />
              </Grid>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/quiz" className="nav-link" activeClassName="is-active">
              <Grid flex_center column>
                <div>아이콘</div>
                <div className="nav-link__text">퀴즈</div>
              </Grid>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/mypage" className="nav-link" activeClassName="is-active">
              <Grid flex_center column>
                <div>아이콘</div>
                <div className="nav-link__text">MY</div>
              </Grid>
            </NavLink>
          </li>
        </ul>
      </NavFooter>
    </>
  )
}

const NavFooter = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: #f2f2f2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
      .nav-link {
        &:visited,
        &:link {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.black};
        }
        .nav-link__text {
          font-size: ${({ theme }) => theme.fontSizes.lg};
          font-weight: inherit;
          color: inherit;
        }
      }
      .is-active {
        color: yellow;
      }
      .fixed {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 24px;
      }
    }
  }
`

const Logo = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid #111;
  cursor: pointer;
  background-color: #fff;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

export default Footer
