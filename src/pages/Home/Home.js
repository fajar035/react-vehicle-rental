import "./Home.css";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading.js";
import {
  getVehiclesPopularApi,
  getLocationApi,
  getCategoryApi
} from "../../utils/https/vehicles";
import SearchVehicle from "../../components/SearchVehicle";

function Home(props) {
  const [dataPopular, setDataPopular] = useState([]);
  const [success, setSuccess] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    keyword: "",
    location: "",
    category: ""
  });
  const [selectLocation, setSelectLocation] = useState("Location");
  const [locationArr, setLocationArr] = useState([]);
  const [location, setLocation] = useState("");
  const [selectCategory, setSelectCategory] = useState("Category");
  const [categoryArr, setCategoryArr] = useState([]);
  const [category, setCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const user = useSelector((state) => state.auth);
  const role = user.userData.role;

  const handleDropdownChangeLocation = (e) => {
    setSelectLocation(e.target.value);
  };

  const handleDropdownChangeCategory = (e) => {
    setSelectCategory(e.target.value);
  };

  const getPopular = useCallback(() => {
    getVehiclesPopularApi()
      .then((res) => {
        console.log(res);
        setDataPopular(res.data.result);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        const statusCode = err.response.status;
        if (statusCode === 400) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  }, []);

  const getCategory = useCallback(() => {
    getCategoryApi()
      .then((res) => {
        setCategoryArr(res.data.result);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
  }, []);

  const getLocation = useCallback(() => {
    getLocationApi()
      .then((res) => {
        const location = res.data.result;
        setLocationArr(location);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
      });
  }, []);

  const cbSearching = (newValue) => {
    setIsSearching(newValue);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const keyword = e.target[0].value;
    const location = selectLocation;
    const category = e.target[2].value;
    setDataSearch({
      keyword: keyword,
      location: location === "Location" ? "" : location,
      category: category === "Category" ? "" : category
    });
    setIsSearching(true);
    return window.scrollTo({
      top: 850,
      behavior: "smooth"
    });
  };

  const handlerClear = () => {
    setDataSearch({
      keyword: "",
      location: "",
      category: ""
    });
    setSelectLocation("Location");
    setSelectCategory("Category");
    setIsSearching(false);
  };

  useEffect(() => {
    getPopular();
    getLocation();
    getCategory();
  }, [getPopular, getLocation, getCategory]);

  // console.log(categoryArr);

  useEffect(() => {
    let arrLocation = [];
    if (locationArr !== 0) {
      locationArr.map((item) => {
        return arrLocation.push(item.location);
      });
    }
    if (arrLocation.length !== 0) {
      setLocation(arrLocation);
    }
    return window.scrollTo({
      top: 0
    });
  }, [locationArr]);

  useEffect(() => {
    let arrCategory = [];

    if (categoryArr !== 0) {
      categoryArr.map((item) => {
        return arrCategory.push(item.category);
      });
    }
    if (arrCategory.length !== 0) {
      setCategory(arrCategory);
    }
    return window.scrollTo({
      top: 0
    });
  }, [categoryArr]);

  return (
    <main>
      <Header />
      {success ? (
        <>
          <div className='row bg-image p-5 jumbotron'>
            <div className='col-lg-6 '>
              <div className='row mb-5 p-0'>
                <div className='f-playfair mb-5'>
                  Explore and <br />
                  Travel
                </div>
                <div className='f-nunito-vehicle-finder mt-5 mb-3'>
                  Vehicle Finder
                </div>
                <div className='line-jumbroton col-1 ms-3'></div>
              </div>

              <form className='row mb-5' onSubmit={onSubmitSearch}>
                {/* input Search */}
                <div className='col-lg-12 p-0'>
                  <input
                    type='text'
                    name='name'
                    className='input-type mb-5 ms-1'
                    placeholder='Type the vehicle (ex. motorbike'
                  />
                </div>
                <div className='row d-flex justify-content-between p-0'>
                  {/* location */}
                  <div className='col-lg-5 mb-5 p-0'>
                    <select
                      className='input-select dropdown-toggle p-2 ms-3'
                      value={selectLocation}
                      onChange={handleDropdownChangeLocation}
                      name='location'
                    >
                      <option disabled>Location</option>
                      {location.length !== 0 &&
                        location.map((item, idx) => {
                          return (
                            <option value={item} key={idx}>
                              {item}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  {/* Category*/}
                  <div className='col-lg-5 mb-5 p-0'>
                    <select
                      className='input-select dropdown-toggle p-2 ms-3'
                      value={selectCategory}
                      onChange={handleDropdownChangeCategory}
                      name='category'
                    >
                      <option disabled>Category</option>
                      {category.length !== 0 &&
                        category.map((item, idx) => {
                          // console.log("CATEGORY-ITEM", item);
                          return (
                            <option value={item} key={idx}>
                              {item}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                {/* Button Search */}

                {isSearching ? (
                  <>
                    <div className='col-6 p-0'>
                      <div
                        className='btn-clear'
                        onClick={handlerClear}
                      >
                        Clear
                      </div>
                    </div>
                    <div className='col-6 p-0 d-flex justify-content-end'>
                      <button className='btn-search ' type='submit'>
                        Search
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='col-12 p-0 d-flex justify-content-end'>
                    <button className='btn-search ' type='submit'>
                      Search
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className='row mb-5'>
            <div className='col-lg-12 mb-5 '>
              {isSearching ? (
                <div className='container px-4'>
                  <SearchVehicle
                    dataSearch={dataSearch}
                    isSearching={isSearching}
                    onChange={cbSearching}
                  />
                </div>
              ) : (
                <div className='container px-4'>
                  <h3 className='mb-5 mt-5 f-playfair-main'>
                    Popular in town
                  </h3>

                  <div className='row position-relative d-flex justify-content-center'>
                    {Array.isArray(dataPopular) &&
                    dataPopular.length !== 0 ? (
                      dataPopular.map((item, idx) => {
                        // console.log("DATA POPULAR", item);
                        const photo = JSON.parse(item.photo);
                        // console.log("ID", item);

                        return (
                          <div
                            key={idx}
                            className='col-lg-3 col-md-6 card  '
                          >
                            <Link
                              to={`/vehicles/popular/detail/${item.id}`}
                            >
                              <img
                                src={
                                  process.env.REACT_APP_HOST +
                                  photo[0]
                                }
                                className='img-size '
                                alt='photo_vehicle'
                              />
                            </Link>
                            <div className='city-home col-9  shadow '>
                              <p className='m-0'>
                                {item.vehicle} <br />
                                <span className='color-subtitle'>
                                  {item.location}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className='col-lg-12 text-center'>
                        <p className='no-data mb-5 text-datanull'>
                          No data
                        </p>
                      </div>
                    )}

                    {role === "2" ? (
                      <div className='col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center rounded-3 mt-5 container-input'>
                        <Link
                          to='/vehicles/add'
                          className='btn-add-item'
                        >
                          Add New Items
                        </Link>
                      </div>
                    ) : role === null ? (
                      <div></div>
                    ) : (
                      <div></div>
                    )}

                    {/* Testimonial */}
                    <div className='col-lg-12 mt-5'>
                      <div className='container'>
                        <div className='row d-flex flex-row justify-content-center align-item-center p-5'>
                          <h3 className='f-playfair-main'>
                            Testimonials
                          </h3>

                          <div className='col-lg-6 mt-5 d-flex flex-column justify-content-center'>
                            <ul className='list-group d-flex flex-row align-item-center mb-3'>
                              <li className='list-group-item border-0'>
                                <i className='fas fa-star text-warning'></i>
                              </li>
                              <li className='list-group-item border-0'>
                                <i className='fas fa-star text-warning'></i>
                              </li>
                              <li className='list-group-item border-0'>
                                <i className='fas fa-star text-warning'></i>
                              </li>
                              <li className='list-group-item border-0'>
                                <i className='fas fa-star text-warning'></i>
                              </li>
                              <li className='list-group-item border-0'>
                                <i className='fas fa-star text-warning'></i>
                              </li>
                            </ul>

                            <div className='col-lg-8 mb-5'>
                              <p className='f-mulish'>
                                ”It was the right decision to rent
                                vehicle here, I spent less money and
                                enjoy the trip. It was an amazing
                                experience to have a ride for wildlife
                                trip!”
                              </p>
                            </div>

                            <div className='col-lg-8'>
                              <p className='f-nunito'>
                                Edward Newgate
                              </p>
                              <p>Founder Circle</p>
                            </div>
                          </div>

                          <div className='col-lg-6 mt-5 d-flex flex-row justify-content-center'>
                            <div className='bg-image img-cs position-relative'>
                              <div className='circle-testimonial position-circle'></div>

                              <div className='plus'>
                                <div className='vertikal'></div>
                                <div className='horizontal'></div>
                              </div>

                              <div className='rectangle'>
                                <div className='left'>
                                  <i className='fas fa-angle-left'></i>
                                </div>
                                <div className='right'>
                                  <i className='fas fa-angle-right'></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}

      <Footer />
    </main>
  );
}

export default Home;
