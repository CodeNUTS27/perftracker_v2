import React, { useState, useEffect, useContext } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import PendingOrdersTable from './PendingOrdersTable';

import axios from 'axios';

import { Header } from '../components';

import '../App.css';
import { Perftracker } from '../Perftracker';


const OrderForms = () => {


  const { state } = useContext(Perftracker);
  const { userInfo } = state;
  const name = userInfo?.name || 'Guest';

  const [customerName, setCustomerName] = useState('');
  const [reseller, setReseller] = useState('');

  const [address, setAddress] = useState();
  const [contactNum, setContactNum] = useState();
  const [descriptions, setDescriptions] = useState();

  const [discount, setDiscount] = useState(0);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [sellingP, setSellingP] = useState(0);
  const [commissionA, setCommissionA] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);

  const [currentDate, setCurrentDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedFurniture, setSelectedFurniture] = useState('');

  const [markup, setMarkup] = useState(null);
  const [quantity, setQuantity] = useState(null);


  const [shouldSave, setShouldSave] = useState(true);

  // Function to toggle the "shouldSave" state
  const toggleShouldSave = () => {
    setShouldSave(!shouldSave);
  };

  //save orderform to database
  const handleSaveOrders = async (e) => {
    e.preventDefault();
    if (shouldSave) {
      try {
        const orderData = {
          currentDate,
          customerName,
          address,
          contactNum,
          selectedFurniture,
          descriptions,
          quantity,
          origPrice,
          totalOrigPrice,
          markup,
          sellingP,
          commissionA,
          discount,
          deliveryDate,
          fee,
          totalAmt,
          reseller: name
        };

        console.log('Attempting save orders...');
        console.log(orderData);

        const response = await axios.post('/api/orders/saveOrder', orderData);


        if (response && response.data) {
          const data = response.data;
          console.log('succesful', response.data);
        } else {
          console.error('Saving error: An error occurred while saving up. Please try again.');
          console.log("An error occurred while saving up. Please try again1.");
        }
      } catch (err) {
        console.error('Saving error:', err);
        if (err.response) {
          console.log(err.response.data.message);
        } else {
          console.log("An error occurred while saving. Please try again2.");
        }
      }
    }
  };


  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [
    { text: 'Add to Cart', tooltipText: 'Add', prefixIcon: 'e-add' }, // Custom command
  ];
  const editing = { allowDeleting: true, allowEditing: true };


  //system date and time 

  useEffect(() => {
    // Get a reference to the date input element
    const dateInput = document.getElementById('orderdate');

    if (dateInput) {

      // Create a new Date object representing the current date
      const currentDate = new Date();

      // Format the current date as 'dd/mm/yyyy'
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
      const year = currentDate.getFullYear();
      const currentDateString = `${year}-${month}-${day}`;

      // Set the value of the text input element to the current date
      dateInput.value = currentDateString;

    }
  }, []); // Empty dependency array to run this effect once when the component mounts



  //important for numUpDown





  //sets
  const handleIncrement = () => {
    if (quantity < 100) { // Limit to 2 digits
      setQuantity(quantity + 1);

      if (!shouldSave) {
        toggleShouldSave(); // Set shouldSave to true
      }

    }

  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);

      if (!shouldSave) {
        toggleShouldSave(); // Set shouldSave to true
      }

    }
  };

  //markup
  const handleAdd = () => {
    if (markup < 100) {
      setMarkup(markup + 5);
    }
  };
  const handleMinus = () => {
    if (markup > 0) {
      setMarkup(markup - 5);
    }
  };


  //discount
  const handleAddDiscount = () => {
    if (discount < 100) {
      setDiscount(discount + 5);
    }
  };
  const handleMinusDicount = () => {
    if (discount > 0) {
      setDiscount(discount - 5);
    }
  };




  //image
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setSelectedFile(file);
      setImagePreviewURL(reader.result);
    };

    reader.readAsDataURL(file);
  };


  //furniture list
  const furnitureTypes = [
    'Dining Table and Chairs/stools',
    'Bar Table and Chairs/stools',
    'Table and Benches',
    'Round Table and Round Chair/stools',
    'Counter Table',
    'Japanese Table',
    'Folding Table and Folding Stools',
    'Others'
  ];



  //description
  const handleDescriptionsChange = (event) => {
    setDescriptions(event.target.value);
  };


  //currentdate
  const handleReseller = () => {
    setReseller(username);
    console.log(reseller);
  };

  //currentdate
  const handleCurrentDate = (event) => {
    setCurrentDate(event.target.value);
  };

  //deliverydate
  const handleDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  };


  //price
  const [origPrice, setOrigPrice] = useState(0);
  const handleOrigPrice = (event) => {
    setOrigPrice(event.target.value);

  };

  const totalOrigPrice = (origPrice * quantity).toFixed(2);


  //fee
  const [fee, setFee] = useState(0);
  const handleDeliveryFee = (event) => {
    setFee(event.target.value);
  };

  //customerName
  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value); // Update the customerName state
  };

  //Address
  const handleAddressChange = (event) => {
    setAddress(event.target.value); // Update the customerName state
  };

  //Contact Num
  const handleContactNumChange = (event) => {
    setContactNum(event.target.value); // Update the customerName state

  };

  //furniture type
  const handleFurnitureChange = (event) => {
    setSelectedFurniture(event.target.value);
  };

  //description
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
    console.log('Quantity updated:', event.target.value);
  };


  const [orderDate, setOrderDate] = useState('');
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setOrderDate(newDate);
  };


  //date
  useEffect(() => {
    // Create a new Date object representing the current date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    const year = now.getFullYear();

    // Format the current date as 'yyyy-MM-dd' for the input element
    const formattedDate = `${year}-${month}-${day}`;

    // Set the formatted date to the input element
    setCurrentDate(formattedDate);
  }, []);


  //calculations
  useEffect(() => {
    const origPriceNumeric = parseFloat(origPrice);
    const markupNumeric = parseFloat(markup);
    const markupPerc = origPriceNumeric * (markupNumeric / 100);
    const newSellingP = (origPriceNumeric + markupPerc) * quantity;

    setSellingP(newSellingP);
  }, [origPrice, quantity, markup]);

  useEffect(() => {
    const OP = parseFloat(origPrice);
    const SP = parseFloat(sellingP);
    const comm = SP - OP;
    setCommissionA(comm);
  }, [origPrice, sellingP])

  /////////---- discount saka delivery feeq 12
  useEffect(() => {
    const sellingPriceNumeric = parseFloat(sellingP);
    const discountR = parseInt(discount);
    const deliveryfee = parseInt(fee)

    const discountAmt = sellingPriceNumeric * (discountR / 100);
    const discountTotal = sellingPriceNumeric - discountAmt;
    const totalAmount = discountTotal + deliveryfee;
    setTotalAmt(totalAmount);
    setDiscountAmt(discountTotal);

  }, [sellingP, discount, fee]);


  //sets
  const handleQuantityChange = (value) => {
    // Remove leading '0's
    value = value.replace(/^0+(?=\d)/, '');

    if (value === '' || (value === '0' && value.length === 1)) {
      setQuantity(null); // Set to null if the input is empty or '0' with no other digits
    } else {
      const numericValue = parseInt(value);
      if (!isNaN(numericValue) && numericValue <= 1000) {
        setQuantity(Math.round(numericValue / 5) * 5); // Set the quantity if it's a valid number within the range
      }
    }
    console.log(quantity);
  };


  // Function to handle markup input changes
  const handleMarkupChange = (value) => {
    // Remove leading '0's
    value = value.replace(/^0+(?=\d)/, '');

    if (value === '' || (value === '0' && value.length === 1)) {
      setMarkup(null); // Set to null if the input is empty or '0' with no other digits
    } else {
      const numericValue = parseInt(value);
      if (!isNaN(numericValue) && numericValue <= 100) {
        setMarkup(Math.round(numericValue / 5) * 5); // Set the quantity if it's a valid number within the range
      }
    }
  };



  const handleDiscountChange = (value) => {
    // Remove leading '0's
    value = value.replace(/^0+(?=\d)/, '');

    if (value === '' || (value === '0' && value.length === 1)) {
      setDiscount(null); // Set to null if the input is empty or '0' with no other digits
    } else {
      const numericValue = parseInt(value);
      if (!isNaN(numericValue) && numericValue <= 100) {
        setDiscount(Math.round(numericValue / 5) * 5); // Set the quantity if it's a valid number within the range
      }
    }
  };



  return (
    <div>
      {/* ORDERFORMS ADMIN CONTAINER */}
      <div className="w-full flex p-8 relative self-start items-center flex-col justify-start">
        {/* DATE AND TIME */}
        <div className="w-full flex flex-row items-center justify-between ">
          <div>
            <p className="w-full self-start text-[20px] ml-4 ">October 21, 2023</p>
          </div>
          <div>
            <p className="self-end text-[20px] mr-4">Wednesday, 10:30 AM</p>
          </div>
        </div>

        <div className="w-full flex flex-row">
          <div className="flex flex-row w-full h-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">




            <div className="w-full flex h-full flex-col m-2 items-center justify-center rounded-3xl">
              <div className="flex flex-row items-start justify-start self-start">
                <Header category="Page" title="Order Forms" />
              </div>
              <div className="flex flex-row h-full w-full bg-white mx-2 my-2">

                <div className="flex flex-col w-full h-full ">



                  <div className="flex flex-row w-full h-full mb-10 ">
                    {/*Card 1: Order Form */}


                    <div className="flex flex-col w-full border-1 shadow-md p-4 mr-4 rounded-3xl bg-white items-start justify-center">

                      <form onSubmit={handleSaveOrders} className="form-order">
                        {/*Personal Details  */}
                        <div className="flex flex-row w-full border-1 shadow-md p-4 mb-4 rounded-3xl bg-white items-start justify-start self-start">
                          <div className=" ml-4 flex flex-col w-full">
                            <div className="flex flex-row items-center w-full">
                              <div className="flex flex-col mr-3 self-start justify-start w-full">

                                {/*Section: Upper  */}
                                <div className="flex flex-row w-full p-4  bg-white items-start justify-start self-start mt-5">

                                  {/*Image Items */}
                                  <div className=" flex flex-col w-[250px] items-center justify-center">
                                    <div className="items-center justify-center self-center">
                                      <div className="flex flex-row text-center justify-center items-center">
                                        <h1 className="font-semibold text-blue-500">Order Form: ID</h1>
                                      </div>

                                      {/*ImagePreview and Uploading */}
                                      <div className="flex flex-row mt-2">

                                        {imagePreviewURL && (
                                          <img
                                            id="furniture_image"
                                            src={imagePreviewURL}
                                            alt="order-item"
                                            className="rounded-xl w-[160px] h-[160px]"
                                          />
                                        )}
                                      </div>


                                      <div className="flex flex-row justify-center items-center w-full">
                                        <button
                                          className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm "
                                          onClick={() => document.getElementById('fileInput').click()}
                                        >
                                          Choose an image
                                        </button>

                                        <input
                                          id="fileInput"
                                          type="file"
                                          accept="image/*"
                                          onChange={handleFileChange}
                                          className="hidden"
                                        />

                                      </div>
                                    </div>



                                  </div >
                                  {/*Side Text */}
                                  <div className="  flex flex-row ml-3">
                                    <div className="flex flex-col">
                                      {/*TEXTBOX Order Date mm/dd/yyyy */}
                                      <div className="w-full h-[2.5rem] relative mt-3">
                                        <label className="absolute top-0 left-[3.2rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="orderdate">
                                          Order Date:
                                        </label>

                                        <input type="date" name="orderdate" id="orderdate" className=" px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" onChange={handleCurrentDate} />

                                      </div>

                                      {/*TEXTBOX CustomerName */}
                                      <div className="w-full h-full relative mt-3">
                                        <label className="absolute top-0 left-[4.4rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="customername">
                                          Customer Name :
                                        </label>

                                        <input type="text" name="customername" id="customername" className=" px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]"
                                          onChange={handleCustomerNameChange} />
                                      </div>

                                      {/*TEXTBOX address */}
                                      <div className="w-full relative mt-3">
                                        <label className="absolute top-0 left-[2.7rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-[12px] px-2" htmlFor="address">
                                          Address:
                                        </label>

                                        <textarea type="text" name="address" id="address" rows="2" cols="50" className=" px-4 w-full p-2 border-1 border-blue-700 rounded text-[12px]"
                                          onChange={handleAddressChange} />
                                      </div>


                                      {/*Container contactnum*/}
                                      <div className="w-full h-full relative mt-2">

                                        {/*Label and textbox contactnum */}
                                        <label className="absolute top-0 left-[4.3rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="contactnum">
                                          Contact Number:
                                        </label>

                                        <input type="number" name="contactnum" id="contactnum" className=" hide-number-arrows  px-4 h-full w-full p-2 border-1 mr-0 border-blue-700 rounded text-[12px]"
                                          onChange={handleContactNumChange} />
                                      </div>

                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                        </div>


                        {/*Furniture Details  */}
                        <div className="flex flex-row w-full border-1 shadow-md p-4 mb-4 rounded-3xl bg-white items-start justify-start self-start">
                          <div className=" ml-4 flex flex-col w-full">
                            <div className="flex flex-row items-center w-full">
                              <div className="flex flex-col mr-3 self-start justify-start w-full">
                                {/*COMBOBOX Furniture Type */}
                                <div className="w-full relative mt-3">
                                  <label className="absolute top-0 left-[6.5rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="furniture">
                                    Choose a type of furniture set:
                                  </label>

                                  <select name="furniture" id="furniture" className=" px-4 py-4 mb-2 w-full p-2 border-1 border-blue-700 rounded text-[12px]" value={selectedFurniture} onChange={handleFurnitureChange}>
                                    {furnitureTypes.map((type, index) => (
                                      <option key={index} value={type}>
                                        {type}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/*TEXTBOX Other Descriptions */}
                                <div className="w-full relative mt-3">
                                  <label className="absolute top-0 left-[4.4rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="description">
                                    Other Descriptions:
                                  </label>

                                  <textarea type="text" name="description" id="description" rows="3" cols="50" className=" px-4 py-4 w-full p-2 border-1 border-blue-700 rounded text-[12px]"
                                    onChange={handleDescriptionsChange} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        {/*Transaction Details  */}
                        <div className="flex flex-row w-full border-1 shadow-md p-4 mb-4 rounded-3xl bg-white items-start justify-start self-start">
                          <div className=" ml-4 flex flex-col w-full">
                            <div className="flex flex-row items-center w-full">
                              <div className="flex flex-col mr-3 self-start justify-start w-full">

                                {/*Container Original Price Per Set */}
                                <div className="w-full relative mt-3">

                                  {/*No.Of Sets*/}
                                  <div className="flex flex-row w-full">
                                    <div className="flex flex-col mr-3 self-start items-center justify-start w-full">
                                      <div className="w-full relative flex flex-row my-2">
                                        <label className="absolute top-0 left-12 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="description">
                                          No. of Sets:
                                        </label>
                                        {/*Numeric Up Down */}
                                        <div className="mt-3">
                                          {/**actual updownNumeric */}
                                          <div className="flex flex-row">
                                            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-red-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
                                              <button className="flex w-[40px] h-full border-gray-800" onClick={handleDecrement}>
                                                <div className="mx-[10px] justify-center items-center self-center">
                                                  <AiOutlineMinus />
                                                </div>
                                              </button>
                                            </div>
                                            <div className="flex flex-col">
                                              <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                min="0"
                                                max="100"
                                                maxLength="3"
                                                step="1"
                                                value={quantity === null ? '' : quantity} // Render empty string if quantity is null
                                                onChange={(e) => handleQuantityChange(e.target.value)}
                                                className="hide-number-arrows w-[55px] text-center p-2 border-1 border-blue-700 rounded flex justify-end"
                                              />
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-green-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
                                              <button className="w-[40px] h-full border-gray-800" onClick={handleIncrement}>
                                                <div className="mx-[10px] justify-center items-center self-center">
                                                  <AiOutlinePlus />
                                                </div>
                                              </button>
                                            </div>
                                          </div>

                                        </div>

                                        {/*Label and textbox Original Price */}
                                        <label className="absolute top-0 left-[15.5rem] w-[180px] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="originalpriceperset">
                                          Original Price per Set (PHP):
                                        </label>
                                        <div className="mr-2 h-[3.5rem] w-full">
                                          <input
                                            type="number"
                                            name="originalpriceperset" id="originalpriceperset" className=" hide-number-arrows ml-5 px-4 h-full w-full p-2 border-1 mr-0 border-blue-700 rounded text-[12px]"
                                            onChange={handleOrigPrice} />
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/*Container Original Price */}
                                <div className="w-full relative mt-3">

                                  {/*No.Of Sets*/}
                                  <div className="flex flex-row w-full">
                                    <div className="flex flex-col self-start items-center justify-start w-full">
                                      <div className="w-full relative flex flex-row my-2">


                                        {/*Label and textbox Original Price */}
                                        <label className="absolute top-0 left-[4.65rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="originalprice">
                                          Original Price (PHP):
                                        </label>
                                        <div className=" h-[3.5rem] w-full">
                                          <input
                                            type="number"
                                            name="originalprice" id="originalprice" className=" hide-number-arrows px-4 h-full w-full p-2 border-1 mr-0 border-blue-700 rounded text-[12px]"
                                            value={parseFloat(totalOrigPrice)}
                                            readOnly
                                            onChange={(e) => setQuantity(e.target.value)}
                                          />
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/*Container SELLING Price */}
                                <div className="w-full relative ">

                                  {/*Set Markup*/}
                                  <div className="flex flex-row w-full">
                                    <div className="flex flex-col mr-3 self-start items-center justify-start w-full">
                                      <div className="w-full relative flex flex-row my-2">
                                        <label className="absolute top-0 left-12 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark-text-gray-400 text-xs px-2" htmlFor="markup">
                                          Markup (%):
                                        </label>
                                        <div className="mt-3">
                                          {/**actual updownNumeric */}
                                          <div className="flex flex-row">
                                            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-red-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
                                              <button className="flex w-[40px] h-full border-gray-800" onClick={handleMinus}>
                                                <div className="mx-[10px] justify-center items-center self-center">
                                                  <AiOutlineMinus />
                                                </div>
                                              </button>
                                            </div>
                                            <div className="flex flex-col">
                                              <input
                                                type="number"
                                                id="markup"
                                                name="markup"
                                                min="0"
                                                max="100"
                                                maxLength="100"
                                                step="5"
                                                value={markup === null ? '' : markup} // Render empty string if quantity is null
                                                onChange={(e) => handleMarkupChange(e.target.value)}
                                                className="hide-number-arrows px-1 w-[50px] text-center p-2 border-1 border-blue-700 rounded flex justify-end"
                                              />
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-green-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
                                              <button className="w-[40px] h-full border-gray-800" onClick={handleAdd}>
                                                <div className="mx-[10px] justify-center items-center self-center">
                                                  <AiOutlinePlus />
                                                </div>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <label className="absolute top-0 left-[13.7rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark-text-gray-400 text-xs px-2" htmlFor="sellingprice">
                                          Selling Price (PHP):
                                        </label>
                                        <div className="mr-2 h-[3.5rem] w-full">
                                          <input
                                            type="number"
                                            name="sellingprice"
                                            id="sellingprice"
                                            className="hide-number-arrows ml-5 px-4 h-full w-full p-2 border-1 mr-0 border-blue-700 rounded text-[12px]"
                                            value={sellingP.toFixed(2)}
                                            readOnly
                                          />
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/*Container Discount Price */}
                                <div className="w-full relative mt-3">

                                  {/*No.Of Sets*/}
                                  <div className="flex flex-row w-full">
                                    <div className="flex flex-col mr-3 self-start items-center justify-start w-full">
                                      <div className="w-full relative flex flex-row my-2">
                                        <label className="absolute top-0 left-12 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="description">
                                          Discount (%):
                                        </label>
                                        {/*Numeric Up Down */}
                                        <div className="mt-3">
                                          {/**actual updownNumeric */}
                                          <div className="flex flex-row">
                                            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-red-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
                                              <button className="flex w-[40px] h-full border-gray-800" onClick={handleMinusDicount}>
                                                <div className="mx-[10px] justify-center items-center self-center">
                                                  <AiOutlineMinus />
                                                </div>
                                              </button>
                                            </div>
                                            <div className="flex flex-col">
                                              <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                min="0"
                                                max="100"
                                                maxLength="3"
                                                step="5"
                                                value={discount === null ? '' : discount} // Render empty string if quantity is null
                                                onChange={(e) => handleDiscountChange(e.target.value)}
                                                className="hide-number-arrows w-[55px] text-center p-2 border-1 border-blue-700 rounded flex justify-end"
                                              />
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-green-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
                                              <button className="w-[40px] h-full border-gray-800" onClick={handleAddDiscount}>
                                                <div className="mx-[10px] justify-center items-center self-center">
                                                  <AiOutlinePlus />
                                                </div>
                                              </button>
                                            </div>
                                          </div>

                                        </div>

                                        {/*Label and textbox discount amt */}
                                        <label className="absolute top-0 left-[15.8rem] w-[180px] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="originalpriceperset">
                                          Discounted Price (PHP):
                                        </label>
                                        <div className="mr-2 h-[3.5rem] w-full">
                                          <input
                                            type="number"
                                            name="originalpriceperset" id="originalpriceperset" className=" hide-number-arrows ml-5 px-4 h-full w-full p-2 border-1 mr-0 border-blue-700 rounded text-[12px]"
                                            value={discountAmt.toFixed(2)}
                                            readOnly />
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/*Container Commission Amt */}
                                <div className="w-full relative mt-8">

                                  {/*Set Commission*/}
                                  <div className="flex flex-row w-full">
                                    <div className="flex flex-col self-start items-center justify-start w-full">
                                      <div className="w-full relative flex flex-row my-2">
                                        <label className="absolute top-0 left-[6.2rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark-text-gray-400 text-xs px-2" htmlFor="commissionamount">
                                          Commission Amount (PHP):
                                        </label>
                                        <div className=" h-[3.5rem] w-full">
                                          <input
                                            type="number"
                                            name="commissionamount"
                                            id="commissionamount"
                                            className="hide-number-arrows px-4 h-full w-full p-2 border-1  border-blue-700 rounded text-[12px]"
                                            value={commissionA.toFixed(2)}
                                            readOnly
                                          />
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>


                        {/*Delivery Details  */}
                        <div className="flex flex-row w-full border-1 shadow-xl p-4 rounded-3xl bg-white items-start justify-start self-start">
                          <div className=" ml-4 flex flex-col w-full">
                            <div className="flex flex-row items-center w-full">
                              <div className="flex flex-col mr-3 self-start justify-start w-full">



                                {/*TEXTBOX Delivery Date mm/dd/yyyy */}
                                <div className="w-full h-[3.5rem] relative mt-8">
                                  <label className="absolute top-0 left-[3.5rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="deliverydate">
                                    Delivery Date:
                                  </label>

                                  <input type="date" name="deliverydate" id="deliverydate" className=" px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]"
                                    onChange={handleDeliveryDate} />
                                </div>

                                {/*Container Delivery Fee*/}
                                <div className="w-full relative mt-3">
                                  <div className="flex flex-row w-full">
                                    <div className="flex flex-col self-start items-center justify-start w-full">
                                      <div className="w-full relative flex flex-row my-2">


                                        {/*Label and textbox Original Price */}
                                        <label className="absolute top-0 left-[4.65rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="originalprice">
                                          Delivery Fee (PHP):
                                        </label>
                                        <div className=" h-[3.5rem] w-full">
                                          <input
                                            type="number"
                                            name="originalprice" id="originalprice" className=" hide-number-arrows px-4 h-full w-full p-2 border-1 mr-0 border-blue-700 rounded text-[12px]"
                                            onChange={handleDeliveryFee}
                                          />
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>


                                {/*TEXTBOX Total Amount (PHP) */}
                                <div className="w-full h-[3.5rem] relative mt-3 mb-8">
                                  <label className="absolute top-0 left-[4.6rem] transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-600 dark:text-gray-400 text-xs px-2" htmlFor="totalamount">
                                    Total Amount (PHP):
                                  </label>

                                  <input type="number" name="totalamount" id="totalamount"
                                    className=" hide-number-arrows  px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]"
                                    value={(totalAmt).toFixed(2)}
                                    readOnly />

                                </div>




                              </div>


                            </div>
                          </div>

                        </div>


                        {/*Buttons */}
                        <div className="flex flex-row justify-center items-center w-full mb-8">
                          <button type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 cursor-pointer text-center w-full h-[40px] mt-5 text-sm mr-2 " onClick={handleSaveOrders}
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-600 cursor-pointer text-center w-full h-[40px] mt-5 text-sm mx-2 "
                          >
                            Cancelled
                          </button>
                          <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-600 cursor-pointer text-center w-full h-[40px] mt-5 text-sm ml-2"
                          >
                            Delivered
                          </button>
                        </div>

                      </form>

                    </div>



                    {/*Card 2: Order Form */}
                    <div className="flex flex-col w-full border-1 shadow-md p-4 mr-3 ml-4 rounded-3xl bg-white items-start justify-start">

                      <PendingOrdersTable />

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

export default OrderForms;
