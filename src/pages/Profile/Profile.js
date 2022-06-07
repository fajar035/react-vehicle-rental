import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Profile.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading/Loading.js";
import { Link } from "react-router-dom";
import photoProfileDefault from "../../assets/images/photo-profile-default.webp";
import pencilSvg from "../../assets/icons/pencil.svg";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { updateUserAction } from "../../redux/actions/user";
import { getUserIdApi, updateUserApi } from "../../utils/https/user.js";

function Profile(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSex, setSelectedSex] = useState("");
  const [photoProfile, setPhotoProfile] = useState(photoProfileDefault);
  const [photo404, setPhoto404] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const refScrollTop = useRef(null);
  const [changePhoto, setChangePhoto] = useState(false);

  const getDataUser = useCallback(() => {
    const userToken = auth.userData.token;
    getUserIdApi(userToken)
      .then((res) => {
        // console.log("RESPONSE", res);
        const photo = res.data.result.photo;
        // console.log("PHOTO PROFILE >>>", photo);
        if (
          photo !== null &&
          typeof photo !== "undefined" &&
          photo !== "" &&
          photo404 === false &&
          changePhoto === false
        ) {
          setPhotoProfile(process.env.REACT_APP_HOST + photo);
        }
        setDataUser(res.data.result);
        setIsSuccess(true);
        setSelectedSex(res.data.result.gender);
      })
      .catch((err) => {
        console.log("ERROR", err.response);
        if (err.response.status === 403) {
          Swal.fire({
            title: "TOKEN EXPIRED",
            text: "Please login again",
            showConfirmButton: true,
            icon: "warning",
            confirmButtonText: "Login",
          }).then(function (isConfirm) {
            props.history.push("/login");
          });
        }
        const errMsg = err;
        toast.error(errMsg, {
          position: "top-left",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [auth.userData.token, props.history, photo404, changePhoto]);

  const scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };
  const goTop = useCallback(() => {
    scrollToRef(refScrollTop);
  }, []);

  const getBase64 = useCallback((e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoProfile(reader.result);
      // console.log(photoProfile);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }, []);

  const onFileChange = useCallback(
    (e) => {
      getBase64(e);
      setSelectedFile(e.target.files[0]);
    },
    [getBase64]
  );
  // console.log(selectedFile);
  const inputImage = (e) => {
    // this.inputFileRef.current.click();
    setChangePhoto(true);
    setPhoto404(false);
    inputFileRef.current.click();
  };

  const cancel = () => {
    const photo = dataUser.photo;
    if (photo !== null && typeof photo !== "undefined") {
      setPhotoProfile(`${process.env.REACT_APP_HOST}${photo}`);
    }
    // console.log("DATAUSER-CANCEL", dataUser.gender);
    setSelectedSex(dataUser.gender);
    setChangePhoto(false);
    goTop();
  };

  const onValueChange = (event) => {
    // console.log("SEX", event.target.value);

    setSelectedSex(event.target.value);
  };

  const getPhotoPrfile = useCallback(async () => {
    // console.log(photoProfile);
    const response = await fetch(photoProfile);
    if (response.status === 404) {
      setPhotoProfile(photoProfileDefault);
      setPhoto404(true);
    }
  }, [photoProfile]);

  useEffect(() => {
    getDataUser();
    getPhotoPrfile();
  }, [getDataUser, getPhotoPrfile]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // console.log("EVENT BODY", e);

      const body = new FormData();
      const userToken = auth.userData.token;

      if (selectedFile !== null) {
        // console.log("SELECTED FILE", selectedFile);
        body.append("photoUser", selectedFile, selectedFile.name);
      }
      body.append("name", e.target.name.value);
      body.append("email", e.target.email.value);
      body.append("gender", selectedSex);
      body.append("address", e.target.address.value);
      body.append("nohp", e.target.nohp.value);
      body.append("dob", e.target.dob.value);

      updateUserApi(body, userToken)
        .then((response) => {
          // console.log(response);
          // Swal.fire("Data Changed Successfuly !!", "", "success")
          Swal.fire({
            title: "Update Profile",
            text: "Data Changed Successfuly !!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              // Swal.fire("Deleted!", "Your file has been deleted.", "success")
              // window.location.reload(true)
              getDataUser();
              dispatch(updateUserAction(userToken));
              setChangePhoto(false);
              goTop();
            }
          });
        })
        .catch((error) => {
          console.log("error", error.response);
        });
    },
    [
      auth.userData.token,
      getDataUser,
      goTop,
      selectedFile,
      selectedSex,
      dispatch,
    ]
  );

  // const { isSuccess, dataUser, photoProfile } = this.state;
  // const { id, name, phone, gender, email, birtday, address } = dataUser;

  let isGender = false;

  if (dataUser.gender === "Pria") isGender = true;
  // console.log("ISGENDER", isGender, dataUser.gender);
  // console.log("ISSCUCCESS", isSuccess);

  return (
    <>
      <div ref={refScrollTop}></div>
      <Header photoUser={photo404 ? photoProfileDefault : photoProfile} />

      {isSuccess ? (
        <main className="row mt-lg-5 mb-5">
          <div className=".d-none .d-sm-block col-sm-1"></div>
          <div className="col-12 col-sm-10">
            <div className="col-12 col-sm-10 col-md-10"></div>
            <div className="row content">
              <div
                className="col-12 row-header"
                style={{
                  fontFamily: `'Nunito', sans-serif`,
                  fontWeight: "900",
                  fontSize: "40px",
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
                        onClick={inputImage}
                      />
                      <figcaption>
                        <button
                          type="button"
                          onClick={inputImage}
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
                    <h3>{dataUser.name}</h3>
                    <div className="user-info">
                      <p>
                        {dataUser.email} <br />
                        {dataUser.phone}
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
                          onChange={onValueChange}
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
                          onChange={onValueChange}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} onReset={cancel}>
                    <div className="col-12 text-left profile-contacts">
                      <div className="contact-header col-12 text-left ms-3">
                        Contacts
                      </div>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        ref={inputFileRef}
                        multiple={false}
                        onChange={onFileChange}
                        hidden
                      />
                      <input
                        type="text"
                        name="id"
                        id="id"
                        defaultValue={dataUser.id}
                        hidden
                      />
                      <div className="col-12 wrapper-input">
                        <label htmlFor="email">Email Address:</label>
                        <input
                          type="email"
                          className="input-profile"
                          name="email"
                          id="email"
                          defaultValue={dataUser.email}
                        />
                      </div>
                      <div className="col-12 wrapper-input">
                        <label htmlFor="address">Address:</label>
                        <input
                          type="text"
                          className="input-profile"
                          name="address"
                          id="address"
                          defaultValue={dataUser.address}
                        />
                      </div>
                      <div className="col-12 wrapper-input">
                        <label htmlFor="phone">Mobile Number:</label>
                        <input
                          type="text"
                          className="input-profile"
                          name="phone"
                          id="nohp"
                          defaultValue={dataUser.phone}
                        />
                      </div>
                      <div className="contact-header col-12 text-left ms-3">
                        Identity
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 col-sm-6 wrapper-input">
                            <label htmlFor="display-name">Display Name:</label>
                            <input
                              type="text"
                              className="input-profile"
                              name="name"
                              id="name"
                              defaultValue={dataUser.name}
                            />
                          </div>
                          <div className="col-12 col-sm-6 wrapper-input">
                            <label htmlFor="dob">DD/MM/YYYY:</label>
                            <input
                              type="date"
                              className="input-profile"
                              name="dob"
                              id="dob"
                              defaultValue={dataUser.birtday}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <div className="row gx-4">
                          <div className="col-12 col-md-4 col-sm-4 wrapper-btn">
                            <button type="submit" className="btn-save-profile">
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
                            <button className="btn-cansel-profile" type="reset">
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
  );
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUserDispatch: () => {
//       dispatch(updateUserAction());
//     }
//   };
// };

// const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default Profile;
