import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import cameraIcon from "../assets/icons/camera-icon.png";
import "../pages/Vehicles/Vehicles.css";
import { connect } from "react-redux";
import {
  getStatusApi,
  getLocationApi,
  getCategoryApi,
  addVehicleApi
} from "../utils/https/vehicles";
// import { toast } from "react-toastify"
import Swal from "sweetalert2";

export class Additem extends Component {
  constructor(props) {
    super(props);
    this.inputFileRef = React.createRef();
    this.inputFileSelectHandler = this.handleFileChange.bind(this);
    this.handleDropdownChangeCategory =
      this.handleDropdownChangeCategory.bind(this);
    this.handleDropdownChangeStatus =
      this.handleDropdownChangeStatus.bind(this);
    this.handleDropdownChangeLocation =
      this.handleDropdownChangeLocation.bind(this);
  }

  state = {
    stock: 1,
    vehiclesBike: [],
    selectValueCategory: "",
    selectValueStatus: "",
    selectValueLocation: "",
    location: [],
    status: [],
    category: [],
    selectedFile: [],
    isSuccess: false,
    imgUpload: cameraIcon,
    isError: false
  };

  getCategory = () => {
    getCategoryApi()
      .then((res) => {
        this.setState({
          category: res.data.result
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStatus = () => {
    getStatusApi()
      .then((res) => {
        this.setState({
          status: res.data.result
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLocation = () => {
    getLocationApi()
      .then((res) => {
        this.setState({
          location: res.data.result
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCategory();
    this.getStatus();
    this.getLocation();
  }

  handleDropdownChangeCategory(e) {
    this.setState({ ...this.state, selectValueCategory: e.target.value });
  }

  handleDropdownChangeStatus(e) {
    this.setState({ ...this.state, selectValueStatus: e.target.value });
  }

  handleDropdownChangeLocation(e) {
    this.setState({ ...this.state, selectValueLocation: e.target.value });
  }

  onClickPrev = () => {
    const number = this.state.stock;
    if (this.state.stock !== 0) {
      this.setState({
        stock: number - 1
      });
    }
  };

  onClickNext = () => {
    const number = this.state.stock;
    this.setState({
      stock: number + 1
    });
  };

  getBase64(e) {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        imgUpload: reader.result
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  handleFileChange(e) {
    this.getBase64(e);
    this.setState({
      // selectedFile: [...this.state.selectedFile, ...e.target.files]
      selectedFile: [e.target.files]
    });
  }

  inputImage = (e) => {
    this.inputFileRef.current.click();
  };

  submitAddItem = (e) => {
    e.preventDefault();
    const token = this.props.auth.userData.token;
    const body = new FormData();
    // const url = process.env.REACT_APP_HOST + "/vehicles"
    // const userToken = this.props.auth.userData.token
    const vehicleImg = this.state.selectedFile;

    if (this.state.selectedFile !== null) {
      [...vehicleImg].forEach((img) => {
        body.append("uploadPhotoVehicle", img);
      });
    }

    if (this.state.name !== null) {
      body.append("name", e.target.name.value);
    }
    if (this.state.description !== null) {
      body.append("description", e.target.description.value);
    }
    if (this.state.capacity !== null) {
      body.append("capacity", e.target.capacity.value);
    }
    if (this.state.price !== null) {
      body.append("price", e.target.price.value);
    }
    // body.append("stock", this.state.stock);
    if (this.state.category !== null) {
      body.append("category", e.target.category.value);
    }
    if (this.state.location !== null) {
      body.append("location", e.target.location.value);
    }
    if (this.state.status !== null) {
      body.append("status", e.target.status.value);
    }

    if (
      this.state.selectedFile !== null &&
      this.state.name !== null &&
      this.state.description !== null &&
      this.state.capacity !== null &&
      this.state.price !== null &&
      this.state.capacity !== null &&
      this.state.category !== null &&
      this.state.location !== null &&
      this.state.status !== null
    ) {
      addVehicleApi(body, token)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully added vehicle",
            showConfirmButton: false,
            timer: 1500
          });
          return this.props.history.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ERROR",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }

    // console.log(body);
  };

  render() {
    // console.log("SELECT-IMG", this.state.selectedFile)

    const { imgUpload } = this.state;
    const category = this.state.category;
    const status = this.state.status;
    const location = this.state.location;

    return (
      <>
        <Header />

        <div className="row mt-5 ms-lg-5 d-lg-flex justify-content-lg-around container-main mb-lg-5">
          <div className="col-lg-12 p-0 mb-5">
            <div className="col-lg-3 mb-5 d-flex flex-row align-items-center wrapper-link-detail">
              <Link to={`/`} className="link-detail-0">
                <i className="fas fa-chevron-left fs-2"></i>
                <p className="ms-4 link-detail">Add New Item</p>
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-5  wrapper-img-upload">
            <div className="col-lg-10  ">
              <img
                src={imgUpload}
                alt="icon-camera"
                className="camera-btn-input"
                multiple
                onClick={this.inputImage}
              />
            </div>
          </div>
          <form
            onSubmit={this.submitAddItem}
            className="col-lg-6 col-md-6 mt-lg-0">
            <div className="col-lg-9 d-flex flex-column">
              <input
                type="file"
                name="image"
                id="image"
                multiple
                ref={this.inputFileRef}
                onChange={this.inputFileSelectHandler}
                hidden
              />
              <input
                className="input-add"
                id="name"
                placeholder="Name (max up to 50 words)"
              />
              <input
                className="input-add"
                id="description"
                placeholder="Description (max up to 150 words)"
              />
              <input id="price" className="input-add" placeholder="Price" />
              <input
                className="input-add"
                id="capacity"
                placeholder="Capacity Vehicle"
              />

              <label className="label-add">Status:</label>
              <select
                className="dropwdown-status p-2 "
                additem={this.state.selectValueStatus}
                onChange={this.handleDropdownChangeStatus}
                name="status"
                id="status">
                <option value={this.state.selectValueStatus}>
                  Select Status
                </option>

                {status.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.status}
                    </option>
                  );
                })}
              </select>

              <label className="label-add">Location:</label>
              <select
                className="dropwdown-status p-2 "
                additem={this.state.selectValueLocation}
                onChange={this.handleDropdownChangeLocation}
                name="location"
                id="location">
                <option value={this.state.selectValueLocation}>
                  Select Location
                </option>
                {location.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.location}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-lg-9 mt-5">
              <div className="row">
                <div className="col-lg-6 ">
                  <label className="label-add me-5">Stock :</label>
                </div>
                <div className="col-lg-6 d-flex flex-row justify-content-around align-items-center">
                  <div
                    className="btn-minus-add d-flex justify-content-center align-items-center"
                    onClick={this.onClickPrev}>
                    <i className="fas fa-minus"></i>
                  </div>
                  <p className="number-add">{this.state.stock}</p>
                  <div
                    className="btn-plus-add d-flex justify-content-center align-items-center"
                    onClick={this.onClickNext}>
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5 ">
              <div className="col-lg-6">
                <select
                  className="dropwdown-category-add-vehicle p-2 ms-3"
                  additem={this.state.selectValueCategory}
                  onChange={this.handleDropdownChangeCategory}
                  name="category"
                  id="category">
                  <option value={this.state.selectValueCategory}>
                    Add item To
                  </option>
                  {category.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-lg-6">
                <button className="btn-save-item-add-vehicle">Save Item</button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const AppWithRedux = connect(mapStateToProps, null)(Additem);
export default AppWithRedux;
