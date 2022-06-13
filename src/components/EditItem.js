import React, {
  useState,
  useCallback,
  useEffect,
  useRef
} from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import cameraIcon from "../assets/icons/camera-icon.png";
import Dropdown from "./Dropdown";
import DropDownCategory from "./DropDownCategory";
import "../pages/Vehicles/Vehicles.css";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../components/Loading/Loading";
import LoadingButton from "../components/Loading/LoadingButton";
import Swal from "sweetalert2";

import {
  getStatusApi,
  getLocationApi,
  getCategoryApi,
  getVehicleApi,
  updateVehicleApi,
  deleteVehicleApi,
  deleteCategoryApi
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
  const [idCategory, setIdcategory] = useState("");
  const [updateCategory, setUpdateCategory] = useState(false);
  const [onLoadingButton, setOnLoadingButton] = useState({
    saveButton: false,
    deleteButton: false
  });
  const back = () => history.goBack();

  // START FETCH API

  const getCategory = useCallback(() => {
    getCategoryApi()
      .then((res) => {
        setCategory(res.data.result);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERROR GET CATEGORY");
        console.log(err);
        setIsError(true);
        setIsLoading(true);
      });
  }, []);

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
        console.log("ERROR GET LOCATION");
      });
  }, []);

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
        console.log("ERROR GET STATUS");
      });
  }, []);

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
        if (Object.keys(res.data.result[0]).length) {
          const photo = res.data.result[0].photo;
          const host = process.env.REACT_APP_HOST;
          if (photo !== null) {
            setImage1(host + JSON.parse(photo)[0]);
            setImage2(host + JSON.parse(photo)[0]);
            setImage3(host + JSON.parse(photo)[0]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(true);
        console.log("ERROR GET VEHICLE");
      });
  }, [idVehicle]);

  // END FETCH API

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

  // console.log(typeof idCategory);
  const onDeleteCategory = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You will delete this vehicle category",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffcd61",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        const idPermanent = [1, 2, 3];
        const checkId = idPermanent.includes(idCategory);
        if (!checkId) {
          deleteCategoryApi(idCategory, token)
            .then((res) => {
              console.log(res);
              getCategory();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Swal.fire({
            title: "Cannot be deleted",
            icon: "info",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  };

  const onDeleteVehicle = useCallback(() => {
    setOnLoadingButton({ ...onLoadingButton, deleteButton: true });
    Swal.fire({
      title: "Are you sure ?",
      text: "This will wipe your vehicle",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ffcd61",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicleApi(idVehicle, token)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Successfuly delete vehicle",
              showConfirmButton: false,
              timer: 1500
            });
            setIsError(false);
            setIsLoading(false);
            setOnLoadingButton({
              ...onLoadingButton,
              deleteButton: false
            });
            history.push("/vehicles");
          })
          .catch((err) => {
            console.log(err);
            console.log("error delete vehicle");
            setIsError(true);
            setIsLoading(true);
            Swal.fire({
              icon: "error",
              title: "Failed to delete vehicle",
              showConfirmButton: false,
              timer: 1500
            });
          });
      } else {
        setOnLoadingButton({
          ...onLoadingButton,
          deleteButton: false
        });
      }
    });
  }, [history, idVehicle, onLoadingButton, token]);

  useEffect(() => {
    getVehicle();
    getCategory();
    getLocation();
    getStatus();
  }, [
    getCategory,
    getLocation,
    getStatus,
    getVehicle,
    updateCategory
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const handlerFileSelect = (e) => {
    const uploaded = e.target.files;
    if (uploaded.length !== 3)
      return Swal.fire({
        icon: "info",
        title: "Upload a minimum of 3 photos"
      });
    setSelectedFile(uploaded);
    setImage1(URL.createObjectURL(uploaded[0]));
    setImage2(URL.createObjectURL(uploaded[1]));
    setImage3(URL.createObjectURL(uploaded[2]));
  };

  // const handleShowModal = (newValue) => {
  //   setShowModal(newValue);
  // };

  const handlerUpdateCategory = (newValue) => {
    setUpdateCategory(newValue);
  };

  const handlerIdCategory = (newValue) => {
    setIdcategory(newValue);
  };

  const handlerSubmitData = (e) => {
    e.preventDefault();
    const data = e.target;
    const body = new FormData();

    if (selectedFile !== null) {
      [...selectedFile].map((img) => {
        return body.append("uploadPhotoVehicle", img);
      });
    }

    if (data.name.value.length !== 0) {
      body.append("name", data.name.value);
    }
    if (data.description.value.length !== 0) {
      body.append("description", data.description.value);
    }

    if (data.capacity.value.length !== 0) {
      body.append("capacity", data.capacity.value);
    }

    if (data.price.value.length !== 0) {
      body.append("price", data.price.value);
    }

    if (stock !== null && stock !== undefined && isNaN(stock)) {
      body.append("stock", stock);
    }

    let idStatus;
    status.map((data) => {
      if (Object.values(data)[1] === selectedStatus) {
        return (idStatus = Object.values(data)[0]);
      }
      return idStatus;
    });

    if (idStatus !== null && idStatus !== undefined) {
      body.append("status", idStatus);
    }

    let idLocation;
    location.map((data) => {
      if (Object.values(data)[1] === selectedLocation) {
        return (idLocation = Object.values(data)[0]);
      }
      return idLocation;
    });

    if (idLocation !== null && idLocation !== undefined) {
      body.append("location", idLocation);
    }

    let idCategory;
    category.map((data) => {
      if (Object.values(data)[1] === selectedCategory) {
        return (idCategory = Object.values(data)[0]);
      }
      return idCategory;
    });

    if (idCategory !== null && idCategory !== undefined) {
      body.append("category", idCategory);
    }

    if (
      data.name.value.length !== 0 &&
      data.description.value.length !== 0 &&
      data.price.value.length !== 0 &&
      data.capacity.value.length !== 0 &&
      stock !== undefined &&
      stock !== null &&
      idStatus !== null &&
      idStatus !== undefined &&
      idLocation !== null &&
      idLocation !== undefined &&
      idCategory !== null &&
      idCategory !== undefined
    ) {
      setOnLoadingButton({ ...onLoadingButton, saveButton: true });
      updateVehicleApi(body, token, idVehicle)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfuly update vehicle",
            showConfirmButton: false,
            timer: 1500
          });
          setOnLoadingButton({
            ...onLoadingButton,
            saveButton: false
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("GAGAL UPDATE");
    }
  };

  useEffect(() => {
    if (updateCategory) {
      getCategory();
    }
  }, [getCategory, updateCategory]);

  return (
    <>
      <Header />

      {isError || isLoading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handlerSubmitData}>
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
                      onError={() => setImage1(cameraIcon)}
                    />
                  </div>
                  <div className='col-lg-6 '>
                    <img
                      src={image2}
                      alt='icon-camera'
                      className='wrapper-img-child'
                      onError={() => setImage2(cameraIcon)}
                    />
                  </div>
                  <div className='col-lg-6'>
                    <img
                      src={image3}
                      alt='icon-camera'
                      className='wrapper-img-child'
                      onError={() => setImage3(cameraIcon)}
                    />
                  </div>
                </div>
              </div>

              <div className='col-lg-6 col-md-6 mt-lg-0'>
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
                    hidden
                  />
                  <input
                    type='file'
                    name='image'
                    id='image'
                    multiple
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
                      <label className='label-add me-5'>
                        Stock :
                      </label>
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
              </div>
            </div>
            <div className='row mt-5 d-flex justify-content-around align-items-center'>
              <div className='col-lg-4 ps-lg-5'>
                <DropDownCategory
                  selected={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  data={category}
                  onDeleteCategory={onDeleteCategory}
                  handlerUpdateCategory={handlerUpdateCategory}
                  idCategory={handlerIdCategory}
                  category={category}
                />
              </div>
              <div className='col-lg-4 d-flex justify-content-center align-items-center'>
                <button className='btn-save-item-edit-vehicle'>
                  {!onLoadingButton.saveButton ? (
                    "Save Item"
                  ) : (
                    <LoadingButton />
                  )}
                </button>
              </div>
              <div className='col-lg-4'>
                <div
                  className='btn-delete-item-edit-vehicle'
                  onClick={onDeleteVehicle}
                >
                  {!onLoadingButton.deleteButton ? (
                    "Delete"
                  ) : (
                    <LoadingButton />
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      )}

      <Footer />
    </>
  );
}

export default EditItem;
