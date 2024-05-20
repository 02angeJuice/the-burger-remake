import axios from "axios"

const instance = axios.create({
  baseURL: "https://the-burger-b5132.firebaseio.com",
})

export const getOrders = async () => {
  try {
    const result = await instance.get("/orders.json")
    return { status: true, data: result?.data }
  } catch (error) {
    return { status: false, data: error?.response?.data }
  }
}
