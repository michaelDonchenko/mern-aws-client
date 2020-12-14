import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import AdminNav from '../../components/AdminNav'
import Paginate from '../../components/Paginate'

const AdminDashboard = ({ match }) => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)

  const pageNumber = match.params.pageNumber || 1

  const [state, setState] = useState({
    links: [],
    loading: false,
    error: '',
    message: '',
    page: '',
    pages: '',
  })

  const { links, loading, error, page, pages, message } = state

  const getLinks = async () => {
    setState({ ...state, loading: true })
    try {
      const { data } = await axios.get(
        `${REACT_APP_API}/links?pageNumber=${pageNumber}&pageSize=${5}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setState({
        ...state,
        links: data.links,
        loading: false,
        page: data.page,
        pages: data.pages,
        loading: false,
      })
      console.log(data)
    } catch (error) {
      setState({ ...state, error: error.response.data.error, loading: false })
    }
  }

  useEffect(() => {
    getLinks()
  }, [pageNumber])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setState({ ...state, loading: true })
      try {
        await axios.delete(`${REACT_APP_API}/link/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setState({
          ...state,
          loading: false,
          error: false,
        })
        getLinks()
      } catch (error) {
        setState({
          ...state,
          loading: false,
          error: error.response.data.error,
          message: false,
        })
      }
    }
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
          <h4 className="text-center my-5">All Submitted Links</h4>
          {loading && <Loader />}
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

          {message && (
            <Alert
              variant="success"
              dismissible
              onClose={() => {
                setState({ ...state, message: false })
              }}
            >
              {message}
            </Alert>
          )}

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Link Title</th>
                <th>Link URL</th>
                <th>Posted By</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {links &&
                links.map((link) => (
                  <tr key={link._id}>
                    <td>{link.title}</td>
                    <td>{link.url}</td>
                    <td>{link.postedBy.name}</td>
                    <td>
                      {
                        <LinkContainer to={`/admin/update-link/${link._id}`}>
                          <Button variant="info" size="sm">
                            Update
                          </Button>
                        </LinkContainer>
                      }
                    </td>
                    <td>
                      {
                        <Button
                          onClick={() => deleteHandler(link._id)}
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

          {pages && page && (
            <Paginate pages={pages} page={page} url={'/admin/dashboard/'} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
