import React, { useState } from 'react'
import styled from 'styled-components'
import '../styles/css/DictNavBar.css'
import { Link, NavLink } from 'react-router-dom'
import { history } from '../redux/ConfigureStore'
import ConfirmModal from './modal/ConfirmModal'

const DictNavBar = () => {
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  const [showModal, setShowModal] = useState(false)
  const handleClicScrap = () => {
    if (!isLogin) {
      setShowModal(true)
    }
    return
  }
  return (
    <>
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
            <StyledNavLink to={isLogin && `/dict/mymeme`} onClick={handleClicScrap} activeClassName={'active'}>
              <div className="DictNavItem">스크랩</div>
            </StyledNavLink>
          </li>
        </ul>
      </nav>
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용 가능합니다!" question="로그인 페이지로 이동하시겠어요?">
        <MoveLoginButton onClick={() => history.push('/login')}>이동</MoveLoginButton>
      </ConfirmModal>
    </>
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

const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default DictNavBar
