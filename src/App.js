import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AdminDashboard from './pages/admin/AdminDashboard'
import ActivateEmail from './pages/auth/ActivateEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/user/UserDashboard'

const App = () => {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route
            path="/auth/activate/:jwtToken"
            exact
            component={ActivateEmail}
          />
          <Route
            path="/auth/password/reset/:jwtToken"
            exact
            component={ResetPassword}
          />
          <Route path="/user-dashboard" exact component={UserDashboard} />
          <Route path="/admin-dashboard" exact component={AdminDashboard} />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
