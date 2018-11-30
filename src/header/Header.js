import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/rides">Rides</Link>
    <Link to="/finishes">My Finished Rides</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)


const alwaysOptions = (
  <React.Fragment>
    {/*<Link to="/">Home</Link>*/}
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <img src="https://image.flaticon.com/icons/svg/1313/1313112.svg" style={{width:'80px', paddingRight:'18px'}}/>
    <h1>BOSRide</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
