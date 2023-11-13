import React, { createContext, useReducer } from "react";

export const Perftracker = createContext();

const initialState = {
  customerInfo: {
    customerName: "",
    customerAddress: "",
    contactNum: "",
    markup: null,
    fee: null,
    discount: null,
    total: null,
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    orderInfo: localStorage.getItem("orderInfo")
      ? JSON.parse(localStorage.getItem("orderInfo"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case "SAVE_ORDER_INFO":
      return {
        ...state,
        cart: {
          ...state.cart,
          orderInfo: {
            customerName: action.payload.customerName,
            customerAddress: action.payload.customerAddress,
            contactNum: action.payload.contactNum,
          },
        },
      };
    case "SAVE_CUSTOMER_INFO":
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          ...action.payload,
        },
      };
    case "SET_MARKUP":
      return { ...state, customerInfo: { ...state.customerInfo, markup: action.payload } };
    case "SET_FEE":
      return { ...state, customerInfo: { ...state.customerInfo, fee: action.payload } };
    case "SET_DISCOUNT":
      return { ...state, customerInfo: { ...state.customerInfo, discount: action.payload } };
    case "SET_TOTAL":
      return { ...state, customerInfo: { ...state.customerInfo, total: action.payload } };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export function PerftrackerProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Perftracker.Provider value={value}>{props.children}</Perftracker.Provider>;
}
