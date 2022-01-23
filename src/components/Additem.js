import React, { Component } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { Link } from "react-router-dom"

export class Additem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      price: 70,
      vehiclesBike: [],
      selectValueCategory: "Choose Category",
      selectValueStatus: "Select Status",
      selectedFile: null
    }
    this.handleDropdownChangeCategory =
      this.handleDropdownChangeCategory.bind(this)

    this.handleDropdownChangeStatus = this.handleDropdownChangeStatus.bind(this)
  }

  handleDropdownChangeCategory(e) {
    this.setState({ ...this.state, selectValueCategory: e.target.value })
  }

  handleDropdownChangeStatus(e) {
    this.setState({ ...this.state, selectValueStatus: e.target.value })
  }

  onClickPrev = () => {
    const price = this.state.price
    const number = this.state.counter
    this.setState({
      ...this.state,
      counter: number - 1,
      price: price / 2
    })
  }

  onClickNext = () => {
    const number = this.state.counter
    const price = this.state.price
    this.setState({
      ...this.state,
      counter: number + 1,
      price: price * 2
    })
  }

  onFileChange = (e) => {
    this.setState({
      ...this.state,
      selectedFile: e.target.files[0]
    })
  }

  submitAddItem = (e) => {
    e.preventDefault()
    // const body = {
    //   email: e.target.email.value,
    //   password: e.target.password.value
    // }
  }

  render() {
    console.log("SELECT-FILE-IMAGE-UPLOAD", this.state.selectedFile)
    return (
      <>
        <Header />

        <div className="row mt-5 ms-lg-5 d-lg-flex justify-content-lg-center container-main mb-lg-5">
          <div className="col-lg-12 p-0 mb-5">
            <div className="col-lg-3 mb-5 d-flex flex-row align-items-center wrapper-link-detail">
              <Link to={`/`} className="link-detail-0">
                <i className="fas fa-chevron-left fs-2"></i>
                <p className="ms-4 link-detail">Add New Item</p>
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-5">
            <div className="col-lg-5 wrapper-img-upload">
              <input
                type="file"
                onChange={this.onFileChange}
                className=" input-img-additem d-none"
              />
            </div>
          </div>

          {/* Form input */}
          <div className="col-lg-6 col-md-6 mt-lg-0">
            <div className="col-lg-9 d-flex flex-column">
              <input
                className="input-add"
                placeholder="Name (max up to 50 words)"
              />
              <input className="input-add" placeholder="Location" />
              <input
                className="input-add"
                placeholder="Description (max up to 150 words)"
              />
              <label className="label-add">Price:</label>
              <input
                className="dropwdown-status"
                placeholder="Type the price"
              />
              <label className="label-add">Status:</label>
              <select
                className="dropwdown-status p-2 "
                defaultValue={this.state.selectValueStatus}
                onChange={this.handleDropdownChangeStatus}
                name="location">
                <option defaultValue={this.state.selectValueStatus}>
                  Select Status
                </option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            <div className="col-lg-9 mt-5">
              <div className="row">
                <div className="col-lg-6 ">
                  <label className="label-add me-5">Stock :</label>
                </div>
                <div className="col-lg-6 d-flex flex-row justify-content-around align-items-center">
                  <button className="btn-minus-add" onClick={this.onClickPrev}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <p className="number-add">{this.state.counter}</p>
                  <button className="btn-plus-add" onClick={this.onClickNext}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-5">
              <select
                className="dropwdown-category p-2 ms-3"
                defaultValue={this.state.selectValueCategory}
                onChange={this.handleDropdownChangeCategory}
                name="location">
                <option defaultValue={this.state.selectValueCategory}>
                  Choose Category
                </option>
                <option value="Bike">Bike</option>
                <option value="Motorbike">Motor Bike</option>
                <option value="Cars">Cars</option>
              </select>
            </div>
            <div className="col-lg-7">
              <button className="btn-save-item">Save Item</button>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }
}

export default Additem
