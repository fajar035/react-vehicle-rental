import "./Home.css"
import React from "react"
import Header from "../../components/Header"
// import HeaderAuth from "../../components/HeaderAuth"
import Jumbroton from "../../components/Jumbroton"
import Body from "../../components/Body"
import Footer from "../../components/Footer"

class Home extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <Jumbroton />
        <Body />
        <Footer />
      </main>
    )
  }
}

export default Home
