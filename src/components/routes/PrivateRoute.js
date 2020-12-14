import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((state) => state.userInfo)

  return (
    <Route
      {...rest}
      render={(props) =>
        !user || !token || user.role !== 'subscriber' ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
