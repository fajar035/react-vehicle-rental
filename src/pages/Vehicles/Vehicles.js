import { useState, useEffect } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import axios from "axios"
import "./Vehicles.css"
import Header from "../../components/Header"
import vanLogin from "../../assets/images/van_login.webp"
import motorcross from "../../assets/images/motocross.webp"
import zeep from "../../assets/images/zeep.webp"
import matic from "../../assets/images/matic.webp"
import Footer from "../../components/Footer"
// import Modal from "../../components/Modal"

function Vehicles() {
  let { url } = useRouteMatch()
  const [vehiclesBike, setVehiclesBike] = useState([])
  const [vehiclesMotorBike, setVehiclesMotorBike] = useState([""])
  const [vehiclesCars, setVehiclesCars] = useState([""])
  const [vehiclesPopular, setVehiclesPopular] = useState([""])

  useEffect(() => {
    getVehiclesBike()
    getVehiclesCars()
    getVehiclesPopular()
    getVehiclesMotorBike()
  }, [])

  const getVehiclesBike = () => {
    const url = `${process.env.REACT_APP_HOST}/vehicles?filter=bike`
    axios
      .get(url)
      .then((res) => {
        const vehiclesBike = res.data.result
        setVehiclesBike(vehiclesBike)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getVehiclesMotorBike = () => {
    const url = `${process.env.REACT_APP_HOST}/vehicles?filter=motorbike`
    axios
      .get(url)
      .then((res) => {
        const vehiclesMotorBike = res.data.result
        setVehiclesMotorBike(vehiclesMotorBike)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getVehiclesCars = () => {
    const url = `${process.env.REACT_APP_HOST}/vehicles?filter=cars`
    axios
      .get(url)
      .then((res) => {
        const vehiclesCars = res.data.result
        setVehiclesCars(vehiclesCars)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getVehiclesPopular = () => {
    const url = `${process.env.REACT_APP_HOST}/history/popular`
    axios
      .get(url)
      .then((res) => {
        const vehiclesPopular = res.data.popular
        setVehiclesPopular(vehiclesPopular)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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

        {/* Popular */}
        <h3 className="mb-5 mt-5 f-playfair-main">
          Popular in town
          <Link to={`${url}/popular`} className="float-end link-view-all">
            View all <i className="fas fa-chevron-right text-center ms-2"></i>
          </Link>
        </h3>

        {/* Card */}
        <div className="row position-relative">
          <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={vanLogin} className="img-size" alt="van_login" />
            <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Merapi <br />
                <span className="color-subtitle">Yogyakarta</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={motorcross} className="img-size" alt="van_login" />
            <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Teluk Bogam <br />
                <span className="color-subtitle">Kalimantan</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={zeep} className="img-size" alt="van_login" />
            <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Bromo <br />
                <span className="color-subtitle">Malang</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={matic} className="img-size" alt="van_login" />
            <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Malioboro <br />
                <span className="color-subtitle">Malang</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cars */}
        <h3 className="mb-5 mt-5 f-playfair-main">
          Cars
          <Link to={`${url}/cars`} className="float-end link-view-all">
            View all <i className="fas fa-chevron-right text-center ms-2"></i>
          </Link>
        </h3>

        {/* Card */}
        <div className="row position-relative">
          {vehiclesCars.map((car) => (
            <div className="col-lg-3 col-md-6 card  position-relative">
              <img src={car.photo} className="img-size" alt="van_login" />
              <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
                <p className="mt-3">
                  {car.location} <br />
                  {/* <span className="color-subtitle">Yogyakarta</span> */}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MotorBike */}
        <h3 className="mb-5 mt-5 f-playfair-main">
          MotorBike
          <Link to={`${url}/motorbike`} className="float-end link-view-all">
            View all <i className="fas fa-chevron-right text-center ms-2"></i>
          </Link>
        </h3>

        {/* Card */}
        <div className="row position-relative">
          {vehiclesMotorBike.map((motorBike) => (
            <div className="col-lg-3 col-md-6 card  position-relative">
              <img src={motorBike.photo} className="img-size" alt="van_login" />
              <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
                <p className="mt-3">
                  {motorBike.location} <br />
                  {/* <span className="color-subtitle">Yogyakarta</span> */}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bike */}
        <h3 className="mb-5 mt-5 f-playfair-main">
          Bike
          <Link to={`${url}/bike`} className="float-end link-view-all">
            View all <i className="fas fa-chevron-right text-center ms-2"></i>
          </Link>
        </h3>

        {/* Card */}
        <div className="row position-relative">
          {vehiclesBike.map((bike) => (
            <div
              key={bike.id}
              className="col-lg-3 col-md-6 card  position-relative">
              <img src={bike.photo} className="img-size" alt="van_login" />
              <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
                <p className="mt-3 ms-1">
                  {bike.location} <br />
                  {/* <span className="color-subtitle">Yogyakarta</span> */}
                </p>
              </div>
            </div>
          ))}

          {/* <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={motorcross} className="img-size" alt="van_login" />
            <div className=".city col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Teluk Bogam <br />
                <span className="color-subtitle">Kalimantan</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={zeep} className="img-size" alt="van_login" />
            <div className=".city col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Bromo <br />
                <span className="color-subtitle">Malang</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 card  position-relative">
            <img src={matic} className="img-size" alt="van_login" />
            <div className=".city col-9 position-absolute bottom-0  bg-light rounded shadow ">
              <p className="mt-3">
                Malioboro <br />
                <span className="color-subtitle">Yogyakarta</span>
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default Vehicles
