import React from "react"
import "./Example.css"

function Card({
  name = "",
  price = 0,
  onClickHandler = () => {},
  removable = false
}) {
  return (
    <section
      className="food-card m-2"
      onClick={!removable ? onClickHandler : () => {}}>
      <h4>{name}</h4>
      <p>{price}</p>
      {removable && <button onClick={onClickHandler}>remove item</button>}
    </section>
  )
}

class Example extends React.Component {
  state = {
    products: [
      {
        name: "Fried Rice",
        price: 10000
      },
      {
        name: "Spicy Noodles",
        price: 15000
      },
      {
        name: "Dimsum (4pc)",
        price: 20000
      },
      {
        name: "Ice Tea",
        price: 5000
      },
      {
        name: "Mineral Water",
        price: 3500
      },
      {
        name: "Lemon Tea",
        price: 7500
      }
    ],
    cart: []
  }
  onAddItem = (product) => {
    const { cart } = this.state
    for (let cartItem of cart) {
      if (cartItem.name === product.name) {
        return
      }
    }
    const newCart = [...cart, product]
    this.setState({
      cart: newCart
    })
  }
  onRemoveItem = (product) => {
    const { cart } = this.state
    const newCart = cart.filter((cartItem) => cartItem.name !== product.name)
    this.setState({
      cart: newCart
    })
  }
  render() {
    const { products, cart } = this.state
    return (
      <div className="d-flex w-100 vh-100">
        <main className="products h-100">
          <h1>Product List</h1>
          <div className="d-flex flex-wrap">
            {products.length > 0 &&
              products.map((product, idx) => (
                <Card
                  key={idx}
                  name={product.name}
                  price={product.price}
                  onClickHandler={() => this.onAddItem(product)}
                />
              ))}
          </div>
        </main>
        <aside className="cart h-100">
          <h1>Cart</h1>
          {cart.length > 0 &&
            cart.map((product, idx) => (
              <Card
                key={idx}
                name={product.name}
                price={product.price}
                onClickHandler={() => this.onRemoveItem(product)}
                removable
              />
            ))}
        </aside>
      </div>
    )
  }
}

export default Example
