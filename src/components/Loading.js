import React from "react"
import "../index.css"

function Loading() {
  return (
    <div className="body-spinner">
      <button className="btn-spinner">
        <span className="spinner"></span>
        <span className="btn-text">Loading...</span>
      </button>
    </div>
  )
}

export default Loading
