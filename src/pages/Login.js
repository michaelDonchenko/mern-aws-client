import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { authenticate } from '../helpers/auth'
import { useDispatch, useSelector } from 'react-redux'

import { LOGIN_USER } from '../types/userConstants'

const Login = ({ history }) => {
  const { REACT_APP_API } = process.env
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.userInfo)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${REACT_APP_API}/login`, {
        email,
        password,
      })
      authenticate(res, () => {
        dispatch({
          type: LOGIN_USER,
          payload: res.data,
        })
      })
    } catch (error) {
      setError(error.response.data.error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token && user.role === 'subscriber') {
      history.push('/user/dashboard')
    }
    if (token && user.role === 'admin') {
      history.push('/admin/dashboard')
    }
  }, [user])

  return (
    <FormContainer>
      <h3 className="mb-4">Login</h3>
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

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
            minLength={8}
          ></Form.Control>
        </Form.Group>

        <Button className="btn-block" type="submit" variant="primary">
          <i className="fas fa-envelope mr-1"></i> Login with Email/Password
        </Button>
      </Form>

      <div className="mt-3">
        <Link
          to="/forgot-password"
          style={{ color: 'grey', fontWeight: '600' }}
        >
          Forgot password?
        </Link>
        <div className="mt-3">
          <p>
            Don't have an account?
            <Link
              className="ml-2"
              to="/register"
              style={{ color: 'grey', fontWeight: '600' }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  )
}

export default Login
