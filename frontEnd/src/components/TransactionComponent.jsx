import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Perftracker } from '../Perftracker';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { useStateContext } from '../contexts/ContextProvider';
import { getError } from '../util';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import Header from '../components/Header';
import CheckoutSteps from './CheckoutSteps';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const TransactionComponent = () => {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });


  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
  console.log('Context State:', state);

  const { cart, userInfo, customerInfo } = state;  // Destructure cart and userInfo from state
  const { orderInfo  } = cart;  // Destructure orderInfo from cart

  console.log('Destructured orderInfo:', orderInfo);

  // Destructure customerInfo
  const { customerName, customerAddress, contactNum, markup, fee, discount, total } = customerInfo;

  const setCustomerName = (name) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { customerName: name } });
  const setCustomerAddress = (address) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { customerAddress: address } });
  const setContactNum = (num) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { contactNum: num } });
  const setMarkup = (value) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { markup: value } });
  const setFee = (value) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { fee: value } });
  const setDiscount = (value) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { discount: value } });
  const setTotal = (value) => ctxDispatch({ type: 'SAVE_CUSTOMER_INFO', payload: { total: value } });


  // Retrieve customer information from localStorage
  const storedCustomerName = localStorage.getItem('customerName');
  const storedCustomerAddress = localStorage.getItem('customerAddress');
  const storedContactNum = localStorage.getItem('contactNum');

  // Retrieve customer information from localStorage
  const storedMarkup = localStorage.getItem('markup');
  const storedFee = localStorage.getItem('fee');
  const storedDiscount = localStorage.getItem('discount');
  const storedTotal = localStorage.getItem('total');



  useEffect(() => {
    // Retrieve customer information from localStorage

    const storedMarkup = localStorage.getItem('markup');
    const storedFee = localStorage.getItem('fee');
    const storedDiscount = localStorage.getItem('discount');
    const storedTotal = localStorage.getItem('total');

    setCustomerName(storedCustomerName);
    setCustomerAddress(storedCustomerAddress);
    setContactNum(storedContactNum);
    setMarkup(storedMarkup);
    setFee(storedFee);
    setDiscount(storedDiscount);
    setTotal(storedTotal);
  }, [storedCustomerName, storedCustomerAddress, storedContactNum, storedDiscount, storedFee, storedMarkup, storedTotal]);


  // Function to handle markup input changes
  const handleMarkupChange = (value) => {
    // Remove leading '0's
    value = value.replace(/^0+(?=\d)/, '');

    if (value === '' || (value === '0' && value.length === 1)) {
      setMarkup(null); // Set to null if the input is empty or '0' with no other digits
    } else {
      const numericValue = parseInt(value);
      setMarkup(numericValue);

    }
  };

  // Function to handle markup input changes
  const handleDiscountChange = (value) => {
    // Remove leading '0's
    value = value.replace(/^0+(?=\d)/, '');

    if (value === '' || (value === '0' && value.length === 1)) {
      setDiscount(null); // Set to null if the input is empty or '0' with no other digits
    } else {
      const numericValue = parseInt(value);
      setDiscount(numericValue);

    }
  };

  // Function to handle markup input changes
  const handleFeeChange = (value) => {
    // Remove leading '0's
    value = value.replace(/^0+(?=\d)/, '');

    if (value === '' || (value === '0' && value.length === 1)) {
      setFee(null); // Set to null if the input is empty or '0' with no other digits
    } else {
      const numericValue = parseInt(value);
      setFee(numericValue);

    }
  };

  // // Function to handle markup input changes
  // const handleTotal = (value) => {
  //   // Remove leading '0's
  //   value = value.replace(/^0+(?=\d)/, '');

  //   if (value === '' || (value === '0' && value.length === 1)) {
  //     setFee(null); // Set to null if the input is empty or '0' with no other digits
  //   } else {
  //     const itemsTotal = round2(cart.selectedDescriptionValue);
  //     const markupTotal = markup || 0;
  //     const feeTotal = fee || 0;
  //     const discountTotal = discount || 0;
   
  //     console.log("AAAA", itemsTotal);

   


  //   }
  // };


