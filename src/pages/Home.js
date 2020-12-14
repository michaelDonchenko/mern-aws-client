import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import axios from 'axios'
import CategoryCard from '../components/CategoryCard'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Home = () => {
  const { REACT_APP_API } = process.env
  const [state, setState] = useState({
    categories: [],
    error: '',
    loading: false,
    popularLinks: [],
  })

  const { categories, error, loading, popularLinks } = state

  const getData = async () => {
    setState({ ...state, loading: true })
    try {
      const res = await axios.get(`${REACT_APP_API}/categories`)
      const links = await axios.get(`${REACT_APP_API}/link/popular`)
      res.data &&
        setState({
          ...state,
          categories: res.data.categories,
          popularLinks: links.data,
          loading: false,
        })
      console.log(links.data)
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  const incrementCount = async (linkId) => {
    try {
      const res = await axios.put(`${REACT_APP_API}/click-count`, { linkId })
    } catch (error) {
      setState({ ...state, error: error.response.data.error })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <h3 className="my-4 text-center">
        Find the Best Programming Courses and Tutorials
      </h3>

      <LinkContainer to="/link-create">
        <Button className="mb-5" variant="success">
          Submit New Link
        </Button>
      </LinkContainer>

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
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {categories !== [] &&
          categories.map((c) => (
            <Link to={`/category/${c.slug}`}>
              <CategoryCard category={c} key={c._id} />
            </Link>
          ))}
      </div>

      <div>
        <h3 className="text-center my-5">Most Trending links</h3>
        <ListGroup>
          {popularLinks.map((link) => (
            <ListGroup.Item
              className="mb-4"
              style={{ backgroundColor: '#e0f2f1' }}
              key={link._id}
            >
              <Row>
                {' '}
                <a
                  onClick={() => incrementCount(link._id)}
                  style={{ color: 'black' }}
                  href={link.url}
                  target="_blank"
                >
                  <h5 style={{ fontWeight: '600' }}>{link.title}</h5>
                </a>
              </Row>
              <Row style={{ wordBreak: 'break-word' }}>
                <p style={{ color: 'grey' }}> {link.url}</p>
              </Row>
              <Row>
                <span style={{ fontWeight: '600' }}>
                  {link.type} / {link.medium}
                </span>
                <span className="ml-2">
                  {link.categories.map((c) => (
                    <span className="mx-1">{c.name}</span>
                  ))}
                </span>
              </Row>
              <Row>
                <Col>
                  <p className="mt-2" style={{ color: 'GrayText' }}>
                    Posted by {link.postedBy.name},
                    <span style={{ color: 'grey', marginLeft: '10px' }}>
                      {moment(link.createdAt).fromNow()}
                    </span>
                  </p>
                </Col>
                <Col>
                  <p
                    className="mt-2 float-right"
                    style={{ color: 'blue', fontWeight: '600' }}
                  >
                    views:
                    <span className="ml-1">{link.clicks}</span>
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  )
}

export default Home
