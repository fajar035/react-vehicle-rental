import React from "react"
import vanLogin from "../assets/images/van_login.webp"
import motorcross from "../assets/images/motocross.webp"
import zeep from "../assets/images/zeep.webp"
import matic from "../assets/images/matic.webp"

function Body() {
  return (
    <div className="row mb-5 ">
      {/* Popular in town */}
      <div className="col-lg-12 mb-5 ">
        <div className="container px-4 ">
          <h3 className="mb-5 mt-5 f-playfair-main">Popular in town</h3>
          <div className="row position-relative">
            <div className="next">
              <i className="fas fa-angle-right"></i>
            </div>
            <div className="col-lg-3 card  position-relative">
              <img src={vanLogin} className="img-size" alt="van_login" />
              <div className="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p className="mt-3 text-center">
                  Merapi <br />
                  <span className="color-subtitle">Yogyakarta</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 card position-relative">
              <img src={motorcross} className="img-size" alt="van_login" />
              <div className="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p className="mt-3 text-center">
                  Teluk Bogam <br />
                  <span className="color-subtitle">kalimantan</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 card position-relative">
              <img src={zeep} className="img-size" alt="van_login" />
              <div className="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p className="mt-3 text-center">
                  Bromo <br />
                  <span className="color-subtitle">Malang</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 card position-relative">
              <img src={matic} className="img-size" alt="van_login" />
              <div className="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p className="mt-3 text-center">
                  Malioboro <br />
                  <span className="color-subtitle">Yogyakarta</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="col-lg-12 mt-5">
        <div className="container">
          <div className="row d-flex flex-row justify-content-center align-item-center p-5">
            <h3 className="f-playfair-main">Testimonials</h3>

            <div className="col-lg-6 mt-5 d-flex flex-column justify-content-center">
              <ul className="list-group d-flex flex-row align-item-center mb-3">
                <li className="list-group-item border-0">
                  <i className="fas fa-star text-warning"></i>
                </li>
                <li className="list-group-item border-0">
                  <i className="fas fa-star text-warning"></i>
                </li>
                <li className="list-group-item border-0">
                  <i className="fas fa-star text-warning"></i>
                </li>
                <li className="list-group-item border-0">
                  <i className="fas fa-star text-warning"></i>
                </li>
                <li className="list-group-item border-0">
                  <i className="fas fa-star text-warning"></i>
                </li>
              </ul>

              <div className="col-lg-8 mb-5">
                <p className="f-mulish">
                  ”It was the right decision to rent vehicle here, I spent less
                  money and enjoy the trip. It was an amazing experience to have
                  a ride for wildlife trip!”
                </p>
              </div>

              <div className="col-lg-8">
                <p className="f-nunito">Edward Newgate</p>
                <p>Founder Circle</p>
              </div>
            </div>

            <div className="col-lg-6 mt-5 d-flex flex-row justify-content-center">
              <div className="bg-image img-cs position-relative">
                <div className="circle-testimonial position-circle"></div>

                <div className="plus">
                  <div className="vertikal"></div>
                  <div className="horizontal"></div>
                </div>

                <div className="rectangle">
                  <div className="left">
                    <i className="fas fa-angle-left"></i>
                  </div>
                  <div className="right">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
