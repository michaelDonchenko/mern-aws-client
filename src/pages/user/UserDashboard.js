import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

const UserDashboard = ({ history }) => {
  const { user, token } = useSelector((state) => state.userInfo)
  useEffect(() => {
    if (!user || !token) {
      history.push('/login')
    }
  }, [user, token])

  return (
    <Container className="my-5">
      {user && <h3>{`Hello ${user.name}, welcome back.`}</h3>}
    </Container>
  )
}

export default UserDashboard
