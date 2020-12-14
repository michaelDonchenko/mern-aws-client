import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const AdminNav = () => {
  return (
    <Nav className="flex-column">
      <LinkContainer to="/admin/dashboard">
        <Nav.Link className="dashboard_link">Dashboard</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/admin/create-category">
        <Nav.Link className="dashboard_link">Create Category</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/admin/update-delete-category">
        <Nav.Link className="dashboard_link">Update/Delete Category</Nav.Link>
      </LinkContainer>
    </Nav>
  )
}

export default AdminNav
