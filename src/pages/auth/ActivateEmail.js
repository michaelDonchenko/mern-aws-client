import React, { useState, useEffect } from 'react'
import FormContainer from '../../components/FormContainer'
import { Button, Alert } from 'react-bootstrap'
import jwt from 'jsonwebtoken'
import Loader from '../../components/Loader'
import axios from 'axios'
const { REACT_APP_API } = process.env

const ActivateEmail = ({ match }) => {
  const [state, setState] = useState({
    name: '',
    token: '',
    buttonText: 'Activate account',
    message: false,
    error: false,
    loading: false,
  })

  const { name, token, buttonText, message, error, loading } = state

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    try {
      const res = await axios.post(`${REACT_APP_API}/register/activate`, {
        token,
      })
      setState({
        ...state,
        name: '',
        token: '',
        loading: false,
        message: res.data.message,
      })
    } catch (error) {
      setState({ ...state, error: error.response.data.error })
    }
  }

  useEffect(() => {
    let jwtToken = match.params.jwtToken
    if (jwtToken) {
      const { name } = jwt.decode(jwtToken)
      setState({ ...state, name: name, token: jwtToken })
    }
  }, [])

  return (
    <FormContainer>
      <h3 className="mt-4">Account Activation </h3>
      <h4>Hello {name}, lets activate yout account</h4>

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

      <Button
        onClick={handleSubmit}
        className="btn btn-block mt-5"
        variant="primary"
        disabled={message}
      >
        {buttonText}
      </Button>
    </FormContainer>
  )
}

export default ActivateEmail
