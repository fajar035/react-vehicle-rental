import userProfile from "./../assets/images/photo-profile-default.webp";
import iconMessage from "./../assets/icons/email.png";
import logo from "./../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import "../pages/Home/Home.css";
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logoutAction } from "../redux/actions/auth";
import jwtDecode from "jwt-decode";

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userData } = auth;
  const token = userData.token;
  const [photoProfile, setPhotoProfile] = useState(userProfile);
  const photo = userData.photo;
  const history = useHistory();
  const [photo404, setPhoto404] = useState(false);

  useEffect(() => {
    if (token.length !== 0) {
      const expired = jwtDecode(token).exp < Date.now() / 1000;
      if (expired) {
        Swal.fire({
          title: "TOKEN EXPIRED",
          text: "Please login again",
          showConfirmButton: true,
          icon: "warning",
          confirmButtonText: "Login"
        }).then(function (isConfirm) {
          history.push("/login");
        });
      }
    }
  }, [token, history]);

  const getPhotoProfile = useCallback(async () => {
    if (userData.photo !== null) {
      const response = await fetch(process.env.REACT_APP_HOST + userData.photo);
      // const data = await response.json();
      if (response.status === 404) {
        setPhoto404(true);
      }
      // console.log(response.status);
    }
  }, [userData.photo]);

  useEffect(() => {
    if (photo !== null) {
      setPhotoProfile(process.env.REACT_APP_HOST + userData.photo);
    }

    getPhotoProfile();
  }, [userData.photo, photo, getPhotoProfile]);

  const onClickLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffcd61",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAction(userData.token));
        history.push("/");
      }
    });
  };
  // console.log("PHOTO PROFILE HEADER >> ", photoProfile);
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <main className='container-fluid p-0'>
        <Link className='navbar-brand ms-5' to='/'>
          <img className='logo' src={logo} alt='logo' />
        </Link>
        <button
          className='navbar-toggler btn-dropwdown'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav mb-5 mt-5 mb-lg-0 mt-lg-0 align-items-center'>
            <li className='nav-item align-content-center'>
              <Link to='/' className='navbar-font'>
                Home
              </Link>
            </li>
            <li className='nav-item align-content-center'>
              <Link to='/vehicles' className='navbar-font'>
                Vehicle Type
              </Link>
            </li>
            <li className='nav-item align-content-center'>
              <Link to='/history' className='navbar-font'>
                History
              </Link>
            </li>
            <li className='nav-item align-content-center'>
              <Link to='/about' className='navbar-font'>
                About
              </Link>
            </li>
          </ul>
          {/* Komponen button login & sign up */}
          {!token ? (
            <div className='d-lg-flex col-12 col-sm-12 col-md-12 col-lg-5 col-xl-4  justify-content-lg-between align-items-lg-center p-md-3 p-sm-3 justify-content-xl-around'>
              <Link to='/login' className='f-nunito-login btn-login'>
                Login
              </Link>
              <Link to='/signup' className='f-nunito-signup btn-signup'>
                Sign Up
              </Link>
            </div>
          ) : (
            <div className='d-flex flex-row ms-3 align-items-center'>
              <div className='icon'>
                <div className='count '>
                  <p>10</p>
                </div>
                <img
                  src={iconMessage}
                  className='img-icon'
                  alt='icon-message'
                />
              </div>
              <div className='dropdown profile'>
                <img
                  className='img-profile img-fluid rounded-circle dropdown-toggle'
                  src={photo404 ? userProfile : photoProfile}
                  id='dropdownMenuLink'
                  data-bs-toggle='dropdown'
                  alt='icon-profile'
                />

                <ul
                  className='dropdown-menu '
                  aria-labelledby='dropdownMenuLink'
                >
                  <li>
                    <Link to='/profile' className='dropdown-item'>
                      <i className='fas fa-angle-right float-end me-4'></i>
                      Edit
                    </Link>
                  </li>

                  <li>
                    <Link to='' className='dropdown-item'>
                      <i className='fas fa-angle-right float-end me-4'></i>
                      Help
                    </Link>
                  </li>
                  <li>
                    <div
                      className='dropdown-item btn-logout'
                      onClick={onClickLogout}
                    >
                      <i className='fas fa-angle-right float-end me-4'></i>
                      Logout
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {/* Komponen button login & sign up */}
        </div>
      </main>
    </nav>
  );
}

export default Header;
