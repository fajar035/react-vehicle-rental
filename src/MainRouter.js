import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Vehicles from "./pages/Vehicles/Vehicles";
import Signup from "./pages/Signup/Signup";
import Forgot from "./pages/Forgot/Forgot";
import DetailPopular from "./pages/Detail/DetailPopular";
import DetailBike from "./pages/Detail/DetailBike";
import DetailMotorbike from "./pages/Detail/DetailMotorbike";
import DetailCars from "./pages/Detail/DetailCars";
import Example from "./pages/Example/Example";
import NotFound from "./pages/404/404";
import VehiclePopular from "./components/VehiclePopular";
import vehicleCars from "./components/VehicleCars";
import VehicleMotorbike from "./components/VehicleMotorbike";
import vehicleBike from "./components/VehicleBike";
import History from "./pages/History/History";
import Reservation from "./pages/Reservation/Reservation";
import Chat from "./pages/Chat/Chat";
import AddVehicle from "./components/AddVehicle";

function MainRouter(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/forgot" component={Forgot} />
            <Route exact path="/vehicles" component={Vehicles} />

            {/* Popular */}
            <Route exact path="/vehicles/popular" component={VehiclePopular} />

            {/* START DETAIL */}
            <Route
              exact
              path="/vehicles/popular/detail/:id"
              component={DetailPopular}
            />

            {/* END DETAIL */}

            <Route
              path="/vehicles/popular/reservation"
              component={Reservation}
            />
            <Route path="/vehicles/popular/chat" component={Chat} />

            {/* cars */}
            <Route exact path="/vehicles/cars" component={vehicleCars} />
            <Route path="/vehicles/cars/detail/:id" component={DetailCars} />

            {/* Motorbike */}
            <Route
              exact
              path="/vehicles/motorbike"
              component={VehicleMotorbike}
            />
            <Route
              path="/vehicles/motorbike/detail/:id"
              component={DetailMotorbike}
            />

            {/* Bike */}
            <Route exact path="/vehicles/bike/" component={vehicleBike} />
            <Route path="/vehicles/bike/detail/:id" component={DetailBike} />
            <Route
              path="/vehicles/bike/detail/reservation"
              component={Reservation}
            />

            <Route path="/add-item" component={AddVehicle} />
            <Route path="/history" component={History} />
            <Route path="/profile" component={Profile} />
            <Route path="/addcart" component={Example} />

            <Route exact component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default MainRouter;
