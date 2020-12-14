import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserNav from '../../components/UserNav'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/Loader'
import moment from 'moment'

const UserDashboard = ({ history }) => {
  const { REACT_APP_API } = process.env
  const { user, token } = useSelector((state) => state.userInfo)

  const [state, setState] = useState({
    links: [],
    loading: false,
    error: '',
  })

  const { links, loading, error } = state

  const linksByUser = async () => {
    setState({ ...state, loading: true })
    try {
      const { data } = await axios.get(`${REACT_APP_API}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setState({ ...state, links: data.links, loading: false })
    } catch (error) {
      setState({ ...state, error: error.response.data.error, loading: false })
    }
  }

  useEffect(() => {
    linksByUser()
  }, [])

  return (
    <Container className="my-5">
      {user && <h3 className="mb-5">{`Hello ${user.name}, welcome back.`}</h3>}
      <Row>
        <Col md={3}>
          <UserNav />
        </Col>

        <Col>
          {loading && <Loader />}
          {links && !loading && (
            <>
              <h4 className="text-center my-5">
                You have submitted {links.length} links so far.
              </h4>

              <ListGroup>
                {links.map((link) => (
                  <ListGroup.Item
                    className="mb-4"
                    style={{ backgroundColor: '#ede7f6 ' }}
                    key={link._id}
                  >
                    <Row>
                      {' '}
                      <a
                        style={{ color: 'black' }}
                        href={link.url}
                        target="_blank"
                      >
                        <h5>{link.title}</h5>
                      </a>
                    </Row>
                    <Row>
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default UserDashboard
