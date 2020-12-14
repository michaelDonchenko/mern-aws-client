import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminNav from '../../components/AdminNav'
import Loader from '../../components/Loader'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'

const CategoryCreate = () => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)
  const [state, setState] = useState({
    name: '',
    content: '',
    message: '',
    error: '',
    loading: false,
    image: '',
  })

  const { name, content, message, error, image, loading } = state

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    try {
      const response = await axios.post(
        `${REACT_APP_API}/category`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setState({
        ...state,
        name: '',
        content: '',
        error: false,
        message: response.data.message,
      })
    } catch (error) {
      setState({
        ...state,
        error: error.response.data.error,
        message: '',
      })
    }
  }

  const imageHandler = (event) => {
    let fileInput = false
    if (event.target.files[0]) {
      fileInput = true
    }
    if (fileInput) {
      setState({ ...state, loading: true })
      Resizer.imageFileResizer(
        event.target.files[0],
        700,
        700,
        'PNG',
        100,
        0,
        (uri) => {
          setState({ ...state, image: uri, loading: false })
        }
      )
    }
  }

  return (
    <Container className="my-5">
      <h3 className="mb-5">Create Category</h3>
      <Row>
        <Col lg={3}>
          <h4 className="text-center">Admin Links</h4>
          <AdminNav />
        </Col>

        <Col lg={9}>
          <h5 className="text-center">New Category</h5>

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
          {loading && <Loader />}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleChange('name')}
                required
                autoComplete="off"
                autoFocus
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={5}
                value={content}
                placeholder="Category Content"
                onChange={handleChange('content')}
                required
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Choose image"
                onChange={imageHandler}
                accept={'image/*'}
              />
            </Form.Group>

            <Button className="btn" type="submit" variant="primary">
              Create Category
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoryCreate
