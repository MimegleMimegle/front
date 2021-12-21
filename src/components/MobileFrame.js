import React from 'react'
import './MobileFrame.css'

import Header from './Header'
import Footer from './Footer'

const MobileFrame = ({ children }) => {
  return (
    <>
      <div className="WebFullFrame">
        <div className="MobileFullFrame">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default MobileFrame
