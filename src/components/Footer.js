import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/icons/logo.svg"

function Footer() {
  return (
    <div class="row p-2 justify-content-md-around f-mulish bg-footer">
      <div class="col-lg-5 col-md-12 p-md-4">
        <img src={logo} alt="logo" className="logo-footer" />
        <div class="text-footer-about">
          <p>
            Plan and book your perfect trip with expert advice, travel tips for
            vehicle information from us
          </p>
          <p>©2020 Vehicle Rental Center. All rights reserved</p>
        </div>
      </div>

      <div class="mb-3 col-sm-6 col-md-2 col-xl-2">
        <ul class="list-group bg-footer">
          <li class="list-group-item border-0 fw-bold bg-footer text-footer-title">
            Destination
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Bali
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Yogyakarta
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Jakarta
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Kalimantan
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Malang
            </Link>
          </li>
        </ul>
      </div>

      <div class="mb-3 col-sm-6 col-md-2 col-xl-2 ">
        <ul class="list-group">
          <li class="list-group-item border-0 fw-bold bg-footer text-footer-title">
            Vehicle
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              Bike
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              Cars
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              MotorBike
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              Return Times
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      <div class="mb-3 col-sm-6 col-md-2 col-xl-2 ">
        <ul class="list-group">
          <li class="list-group-item border-0 fw-bold bg-footer text-footer-title">
            Interest
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Adventure Travel
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Art And Culture
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Wildlife and Nature
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Family Holidays
            </Link>
          </li>
          <li class="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Culinary Trip
            </Link>
          </li>
        </ul>
      </div>

      <div class="col-12">
        <div class="col-12 d-flex justify-content-center mb-3 mt-3">
          <div class="line-footer"></div>
        </div>

        <div class="col-12 d-flex justify-content-center mb-5 ">
          <Link to="#" className="text-secondary">
            <i class="fab fa-twitter me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i class="fab fa-facebook-f me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i class="fab fa-instagram me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i class="fab fa-linkedin-in me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i class="fab fa-youtube me-3 fa-lg"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
