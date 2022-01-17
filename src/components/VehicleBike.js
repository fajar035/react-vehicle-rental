import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import { Link, useRouteMatch } from "react-router-dom"
// import vanLogin from "../assets/images/van_login.webp"
// import motorcross from "../assets/images/motocross.webp"
// import zeep from "../assets/images/zeep.webp"
// import matic from "../assets/images/matic.webp"
import Footer from "../components/Footer"
import { getVeihcleBike } from "../utils/https/vehicleBike"

class VehicleBike extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehiclesBike: [],
      isOk: false
    }
  }

  componentDidMount() {
    getVeihcleBike()
      .then((res) => {
        this.setState({
          vehiclesBike: res.data.result,
          isOke: true
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { url } = this.props.match
    const hostBackend = process.env.REACT_APP_HOST
    const vehiclesBike = this.state.vehiclesBike
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

          {/* Bike */}
          <h3 className="mb-5 mt-5 f-playfair-main">Bike</h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesBike.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link to={`${url}/detail/${item.id}`}>
                    <img
                      src={`${hostBackend}${item.photo}`}
                      className="img-size"
                      alt="van_login"
                    />
                    <div className="city-type-vehicles  bg-light rounded shadow ">
                      <p className="mt-3">
                        {item.name} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        <Footer />
      </main>
    )
  }
}

export default VehicleBike
