import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UserNav from '../../components/UserNav'
import axios from 'axios'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'

const ProfileUpdate = () => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)

  const [state, setState] = useState({
    loading: false,
    error: '',
    name: user.name,
    newPassword: '',
    confirmPassword: '',
    message: '',
  })

  const { name, newPassword, loading, error, confirmPassword, message } = state

  // const getUser = async () => {
  //   setState({ ...state, loading: true })
  //   try {
  //     const { data } = await axios.get(`${REACT_APP_API}/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     setState({ ...state, name: data.user.name, loading: false })
  //   } catch (error) {
  //     setState({ ...state, error: error.response.data.error, loading: false })
  //   }
  // }

  // useEffect(() => {
  //   getUser()
  // }, [])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      await axios.put(
        `${REACT_APP_API}/user`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setState({
        ...state,
        error: false,
        message: 'User updated succefully you can relog to see the change.',
        name: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      setState({ ...state, error: error.response.data.error, loading: false })
    }
  }

  return (
    <Container className="my-5">
      {user && <h3 className="mb-5">{`Hello ${user.name}, welcome back.`}</h3>}
      <Row>
        <Col md={3}>
          <UserNav />
        </Col>

        <Col>
          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => {
                setState({ ...state, error: '' })
              }}
            >
              {error}
            </Alert>
          )}

          {message && (
            <Alert
              variant="success"
              dismissible
              onClose={() => {
                setState({ ...state, message: '' })
              }}
            >
              {message}
            </Alert>
          )}
          {loading && <Loader />}

          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="newPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  name="newPassword"
                  onChange={handleChange}
                  autoComplete="off"
                  minLength={8}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  autoComplete="off"
                  minLength={8}
                ></Form.Control>
              </Form.Group> */}

              <Button className="btn-block" type="submit" variant="primary">
                Update Details
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileUpdate
