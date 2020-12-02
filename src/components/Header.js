import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../helpers/auth'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT } from '../types/userConstants'

const Header = () => {
  const { user, token } = useSelector((state) => state.userInfo)
  const dispatch = useDispatch()
  return (
    <>
      <Navbar expand="lg" className="navbar navbar-dark bg-primary">
        <Container fluid style={{ width: '90%' }}>
          <Navbar.Brand>Mern-AWS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {user && user.role === 'subscriber' && (
                <LinkContainer to="/user-dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              )}
              {user && user.role === 'admin' && (
                <LinkContainer to="/admin-dashboard">
                  <Nav.Link>Admin Dashboard</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {user && token ? (
              <Nav className="ml-auto">
                <Link
                  style={{ color: 'white' }}
                  onClick={() => {
                    logout()
                    dispatch({
                      type: LOGOUT,
                      payload: { user: null, token: null },
                    })
                  }}
                >
                  Logout
                </Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
