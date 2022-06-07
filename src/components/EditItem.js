import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import cameraIcon from "../assets/icons/camera-icon.png";
import Dropdown from "./Dropdown";
import DropDownCategory from "./DropDownCategory";
import "../pages/Vehicles/Vehicles.css";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../components/Loading/Loading";
import Swal from "sweetalert2";

import {
  getStatusApi,
  getLocationApi,
  getCategoryApi,
  getVehicleApi,
  updateVehicleApi
} from "../utils/https/vehicles";

function EditItem(props) {
  const locationProps = useLocation();
  const idVehicle = locationProps.state.id;
  const token = useSelector((state) => state.auth.userData.token);
  const history = useHistory();
  const inputFileRef = useRef(null);
  const [stock, setStock] = useState(1);
  const [vehicle, setVehicle] = useState({});
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image1, setImage1] = useState(cameraIcon);
  const [image2, setImage2] = useState(cameraIcon);
  const [image3, setImage3] = useState(cameraIcon);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const log = console.log;
  const back = () => history.goBack();
  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);

  const handleShowModal = (newValue) => {
    setShowModal(newValue);
  };

  // START FETCH API

  const getCategory = useCallback(() => {
    getCategoryApi()
      .then((res) => {
        setCategory(res.data.result);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        log("ERROR GET CATEGORY");
        setIsError(true);
        setIsLoading(true);
      });
  }, [log]);

  const getLocation = useCallback(() => {
    getLocationApi()
      .then((res) => {
        setLocation(res.data.result);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(true);
        log("ERROR GET LOCATION");
      });
  }, [log]);

  const getStatus = useCallback(() => {
    getStatusApi()
      .then((res) => {
        setStatus(res.data.result);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(true);
        log("ERROR GET STATUS");
      });
  }, [log]);

  const getVehicle = useCallback(() => {
    getVehicleApi(idVehicle)
      .then((res) => {
        setIsError(false);
        setIsLoading(false);
        setVehicle(res.data.result[0]);
        setSelectedStatus(res.data.result[0].status);
        setSelectedLocation(res.data.result[0].location);
        setSelectedCategory(res.data.result[0].category);
        const stockVehicle = res.data.result[0].stock;
        if (stockVehicle !== null) {
          setStock(res.data.result[0].stock);
        } else {
          setStock(0);
        }
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(true);
        log("ERROR GET VEHICLE");
      });
  }, [idVehicle, log]);

  const onDeleteVehicle = (idVehicle, token) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You will delete this vehicle",
      icon: "warning",
      showCancelButton: true
    });
  };

  const onDeleteCategory = (idCategory, token) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You will delete this vehicle category",
      icon: "warning",
      showCancelButton: true
    });
  };

  // END FETCH API

  const getPhoto = useCallback(() => {
    if (Object.keys(vehicle).length !== 0) {
      const photo = JSON.parse(vehicle.photo);
      const host = process.env.REACT_APP_HOST;
      if (photo !== null) {
        setImage1(host + photo[0]);
        setImage2(host + photo[1]);
        setImage3(host + photo[2]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle]);

  const onClickPrev = () => {
    const number = stock;
    if (stock !== 0) {
      setStock(number - 1);
    }
  };

  const onClickNext = () => {
    const number = parseInt(stock);
    setStock(number + 1);
  };

  // const handleChangeCategory = (e) => {
  //   setSelectedCategory(e.target.value);
  // };

  // const handleChangeLocation = (e) => {
  //   setSelectedLocation(e.target.value);
  // };

  // const handleChangeStatus = (e) => {
  //   setSelectedStatus(e.target.value);
  // };

  const handlerFileSelect = (e) => {
    const uploaded = e.target.files;
    if (uploaded.length !== 3)
      return Swal.fire({
        icon: "warning",
        title: "Minimal 3 foto upload"
      });
    setSelectedFile(uploaded);
    setImage1(URL.createObjectURL(uploaded[0]));
    setImage2(URL.createObjectURL(uploaded[1]));
    setImage3(URL.createObjectURL(uploaded[2]));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    getVehicle();
    getCategory();
    getLocation();
    getStatus();
  }, [getCategory, getLocation, getStatus, getVehicle]);

  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  return (
    <>
      <Header />

      {isError || isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='row mt-5 ms-lg-5 d-lg-flex justify-content-lg-around container-main mb-lg-5'>
            <div className='col-lg-12 p-0 mb-5'>
              <div
                className='col-lg-3 mb-5 d-flex flex-row align-items-center wrapper-link-detail'
                onClick={back}
              >
                <div className='link-detail '>
                  <i className='fas fa-chevron-left fs-2'></i>
                  <p className='ms-4 link-detail'>Edit Item</p>
                </div>
              </div>
            </div>

            <div className='col-lg-6 col-md-5 wrapper-img-upload'>
              <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-lg-12 img-upload '>
                  <img
                    src={image1}
                    alt='icon-camera'
                    className='camera-btn-input'
                    multiple
                    onClick={() => inputFileRef.current.click()}
                  />
                </div>
                <div className='col-lg-6 '>
                  <img
                    src={image2}
                    alt='icon-camera'
                    className='wrapper-img-child'
                    // onClick={() => inputFileRef2.current.click()}
                  />
                </div>
                <div className='col-lg-6'>
                  <img
                    src={image3}
                    alt='icon-camera'
                    className='wrapper-img-child'
                    // onClick={() => inputFileRef3.current.click()}
                  />
                </div>
              </div>
            </div>

            <form
              // onSubmit={this.submitEditItem}
              className='col-lg-6 col-md-6 mt-lg-0'
            >
              <div className='col-lg-9 d-flex flex-column'>
                <input
                  type='file'
                  name='image'
                  id='image'
                  multiple
                  ref={inputFileRef}
                  onChange={handlerFileSelect}
                  hidden
                />
                <input
                  type='file'
                  name='image'
                  id='image'
                  multiple
                  // ref={inputFileRef2}
                  // onChange={handlerFileSelect2}
                  hidden
                />
                <input
                  type='file'
                  name='image'
                  id='image'
                  multiple
                  // ref={inputFileRef3}
                  // onChange={handlerFileSelect3}
                  hidden
                />
                <input
                  className='input-add'
                  id='name'
                  defaultValue={vehicle.name}
                  placeholder='Name (max up to 50 words)'
                />
                <input
                  className='input-add'
                  id='description'
                  defaultValue={vehicle.description}
                  placeholder='Description (max up to 150 words)'
                />
                <input
                  id='price'
                  className='input-add'
                  defaultValue={vehicle.price}
                  placeholder='Price'
                />
                <input
                  className='input-add'
                  id='capacity'
                  defaultValue={vehicle.capacity}
                  placeholder='Capacity Vehicle'
                />

                <label className='label-add'>Status:</label>

                <Dropdown
                  selected={selectedStatus}
                  setSelected={setSelectedStatus}
                  data={status}
                />

                <label className='label-add'>Location:</label>

                <Dropdown
                  selected={selectedLocation}
                  setSelected={setSelectedLocation}
                  data={location}
                />
              </div>
              <div className='col-lg-9 mt-5'>
                <div className='row'>
                  <div className='col-lg-6 '>
                    <label className='label-add me-5'>Stock :</label>
                  </div>
                  <div className='col-lg-6 d-flex flex-row justify-content-around align-items-center'>
                    <div
                      className='btn-minus-add d-flex justify-content-center align-items-center'
                      onClick={onClickPrev}
                    >
                      <i className='fas fa-minus'></i>
                    </div>
                    <p className='number-add'>{stock}</p>
                    <div
                      className='btn-plus-add d-flex justify-content-center align-items-center'
                      onClick={onClickNext}
                    >
                      <i className='fas fa-plus'></i>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='row mt-5 d-flex justify-content-around align-items-center'>
            <div className='col-lg-4 ps-lg-5'>
              {/* <select
                className='dropwdown-category-add-vehicle p-2 ms-3'
                edititem={selectedCategory}
                onChange={handleChangeCategory}
                name='category'
                id='category'
              >
                <option value={selectedCategory}>Add item To</option>
                {category.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.category}
                    </option>
                  );
                })}
              </select> */}
              <DropDownCategory
                selected={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                data={category}
                show={showModal}
                onChange={handleShowModal}
                onDeleteCategory={onDeleteCategory}
              />
            </div>
            <div className='col-lg-4 d-flex justify-content-center align-items-center'>
              <button className='btn-save-item-edit-vehicle'>Save Item</button>
            </div>
            <div className='col-lg-4'>
              <button
                className='btn-delete-item-edit-vehicle'
                onClick={onDeleteVehicle}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default EditItem;
