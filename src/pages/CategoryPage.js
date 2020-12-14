import React, { useEffect, useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import axios from 'axios'
import moment from 'moment'

const CategoryPage = ({ match }) => {
  const { REACT_APP_API } = process.env

  const slug = match.params.slug

  const [state, setState] = useState({
    category: '',
    links: [],
    popularLinks: [],
    error: '',
    loading: false,
  })

  const { category, links, error, loading, popularLinks } = state

  const loadCategory = async () => {
    setState({ ...state, loading: true })
    try {
      const res = await axios.post(`${REACT_APP_API}/category/${slug}`, {})
      const response = await axios.get(`${REACT_APP_API}/link/popular/${slug}`)
      console.log(response)
      setState({
        ...state,
        links: res.data.links,
        popularLinks: response.data,
        category: res.data.category,
        loading: false,
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  useEffect(() => {
    loadCategory()
  }, [])

  const incrementCount = async (linkId) => {
    try {
      const res = await axios.put(`${REACT_APP_API}/click-count`, { linkId })
    } catch (error) {
      setState({ ...state, error: error.response.data.error })
    }
  }

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col md={8}>
              <h3 className="my-4">{`${category.name} Tutorials and Courses`}</h3>
              <h5 style={{ color: 'gray' }}>{category.content}</h5>
            </Col>

            <Col md={4}>
              {category && (
                <img style={{ height: '150px' }} src={category.image.url} />
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={8}>
              <ListGroup>
                {links.map((link) => (
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
            </Col>

            <Col md={4}>
              <p style={{ fontWeight: '600' }}>
                Most popular in {category.name}
              </p>

              <div>
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
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default CategoryPage
