import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/rides" replace>Rides</Link>
    <Link to="/finishes" replace>My Finished Rides</Link>
    <Link to="/change-password" replace>Change Password</Link>
    <Link to="/sign-out" replace>Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up" replace>Sign Up</Link>
    <Link to="/sign-in" replace>Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    {/*<Link to="/">Home</Link>*/}
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>BOSRide</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
