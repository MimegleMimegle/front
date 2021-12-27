import React from 'react'
import styled from 'styled-components'

const SidebarItem = ({ menu, isActive }) => {
  return (
    <>
      <div className={`${isActive ? 'active' : ''}`}>
        <p>{menu.name}</p>
      </div>
    </>
  )
}

export default SidebarItem
