import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((state) => state.userInfo)

  return (
    <Route
      {...rest}
      render={(props) =>
        !user || !token || user.role !== 'admin' ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default AdminRoute
