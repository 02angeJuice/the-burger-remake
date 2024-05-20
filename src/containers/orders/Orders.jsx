import React, { useState, useEffect } from "react"
// import axios from "../../axios-orders"
// import withErrorHandler from '../../withErrorHandler';

import Order from "../../components/order/Order"
import Spinner from "../../components/ui/spinner/Spinner"
// import withErrorHandler from "../../utils/withErrorHandler"
import { getOrders } from "../../services/useService"
import { useSelector } from "react-redux"

const Orders = () => {
  const burger = useSelector((state) => state?.burger)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchedOrdersFunc = async () => {
      // const result = getOrders()
      const fetchedOrders = []
      for (const key in burger?.orders) {
        fetchedOrders.push({
          ...burger?.orders[key],
          id: key,
        })
      }

      // Sort fetchedOrders by id
      fetchedOrders.sort((a, b) => parseInt(b.id) - parseInt(a.id))

      setOrders(fetchedOrders)

      setLoading(false)
    }

    fetchedOrdersFunc()
  }, [])

  const renderOrders = () => {
    if (!loading) {
      return orders?.map(({ id, ingredients, price, orderData }) => {
        return (
          <Order
            key={id}
            ingredients={ingredients}
            price={price}
            data={orderData}
          />
        )
      })
    }

    return <Spinner />
  }

  return <>{renderOrders()}</>
}

// export default withErrorHandler(Orders, axios)
export default Orders
