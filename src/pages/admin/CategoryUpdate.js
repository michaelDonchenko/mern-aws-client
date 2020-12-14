import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row, Table } from 'react-bootstrap'
import Loader from '../../components/Loader'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AdminNav from '../../components/AdminNav'
import { LinkContainer } from 'react-router-bootstrap'

const CategoryUpdate = ({ history }) => {
  const { REACT_APP_API } = process.env
  const [state, setState] = useState({
    categories: [],
    error: '',
    message: '',
    loading: false,
  })

  const { user, token } = useSelector((state) => state.userInfo)

  const { categories, error, loading } = state

  const getCategories = async () => {
    setState({ ...state, loading: true })
    try {
      const res = await axios.get(`${REACT_APP_API}/categories`)
      res.data &&
        setState({
          ...state,
          categories: res.data.categories,
          loading: false,
        })
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const deleteHandler = async (slug) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        const res = await axios.delete(`${REACT_APP_API}/category/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setState({ ...state, message: res.data.message, error: '' })
        getCategories()
      } catch (err) {
        setState({ ...state, error: err.response.data.error, message: '' })
      }
    }
  }

  return (
    <Container className="my-5">
      <h3 className="mb-5">Update/Delete Category</h3>
      <Row>
        <Col lg={3}>
          <h4 className="text-center">Admin Links</h4>
          <AdminNav />
        </Col>

        <Col lg={9}>
          {loading && <Loader />}
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
          <h4>Categories</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Category Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <img
                        style={{ height: '50px', width: 'auto' }}
                        src={c.image.url}
                      />
                    </td>
                    <td>
                      {
                        <LinkContainer to={`/admin/update-category/${c.slug}`}>
                          <Button variant="info" size="sm">
                            Update
                          </Button>
                        </LinkContainer>
                      }
                    </td>
                    <td>
                      {
                        <Button
                          onClick={() => deleteHandler(c.slug)}
                          size="sm"
                          variant="danger"
                        >
                          Delete
                        </Button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoryUpdate
