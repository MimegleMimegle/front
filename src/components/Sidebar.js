import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as userActions } from '../redux/modules/user'
import { actionCreators as mypageActions } from '../redux/modules/mypage'

import SidebarItem from './SidebarItem'

import SmileIcon from '../styles/image/smileIcon_Yellow.png'
import { ReactComponent as CloseIcon } from '../styles/icons/X_24dp.svg'

const Sidebar = ({ showSidebar, setShowSidebar, profileImgUrl }) => {
  const dispatch = useDispatch()
  const my = useSelector((state) => state.mypage.myPageData)
  const username = localStorage.getItem('username')
  const nickname = localStorage.getItem('nickname')
  const isLogin = username && nickname ? true : false

  const menu_list = [
    { name: '메인', path: '/' },
    { name: '밈퀴즈', path: '/quiz' },
    { name: '밈+글 커뮤니티', path: '/post' },
    { name: '오픈 밈사전', path: '/dict' },
    { name: '짤방앗간', path: '/image' },
  ]

  console.log(my)

  const moveToMypage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push('/mypage')
    setShowSidebar(false)
  }

  const moveToLogin = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push('/login')
    setShowSidebar(false)
  }

  const moveToJoin = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push('/join')
    setShowSidebar(false)
  }

  const clickLogOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(userActions.logOutDB())
    setShowSidebar(false)
  }

  window.addEventListener('keyup', (e) => {
    if (showSidebar && e.key === 'Escape') {
      setShowSidebar(false)
    }
  })

  React.useEffect(() => {
    if (my == null) {
      dispatch(mypageActions.getUserInfoDB())
    }
  }, [])

  return (
    <>
      <Wrapper className={`${showSidebar ? 'open' : ''}`}>
        <div style={{ width: '100%', padding: '48px 10px 16px 16px', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            {isLogin ? (
              <>
                <ProfileImage src={my ? my.profileImageUrl : null} onClick={moveToMypage} />
                <p style={{ paddingLeft: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }} onClick={moveToMypage}>
                  {my ? my.nickname : null}
                </p>
              </>
            ) : (
              <>
                <ProfileImage src={SmileIcon} onClick={moveToLogin} />
                <p style={{ display: 'inline-block', paddingLeft: '8px', cursor: 'pointer', fontSize: '14px' }} onClick={moveToLogin}>
                  로그인이 필요합니다.
                </p>
              </>
            )}
          </div>
          <button
            onClick={() => {
              setShowSidebar(false)
            }}
            style={{ height: '100%', padding: '0', textAlign: 'right' }}
          >
            <CloseIcon style={{ paddingTop: '2px' }} />
          </button>
        </div>

        {menu_list.map((menu, index) => {
          return <SidebarItem key={index} menu={menu} setShowSidebar={setShowSidebar} />
        })}
        <UserMenuBox>
          {isLogin ? (
            <UserMenu onClick={clickLogOut}>로그아웃</UserMenu>
          ) : (
            <>
              {/* <UserMenu onClick={moveToLogin}>로그인</UserMenu>
              <UserMenu onClick={moveToJoin}>회원가입</UserMenu> */}
            </>
          )}
        </UserMenuBox>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
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
  z-index: 2000;

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

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #111;
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  cursor: pointer;
  background-color: #fff;
`

const UserMenuBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 16px;
  display: flex;
  align-items: end;
  justify-content: left;
`

const UserMenu = styled.button`
  /* border: 1px solid #111;
  border-radius: 20px; */
  /* padding: 10px 20px; */
  color: #878c92;
  font-weight: 700;
  font-size: 16px;
`

export default Sidebar
