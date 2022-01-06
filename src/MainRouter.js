import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"

// Import Component
import Index from "./pages/Index/Index"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import Detail from "./pages/Detail/Detail"
import NotFound from "./pages/404/404"

function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/detail" component={Detail} />

        <Route exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default MainRouter
