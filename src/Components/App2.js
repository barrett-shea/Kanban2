import React from "react"
import Signup from "./Authentication/Signup"
import { AuthProvider } from "../Contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./Authentication/Profile"
import Login from "./Authentication/Login"
import PrivateRoute from "./Authentication/PrivateRoute"
import ForgotPassword from "./Authentication/ForgotPassword"
import UpdateProfile from "./Authentication/UpdateProfile"
import Dashboard from './Dnd/Dashboard'

export default function App2() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              {/* Kanban */}
              <PrivateRoute exact path='/' component={Dashboard}/>

              {/* Profile */}
              <PrivateRoute path="/user" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />

              {/* Authentication */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
  )
}
