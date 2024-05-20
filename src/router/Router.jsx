import React from "react"
import { Outlet, useRoutes } from "react-router-dom"

import BurgerBuilder from "../containers/builder/BurgerBuilder"
import Orders from "../containers/orders/Orders"
import Checkout from "../containers/checkout/Checkout"
import Layout from "../layout/Layout"
import ContactData from "../containers/checkout/contactData/ContactData"
// import AppLayout from "../layouts/AppLayout"
// import PortfolioPage from "../pages/PortfolioPage"
// import OtherPage from "../pages/OtherPage"
// import LandingPage from "../pages/LandingPage"

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { element: <BurgerBuilder />, index: true },
        { path: "/orders", element: <Orders /> },
        // { path: "/checkout", element: <Checkout /> },
      ],
    },

    {
      path: "/checkout",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { element: <Checkout />, index: true },
        { path: "contact-data", element: <ContactData /> },
      ],
    },
  ])

  return routes
}

export default Router
