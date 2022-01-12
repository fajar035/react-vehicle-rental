import React from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"

import { Provider as ReduxProvider } from "react-redux"
import store from "./redux/store"

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import Vehicles from "./pages/Vehicles/Vehicles"
import Signup from "./pages/Signup/Signup"
import Forgot from "./pages/Forgot/Forgot"
import Detail from "./pages/Detail/Detail"
import Example from "./pages/Example/Example"
import NotFound from "./pages/404/404"
import VehiclePopular from "./components/VehiclePopular"
import vehicleCars from "./components/VehicleCars"
import VehicleMotorbike from "./components/VehicleMotorbike"
import vehicleBike from "./components/VehicleBike"
import History from "./pages/History/History"
import Reservation from "./pages/Reservation/Reservation"

class MainRouter extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/profile" component={Profile} />

            <Route exact path="/vehicles" component={Vehicles} />

            {/* Popular */}
            <Route exact path="/vehicles/popular" component={VehiclePopular} />
            <Route path="/vehicles/popular/detail" component={Detail} />

            {/* cars */}
            <Route exact path="/vehicles/cars" component={vehicleCars} />
            <Route path="/vehicles/cars/detail" component={Detail} />

            {/* Motorbike */}
            <Route
              exact
              path="/vehicles/motorbike"
              component={VehicleMotorbike}
            />
            <Route path="/vehicles/motorbike/detail" component={Detail} />

            {/* Bike */}
            <Route exact path="/vehicles/bike/" component={vehicleBike} />
            <Route path="/vehicles/bike/detail" component={Detail} />
            <Route
              path="/vehicles/bike/detail/reservation"
              component={Reservation}
            />

            <Route path="/history" component={History} />
            <Route path="/profile" component={Profile} />
            <Route path="/addcart" component={Example} />

            <Route exact component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </ReduxProvider>
    )
  }
}

export default MainRouter
