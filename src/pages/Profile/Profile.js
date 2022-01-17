import React from "react"
import "./Profile.css"
import Header from "../../components/Header"
import { Link } from "react-router-dom"
import photoProfile from "../../assets/images/photo-profile-default.webp"
import axios from "axios"
import { connect } from "react-redux"

class Profile extends React.Component {
  state = { dataProfile: {} }
  componentDidMount() {
    const userToken = this.props.auth.userData.token

    const url = "http://localhost:8000/users/id"
    axios
      .get(url, { headers: { "x-access-token": userToken } })
      .then((res) => {
        const dataProfile = res.data.result
        this.setState({ dataProfile: dataProfile })
      })
      .catch((err) => {
        const status = err.request.status

        if (status === 403) {
          localStorage.removeItem("vehicle-token")
          this.props.history.replace("/login")
        }
      })
  }
  render() {
    const { name, gender, email, phone, birtday, address, photo } =
      this.state.dataProfile
    const photoProfile = process.env.REACT_APP_HOST + photo

    return (
      <main>
        <Header />
        <div className="container-fluid m-0 p-0">
          <div className="row mt-5">
            <div className="col-12 ">
              <div className="row">
                <div className="col-lg-5  wrapper-title-profile mb-sm-5 p-lg-3">
                  <h1 className="title-update-profile">Update Profile</h1>
                </div>
                <div className="col-lg-7  d-flex flex-column align-items-lg-center p-lg-3">
                  <div className="col-lg-8 wrapper-btn-profile">
                    <Link to="">
                      <button className="btn-save-profile me-lg-5">
                        Save Change
                      </button>
                    </Link>
                    <Link to="">
                      <button className="btn-cansel-profile">Cansel</button>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 p-lg-5 main-profile">
                  <div className="wrapper-photo-profile ">
                    <img
                      src={photoProfile}
                      alt="profile-users"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-lg-8 col-md-6  p-lg-5 main-profile">
                  <h1 className="title-name-user ">{name}</h1>
                  <div className="detail-user">
                    <p>{email}</p>
                    <p> {phone} </p>
                    <p>Has been active since 2013</p>
                  </div>
                  <div className="radio">
                    <label className="gender me-md-5">
                      Male
                      <input
                        type="radio"
                        name="Pria"
                        value={!gender ? "Pria" : gender}
                        // checked={gender === "Pria"}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <label className="gender">
                      Female
                      <input
                        type="radio"
                        name="Wanita"
                        value={!gender ? "Wanita" : gender}
                        // checked={gender === "Wanita"}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center col-lg-12">
              <div className="col-lg-12 col-md-12 justify-content-md-around d-md-flex mt-5 wrapper-btn-edit-user">
                <button className="edit-photo-user">Edit photo</button>
                <button className="edit-password-user">Edit Password</button>
              </div>
            </div>
            <form>
              <div className="row d-flex flex-row ps-5 mt-5">
                <p className="f-form-title">Contacts</p>

                <div className="col-lg-6 mb-5 d-flex flex-column">
                  <label htmlFor="email" className="f-form-label mb-3">
                    Email address :
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input f-form-input"
                    defaultValue={email}
                  />
                </div>

                <div className="col-lg-6 mb-5 d-flex flex-column ">
                  <label htmlFor="address" className="f-form-label mb-3">
                    Address :
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-input f-form-input"
                    defaultValue={!address ? "hahaha" : address}
                  />
                </div>

                <p className="f-form-title">Identity</p>

                <div className="col-lg-6 d-flex flex-column mb-5">
                  <label htmlFor="name" className="f-form-label mb-3">
                    Display name :
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input f-form-input"
                    defaultValue={name}
                  />
                </div>

                <div className="col-lg-6 d-flex flex-column mb-5">
                  <label htmlFor="date" className="f-form-label mb-3">
                    DD/MM/YY :
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-input f-form-input"
                    defaultValue={birtday}
                  />
                </div>
              </div>
            </form>

            <div className="row mb-5 p-5">
              <div className="col-lg-12 justify-content-center d-flex">
                <button
                  type="submit"
                  name="save"
                  className="btn-submit f-save-cansel mt-3">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const AppWithRedux = connect(mapStateToProps)(Profile)
export default AppWithRedux
