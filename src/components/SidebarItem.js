import React from 'react'
import styled from 'styled-components'

const SidebarItem = ({ menu, isActive }) => {
  return (
    <>
      <button className={`${isActive ? 'active' : ''}`}>{menu.name}</button>
    </>
  )
}

export default SidebarItem
