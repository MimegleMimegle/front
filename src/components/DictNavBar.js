import React, { useState } from 'react'
import '../styles/css/DictNavBar.css'
import { Link } from 'react-router-dom'

const DictNavBar = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1)

  const activeStyle = {
    color: '#6698FC',
    borderBottom: '4px solid #00A0FF',
  }

  return (
    <nav className="DictNavWrapper">
      {/* 하단 네비게이션 최상위 태그 */}
      <Link to="/dict" className="DictNavLink1" onClick={() => setActiveNav(1)}>
        <div className="DictNavMenu1">
          <div className={activeNav === 1 ? 'DictNavItem activeNav' : 'DictNavItem'}>밈 단어</div>
          {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
        </div>
      </Link>
      <Link to="/dict/question" className="DictNavLink2" onClick={() => setActiveNav(2)}>
        <div className="DictNavMenu2">
          <div className={activeNav === 2 ? 'DictNavItem activeNav' : 'DictNavItem'}>Q&A</div>
        </div>
      </Link>
      <Link to="/dict/stat" className="DictNavLink3" onClick={() => setActiveNav(3)}>
        <div className="DictNavMenu3">
          <div className={activeNav === 3 ? 'DictNavItem activeNav' : 'DictNavItem'}>통계</div>
        </div>
      </Link>
      <Link to="/dict/mymeme" className="DictNavLink4" onClick={() => setActiveNav(4)}>
        <div className="DictNavMenu4">
          <div className={activeNav === 4 ? 'DictNavItem activeNav' : 'DictNavItem'}>스크랩</div>
        </div>
      </Link>
    </nav>
  )
}

export default DictNavBar