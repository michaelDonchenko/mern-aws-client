import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const { REACT_APP_API } = process.env
  const [email, setEmail] = useState('michael1994d@gmail.com')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.put(`${REACT_APP_API}/forgot-password`, {
        email,
      })
      setEmail('')
      setMessage(res.data.message)
      setLoading(false)
    } catch (error) {
      setError(error.response.data.error)
      setLoading(false)
    }
  }

  return (
    <FormContainer>
      <h3 className="mb-4">Forgot Password</h3>

      <p style={{ color: 'gray' }} className="mb-4">
        Please enter a valid email, Password reset link will be sent to your
        mailbox in order to continue.
      </p>

      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => {
            setError('')
          }}
        >
          {error}
        </Alert>
      )}
      {message && (
        <Alert
          variant="info"
          dismissible
          onClose={() => {
            setMessage('')
          }}
        >
          {message}
        </Alert>
      )}
      {loading && <Loader />}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          ></Form.Control>
        </Form.Group>

        <Button
          className="btn-block"
          type="submit"
          variant="primary"
          disabled={message}
        >
          <i className="fas fa-envelope mr-1"></i> Send Email
        </Button>
      </Form>

      <div className="mt-3">
        <Link to="/login" style={{ color: 'grey', fontWeight: '600' }}>
          Back to login
        </Link>
      </div>
    </FormContainer>
  )
}

export default ForgotPassword
