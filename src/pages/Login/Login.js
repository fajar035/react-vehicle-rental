import React, { Component } from "react"
import { Link } from "react-router-dom"
import vanLogin from "./../../assets/images/van_login.webp"
import "./Login.css"

export class Login extends Component {
  render() {
    return (
      <main className="container">
        <div className="row justify-content-center">
          {/* image */}
          <div className="col-6 d-sm-none d-md-none d-lg-block img-van border">
            <img src={vanLogin} alt="img-van" className="img-fluid" />
          </div>
          {/* form */}
          <div className="col-6 ">form</div>
        </div>
      </main>
    )
  }
}

// export class Login extends Component {
//   render() {
//     return (
//       <main className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <h1>Login</h1>
//             <form>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   id="email"
//                   type="email"
//                   className="form-control"
//                   placeholder="Masukan email"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   id="password"
//                   type="password"
//                   className="form-control"
//                   placeholder="Masukan password"
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="check"
//                 />
//                 <label className="form-check-label" htmlFor="check">
//                   Ingat saya
//                 </label>
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg btn-block">
//                 <Link to="/" className="text-decoration-none text-light">
//                   <p>Index</p>
//                 </Link>
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//     )
//   }
// }

export default Login
