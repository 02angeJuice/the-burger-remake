import React, { useState, useEffect } from "react"
import { Route, useLocation, useNavigate } from "react-router-dom"

import CheckoutSummary from "../../components/order/CheckoutSummary"
import ContactData from "./contactData/ContactData"

const Checkout = (props) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [ingredients, setIngredients] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    if (searchParams) {
      const query = new URLSearchParams(location.search)

      const ingredients = {}
      let price = 0

      for (let param of query.entries()) {
        if (param[0] === "price") {
          price = param[1]
        } else {
          ingredients[param[0]] = +param[1]
        }
      }

      setIngredients(ingredients)
      setTotalPrice(price)
    }
  }, [])

  const checkoutCancelHandler = () => {
    navigate(-1)
  }

  const checkoutContinueHandler = () => {
    const queryParams = []
    for (const i in ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`
      )
    }

    queryParams.push(`price=${Number(totalPrice).toFixed(1)}`)
    const queryString = queryParams.join("&")

    navigate(`/checkout/contact-data?${queryString}`)
  }

  return (
    <>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancel={checkoutCancelHandler}
        checkoutContinue={checkoutContinueHandler}
      />
      {/* <Route
        path={`checkout/contact-data`}
        render={(props) => (
          <ContactData
            ingredients={ingredients}
            price={totalPrice}
            {...props}
          />
        )}
      /> */}
    </>
  )
}

export default Checkout
