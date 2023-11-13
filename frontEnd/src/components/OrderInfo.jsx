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

const OrderInfo = () => {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
  const {
    userInfo,
    cart: { OrderInfo, cartItems },
  } = state;



  const { customerInfo } = state;
  const { customerName, customerAddress, contactNum } = customerInfo;
  

  
  const [localCustomerName, setLocalCustomerName] = useState(customerName || '');
  const [localCustomerAddress, setLocalCustomerAddress] = useState(customerAddress || '');
  const [localContactNum, setLocalContactNum] = useState(contactNum || '');

  useEffect(() => {
    // Initialize state with values from localStorage
    setLocalCustomerName(localStorage.getItem('customerName') || '');
    setLocalCustomerAddress(localStorage.getItem('customerAddress') || '');
    setLocalContactNum(localStorage.getItem('contactNum') || '');
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: 'SAVE_CUSTOMER_INFO',
      payload: {
        customerName: localCustomerName,
        customerAddress: localCustomerAddress,
        contactNum: localContactNum,

      },
    });

    localStorage.setItem('customerName', localCustomerName);
    localStorage.setItem('customerAddress', localCustomerAddress);
    localStorage.setItem('contactNum', localContactNum);

    navigate('/reseller/summary');
    console.log(localStorage);
  };


    // Function to handle markup input changes
    const handleLocalContactChange = (value) => {
      // Remove leading '0's
      value = value.replace(/^0+(?=\d)/, '');
  
      if (value === '' || (value === '0' && value.length === 1)) {
        setLocalContactNum(''); // Set to null if the input is empty or '0' with no other digits
      } else {
        const numericValue = parseInt(value);
        setLocalContactNum(numericValue);
  
      }
    };


  const round2 = (num) => {
    const roundedNum = Math.round(num * 100 + Number.EPSILON) / 100;
    return isNaN(roundedNum) ? 0 : roundedNum; // Check for NaN and return 0 if necessary
  };


  const clearAllHandler = () => {
    setLocalCustomerName('');
    setLocalCustomerAddress('');
    setLocalContactNum('');

    localStorage.removeItem('customerName');
    localStorage.removeItem('customerAddress');
    localStorage.removeItem('contactNum');
  };




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
            <div className="flex flex-row items-start justify-start self-start">
            </div>

            <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4 mr-4 rounded-3xl bg-white items-start justify-center">

              <CheckoutSteps className="w-full mx-3" step1></CheckoutSteps>

              <div className="flex flex-row w-full mt-3 text-center justify-center items-center p-5">

                <h1 className=" w-full font-semibold text-blue-500 text-2xl text-center self-center">Customer Information:</h1>
              </div>

              {/* Section: Upper */}
              <div className="flex flex-row w-full px-8 pt-6 pb-0 bg-white items-center justify-start self-start">

                {/* Side Text */}
                <div className="flex flex-row px-[15rem] w-full h-full">
                  <div className="flex flex-col w-full h-full ">

                    <form onSubmit={submitHandler} className="flex flex-col w-full h-full ">


                      {/* Textbox for Customer Name */}
                      <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                        <div className="flex flex-row w-full h-full mb-2">
                          <label className="relative flex bg-white text-gray-600 dark:text-gray-400" htmlFor="customerName"
                          >
                            Customer Name:
                          </label>
                        </div>
                        <div className="flex flex-row w-full h-full mb-4">
                          <input type="text" name="customerName" id="customerName" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" value={localCustomerName} onChange={(e) => setLocalCustomerName(e.target.value)} required />
                        </div>
                      </div>
                      {/* Textbox for Address */}
                      <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                        <div className="flex flex-row w-full h-full mb-2">
                          <label className=" relative flex bg-white text-gray-600 dark:text-gray-400" htmlFor="customeraddress"
                          >
                            Customer Address:
                          </label>
                        </div>
                        <div className="relative flex flex-row w-full h-full mb-4">
                          <input type="text" name="customeraddress" id="customeraddress" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" value={localCustomerAddress} onChange={(e) => setLocalCustomerAddress(e.target.value)} required />
                        </div>
                      </div>


                      {/* Textbox for Contact Number */}
                      <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                        <div className="flex flex-row w-full h-full mb-2">
                          <label className="relative flex bg-white text-gray-600 dark:text-gray-400" htmlFor="contactNumber"
                          >
                            Contact Number:
                          </label>
                        </div>
                        <div className="flex flex-row w-full h-full mb-4">
                          <input type="text" name="contactNumber" id="contactNumber" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" value={localContactNum} onChange={(e) => handleLocalContactChange(e.target.value)} required />
                        </div>
                      </div>




                      <div className="flex flex-row text-center justify-center items-center w-full my-6">
                        <div className="w-full items-center justify-center mr-3 ">
                          <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                            onClick={clearAllHandler}
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="w-full items-center justify-center ml-3 ">
                          <button type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
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

export default OrderInfo;
