import React, { useState, useEffect } from "react"
// import axios from '../../axios-orders';

// import withErrorHandler from "../../withErrorHandler"

import Burger from "../../components/burger/Burger"
import Controls from "../../components/burger/controls/Controls"
import Modal from "../../components/ui/modal/Modal"
import OrderSummary from "../../components/burger/OrderSummary"
import Spinner from "../../components/ui/spinner/Spinner"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setIngredients, setTotalPrice } from "../../store/slices/burgerSlice"

const initIngredients = {
  bacon: 0,
  cheese: 0,
  meat: 0,
  salad: 0,
}

export default function BurgerBuilder(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const burger = useSelector((state) => state?.burger)

  // const [ingredients, setIngredients] = useState(burger?.ingredients)
  // const [totalPrice, setTotalPrice] = useState(0)
  const [purchasable, setPurchasable] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [loading] = useState(false)
  const [error, setError] = useState(false)

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const res = await axios.get("/ingredients.json")

  //       setIngredients(res.data)
  //     } catch (error) {
  //       setError(true)
  //     }
  //   })()
  // }, [])

  useEffect(() => {
    const updatePurchaseState = () => {
      const sum = Object.keys(burger?.ingredients)
        .map((key) => {
          return burger?.ingredients[key]
        })
        .reduce((sum, el) => sum + el, 0)

      setPurchasable(sum > 0)
    }

    updatePurchaseState()
  }, [burger?.ingredients])

  const disabledInfo = () => {
    const isDisable = { ...burger?.ingredients }

    for (let key in isDisable) isDisable[key] = isDisable[key] <= 0

    return isDisable
  }

  const addIngredientHandler = (type) => {
    const count = burger?.ingredients[type]

    const setCount = count + 1

    const newIngredients = { ...burger?.ingredients }
    newIngredients[type] = setCount

    dispatch(setIngredients(newIngredients))
    const price = burger?.totalPrice
    const priceAdd = burger?.INGREDIENT_PRICES[type]
    const newPrice = price + priceAdd

    dispatch(setTotalPrice(newPrice))
  }

  const removeIngredientHandler = (type) => {
    const count = burger?.ingredients[type]
    let setCount = count - 1
    if (setCount < 0) return
    const newIngredients = { ...burger?.ingredients }

    newIngredients[type] = setCount
    dispatch(setIngredients(newIngredients))

    const price = burger?.totalPrice
    const priceRemove = burger?.INGREDIENT_PRICES[type]
    const newPrice = price - priceRemove

    dispatch(setTotalPrice(newPrice))
  }

  const purchaseHandler = () => setPurchasing(true)
  const purchaseCancelHandler = () => setPurchasing(false)
  const purchaseContinueHandler = () => {
    const queryParams = []
    for (const i in burger?.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(burger?.ingredients[i])}`
      )
    }

    queryParams.push(`price=${Number(burger?.totalPrice).toFixed(1)}`)
    const queryString = queryParams.join("&")

    navigate(`/checkout?${queryString}`)

    // props.history.push({
    //   pathname: "/checkout",
    //   search: `?${queryString}`,
    // })
  }

  const renderOrderSummary = () => {
    if (!loading && burger?.ingredients) {
      return (
        <OrderSummary
          ingredients={burger?.ingredients}
          price={Number(burger?.totalPrice).toFixed(1)}
          orderCancel={purchaseCancelHandler}
          orderContinue={purchaseContinueHandler}
        />
      )
    }

    return <Spinner />
  }

  const renderBurger = () => {
    if (burger?.ingredients) {
      return (
        <>
          <Burger ingredients={burger?.ingredients} />
          <Controls
            added={addIngredientHandler}
            removed={removeIngredientHandler}
            disabled={disabledInfo()}
            purchasable={purchasable}
            price={Number(burger?.totalPrice).toFixed(1)}
            ordered={purchaseHandler}
          />
        </>
      )
    }

    return <>{error ? <p>Ingredients can't be loaded!</p> : <Spinner />}</>
  }

  return (
    <>
      <Modal showModal={purchasing} closeModal={purchaseCancelHandler}>
        {renderOrderSummary()}
      </Modal>

      {renderBurger()}
    </>
  )
}

// export default withErrorHandler(BurgerBuilder, axios)
