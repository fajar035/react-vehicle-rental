import userProfile from "./../assets/images/photo-profile-default.webp"
import iconMessage from "./../assets/icons/email.png"
import logo from "./../assets/icons/logo.svg"
import { Link } from "react-router-dom"
import "../pages/Home/Home.css"
import React from "react"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import { logoutAction } from "../redux/actions/logout"

class Header extends React.Component {
  onClickLogout = () => {
    // localStorage.removeItem("vehicle-token")
    Swal.fire({
      title: "Are you sure?",
      text: "User will have Admin Privileges",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    })
    this.props.logoutDispatch()
  }

  render() {
    const token = this.props.auth.userData.token
    const photo = this.props.auth.userData.photo

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
                <Link to="/vehicles" className="navbar-font">
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
            {/* Komponen button login & sign up */}
            {!token ? (
              <div className="d-lg-flex col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4  justify-content-lg-between align-items-lg-center p-md-3 p-sm-3 justify-content-xl-around">
                <Link to="/login" className="f-nunito-login btn-login">
                  Login
                </Link>
                <Link to="/signup" className="f-nunito-signup btn-signup">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-row ms-3">
                <div className="icon">
                  <div className="count ">
                    <p>10</p>
                  </div>
                  <img
                    src={iconMessage}
                    className="img-icon"
                    alt="icon-message"
                  />
                </div>
                <div className="dropdown profile">
                  <img
                    className="img-profile img-fluid rounded-circle dropdown-toggle"
                    src={
                      !photo ? userProfile : process.env.REACT_APP_HOST + photo
                    }
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    alt="icon-profile"
                  />

                  <ul
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuLink">
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        <i className="fas fa-angle-right float-end me-4"></i>
                        Edit
                      </Link>
                    </li>

                    <li>
                      <Link to="" className="dropdown-item">
                        <i className="fas fa-angle-right float-end me-4"></i>
                        Help
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=""
                        className="dropdown-item btn-logout"
                        onClick={this.onClickLogout}>
                        <i className="fas fa-angle-right float-end me-4"></i>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {/* Komponen button login & sign up */}
          </div>
        </main>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutDispatch: () => {
      dispatch(logoutAction())
    }
  }
}

const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(Header)
export default AppWithRedux
