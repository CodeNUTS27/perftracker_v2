import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Perftracker } from '../Perftracker';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { getError } from '../util';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import Header from '../components/Header';
import CheckoutSteps from './CheckoutSteps';
import MessageBox from './MessageBox';
import { toast } from 'react-toastify';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return { ...state, loadingDeliver: false, successDeliver: false }
    case 'MARK_REQUEST':
      return { ...state, loadingMark: true };
    case 'MARK_SUCCESS':
      return { ...state, loadingMark: false, markDeliver: true };
    case 'MARK_FAIL':
      return { ...state, loadingMark: false };
    case 'MARK_RESET':
      return { ...state, loadingMark: false, markDeliver: false }

    default:
      return state;
  }
}


const PlacementComponent = () => {
  const { state } = useContext(Perftracker);
  const { userInfo, orderInfo, cart } = state || {}; // Check if orderInfo is defined, otherwise use an empty object


  const params = useParams();
  const { id: orderId } = params;


  const navigate = useNavigate();
  // Define a state for markup



  const [
    {
      loading,
      error,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
      loadingMark,
      markDeliver,
      markup,
      fee,
      discount,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
    loadingDeliver: false,
    successDeliver: false,
    loadingMark: false,
    markDeliver: false,
    total: cart.total,
    markup: cart.markup, // Add this line
    fee: cart.fee,   // Add this line
    discount: cart.discount, // Add this line
  });



  useEffect(() => {


    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`http://localhost:8000/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });


        const { order } = data;

        // Extract markup, fee, and discount from order data and set them in state
        // Extract markup, fee, and discount from order data and set them in state
        if (order) {
          dispatch({ type: 'SET_MARKUP', payload: order.markup !== undefined ? order.markup : 0 });
          dispatch({ type: 'SET_FEE', payload: order.fee !== undefined ? order.fee : 0 });
          dispatch({ type: 'SET_DISCOUNT', payload: order.discount !== undefined ? order.discount : 0 });
        } else {
          dispatch({ type: 'SET_MARKUP', payload: 0 });
          dispatch({ type: 'SET_FEE', payload: 0 });
          dispatch({ type: 'SET_DISCOUNT', payload: 0 });
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };



    if (!userInfo) {
      return navigate('/');
    }
    if (
      !order._id ||
      successDeliver ||
      markDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
      if (markDeliver) {
        dispatch({ type: 'MARK_RESET' });
      }
    } else {

    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    successPay,
    successDeliver,
    markDeliver,
  ]);


  async function markDeliveredHandler() {
    try {
      dispatch({ type: 'MARK_REQUEST' });
      const { data } = await axios.put(
        `http://localhost:8000/api/orders/${order._id}/markdeliver`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'MARK_SUCCESS', payload: data });
      toast.success('Order marked as delivered!')
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'MARK_FAIL' });
    }
  }

  const formatNumber = (number) => {
    // Check if the number is defined before calling toLocaleString
    return number ? number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
  };

  const formatQuantity = (number) => {
    // Check if the number is defined before calling toLocaleString
    return number ? number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
  };

  // const total = cart.selectedDescriptionValue + order.markup + order.fee - order.discount

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="w-full flex p-8 relative self-start items-center flex-col justify-start">
        <div className="w-full flex flex-row items-center justify-between ">
          <div>
            <p className="w-full self-start text-[20px] ml-4">October 21, 2023</p>
          </div>
          <div>
            <p className="self-end text-[20px] mr-4">Wednesday, 10:30 AM</p>
          </div>
        </div>

        <div className="w-full flex flex-row">
          <div className="flex flex-row w-full h-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="w-full flex h-full flex-col m-2 items-center justify-center rounded-3xl">

              <div className="w-full flex flex-row h-full bg-white mx-2 my-2">
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4  rounded-3xl bg-white items-start justify-center">
                    <CheckoutSteps className="w-full mx-3" step1 step2 step3></CheckoutSteps>

                    <div className="flex flex-row flex-wrap mt-8 w-full ">
                      <div className="px-[1.54rem] md:flex md:w-[60%] md:max-w-2xl mx-auto flex-shrink-0 w-full max-w-full mt-0">
                        <div className="mb-3 w-full">

                          <h1 className=" w-full font-semibold text-2xl mb-6 text-center text-blue-900">Order ID: <span className="italic">{orderId}</span> </h1>
                          <div className="mb-3 p-8 border-gray-300 border-[1px] rounded-lg">
                            <div className="flex flex-row items-start justify-center w-full mb-3">
                              <div className="flex flex-col h-full w-full justify-center">
                                <h1 className="h-full w-full font-semibold text-blue-600">Customer Information</h1>
                              </div>
                              <div className="flex flex-col w-full items-end ">
                                <button className="hover:bg-blue-500 hover:text-white transition  text-black py-2 px-4 rounded-lg">
                                  <Link className='edit' to="/reseller/transactions">
                                    <FaRegPenToSquare />
                                  </Link>
                                </button>
                              </div>
                            </div>

                            <div className="w-full flex flex-row h-full justify-center items-center">

                              <div className="flex flex-col w-1/3 h-full">
                                <div className="h-full justify-center items-center">
                                  <h2 htmlFor="" className="relative justify-center items-center h-full flex-1 text-black"><strong className="text-sm"> Customer Name:</strong>
                                  </h2>
                                </div>
                              </div>

                              <div className="flex flex-col w-2/3 justify-start  ">
                                <p className=" bg-white ml-3 text-sm focus:border-gray-50 p-2 ">

                                  {order.customerName}
                                </p>
                              </div>

                            </div>
                            <div className="w-full flex flex-row h-full mt-2 justify-center items-center">

                              <div className="flex flex-col w-1/3 h-full">
                                <div className="h-full justify-center items-center">
                                  <h2 htmlFor="" className="relative justify-center items-center h-full flex-1 text-black"><strong className="text-sm"> Address:</strong>
                                  </h2>
                                </div>
                              </div>

                              <div className="flex flex-col w-2/3 justify-start  ">
                                <p className=" bg-white ml-3 text-sm focus:border-gray-50 p-2 ">

                                  {order.customerAddress}
                                </p>
                              </div>

                            </div>

                            <div className="w-full flex flex-row h-full mt-2 mb-2 justify-center items-center ">

                              <div className="flex flex-col w-1/3 h-full ">
                                <div className="h-full justify-center items-center">
                                  <h2 htmlFor="" className="relative justify-center items-center h-full flex-1 text-black"><strong className="text-sm">Contact Number:</strong>
                                  </h2>
                                </div>
                              </div>

                              <div className="flex flex-col w-2/3 justify-start  ">
                                <p className=" bg-white ml-3 text-sm focus:border-gray-50 p-2 ">

                                  {order.contactNum}
                                </p>
                              </div>

                            </div>


                            {order.markDelivered ? (
                              <MessageBox variant="success">
                                <strong>Order Status:</strong> Order has been delivered. Customer has received the item. {order.deliveredAt}
                              </MessageBox>
                            ) : (
                              <MessageBox variant="danger"><strong>Order Status:</strong> Preparing the order for delivery...</MessageBox>
                            )}

                          </div>


                          <div className="mb-3 p-8 border-gray-300 border-[1px] rounded-lg">
                            <div className="flex flex-row items-start justify-center w-full mb-3">
                              <div className="flex flex-col h-full w-full justify-center">
                                <h1 className="h-full w-full font-semibold text-blue-600">Ordered Items</h1>
                              </div>
                              <div className="flex flex-col w-full items-end ">
                                <button className="hover:bg-blue-500 hover:text-white transition  text-black py-2 px-4 rounded-lg">
                                  <Link className='edit' to="/reseller/cart">
                                    <FaRegPenToSquare />
                                  </Link>
                                </button>
                              </div>
                            </div>
                            <ul className="flex flex-col list-none p-0">
                              {cart.cartItems.map((item) => (
                                <li key={item._id} className="mb-2">
                                  <div className="flex items-center border-b-gray-300 border-1 border-t-0 border-x-0 py-3 mx-3">
                                    <div className=" flex flex-row w-1/2 items-center ">

                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-[80px] p-[0.25rem] text-sm items-center border-b-gray-300 border-1 w-[80px] rounded align-middle"
                                      />


                                      <Link
                                        style={{ textDecoration: 'none' }}
                                        className=" text-sm pl-4 items-center self-center"
                                        to={`/reseller/product/${item.slug}`}
                                      >
                                        {item.name}
                                      </Link>


                                    </div>
                                    <div className="w-1/4">
                                      <span>{formatQuantity(item.selectedDescriptionValue)}</span>
                                    </div>
                                    <div className="w-1/4">₱{formatNumber(item.selectedDescriptionValue)}</div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="w-[40%] px-[1.54rem]">
                        <div className="bg-white shadow-md mb-4 p-4 rounded-3xl">
                          <h2 className="text-xl text-center font-semibold mb-6 text-blue-600">Order Summary</h2>
                          <ul className="list-none px-4">
                            <li className="flex justify-between mb-2 border-b-2 pb-2">
                              <span className="font-light text-sm">Items</span>
                              <span className="font-light text-sm">₱{formatNumber(cart.selectedDescriptionValue)}</span>
                            </li>
                            <li className="flex justify-between mb-2 border-b-2 pb-2">
                              <span className="font-light text-sm">Markup</span>
                              <span className="font-light text-sm">₱{formatNumber(order.markup)}</span>
                            </li>
                            <li className="flex justify-between mb-2 border-b-2 pb-2 ">
                              <span className="font-light text-sm">Delivery Fee</span>
                              <span className="font-light text-sm">₱{formatNumber(order.deliveryFee)}</span>
                            </li>
                            <li className="flex justify-between mb-2 border-b-2 pb-2">
                              <span className="font-light text-sm">Discount</span>
                              <span className="font-light text-sm">- ₱{formatNumber(order.discount)}</span>
                            </li>
                            <li className="flex justify-between mb-2 border-b-2 pb-2">
                              <span>
                                <strong>Order Total</strong>
                              </span>
                              <span>
                                <strong>₱{formatNumber(total)}</strong>
                              </span>
                            </li>
                            {userInfo.isReseller && !order.markDelivered && (
                              <li>
                                <div className="grid place-items-center">
                                  <button
                                    type="submit"
                                    onClick={markDeliveredHandler}
                                    disabled={cart.cartItems.length === 0}
                                    className={`py-2 px-4 text-white rounded ${cart.cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 transition duration-300 w-full mt-5 rounded-lg'
                                      }`}
                                  >
                                    Mark as Delivered
                                  </button>
                                </div>
                                {loading && <LoadingBox></LoadingBox>}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementComponent