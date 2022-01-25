import React from "react"
import "./Profile.css"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Loading from "../../components/Loading"
import { Link } from "react-router-dom"
import photoProfile from "../../assets/images/photo-profile-default.webp"
import pencilSvg from "../../assets/icons/pencil.svg"
import axios from "axios"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import FormData from "form-data"
import Swal from "sweetalert2"

// import DataProfile from "../../components/DataProfile"

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.inputFileRef = React.createRef()
    this.scrollTop = React.createRef()
    this.onFileChange = this.handleFileChange.bind(this)
    this.onBtnClick = this.inputImage.bind(this)
  }

  state = {
    isSuccess: false,
    dataUser: {},
    selectedFile: null,
    selectedSex: "",
    photoProfile: photoProfile
  }

  getDatauser = () => {
    const userToken = this.props.auth.userData.token
    const url = "http://localhost:8000/users/detail"
    axios
      .get(url, { headers: { "x-access-token": userToken } })
      .then((res) => {
        console.log("RESPONSE", res)
        const photo = res.data.result.photo
        console.log("PHOTO", photo)
        if (photo !== null && typeof photo !== "undefined" && photo !== "")
          this.setState({
            photoProfile: `http://localhost:8000/${photo}`
          })
        this.setState({
          dataUser: res.data.result,
          isSuccess: true,
          selectedSex: res.data.result.gender
        })
      })
      .catch((err) => {
        console.log("ERROR", err)
        const errMsg = err
        toast.error(errMsg, {
          position: "top-left",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }

  getBase64(e) {
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        photoProfile: reader.result
      })
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }

  handleFileChange(e) {
    this.getBase64(e)
    this.setState({
      selectedFile: e.target.files[0]
    })
  }

  inputImage = (e) => {
    this.inputFileRef.current.click()
  }

  cancel() {
    const photo = this.state.dataUser.photo
    if (photo !== null && typeof photo !== "undefined") {
      this.setState({
        photoProfile: `http://localhost:8000${photo}`
      })
    }
    console.log("DATAUSER-CANSEL", this.state.dataUser.gender)
    this.setState({
      selectedSex: this.state.dataUser.gender
    })
  }

  onValueChange(event) {
    console.log("SEX", event.target.value)
    this.setState({
      selectedSex: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log("EVENT-BODY", e)
    const body = new FormData()
    const url = `${process.env.REACT_APP_HOST}/users/edit`
    const userToken = this.props.auth.userData.token
    // console.log(this.state.selectedFile)

    if (this.state.selectedFile !== null) {
      console.log(this.state.selectedFile)
      body.append(
        "photoUser",
        this.state.selectedFile,
        this.state.selectedFile.name
      )
    }
    body.append("name", e.target.name.value)
    body.append("email", e.target.email.value)
    body.append("gender", this.state.selectedSex)
    body.append("address", e.target.address.value)
    body.append("nohp", e.target.nohp.value)
    body.append("dob", e.target.dob.value)

    console.log("DATE-BODY", body.get("dob"))

    const config = {
      headers: {
        "x-access-token": userToken
        // content-type: "multipart/form-data"
      }
    }

    axios
      .patch(url, body, config)
      .then((response) => {
        console.log(response)
        // Swal.fire("Data Changed Successfuly !!", "", "success")
        Swal.fire({
          title: "Update Profile",
          text: "Data Changed Successfuly !!",
          icon: "success"
          // showCancelButton: true,
          // confirmButtonColor: "#3085d6",
          // cancelButtonColor: "#d33",
          // confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire("Deleted!", "Your file has been deleted.", "success")
            window.location.reload(true)
            this.getDataUser()
          }
        })
      })
      .catch((error) => {
        console.log("error", error.response)
      })
  }

  componentDidMount() {
    this.getDatauser()
    console.log("state-photo-profil", this.state.photoProfile)
    // console.log(this.scrollTop.current.scrollTo(0, 0))
    // this.scrollTop.current.scrollTo(0, 0)
  }

  render() {
    const { isSuccess, dataUser, photoProfile } = this.state
    const { id, name, phone, gender, email, birtday, address } = dataUser

    let isGender = false

    if (gender === "Pria") isGender = true
    console.log("ISGENDER", isGender, gender)
    console.log("ISSCUCCESS", isSuccess)

    return (
      <>
        <Header photoUser={photoProfile} />

        {isSuccess ? (
          <main className="row mt-lg-5">
            <div className=".d-none .d-sm-block col-sm-1"></div>
            <div className="col-12 col-sm-10">
              <div className="col-12 col-sm-10 col-md-10"></div>
              <div className="row content">
                <div
                  className="col-12 row-header"
                  style={{
                    fontFamily: `'Nunito', sans-serif`,
                    fontWeight: "900",
                    fontSize: "40px"
                  }}>
                  Profile
                </div>
                <div className="col-12 profile-info">
                  <div className="row">
                    <div className=".d-none .d-sm-block col-sm-3"></div>
                    <div className="col-12 col-sm-6 text-center d-flex flex-column align-items-center">
                      <div className="profile-image-wrapper">
                        <img
                          src={photoProfile}
                          alt="User Profile"
                          className="profile-image"
                          onClick={this.inputImage}
                        />
                        <figcaption>
                          <button
                            type="button"
                            onClick={this.inputImage}
                            className="btn-pencil">
                            <img
                              src={pencilSvg}
                              width="50px"
                              height="50px"
                              alt="Edit"
                            />
                          </button>
                        </figcaption>
                      </div>
                      <h3>{name}</h3>
                      <div className="user-info">
                        <p>
                          {email} <br />
                          {phone}
                        </p>
                      </div>
                      <div className="radio">
                        <label className="gender me-md-5">
                          Male
                          <input
                            type="radio"
                            name="gender"
                            id="gender"
                            defaultValue="Pria"
                            defaultChecked={isGender}
                            onChange={this.onValueChange.bind(this)}
                          />
                          <span className="checkmark"></span>
                        </label>
                        <label className="gender">
                          Female
                          <input
                            type="radio"
                            name="gender"
                            id="gender"
                            defaultValue="Wanita"
                            defaultChecked={!isGender}
                            onChange={this.onValueChange.bind(this)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <form
                      onSubmit={this.handleSubmit.bind(this)}
                      onReset={this.cancel.bind(this)}>
                      <div className="col-12 text-left profile-contacts">
                        <div className="contact-header col-12 text-left ms-3">
                          Contacts
                        </div>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          ref={this.inputFileRef}
                          multiple={false}
                          onChange={this.onFileChange}
                          hidden
                        />
                        <input
                          type="text"
                          name="id"
                          id="id"
                          defaultValue={id}
                          hidden
                        />
                        <div className="col-12 wrapper-input">
                          <label htmlFor="email">Email Address:</label>
                          <input
                            type="email"
                            className="input-profile"
                            name="email"
                            id="email"
                            defaultValue={email}
                          />
                        </div>
                        <div className="col-12 wrapper-input">
                          <label htmlFor="address">Address:</label>
                          <input
                            type="text"
                            className="input-profile"
                            name="address"
                            id="address"
                            defaultValue={address}
                          />
                        </div>
                        <div className="col-12 wrapper-input">
                          <label htmlFor="phone">Mobile Number:</label>
                          <input
                            type="text"
                            className="input-profile"
                            name="phone"
                            id="nohp"
                            defaultValue={phone}
                          />
                        </div>
                        <div className="contact-header col-12 text-left ms-3">
                          Identity
                        </div>
                        <div className="col-12">
                          <div className="row">
                            <div className="col-12 col-sm-6 wrapper-input">
                              <label htmlFor="display-name">
                                Display Name:
                              </label>
                              <input
                                type="text"
                                className="input-profile"
                                name="name"
                                id="name"
                                defaultValue={name}
                              />
                            </div>
                            <div className="col-12 col-sm-6 wrapper-input">
                              <label htmlFor="dob">DD/MM/YYYY:</label>
                              <input
                                type="date"
                                className="input-profile"
                                name="dob"
                                id="dob"
                                defaultValue={birtday}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                          <div className="row gx-4">
                            <div className="col-12 col-md-4 col-sm-4 wrapper-btn">
                              <button
                                type="submit"
                                className="btn-save-profile">
                                Save Change
                              </button>
                            </div>
                            <div className="col-12 col-md-4 col-sm-4 wrapper-btn">
                              <Link
                                to="/profile/forgot"
                                className="btn-edit-password">
                                Edit Password
                              </Link>
                            </div>
                            <div className="col-12 col-md-4 col-sm-4 wrapper-btn">
                              <button
                                className="btn-cansel-profile"
                                type="reset">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <Outlet /> */}
            </div>
            <div className=".d-none .d-sm-block col-sm-1"></div>
          </main>
        ) : (
          <Loading />
        )}
        <Footer />
      </>
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
