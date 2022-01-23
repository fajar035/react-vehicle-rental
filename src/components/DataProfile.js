import React from "react"

function DataProfile(props) {
  const profile = props.dataProfile
  const state = {
    id: profile.id
  }
  const host = process.env.REACT_APP_HOST
  // console.log(state)
  return (
    <>
      <li>{profile.name}</li>
      <li>{profile.gender}</li>
      <li>{profile.birtday}</li>
      <li>{profile.email}</li>
      <li>{profile.phone}</li>
      <li>{profile.address}</li>
      <li>
        <img
          src={`${host}${profile.photo}`}
          alt="imgprofile"
          style={{ width: "100px", height: "100px" }}
        />
      </li>
    </>
  )
}

export default DataProfile
