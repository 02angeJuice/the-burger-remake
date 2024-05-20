import React from "react"
import classes from "./Order.module.css"

const Order = ({ ingredients, price, data }) => {
  const list = []
  for (const name in ingredients) {
    list.push({
      name: name,
      amount: ingredients[name],
    })
  }

  const renderIngredientList = () => {
    return list?.map(({ name, amount }) => {
      if (amount > 0) {
        return (
          <span
            style={{
              textTransform: "capitalize",
              display: "inline-block",
              margin: "0 8px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
            key={name}
          >
            {`${name} (${amount})`}
          </span>
        )
      }
    })
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {renderIngredientList()}</p>

      <p>
        Price: <strong>{Number(price).toFixed(2)}$</strong>
      </p>

      <p>Customer</p>

      <ul>
        <li>
          Name: <strong>{data.name}</strong>
        </li>
        <li>
          Email: <strong>{data.email}</strong>
        </li>
        <li>
          Method: <strong>{data.deliveryMethod}</strong>
        </li>
      </ul>
    </div>
  )
}

export default Order
