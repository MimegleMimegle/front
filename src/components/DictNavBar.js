import React, { useState } from 'react'
import styled from 'styled-components'
import '../styles/css/DictNavBar.css'
import { Link, NavLink } from 'react-router-dom'

const DictNavBar = () => {
  return (
    <nav className="DictNavWrapper">
      {/* 하단 네비게이션 최상위 태그 */}
      <ul className="DictNavList">
        <li className="DictNavEachList">
          <StyledNavLink to="/dict" exact activeClassName={'active'}>
            <div className="DictNavItem">밈 단어</div>
            {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
          </StyledNavLink>
        </li>
        <li className="DictNavEachList">
          <StyledNavLink to="/dict/question" activeClassName={'active'}>
            <div className="DictNavItem">Q&A</div>
          </StyledNavLink>
        </li>
        <li className="DictNavEachList">
          <StyledNavLink to="/dict/stat" activeClassName={'active'}>
            <div className="DictNavItem">통계</div>
          </StyledNavLink>
        </li>
        <li className="DictNavEachList">
          <StyledNavLink to="/dict/mymeme" activeClassName={'active'}>
            <div className="DictNavItem">스크랩</div>
          </StyledNavLink>
        </li>
      </ul>
    </nav>
  )
}

const StyledNavLink = styled(NavLink)`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 7px;
  border-bottom: 3px solid transparent !important;
  &.active {
    color: #00a0ff !important;
    border-bottom: 3px solid #00a0ff !important;
  }
  &:visited,
  &:link {
    text-decoration: none;
    color: #000;
  }
  .DictNavItem {
    font-family: 'YdestreetB';
    font-style: normal;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: normal;
  }
`

export default DictNavBar
