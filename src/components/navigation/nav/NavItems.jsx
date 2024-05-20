import React, { useContext } from "react"
import classes from "./NavItems.module.css"

import Item from "./Item"
import { NavigationContext } from "../../../contexts"

const Items = () => {
  return (
    <ul className={classes.NavItems}>
      <Item link="/">Burger Builder</Item>
      <Item link="/orders">Orders</Item>
    </ul>
  )
}

export default Items
