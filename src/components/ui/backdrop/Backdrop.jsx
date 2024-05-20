import React, { useContext } from "react"
import classes from "./Backdrop.module.css"
import { NavigationContext } from "../../../contexts"

const Backdrop = () => {
  const { showSideDrawer, setShowSideDrawer } = useContext(NavigationContext)

  const renderBackdrop = () => {
    if (!showSideDrawer) return null
    return (
      <div
        onClick={() => setShowSideDrawer(false)}
        className={classes.Backdrop}
      ></div>
    )
  }

  return <>{renderBackdrop()}</>
}

export default Backdrop
