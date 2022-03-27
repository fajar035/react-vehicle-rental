import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import motorbike from "../assets/images/motorbike-default.jpg";

import { getVehiclesMotorBikeApi } from "../utils/https/vehicles";

class VehicleMotorbike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehiclesMotorbike: [],
      isOk: false
    };
  }

  componentDidMount() {
    getVehiclesMotorBikeApi()
      .then((res) => {
        this.setState({
          vehiclesMotorbike: res.data.result,
          isOke: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { url } = this.props.match;
    // const hostBackend = process.env.REACT_APP_HOST
    const vehiclesMotorBike = this.state.vehiclesMotorbike;
    if (!localStorage["user-role"]) {
      localStorage.setItem("user-role", "1");
    }
    const role = JSON.parse(localStorage["user-role"]);
    return (
      <main>
        <Header />

        <div className="container px-4 mb-5">
          <div className="col-lg-12 col-sm-12 col-md-12 justify-content-center d-flex">
            <div className="col-lg-12 col-sm-12 col-md-12  border rounded-3 mt-5 container-input">
              <input
                typeof="search"
                className="input-search-type"
                placeholder="Search vehicle (ex. cars, cars name)"
              />
              <button typeof="submit" className="btn-search-type float-end">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {role === "2" ? (
            <div className="col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center rounded-3 mt-5 container-input">
              <button className="add-item">
                Click item to see details and reservation
              </button>
            </div>
          ) : role === null ? (
            <div></div>
          ) : (
            <div></div>
          )}

          {/* Popular */}
          <h3 className="mb-5 mt-5 f-playfair-main">Motor Bike</h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesMotorBike.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link to={`${url}/detail/${item.id}`}>
                    <img src={motorbike} className="img-size" alt="van_login" />
                    <div className="city-type-vehicles  bg-light rounded shadow ">
                      <p className="mt-3">
                        {item.name} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </main>
    );
  }
}

export default VehicleMotorbike;
