import React from "react"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import popular from "../assets/images/popular-default.jpg"

import Footer from "../components/Footer"
import { useRouteMatch } from "react-router-dom"
import axios from "axios"

function VehiclePopular(props) {
  let { url } = useRouteMatch()
  if (!localStorage["user-role"]) {
    localStorage.setItem("user-role", "1")
  }
  const role = JSON.parse(localStorage["user-role"])
  console.log("ROLE-HALAMAN-POPULAR", localStorage["user-roleD"])

  const [vehiclePopular, setVehiclesPopular] = useState([])

  useEffect(() => {
    getVehiclePopular()
  }, [])

  const getVehiclePopular = () => {
    const url = `${process.env.REACT_APP_HOST}/history/popular`
    axios
      .get(url)
      .then((res) => {
        const vehiclePopular = res.data.popular
        setVehiclesPopular(vehiclePopular)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hostBackend = process.env.REACT_APP_HOST
  console.log("ROLE-VEHICLE-POPULAR-COMPONENT", role)
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
          {/* {role === 2 ? : } */}
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
        <h3 className="mb-5 mt-5 f-playfair-main">Popular in town</h3>

        {/* Card */}
        <div className="row position-relative mb-lg-5">
          {vehiclePopular.map((item, idx) => {
            return (
              <div key={idx} className="col-lg-3 col-md-6 card  ">
                <Link to={`${url}/detail/${item.id}`}>
                  <img src={popular} className="img-size" alt="van_login" />
                  <div className="city-type-vehicles  bg-light rounded shadow ">
                    <p className="mt-3">
                      {item.vehicle} <br />
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

export default VehiclePopular
