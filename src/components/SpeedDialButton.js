import React from 'react'
import '../styles/css/SpeedDialButton.css'

const SpeedDialButton = ({ children, _onClick }) => {
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  return (
    <>
      {isLogin ? (
        <div className="DictPageAddButton" onClick={_onClick}>
          {children}
        </div>
      ) : null}
    </>
  )
}

SpeedDialButton.defaultProps = {
  children: null,
  _onClick: () => {},
}

export default SpeedDialButton
