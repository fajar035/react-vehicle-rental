import "./Home.css"
import React from "react"

import Header from "../../components/Header"
import Jumbroton from "../../components/Jumbroton"
import Body from "../../components/Body"
import Footer from "../../components/Footer"

// import { Redirect } from "react-router-dom"

class Home extends React.Component {
  componentDidMount() {
    // console.log(this.auth)
  }
  render() {
    const history = this.props.history
    return (
      <main>
        <Header history={history} />
        <Jumbroton />
        <Body />
        <Footer />
      </main>
    )
  }
}

export default Home
