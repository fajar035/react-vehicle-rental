/* eslint-disable no-extend-native */
import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/images/vehicle-default.jpg";
import { numberToRupiah } from "../../utils/helper/currency";
import {
  getVehicleApi,
  getVehiclePopularIdApi,
} from "../../utils/https/vehicles";
import { getUserIdApi } from "../../utils/https/user";
import "./Reservation.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Reservation(props) {
  const token = useSelector((state) => state.auth.userData.token);
  const [vehicleBike, setVehicleBike] = useState([]);
  const [userData, setUserData] = useState({});
  const [stock, setStock] = useState(1);
  const [photo, setPhoto] = useState([]);
  const id = props.location.state.id;
  const [startDate, setStartDate] = useState(new Date());
  const [day, setDay] = useState("");
  const isPopular = props.location.state.popular;

  // console.log("path", props.location.state.popular);

  const onClickPrev = () => {
    setStock(stock !== 1 ? stock - 1 : 1);
  };

  const onClickNext = () => {
    setStock(stock < vehicleBike.stock ? stock + 1 : stock);
  };

  const getBike = useCallback(() => {
    if (isPopular) {
      getVehiclePopularIdApi(id)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setVehicleBike(res.data.result[0]);
            setPhoto(JSON.parse(res.data.result[0].photo));
            // setStock(parseInt(res.data.result[0].stock));
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      getVehicleApi(id)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setVehicleBike(res.data.result[0]);
            setPhoto(JSON.parse(res.data.result[0].photo));
            // setStock(parseInt(res.data.result[0].stock));
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [id, isPopular]);

  const getUser = useCallback(() => {
    getUserIdApi(token)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setUserData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [token]);

  const onChangeDay = (e) => {
    // console.log(e);
    setDay(e.target.value);
  };

  useEffect(() => {
    if (token.length === 0) {
      Swal.fire({
        title: "You are not logged in, please login first",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });

      return props.history.push("/");
    }
  }, [token.length, props.history]);

  useEffect(() => {
    getUser();
    getBike();
  }, [getBike, getUser]);

  const dateLocal = (iso8601) => {
    const date = new Date(iso8601).toString();
    const newDate = new Date(date);
    const day = ("0" + newDate.getDate()).slice(-2);
    const mnth = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    return [day, mnth, year].join("-");
  };
  // setSelectDate(dateLocal(date));

  // console.log(dateLocal(startDate));

  const startAndReturnDate = (date, day) => {
    // console.log("DAY", day.length);
    const dateApi = dateLocal(date);
    let dateArr = dateApi.split("-");
    // console.log("START DATE", dateApi);
    Array.prototype.move = function (from, to) {
      this.splice(to, 0, this.splice(from, 1)[0]);
      return this;
    };
    dateArr.move(2, 0);
    dateArr.move(1, 2);
    const newDate = dateArr.join("-");
    let someDate = new Date(newDate);
    someDate.setDate(someDate.getDate() + parseInt(day, 10));
    const returnDate = dateLocal(someDate);
    // console.log("RETURN DATE", returnDate);
    const dataDate = {
      startDate: dateApi,
      returnDate: returnDate,
    };
    return dataDate;
  };

  // console.log("VEHICLE", vehicleBike);
  // console.log("USER", userData);

  const dataForApi = {
    id_users: userData.id,
    id_vehicles: vehicleBike.id,
    qty: stock,
    start_date: startAndReturnDate(startDate, day).startDate,
    return_date: startAndReturnDate(startDate, day).returnDate,
    price: numberToRupiah(vehicleBike.price * stock * day),
  };
  // console.log(userData);

  const onSubmitPayment = () => {
    if (day.length === 0) {
      Swal.fire({
        title: "Please fill in the planned date and day of booking",
        icon: "warning",
      });
    } else {
      // console.log("DATA FOR API", dataForApi);
      // console.log(props.history);
      return props.history.push("/vehicles/payment", {
        dataForApi: dataForApi,
        isPopular: isPopular,
      });
    }
  };

  return (
    <>
      <Header />

      <div className="row mt-5 ms-lg-5 d-md-flex justify-content-md-center container-main mb-lg-5 ">
        <div className="col-lg-12 p-0 ">
          <div className="col-lg-4 mb-5 d-flex flex-row align-items-center wrapper-link-detail">
            <Link to="/vehicles" className="link-detail-0 ">
              <i className="fas fa-chevron-left fs-2"></i>
            </Link>
            <p className="ms-4 link-detail">Reservation</p>
          </div>
        </div>
        <div className="col-lg-6 p-3 d-flex justify-content-center">
          <div className="wrapper-image">
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photo[0]
                  : defaultImage
              }
              alt="vehicle"
              className="img-vehicle"
            />
          </div>
        </div>
        <div className="col-lg-6 p-3 mb-3">
          <div className="wrapper-form">
            <h1 className="title-detail">
              {vehicleBike.name} <br />
              <span className="detail-title-location">
                {vehicleBike.location}
              </span>
            </h1>

            <p className="no-pre">No Prepayment</p>

            <div className="d-flex flex-row justify-content-between align-items-center  mt-5 mb-5 col-5">
              <button className="btn-minus-reservation" onClick={onClickPrev}>
                <i className="fas fa-minus"></i>
              </button>
              <p className="stock-reservation">{stock}</p>
              <button className="btn-plus-reservation" onClick={onClickNext}>
                <i className="fas fa-plus"></i>
              </button>
            </div>

            <p className="date-reservation">Reservation Date :</p>

            <DatePicker
              className="datePicker"
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Date"
            />
            <select className="datePicker" onChange={onChangeDay}>
              <option value="" disabled selected>
                Select Day
              </option>
              <option value="1">1 Day</option>
              <option value="2">2 Day</option>
              <option value="3">3 Day</option>
              <option value="4">4 Day</option>
              <option value="5">5 Day</option>
              <option value="6">6 Day</option>
              <option value="7">7 Day</option>
            </select>
          </div>
        </div>

        <div className="col-lg-10 p-0">
          <div className="btn-pay" onClick={onSubmitPayment}>
            <p>
              Pay Now : Rp. {numberToRupiah(vehicleBike.price * stock * day)}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Reservation;
