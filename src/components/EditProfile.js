import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useHistory, useParams } from "react-router-dom"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function EditProfile() {
  // state
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [birtday, setBirtday] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [photo, setPhoto] = useState("")

  const [startDate, setStartDate] = useState(new Date())

  // var utc = new Date(birtday).toUTCString()

  console.log("START-DATE-DATE-PICKER", startDate)
  const date0 = new Date(birtday)
  console.log("BIRTDAY", date0)
  // state validation
  const [validation, setValidation] = useState("")

  // history
  const history = useHistory()

  // get id from parameter
  const { id } = useParams()

  // token user
  const userToken = JSON.parse(localStorage.getItem("vehicle-token"))

  // hook use effect
  useEffect(() => {
    // panggil function "getPostbyId"
    getPostById()
  }, [])

  // function getPostByid
  const getPostById = async () => {
    const url = "http://localhost:8000/users/detail"
    // get data from server
    const res = await axios.get(url, {
      headers: { "x-access-token": userToken }
    })
    // console.log(res)
    const data = await res.data.result

    // assign data to state
    setName(data.name)
    setGender(data.gender)
    setBirtday(data.birtday)
    setEmail(data.email)
    setPhone(data.phone)
    setAddress(data.address)
  }

  // function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault()
    console.log(e)

    const body = {
      name: name,
      gender: gender,
      birtday: birtday,
      email: email,
      phone: phone,
      address: address,
      photo: photo
    }

    console.log(body)

    // send data to backend
    await axios
      .patch("http://localhost:8000/users/edit", body, {
        headers: { "x-access-token": userToken }
      })
      .then((res) => {
        // redirect
        history.push("/profile")
        console.log(res)
      })
      .catch((error) => {
        // assign validate on state
        setValidation(error.response.data)
      })
  }

  const radioGender = (event) => {
    console.log(event.target.value)
  }

  const fotoUpload = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      <main className="container mt-3">
        <div className="row">
          <div className="col-12  ">
            <div className="card border-0 rounded shadow-lg h-100 ">
              <div className="card-body">
                {validation.error && (
                  <div className="alert alert-danger" role="alert">
                    <ul className="mt-0 mb-0">
                      {validation.error.map((error, index) => (
                        <li>{`${error.param} : ${error.msg}`}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={updatePost}>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div onChange={radioGender} selected="Pria" className="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Pria
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gender"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Wanita
                      </label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label for="birtday">Birtday</label>
                    <DatePicker
                      id="birtday"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      address
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div class="mb-3" onChange={fotoUpload}>
                    <label for="formFile" class="form-label">
                      Foto
                    </label>
                    <input class="form-control" type="file" id="formFile" />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default EditProfile
