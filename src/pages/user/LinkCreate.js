import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Alert,
  FormGroup,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LinkCreate = ({ history }) => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)

  const goBackHandler = () => {
    history.goBack()
  }

  const [reload, setReload] = useState(false)

  const [state, setState] = useState({
    categories: [],
    error: '',
    message: '',
    loading: false,
    loadingCategories: false,
    title: '',
    url: '',
    type: '',
    medium: '',
  })

  const {
    categories,
    loadedCategories,
    error,
    message,
    loading,
    loadingCategories,
    title,
    url,
    type,
    medium,
  } = state

  const getCategories = async () => {
    setState({ ...state, loadingCategories: true })
    try {
      const res = await axios.get(`${REACT_APP_API}/categories`)
      res.data &&
        setState({
          ...state,
          loadedCategories: res.data.categories,
          loading: false,
        })
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  useEffect(() => {
    getCategories()
  }, [reload])

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value })
  }

  const handleUrlChange = (e) => {
    setState({ ...state, url: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setReload(true)
    setState({ ...state, loading: true })
    // console.table({ title, url, categories, type, medium });
    try {
      const response = await axios.post(
        `${REACT_APP_API}/link`,
        { title, url, categories, type, medium },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setState({
        ...state,
        title: '',
        url: '',
        message: 'Link is created succesfully, thank you for submitting.',
        error: '',
        loading: false,
        categories: [],
        loadedCategories: [],
        type: '',
        medium: '',
      })
      setReload(false)
    } catch (error) {
      setState({
        ...state,
        error: error.response.data.error,
        message: '',
        loading: false,
      })
      setReload(false)
    }
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
    <Container>
      <h3 className="my-5">Submit a Link/URL</h3>

      <Link onClick={goBackHandler} className="btn btn-light my-3">
        Go back
      </Link>

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

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <h5 style={{ color: 'grey' }} className="mb-3">
              Category
            </h5>
            {loadingCategories && <Loader />}

            <FormGroup style={{ maxHeight: '100px', overflowY: 'scroll' }}>
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

            {(!token || !user) && (
              <p style={{ color: 'GrayText', margin: '20px 0' }}>
                In order to submit a link you have to be logged In.
              </p>
            )}

            <Button type="submit" variant="success" disabled={!token || !user}>
              Submit Link
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default LinkCreate
