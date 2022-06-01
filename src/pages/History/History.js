import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./History.css";
import { getHistoryApi, deleteHistoryApi } from "../../utils/https/history";
import { getUserIdApi } from "../../utils/https/user";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import defaultImage from "../../assets/images/vehicle-default.jpg";

function History(props) {
  const token = useSelector((state) => state.auth.userData.token);
  const [dataHistory, setDataHistory] = useState([]);
  const [userData, setUserData] = useState({});
  const [isOk, setIsOk] = useState(false);
  const [checked, setChecked] = useState([]);
  const [notLogin, setNotLogin] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [selectItem, setSelectItem] = useState([]);

  // add/remove checked item from list
  const handleCheck = (event) => {
    // console.log(event.target.value);
    let updateList = [...checked];
    if (event.target.checked) {
      updateList = [...checked, event.target.checked];
      setSelectItem(event.target.value);
    } else {
      updateList.splice(checked.indexOf(event.target.value), 1);
      setSelectItem(null);
    }
    setChecked(updateList);
    setOnDelete(true);
  };
  // console.log("check item", checked);

  const getUser = useCallback(() => {
    if (Object.keys(userData).length === 0) {
      getUserIdApi(token)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setUserData(res.data.result);
            setNotLogin(false);
          }
        })
        .catch((err) => {
          console.log(err.response.data.err);
          if (err.response.status === 403) {
            setNotLogin(true);
          }
        });
    }
  }, [token, userData]);

  const getHistory = useCallback(() => {
    if (Object.keys(userData).length !== 0) {
      getHistoryApi(userData.id, token)
        .then((res) => {
          setDataHistory(res.data.result);
          setNotLogin(false);
          setIsNull(false);
          setIsOk(true);
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 403 && err !== undefined) {
            setNotLogin(true);
          }
          if (err.response.status === 400 && err !== undefined) {
            setNotLogin(false);
            setIsNull(true);
            setIsOk(true);
          }
        });
    }
  }, [userData, token, setIsNull]);

  // console.log("HISTORY - DATA", dataHistory);
  // console.log("ISNULL", isNull);

  useEffect(() => {
    if (notLogin) {
      Swal.fire({
        title: "You are not logged in, please login first",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });

      return props.history.push("/");
    }
  }, [props.history, notLogin]);
  // console.log("CHECKLIST", checked);
  // console.log("SELECT ITEM", selectItem);

  const deleteHistory = () => {
    if (checked.length !== 1 || !onDelete) {
      setOnDelete(false);
      return Swal.fire({
        title: "Please delete 1 vehicle item",
        icon: "warning",
      });
    }
    // console.log("SELECT ITEM", selectItem);
    // console.log("ON DELETE", onDelete);
    if (checked.length === 1 && onDelete) {
      const idHistory = dataHistory[selectItem].id;
      deleteHistoryApi(idHistory, token)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: res.data.message,
            icon: "success",
            showConfirmButton: true,
          }).then((isConfirm) => {
            setOnDelete(false);
            setChecked([]);
            setSelectItem([]);
            getHistory();
            return window.scrollTo({
              top: 0,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // console.log("MODE DELETE > ", onDelete);
  // console.log("CHECKED", checked);

  useEffect(() => {
    if (checked.length === 0) {
      setOnDelete(false);
    }
  }, [checked.length]);

  useEffect(() => {
    getUser();
    getHistory();
    return window.scrollTo({
      top: 0,
    });
  }, [getHistory, getUser]);

  return (
    <>
      <Header />
      {isOk ? (
        <div className="row mb-5">
          <div className="col-lg-9 col-md-6 m-0 p-0 d-flex">
            <div className="container-fluid m-0 p-0 ">
              {/* Search */}
              <div className="row ms-4 mb-4">
                {/* Form */}
                <div className="col-lg-10 col-md-4">
                  <div className="col-lg-12 col-sm-12 col-md-12 border rounded-3 mt-5 container-input">
                    <input
                      typeof="search"
                      className="input-search-type-history"
                      placeholder="Search vehicle (ex. cars, cars name)"
                    />
                    <button
                      typeof="submit"
                      className="btn-search-type float-end"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                {/* Radio button */}
                <div className="col-lg-2 d-flex align-self-end flex-column">
                  <label
                    className="form-check-label d-flex justify-content-center mb-3"
                    htmlFor="flexCheckDefault"
                  >
                    Select
                  </label>
                  <div className="form-check d-flex justify-content-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                </div>
              </div>

              {/* filter */}
              <div className="row ms-2">
                <div className="col-lg-3">
                  {" "}
                  <select
                    className="input-select dropdown-toggle p-2 ms-3 filter-history"
                    // value={this.state.selectValue}
                    // onChange={this.handleDropdownChange}
                    name="location"
                  >
                    <option disabled>Filter</option>
                    <option defaultValue="type">Type</option>
                    <option defaultValue="data-added">Date Added</option>
                    <option defaultValue="name">Name</option>
                    <option defaultValue="favorit">Favorite Product</option>
                  </select>
                </div>
              </div>

              <div className="row ms-4 mb-4">
                <div className="line-history"></div>
                <p className="week-history">A Week Ago</p>
              </div>

              {/* Card history */}

              {isNull ? (
                <div className="row h-50">
                  <div className="col-lg-12 d-flex justify-content-center align-items-center ">
                    <h1 className="text-datanull">
                      Your history doesn't exist yet
                    </h1>
                  </div>
                </div>
              ) : (
                dataHistory.length !== 0 &&
                dataHistory.map((item, idx) => {
                  const date_return = item.return_date;
                  const date_booking = item.booking_date;
                  const dateArr_booking = date_booking.split("-");
                  const dateArr_return = date_return.split("-");
                  const tanggal_return = dateArr_return[2].slice(0, 2);
                  const tanggal_booking = dateArr_booking[2].slice(0, 2);
                  const tahun_return = dateArr_return[0];
                  const photo = JSON.parse(item.photo);

                  return (
                    <div key={idx} className="row">
                      <div className="col-lg-4 p-5">
                        <div className="wrapper-img-history rounded-3">
                          <img
                            src={
                              photo !== null && photo.length !== 0
                                ? process.env.REACT_APP_HOST + photo[0]
                                : defaultImage
                            }
                            alt="vehicle"
                            className="image-vehicle"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 p-5">
                        <div className="wrapper-detail-history">
                          <p className="title-history-detail">{item.vehicle}</p>
                          <p className="date-history-detail">{`${tanggal_booking} To ${tanggal_return} ${tahun_return}`}</p>
                          <p className="prepayment-history-detail">
                            Prepayment : Rp. {item.price}
                          </p>
                          {/* <p className="status-history-detail">
                            Has Been Return
                          </p> */}
                        </div>
                      </div>
                      <div className="col-lg-2  d-flex justify-content-center align-items-center">
                        <div className="form-check ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={idx}
                            onChange={handleCheck}
                            id="historyId"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div className="row ">
                <div
                  className="col-lg-12 position-relative d-flex justify-content-center align-items-center"
                  style={{ "margin-bottom": 200 }}
                >
                  <div
                    className={
                      onDelete
                        ? "btn-delete-history"
                        : "btn-delete-history-disable"
                    }
                    onClick={deleteHistory}
                  >
                    <p className="p-0 m-3">Delete History</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3  wrapper-new-arival">
            <div className="conainer-fluid">
              <div className="row">
                <div className="col-lg-12 d-flex align-items-center justify-content-center  new-arival">
                  New Arival
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </>
  );
}

export default History;
