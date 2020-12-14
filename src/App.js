import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/CategoryCreate'
import ActivateEmail from './pages/auth/ActivateEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/user/UserDashboard'
import AdminRoute from './components/routes/AdminRoute'
import PrivateRoute from './components/routes/PrivateRoute'
import LinkCreate from './pages/user/LinkCreate'
import CategoryPage from './pages/CategoryPage'
import CategoryUpdate from './pages/admin/CategoryUpdate'
import CategoryUpdatePage from './pages/admin/CategoryUpdatePage'
import ProfileUpdate from './pages/user/ProfileUpdate'
import LinkUpdate from './pages/admin/LinkUpdate'

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
          <Route path="/link-create" exact component={LinkCreate} />
          <Route path="/category/:slug" exact component={CategoryPage} />
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
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <PrivateRoute
            path="/user/profile-update"
            exact
            component={ProfileUpdate}
          />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute
            path="/admin/dashboard/:pageNumber"
            exact
            component={AdminDashboard}
          />
          <AdminRoute
            path="/admin/create-category"
            exact
            component={CategoryCreate}
          />
          <AdminRoute
            path="/admin/update-delete-category"
            exact
            component={CategoryUpdate}
          />
          <AdminRoute
            path="/admin/update-category/:slug"
            exact
            component={CategoryUpdatePage}
          />
          <AdminRoute
            path="/admin/update-link/:id"
            exact
            component={LinkUpdate}
          />
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App
