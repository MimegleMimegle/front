import React from 'react'
import '../styles/css/MobileFrame.css'

import Header from './Header'

const MobileFrame = ({ children }) => {
  return (
    <>
      <div className="WebFullFrame">
        <div className="MobileFullFrame">
          <Header />
          <div className="Container">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileFrame
