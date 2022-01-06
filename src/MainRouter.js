import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"

// Import Component
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import Detail from "./pages/Detail/Detail"
import NotFound from "./pages/404/404"
import Signup from "./pages/Signup/Signup"
import Forgot from "./pages/Forgot/Forgot"

function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/profile" component={Profile} />
        <Route path="/detail" component={Detail} />

        <Route exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default MainRouter
