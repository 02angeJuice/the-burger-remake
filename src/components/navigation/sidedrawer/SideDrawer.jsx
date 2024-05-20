import React from "react"
import classes from "./SideDrawer.module.css"

import Logo from "../../logo/Logo"
import Navitems from "../nav/NavItems"
import Backdrop from "../../ui/backdrop/Backdrop"

const SideDrawer = ({ open }) => {
  let sideClasses = `${classes.SideDrawer} ${classes.Close}`

  if (open) {
    sideClasses = `${classes.SideDrawer} ${classes.Open}`
  }

  return (
    <>
      <Backdrop />
      <div className={sideClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Navitems />
        </nav>
      </div>
    </>
  )
}

export default SideDrawer
