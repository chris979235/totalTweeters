import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logOut } = props
  return (
    <div className="navbar">
      <Link to="/profile">Profile</Link>
      <Link to="/public">Public</Link>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}