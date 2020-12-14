import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const UserNav = () => {
  return (
    <Nav className="flex-column">
      <LinkContainer to="/link-create">
        <Nav.Link className="dashboard_link">Submit New Link</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/user/dashboard">
        <Nav.Link className="dashboard_link">Dashboard</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/user/profile-update">
        <Nav.Link className="dashboard_link">Profile Update</Nav.Link>
      </LinkContainer>
    </Nav>
  )
}

export default UserNav
