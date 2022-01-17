import React, { useState } from 'react'
import '../styles/css/DictNavBar.css'
import { Link } from 'react-router-dom'

const DictNavBar = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1)

  const onChange = () => {
    setActiveNav()
  }

  return (
    <nav className="wrapper">
      {/* 하단 네비게이션 최상위 태그 */}
      <Link to="/dict" className="DictNavLink" onClick={() => setActiveNav(1)}>
        <div>
          <div className={activeNav === 1 ? 'nav-item active' : 'nav-item'}>밈 단어</div>
          {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
        </div>
      </Link>
      <Link to="/second" className="DictNavLink" onClick={() => setActiveNav(2)}>
        <div>
          <div className={activeNav === 2 ? 'nav-item active' : 'nav-item'}>Q&A</div>
        </div>
      </Link>
      <Link to="/third" className="DictNavLink" onClick={() => setActiveNav(3)}>
        <div>
          <div className={activeNav === 3 ? 'nav-item active' : 'nav-item'}>통계</div>
        </div>
      </Link>
      <Link to="/dict/mymeme" className="DictNavLink" onClick={() => setActiveNav(4)}>
        <div>
          <div className={activeNav === 4 ? 'nav-item active' : 'nav-item'}>스크랩</div>
        </div>
      </Link>
    </nav>
  )
}

export default DictNavBar