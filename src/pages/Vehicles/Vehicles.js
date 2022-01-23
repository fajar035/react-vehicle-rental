import { useState, useEffect } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import axios from "axios"
import "./Vehicles.css"
import Header from "../../components/Header"
// import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import vanLogin from "../../assets/images/van_login.webp"
// import motorcross from "../../assets/images/motocross.webp"
// import zeep from "../../assets/images/zeep.webp"
// import matic from "../../assets/images/matic.webp"
import Footer from "../../components/Footer"
import Loading from "../../components/Loading"
// import Modal from "../../components/Modal"

function Vehicles() {
  let { url } = useRouteMatch()
  const [vehiclesBike, setVehiclesBike] = useState([])
  const [vehiclesMotorBike, setVehiclesMotorBike] = useState([])
  const [vehiclesCars, setVehiclesCars] = useState([])
  const [vehiclesPopular, setVehiclesPopular] = useState([])
  const [isOk, setisOk] = useState(false)
  // const [height, setHeight] = useState("")

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
        setisOk(true)
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
        setisOk(true)
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
        setisOk(true)
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
        setisOk(true)
        setVehiclesPopular(vehiclesPopular)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hostBackend = process.env.REACT_APP_HOST

  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "red" }}
  //       onClick={onClick}
  //     />
  //   )
  // }

  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props
  //   return (
  //     <div
  //       className={className}
  //       style={{
  //         // ...style,
  //         display: "flex",
  //         background: "green",
  //         color: "black",
  //         height: "100px",
  //         alignItems: "center"
  //       }}
  //       onClick={onClick}
  //     />
  //   )
  // }

  // const settings = {
  //   // className: "center",
  //   // centerMode: true,
  //   dots: true,
  //   autoplay: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   centerPadding: "60px",
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]
  // }

  return (
    <main>
      <Header />
      {isOk ? (
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
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesPopular.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/popular/detail/${item.id}`}
                    className="wrapper-img-home">
                    <img
                      src={`${hostBackend}${item.photo}`}
                      className="img-size"
                      alt="van_login"
                    />
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

          {/* Bike */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            Bike
            <Link to={`${url}/bike`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesBike.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/bike/detail/${item.id}`}
                    className="wrapper-img-home">
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

          {/* MotorBike */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            MotorBike
            <Link to={`${url}/motorbike`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesMotorBike.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/motorbike/detail/${item.id}`}
                    className="wrapper-img-home">
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

          {/* Cars */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            Cars
            <Link to={`${url}/cars`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesCars.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/cars/detail/${item.id}`}
                    className="wrapper-img-home">
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
      ) : (
        <Loading />
      )}

      <Footer />
    </main>
  )
}

export default Vehicles
