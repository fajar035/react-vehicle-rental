import React, { Component } from "react"
import logo from "./../assets/icons/logo.svg"
import iconMessage from "./../assets/icons/email.png"
import userProfile from "./../assets/images/user_profile.webp"
import { Link } from "react-router-dom"
import "../pages/Home/Home.css"

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

            <div className="d-flex flex-row ms-3">
              <div class="icon">
                <div class="count ">
                  <p>10</p>
                </div>
                <img src={iconMessage} class="img-icon" alt="icon-message" />
              </div>
              <div class="dropdown profile">
                <img
                  class="img-profile rounded-circle dropdown-toggle"
                  src={userProfile}
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  alt="icon-profile"
                />

                <ul class="dropdown-menu " aria-labelledby="dropdownMenuLink">
                  <li>
                    <Link className="dropdown-item">
                      <i class="fas fa-angle-right float-end me-4"></i>
                      Edit
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item">
                      <i class="fas fa-angle-right float-end me-4"></i>
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item">
                      <i class="fas fa-angle-right float-end me-4"></i>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </nav>
    )
  }
}

export default Header