//dito yung problem 0
  useEffect(() => {
    const itemsTotal = (cart.selectedDescriptionValue);
    const markupTotal = markup;
    const feeTotal = fee;
    const discountTotal = discount;
  

    const orderTotal = (itemsTotal + markupTotal + feeTotal - discountTotal);
    setTotal(orderTotal);

  }, [markup, fee, discount]);


  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.selectedDescriptionValue = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.selectedDescriptionValue, 0)
  );


  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

     
      // Log the orderItems array just before making the POST request

      dispatch({
        type: 'SAVE_CUSTOMER_INFO',
        payload: {
          customerName: customerName,
          customerAddress: customerAddress,
          contactNum: contactNum,

        },
      });

      const total = cart.selectedDescriptionValue + cart.markup + cart.fee - cart.discount

      const response = await axios.post(
        'http://localhost:8000/api/orders',
        {
          orderItems: cart.cartItems.map(item => ({ ...item, price: item.selectedDescriptionValue })),
          customerName: storedCustomerName,
          customerAddress: storedCustomerAddress,
          contactNumber: storedContactNum,
          itemsPrice: (cart.selectedDescriptionValue),
          markup: (markup),
          deliveryFee: (fee),
          discount: (discount),
          total: (total),
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      console.log('Server Response:', response.data);

      console.log('API response:', response);

      const { data } = response;

      if (data && data.order && data.order._id) {
        ctxDispatch({ type: 'CART_CLEAR' });
        dispatch({ type: 'CREATE_SUCCESS' });
        localStorage.removeItem('cartItems');
        const a =

          console.log('Order ID:', data.order._id);

        navigate(`/reseller/placement/${data.order._id}`);
      } else {
        console.error('Invalid API response format');
      }
    } catch (err) {
      console.error('Axios Error:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server Response Data:', err.response.data);
        console.error('Server Response Status:', err.response.status);
        console.error('Server Response Headers:', err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', err.message);
      }
    }
  };




  const formatNumber = (number) => {
    console.log(number);
    return number ? number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A';
  };

  function formatQuantity(quantity) {
    return quantity ? quantity.toLocaleString() : 'N/A';
  }

  return (
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
                  <CheckoutSteps className="w-full mx-3" step1 step2></CheckoutSteps>

                  <div className="flex flex-row flex-wrap mt-8 w-full ">
                    <div className="px-[1.54rem] md:flex md:w-[60%] md:max-w-2xl mx-auto flex-shrink-0 w-full max-w-full mt-0">
                      <div className="mb-3 w-full">


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

                                {storedCustomerName}
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

                                {storedCustomerAddress}
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

                                {storedContactNum}
                              </p>
                            </div>

                          </div>

                        </div>

                        <div className="mb-3 p-8 border-gray-300 border-[1px] rounded-lg">
                          <div className="flex flex-row items-start justify-center w-full mb-3">
                            <div className="flex flex-col h-full w-full justify-center mb-6">
                              <h1 className="h-full w-full font-semibold text-blue-600">Pricing Information</h1>
                            </div>
                          </div>

                          <div className="w-full flex flex-row h-full justify-center items-center">

                            <div className="flex flex-col w-1/3 h-full">
                              <div className="h-full justify-center items-center">
                                <label htmlFor="" className="relative justify-center items-center h-full flex-1 text-black"><strong className="text-sm">Markup (₱):</strong> </label>
                              </div>
                            </div>

                            <div className="flex flex-col w-2/3 justify-start  ">
                              <input className="border-2 bg-gray-50 ml-3 text-sm focus:border-gray-50 p-2 " onChange={(e) => handleMarkupChange(e.target.value)} />
                            </div>

                          </div>
                          <div className="w-full flex flex-row h-full mt-2 justify-center items-center">

                            <div className="flex flex-col w-1/3 h-full">
                              <div className="h-full justify-center items-center">
                                <label htmlFor="" className="relative justify-center items-center h-full flex-1 text-black"><strong className="text-sm">Delivery Fee (₱):</strong> </label>
                              </div>
                            </div>

                            <div className="flex flex-col w-2/3 justify-start  ">
                              <input className="border-2 bg-gray-50 ml-3 text-sm focus:border-gray-50 p-2 " onChange={(e) => handleFeeChange(e.target.value)} />
                            </div>

                          </div>

                          <div className="w-full flex flex-row h-full mt-2 mb-2 justify-center items-center ">

                            <div className="flex flex-col w-1/3 h-full ">
                              <div className="h-full justify-center items-center">
                                <label htmlFor="" className="relative justify-center items-center h-full flex-1 text-black"><strong className="text-sm">Discount (₱):</strong> </label>
                              </div>
                            </div>

                            <div className="flex flex-col w-2/3 justify-start  ">
                              <input className="border-2 bg-gray-50 ml-3 text-sm focus:border-gray-50 p-2 " onChange={(e) => handleDiscountChange(e.target.value)} />
                            </div>

                          </div>



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
                            <span className="font-light text-sm">₱{formatNumber(markup)}</span>
                          </li>
                          <li className="flex justify-between mb-2 border-b-2 pb-2 ">
                            <span className="font-light text-sm">Delivery Fee</span>
                            <span className="font-light text-sm">₱{formatNumber(fee)}</span>
                          </li>
                          <li className="flex justify-between mb-2 border-b-2 pb-2">
                            <span className="font-light text-sm">Discount</span>
                            <span className="font-light text-sm">- ₱{formatNumber(discount)}</span>
                          </li>
                          <li className="flex justify-between mb-2 border-b-2 pb-2">
                            <span>
                              <strong>Order Total</strong>
                            </span>
                            <span>
                              <strong>₱{formatNumber(total)}</strong>
                            </span>
                          </li>
                          <li>
                            <div className="grid place-items-center">
                              <button
                                type="submit"
                                onClick={placeOrderHandler}
                                disabled={cart.cartItems.length === 0 || loading}
                                className={`py-2 px-4 text-white rounded ${cart.cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition duration-300 w-full mt-5 rounded-lg'
                                  }`}
                              >
                                Place Order
                              </button>
                            </div>
                            {loading && <LoadingBox></LoadingBox>}
                          </li>
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
  );
};

export default TransactionComponent;
