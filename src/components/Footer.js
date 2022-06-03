import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";

function Footer() {
  return (
    <div className="row p-2 justify-content-md-around f-mulish bg-footer">
      <div className="col-lg-5 col-md-12 p-md-4">
        <img src={logo} alt="logo" className="logo-footer" />
        <div className="text-footer-about">
          <p>
            Plan and book your perfect trip with expert advice, travel tips for
            vehicle information from us
          </p>
          <p>©2020 Vehicle Rental Center. All rights reserved</p>
        </div>
      </div>

      <div className="mb-3 col-sm-6 col-md-2 col-xl-2">
        <ul className="list-group bg-footer">
          <li className="list-group-item border-0 fw-bold bg-footer text-footer-title">
            Destination
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Bali
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Yogyakarta
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Jakarta
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Kalimantan
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Malang
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-3 col-sm-6 col-md-2 col-xl-2 ">
        <ul className="list-group">
          <li className="list-group-item border-0 fw-bold bg-footer text-footer-title">
            Vehicle
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              Bike
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              Cars
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              MotorBike
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              Return Times
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="#" className="text-footer">
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-3 col-sm-6 col-md-2 col-xl-2 ">
        <ul className="list-group">
          <li className="list-group-item border-0 fw-bold bg-footer text-footer-title">
            Interest
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Adventure Travel
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Art And Culture
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Wildlife and Nature
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Family Holidays
            </Link>
          </li>
          <li className="list-group-item border-0 item bg-footer">
            <Link to="" className="text-footer">
              Culinary Trip
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-12">
        <div className="col-12 d-flex justify-content-center mb-3 mt-3">
          <div className="line-footer"></div>
        </div>

        <div className="col-12 d-flex justify-content-center mb-5 ">
          <Link to="#" className="text-secondary">
            <i className="fab fa-twitter me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i className="fab fa-facebook-f me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i className="fab fa-instagram me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i className="fab fa-linkedin-in me-3 fa-lg"></i>
          </Link>
          <Link to="#" className="text-secondary">
            <i className="fab fa-youtube me-3 fa-lg"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
