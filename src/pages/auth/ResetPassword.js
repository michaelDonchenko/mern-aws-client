import React, { useState, useEffect } from 'react'
import FormContainer from '../../components/FormContainer'
import { Button, Alert, Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import axios from 'axios'

const ResetPassword = ({ match }) => {
  const { REACT_APP_API } = process.env

  const [state, setState] = useState({
    token: '',
    newPassword: '',
    confirmPassword: '',
    message: false,
    error: false,
    loading: false,
  })

  const { token, newPassword, confirmPassword, message, error, loading } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    let jwtToken = match.params.jwtToken
    if (jwtToken) {
      setState({ ...state, token: jwtToken })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    if (newPassword !== confirmPassword) {
      return setState({
        ...state,
        error: 'The passwords do not match validation failed.',
        loading: false,
      })
    }
    try {
      const res = await axios.put(`${REACT_APP_API}/reset-password`, {
        resetPasswordLink: token,
        newPassword: newPassword,
      })
      setState({
        ...state,
        message: res.data.message,
        loading: false,
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      setState({ ...state, error: error.response.data.error, loading: false })
    }
  }

  return (
    <FormContainer>
      <h3 className="mt-4">Password Reset Page</h3>

      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setState({ ...state, error: false })}
        >
          {error}
        </Alert>
      )}

      {message && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setState({ ...state, message: false })}
        >
          {message}
        </Alert>
      )}

      {loading && <Loader />}

      <p style={{ color: 'gray' }} className="mb-4">
        This link will work only 10minutes after the mail was recived. If there
        is an error of expired token please get a new link from forgot password
        page.
      </p>

      <Form className="mt-3">
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter Password"
            value={newPassword}
            onChange={handleChange}
            autoComplete="off"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          ></Form.Control>
        </Form.Group>

        <Button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-block mt-5"
          variant="primary"
          disabled={message}
        >
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPassword
