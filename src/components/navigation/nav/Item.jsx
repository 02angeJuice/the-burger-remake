import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import classes from "./Item.module.css"
import { NavigationContext } from "../../../contexts"

const Item = ({ children, link }) => {
  const { setShowSideDrawer } = useContext(NavigationContext)

  return (
    <li className={classes.Item}>
      <NavLink
        to={link}
        onClick={() => setShowSideDrawer(false)}
        className={({ isActive }) => (isActive ? classes.active : "")}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default Item
