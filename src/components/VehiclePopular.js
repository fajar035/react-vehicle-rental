import React from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import vanLogin from "../assets/images/van_login.webp"
import motorcross from "../assets/images/motocross.webp"
import zeep from "../assets/images/zeep.webp"
import matic from "../assets/images/matic.webp"
import Footer from "../components/Footer"
import { useRouteMatch } from "react-router-dom"

function VehiclePopular(props) {
  console.log("vehicle popular", props)
  let { url } = useRouteMatch()
  console.log(url)
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
        <h3 className="mb-5 mt-5 f-playfair-main">Popular in town</h3>

        {/* Card */}
        <div className="row position-relative mb-lg-5">
          <div className="col-lg-3 col-md-6 card  position-relative">
            <Link to={`${url}/detail`}>
              <img src={vanLogin} className="img-size" alt="van_login" />
              <div className=".city-type-vehicles col-9 position-absolute bottom-0  bg-light rounded shadow ">
                <p className="mt-3">
                  Merapi <br />
                  <span className="color-subtitle">Yogyakarta</span>
                </p>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 card  position-relative">
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
          </div>
        </div>

        <div className="row position-relative mb-lg-5">
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
          </div>
        </div>

        <div className="row position-relative mb-lg-5">
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
          </div>
        </div>

        <div className="row position-relative mb-lg-5">
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
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default VehiclePopular
