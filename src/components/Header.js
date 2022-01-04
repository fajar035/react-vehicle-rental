import React, { Component } from "react"
import logo from "./../assets/icons/logo.svg"
import { Link } from "react-router-dom"
import "./../pages/Index/Index.css"

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <main className="container-fluid p-0">
          <Link className="navbar-brand ms-5" to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>

          <button
            className="navbar-toggler btn-dropwdown"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent">
            <ul className="navbar-nav mb-5 mt-5 mb-lg-0 mt-lg-0 align-items-center">
              <li className="nav-item align-content-center">
                <Link to="/" className="navbar-font">
                  Home
                </Link>
              </li>
              <li className="nav-item align-content-center">
                <Link to="/detail" className="navbar-font">
                  Vehicle Type
                </Link>
              </li>
              <li className="nav-item align-content-center">
                <Link to="/history" className="navbar-font">
                  History
                </Link>
              </li>
              <li className="nav-item align-content-center">
                <Link to="/about" className="navbar-font">
                  About
                </Link>
              </li>
            </ul>

            <div className="d-lg-flex col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4  justify-content-lg-between align-items-lg-center p-md-3 p-sm-3 justify-content-xl-around">
              <Link to="/login" className="f-nunito-login btn-login">
                Login
              </Link>
              <Link to="/signup" className="f-nunito-signup btn-signup">
                Sign Up
              </Link>
            </div>
          </div>
        </main>
      </nav>
    )
  }
}

export default Header
