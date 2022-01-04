import React from "react"
import vanLogin from "../assets/images/van_login.webp"
import motorcross from "../assets/images/motocross.webp"
import zeep from "../assets/images/zeep.webp"
import matic from "../assets/images/matic.webp"

function Body() {
  return (
    <div class="row mb-5 ">
      {/* Popular in town */}
      <div class="col-lg-12 mb-5 ">
        <div class="container px-4 ">
          <h3 class="mb-5 mt-5 f-playfair-main">Popular in town</h3>
          <div class="row position-relative">
            <div className="next">
              <i class="fas fa-angle-right"></i>
            </div>
            <div class="col-lg-3 card  position-relative">
              <img src={vanLogin} class="img-size" alt="van_login" />
              <div class="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p class="mt-3 text-center">
                  Merapi <br />
                  <span class="color-subtitle">Yogyakarta</span>
                </p>
              </div>
            </div>

            <div class="col-lg-3 card position-relative">
              <img src={motorcross} class="img-size" alt="van_login" />
              <div class="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p class="mt-3 text-center">
                  Teluk Bogam <br />
                  <span class="color-subtitle">kalimantan</span>
                </p>
              </div>
            </div>

            <div class="col-lg-3 card position-relative">
              <img src={zeep} class="img-size" alt="van_login" />
              <div class="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p class="mt-3 text-center">
                  Bromo <br />
                  <span class="color-subtitle">Malang</span>
                </p>
              </div>
            </div>

            <div class="col-lg-3 card position-relative">
              <img src={matic} class="img-size" alt="van_login" />
              <div class="city col-9 d-flex flex-row align-self-center justify-content-center position-absolute position-absolute top-100 start-50 translate-middle bg-light rounded shadow">
                <p class="mt-3 text-center">
                  Malioboro <br />
                  <span class="color-subtitle">Yogyakarta</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div class="col-lg-12 mt-5">
        <div class="container">
          <div class="row d-flex flex-row justify-content-center align-item-center p-5">
            <h3 class="f-playfair-main">Testimonials</h3>

            <div class="col-lg-6 mt-5 d-flex flex-column justify-content-center">
              <ul class="list-group d-flex flex-row align-item-center mb-3">
                <li class="list-group-item border-0">
                  <i class="fas fa-star text-warning"></i>
                </li>
                <li class="list-group-item border-0">
                  <i class="fas fa-star text-warning"></i>
                </li>
                <li class="list-group-item border-0">
                  <i class="fas fa-star text-warning"></i>
                </li>
                <li class="list-group-item border-0">
                  <i class="fas fa-star text-warning"></i>
                </li>
                <li class="list-group-item border-0">
                  <i class="fas fa-star text-warning"></i>
                </li>
              </ul>

              <div class="col-lg-8 mb-5">
                <p class="f-mulish">
                  ”It was the right decision to rent vehicle here, I spent less
                  money and enjoy the trip. It was an amazing experience to have
                  a ride for wildlife trip!”
                </p>
              </div>

              <div class="col-lg-8">
                <p class="f-nunito">Edward Newgate</p>
                <p>Founder Circle</p>
              </div>
            </div>

            <div class="col-lg-6 mt-5 d-flex flex-row justify-content-center">
              <div class="bg-image img-cs position-relative">
                <div class="circle-testimonial position-circle"></div>

                <div class="plus">
                  <div class="vertikal"></div>
                  <div class="horizontal"></div>
                </div>

                <div class="rectangle">
                  <div class="left">
                    <i class="fas fa-angle-left"></i>
                  </div>
                  <div class="right">
                    <i class="fas fa-angle-right"></i>
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
