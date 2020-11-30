import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
const { REACT_APP_API } = process.env

const Register = () => {
  const [formData, setFormData] = useState({
    name: 'michael donchenko',
    email: 'michael1994d@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(false)
  const { name, email, password, confirmPassword } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (password !== confirmPassword) {
      setLoading(false)
      return setError('The passwords do not match validation failed.')
    }
    try {
      const res = await axios.post(`${REACT_APP_API}/register`, formData)
      setLoading(false)
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })

      setMessage(res.data.message)
    } catch (error) {
      setError(error.res.data.error)
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      <h3 className="mb-4">Register</h3>
      {loading && <Loader />}

      <p style={{ color: 'gray' }} className="mb-4">
        Please enter a valid email, confirmation link will be sent to your
        mailbox in order to complete your registration.
      </p>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(false)}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert variant="info" dismissible onClose={() => setMessage(false)}>
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
            name="name"
            required
            autoComplete="off"
            autoFocus
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={handleChange}
            autoComplete="off"
            required
            autoFocus
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
            name="password"
            required
            minLength={8}
            autoComplete="off"
            autoFocus
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirm password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            required
            minLength={8}
            autoComplete="off"
            autoFocus
          ></Form.Control>
        </Form.Group>

        <Button className="btn-block" type="submit" variant="primary">
          <i className="fas fa-sign-in-alt mr-1"></i> Submit
        </Button>
      </Form>
      <div className="mt-3">
        <p>
          Already have an account?
          <Link
            className="ml-2"
            to="/login"
            style={{ color: 'grey', fontWeight: '600' }}
          >
            Login
          </Link>
        </p>
      </div>
    </FormContainer>
  )
}

export default Register
