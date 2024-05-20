import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  INGREDIENT_PRICES: {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
  },
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 0,

  orders: [],
}

export const burgerSlice = createSlice({
  name: "burgerSlice",
  initialState: initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    },

    addOrders: (state, action) => {
      state.orders = [
        ...state.orders,
        {
          ingredients: state.ingredients,
          price: state.totalPrice,
          orderData: action.payload,
        },
      ]
    },

    reset: (state) => {
      state.ingredients = {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0,
      }
      state.totalPrice = 0
    },
  },
})

export const { setIngredients, setTotalPrice, reset, addOrders } =
  burgerSlice.actions

export default burgerSlice.reducer
