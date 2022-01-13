import React from 'react'
import '../styles/css/MobileFrame.css'

import Footer from './Footer'

const MobileFrame = ({ children }) => {
  return (
    <>
      <div className="WebFullFrame">
        <div className="MobileFullFrame">
          <div className="Container">{children}</div>
          <Footer></Footer>
        </div>
      </div>
    </>
  )
}

export default MobileFrame
