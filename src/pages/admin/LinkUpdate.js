import React, { useEffect, useState } from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
  Form,
  Button,
  FormGroup,
} from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import AdminNav from '../../components/AdminNav'

const LinkUpdate = ({ match, history }) => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)

  const linkId = match.params.id

  const [state, setState] = useState({
    loading: false,
    error: '',
    message: '',
    title: '',
    url: '',
    type: '',
    medium: '',
    categories: [],
    loadedCategories: [],
  })

  const {
    loading,
    error,
    message,
    title,
    url,
    type,
    medium,
    categories,
    loadedCategories,
  } = state

  const getCategories = async () => {
    setState({ ...state, loading: true })
    try {
      const categoriesRes = await axios.get(`${REACT_APP_API}/categories`)
      const linkRes = await axios.get(`${REACT_APP_API}/link/${linkId}`)

      categoriesRes.data &&
        linkRes.data &&
        setState({
          ...state,
          loadedCategories: categoriesRes.data.categories,
          title: linkRes.data.title,
          url: linkRes.data.url,
          medium: linkRes.data.medium,
          type: linkRes.data.type,
          loading: false,
        })
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.error,
      })
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleSubmit = async () => {
    setState({ ...state, loading: true })
    try {
      const { data } = await axios.put(
        `${REACT_APP_API}/link/${linkId}`,
        {
          title,
          url,
          type,
          medium,
          categories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setState({
        ...state,
        loading: false,
      })
      history.push('/admin/dashboard')
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.error,
      })
    }
  }

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value })
  }

  const handleUrlChange = (e) => {
    setState({ ...state, url: e.target.value })
  }

  const handleToggle = (c) => () => {
    const clickedCategory = categories.indexOf(c)

    const all = [...categories]

    if (clickedCategory === -1) {
      all.push(c)
    } else {
      all.splice(clickedCategory, 1)
    }

    setState({ ...state, categories: all })
  }

  const handleTypeChange = (e) => {
    setState({ ...state, type: e.target.value })
  }

  const handleMediumChange = (e) => {
    setState({ ...state, medium: e.target.value })
  }

  return (
    <Container className="my-5">
      <h3>Hello Admin, welcome back.</h3>
      <Row>
        <Col lg={3}>
          <h4 className="text-center my-5">Admin Links</h4>
          <AdminNav />
        </Col>

        <Col lg={9}>
          <h4 className="text-center my-5">Update Link</h4>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => {
                setState({ ...state, error: false })
              }}
            >
              {error}
            </Alert>
          )}

          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <h5 style={{ color: 'grey' }} className="mb-3">
                    Category
                  </h5>

                  <FormGroup
                    style={{ maxHeight: '100px', overflowY: 'scroll' }}
                  >
                    {loadedCategories &&
                      loadedCategories.map((c) => (
                        <Form.Check
                          key={c._id}
                          type="checkbox"
                          id={c._id}
                          label={c.name}
                          onChange={handleToggle(c._id)}
                        />
                      ))}
                  </FormGroup>

                  <h5 style={{ color: 'grey' }} className="my-3">
                    Type
                  </h5>

                  <FormGroup>
                    <Form.Check
                      type="radio"
                      label="Free"
                      value="free"
                      name="type"
                      checked={type === 'free'}
                      onChange={handleTypeChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Paid"
                      value="paid"
                      name="type"
                      checked={type === 'paid'}
                      onChange={handleTypeChange}
                    />
                  </FormGroup>

                  <h5 style={{ color: 'grey' }} className="my-3">
                    Medium
                  </h5>

                  <FormGroup>
                    <Form.Check
                      type="radio"
                      label="Video"
                      value="video"
                      name="medium"
                      checked={medium === 'video'}
                      onChange={handleMediumChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Book"
                      value="book"
                      name="medium"
                      checked={medium === 'book'}
                      onChange={handleMediumChange}
                    />
                  </FormGroup>
                </Col>

                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link Title"
                      value={title}
                      onChange={handleTitleChange}
                      required
                      autoComplete="off"
                      autoFocus
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link URL"
                      value={url}
                      onChange={handleUrlChange}
                      required
                      autoComplete="off"
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    disabled={!token || !user}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default LinkUpdate
