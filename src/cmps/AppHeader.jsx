import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

export function _AppHeader() {
  return (
    <section className='app-header flex space-between align-center'>
      <h1 className='logo'>Mister Bitcoin</h1>
      <nav className='flex space-between'>
        <NavLink exact to='/'>
          Home
        </NavLink>
        <NavLink to='/contact'>Contacts</NavLink>
        <NavLink to='/stats'>Statistics</NavLink>
        <NavLink to='/signup'>Log out</NavLink>
      </nav>
    </section>
  )
}

//! HIGH ORDER COMPONENT - ADDING ROUTE CAPABILITIES TO APPHEADER
export const AppHeader = withRouter(_AppHeader)
