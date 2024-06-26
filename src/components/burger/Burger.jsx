import React from "react"
import classes from "./Burger.module.css"

import Ingredient from "./ingredients/Ingredient"

const Burger = ({ ingredients }) => {
  const renderBurger = () => {
    let burgerIngredients = Object.keys(ingredients)
      .map((key) => {
        return [...Array(ingredients[key])].map((_, i) => {
          return <Ingredient key={key + i} type={key.toUpperCase()} />
        })
      })
      .reduce((arr, el) => arr.concat(el), [])

    if (burgerIngredients.length === 0) {
      burgerIngredients = <p>Please start adding ingredients!</p>
    }

    return burgerIngredients
  }

  return (
    <div className={classes.Burger}>
      <Ingredient type="BREAD_TOP" />
      {renderBurger()}
      <Ingredient type="BREAD_BOTTOM" />
    </div>
  )
}

export default Burger
