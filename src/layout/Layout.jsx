import React, { useContext, useState } from "react"
import classes from "./Layout.module.css"
import Toolbar from "../components/navigation/toolbar/Toolbar"
import SideDrawer from "../components/navigation/sidedrawer/SideDrawer"
import { NavigationContext } from "../contexts"

const Layout = ({ children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  return (
    <NavigationContext.Provider value={{ showSideDrawer, setShowSideDrawer }}>
      <Toolbar toggleClicked={() => setShowSideDrawer(!showSideDrawer)} />
      <SideDrawer open={showSideDrawer} />
      <main className={classes.Content}>{children}</main>
    </NavigationContext.Provider>
  )
}

export default Layout
