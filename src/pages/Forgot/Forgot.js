import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Forgot.css";
import Footer from "../../components/Footer";
import {
  getOtpApi,
  checkOtpApi,
  resetPasswordApi
} from "../../utils/https/auth";
import Swal from "sweetalert2";

function Forgot(props) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState({
    password1: "",
    password2: ""
  });
  const [checkOtp, setCheckOtp] = useState(false);
  const [otpIsValid, setOtpIsValid] = useState(false);

  const onSubmitGetOtp = () => {
    console.log("SEND OTP ... ");
    const body = {
      email: email
    };

    if (email.length !== 0) {
      getOtpApi(body)
        .then((res) => {
          // console.log(res);
          setCheckOtp(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Sent",
            text: "Please check your email 😗",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((err) => {
          // console.log(err.response);
          setCheckOtp(false);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Failed to send 😑",
            text: "Email is not registered",
            showConfirmButton: true
          });
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter your email",
        showConfirmButton: true
      });
    }
  };

  const onSubmitCheckOtp = () => {
    console.log("CHECK CODE OTP ...");

    const body = {
      email: email,
      otp: otp
    };

    checkOtpApi(body)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setOtpIsValid(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.msg,
            showConfirmButton: false,
            timer: 2000
          });
        }
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.status === 401) {
          setOtpIsValid(false);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: err.response.data.msg,
            showConfirmButton: true
          });
        }
      });
  };

  const onSubmitForgotPassword = () => {
    // console.log("PASSWORD", password);
    console.log("RESET PASSWORD ...");
    const { password1, password2 } = password;
    if (password1 !== password2) {
      return Swal.fire({
        position: "center",
        icon: "warning",
        title: "Password does not match",
        showConfirmButton: false
      });
    }

    const body = {
      email: email,
      otp: otp,
      password: password1
    };
    // console.log("BODY", body);
    resetPasswordApi(body)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully changed password",
            text: "Please login again, with your new password",
            showConfirmButton: true
          }).then((cb) => {
            if (cb.isConfirmed === true) {
              return props.history.push("/login");
            }
          });
        }
        // console.log(props);
      })
      .catch((err) => {
        // console.log(err.response);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Server error, please try again",
          showConfirmButton: true
        });
      });
  };

  return (
    <main className="container-fluid m-0 p-0">
      <section className="row position-relative d-flex justify-content-center bg-img-forgot">
        <div className="col-10">
          <div className="back-forgot col-2">
            <Link to="/login" className="link-back-forgot">
              <i className="fas fa-chevron-left me-5"></i>
              Back
            </Link>
          </div>
          <div className="body-forgot ">
            <h1 className="title-forgot">Do’t worry, we got your back!</h1>
            {otpIsValid ? (
              <div className="form-forgot col-lg-6 col-sm-12 col-md-8 ">
                <input
                  type="password"
                  name="password"
                  value={password.password1}
                  onChange={(text) => {
                    setPassword({ ...password, password1: text.target.value });
                  }}
                  placeholder="New Password"
                  className="input-email-forgot"
                />
                <input
                  value={password.password2}
                  type="password"
                  name="password2"
                  onChange={(text) => {
                    setPassword({ ...password, password2: text.target.value });
                  }}
                  placeholder="Repeat Password"
                  className="input-email-forgot"
                />
                <button
                  onClick={onSubmitForgotPassword}
                  className="btn-link-forgot">
                  Reset Password
                </button>
              </div>
            ) : (
              <div className="form-forgot col-lg-6 col-sm-12 col-md-8 ">
                {checkOtp ? (
                  <>
                    <input
                      typeof="email"
                      name="email"
                      onChange={(text) => {
                        setEmail(text.target.value);
                      }}
                      disabled
                      placeholder="Enter your email address"
                      className="input-email-forgot"
                    />
                    <input
                      type="number"
                      name="otp"
                      onChange={(text) => {
                        setOtp(text.target.value);
                      }}
                      placeholder="Enter your code OTP"
                      className="input-email-forgot"
                    />
                    <button
                      onClick={onSubmitCheckOtp}
                      className="btn-link-forgot">
                      Check OTP
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      typeof="email"
                      name="email"
                      onChange={(text) => {
                        setEmail(text.target.value);
                      }}
                      placeholder="Enter your email address"
                      className="input-email-forgot"
                    />
                    <button
                      onClick={onSubmitGetOtp}
                      className="btn-link-forgot">
                      Send Link
                    </button>
                  </>
                )}
              </div>
            )}
            {/* <p className="resend-link-p col-8">
              You will receive a link to reset your password. If you haven’t
              received any link, click
              <Link to="#" className="resend-link">
                Resend Link
              </Link>
            </p> */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Forgot;
