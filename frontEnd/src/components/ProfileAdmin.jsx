import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { SidebarAdmin, Navbar, Footer, Button } from '.';
import { MdOutlineCancel } from 'react-icons/md';
import avatar from '../data/avatar.jpg';
import { userProfileData } from '../data/dummy';
import Header from '../components/Header';

const ProfileAdmin = () => {
  const { currentColor } = useStateContext();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (event) => {
      setSelectedFile(file);
      setImagePreviewURL(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* ORDERFORMS ADMIN CONTAINER */}
      <div className="w-full flex p-8 relative self-start items-center flex-col justify-start">
        {/* DATE AND TIME */}
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
                <Header category="Page" title="Profile" />
              </div>
              <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col w-full h-full mb-10">
                    {/* Card 1: Personal Information */}
                    <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4 mr-4 rounded-3xl bg-white items-start justify-center">
                      <div className="flex flex-row text-center justify-center items-center p-5">
                        <h1 className="font-semibold text-blue-500 text-2xl">Personal Information:</h1>
                      </div>
                      {/* Section: Upper */}
                      <div className="flex flex-row w-full px-8 pt-8 pb-0 bg-white items-start justify-start self-start">
                        {/* Image Items */}
                        <div className="flex flex-col w-full items-center justify-center">
                          <div className="items-center justify-center self-center">
                            <div className="flex flex-col justify-center items-center w-full">
                              <div className="flex flex-row">
                                <div>
                                  <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                                    onClick={() => document.getElementById('fileInput').click()}
                                  >
                                    Upload image
                                  </button>
                                </div>

                                <input
                                  id="fileInput"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />
                              </div>

                              {/* Image Preview and Uploading */}
                              <div className="flex flex-row mt-6 border-blue-300 border-[5px] w-[200px] h-[200px] rounded-[50%]">
                                {imagePreviewURL && (
                                  <img
                                    src={imagePreviewURL}
                                    alt="order-item"
                                    className="rounded-[50%] w-full h-full"
                                  />
                                )}
                              </div>

                              <div className="flex flex-row mt-5">
                                  <h2>Created: October 29, 2023</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Side Text */}
                        <div className="flex flex-row ml-8 w-full h-full">
                          <div className="flex flex-col w-full h-full">
                            {/* Textbox for Username */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                  First Name:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="username" id="username" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" />
                              </div>
                            </div>
                            {/* Textbox for Customer Name */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="customerName">
                                  Last Name:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="customerName" id="customerName" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" />
                              </div>
                            </div>
                            {/* Textbox for Contact Number */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="contactNumber">
                                  Contact Number:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="contactNumber" id="contactNumber" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" />
                              </div>
                            </div>
                            {/* Textbox for Contact Number */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="contactNumber">
                                  Address:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="contactNumber" id="contactNumber" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row text-center justify-center items-center p-5 w-full">
                        <div className="w-full items-center justify-center mr-3 ml-3">
                          <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="w-full items-center justify-center ml-3 mr-3">
                          <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover.bg-green-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                          >
                            Update All
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Card 2: Login Information */}
                    <div className="flex flex-col w-full border-1 shadow-md p-4 mr-4 rounded-3xl bg-white items-start justify-center">
                      <div className="flex flex-row text-center justify-center items-center p-5">
                        <h1 className="font-semibold text-blue-500 text-2xl">Login Information:</h1>
                      </div>
                      {/* Section: Upper */}
                      <div className="flex flex-row w-full px-8 pt-8 pb-0 bg-white items-start justify-start self-start">
                        
                        {/* Side Text */}
                        <div className="flex flex-row ml-8 w-full h-full">
                          <div className="flex flex-col w-full h-full mb-4 justify-center items-center self-center px-[12rem] ">
                            {/* Textbox for Username */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                  Enter Email:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="username" id="username" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" />
                              </div>
                            </div>
                            {/* Textbox for Password */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="customerName">
                                  Enter Password:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="customerName" id="customerName" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" /><button className="border-gray-500 p-1 border-[2px] h-full">See</button>
                              </div>
                            </div>
                            {/* Textbox for Contact Number */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="contactNumber">
                                  Re-enter Password:
                                </p>
                                
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="contactNumber" id="contactNumber" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" /> <button className="border-gray-500 p-1   border-[2px] h-full">See</button>
                              </div>
                            </div>
                            {/* Textbox for Contact Number */}
                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start">
                              <div className="flex flex-row w-full h-full mb-2">
                                <p className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="contactNumber">
                                  Enter Recovery Email:
                                </p>
                              </div>
                              <div className="flex flex-row w-full h-full mb-4">
                                <input type="text" name="contactNumber" id="contactNumber" className="px-4 w-full h-full p-2 border-1 border-blue-700 rounded text-[12px]" /> 
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row text-center justify-center items-center p-5 w-full">
                        <div className="w-full items-center justify-center mr-3 ml-3">
                          <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="w-full items-center justify-center ml-3 mr-3">
                          <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover.bg-green-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"
                          >
                            Update All
                          </button>
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

export default ProfileAdmin;
