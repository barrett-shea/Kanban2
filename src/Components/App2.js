import React from "react"
import Signup from "./Authentication/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./Contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Authentication/Dashboard"
import Login from "./Authentication/Login"
import PrivateRoute from "./Authentication/PrivateRoute"
import ForgotPassword from "./Authentication/ForgotPassword"
import UpdateProfile from "./Authentication/UpdateProfile"

export default function App2() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}
