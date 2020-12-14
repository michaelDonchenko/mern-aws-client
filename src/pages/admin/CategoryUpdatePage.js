import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AdminNav from '../../components/AdminNav'
import Loader from '../../components/Loader'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { Link } from 'react-router-dom'

const CategoryUpdatePage = ({ match, history }) => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)
  const [state, setState] = useState({
    name: '',
    content: '',
    message: '',
    error: '',
    loading: false,
    image: '',
    imagePriview: '',
  })

  const { name, content, message, error, image, loading, imagePriview } = state

  const slug = match.params.slug

  const goBackHandler = () => {
    history.goBack()
  }

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    try {
      const response = await axios.put(
        `${REACT_APP_API}/category/${slug}`,
        { name, content, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setState({
        ...state,
        error: false,
      })
      history.push('/admin/update-delete-category')
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

  const getCategory = async () => {
    setState({ ...state, loading: true })
    try {
      const res = await axios.post(`${REACT_APP_API}/category/${slug}`, {})
      setState({
        ...state,
        name: res.data.category.name,
        content: res.data.category.content,
        imagePriview: res.data.category.image.url,
        loading: false,
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Container className="my-5">
      <h3 className="mb-5">Updating Category</h3>
      <Row>
        <Col lg={3}>
          <h4 className="text-center">Admin Links</h4>
          <AdminNav />
        </Col>

        <Col lg={9}>
          <h5 className="text-center">Edit Category</h5>
          <Link onClick={goBackHandler} className="btn btn-light my-3">
            Go back
          </Link>

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

          {imagePriview && (
            <span>
              <img
                className="ml-3"
                style={{ height: '50px', width: 'auto' }}
                src={imagePriview}
              />
            </span>
          )}

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
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoryUpdatePage
