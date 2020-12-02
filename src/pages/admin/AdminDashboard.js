import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const AdminDashboard = ({ history }) => {
  const { user, token } = useSelector((state) => state.userInfo)
  useEffect(() => {
    if (!user || !token || user.role !== 'admin') {
      history.push('/login')
    }
  }, [user, token])
  return (
    <Container className="my-5">
      <h3>Hello Admin, welcome back.</h3>
    </Container>
  )
}

export default AdminDashboard
