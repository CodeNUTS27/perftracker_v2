import React, { useState } from 'react'
import Header from './Header'
import ResellerList from './ResellerList';
import MiniProfile from './MiniProfile';

const ResellersAdminComponent = () => {

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


  //searchbox
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  //combobox
  const [selectedOption, setSelectedOption] = useState(''); // State to store the selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update the selected option when the user makes a selection
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
                <Header category="Page" title="Resellers" />
              </div>
              <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-row w-full h-full mb-10">

                    {/* Card 1: Reseller Search*/}
                    <div className="flex flex-col flex-grow h-full w-full border-1 shadow-md p-4 mr-4 rounded-3xl bg-white items-start justify-start">
                      <div className="flex flex-row text-center justify-center items-center p-5 h-full w-full">
                        <h1 className="font-semibold text-blue-500 text-2xl">No. of Resellers: 4</h1>
                      </div>
                      <div className="flex flex-row text-center justify-center items-center p-5 w-full h-full">
                        <input
                          type="search"
                          name="search"
                          placeholder="Search Reseller..."
                          value={searchQuery}
                          onChange={handleSearch}
                          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border-blue-500 border-[2px] w-full"
                        />
                      </div>
                      {/* Section: Upper */}
                      <div className="flex flex-row w-full h-full px-1 pt-4 pb-0 bg-white items-start justify-start self-start">

                        {/* Side Text */}
                        <div className="flex flex-row w-full h-full mb-5">
                          <ResellerList />
                        </div>
                      </div>
                    </div>
                    {/* Card 2: Reseller Information */}
                    <div className="flex flex-col flex-grow h-full w-full border-1 shadow-md mb-10 p-4 mr-4 rounded-3xl bg-white items-start justify-center">
                      {/* Section: Upper */}
                      <div className="flex flex-col w-full px-8 pt-2 pb-0 bg-white items-start justify-start self-start">
                        {/* Image Items */}
                        <div className="flex flex-col w-full items-center justify-center">
                          <div className="items-center justify-center self-center">
                            <div className="flex flex-col justify-center items-center w-full">


                              {/* Image Preview and Uploading */}
                              <div className="flex flex-row mt-2 border-blue-300 border-[5px] w-[200px] h-[200px] rounded-[50%]">
                                {imagePreviewURL && (
                                  <img
                                    src={imagePreviewURL}
                                    alt="order-item"
                                    className="rounded-[50%] w-full h-full"
                                  />
                                )}
                              </div>
                              <div className="flex flex-col mt-5 items-center">
                                <p className="font-semibold text-lg text-blue-800">Michelle Alyson Fuentes</p>
                                <p className="text-sm">09473856751</p>
                                <p className="text-sm italic">fuentes.michellealyson@dfcamclp.edu.ph</p>
                              </div>
                              <div className="flex flex-row">
                                <div>
                                  <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"

                                  >
                                    View Profile
                                  </button>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        {/* Side Text */}
                        <div className="flex flex-row ml-8 w-full h-full">


                        </div>

                        <div className="flex flex-col w-full mt-6">

                          <div className="flex flex-row mx-3 mt-3 justify-between">
                            <div>
                              <h2 className="p-1 font-semibold text-blue-400">October 2023</h2>
                            </div>
                            <div className="flex flex-row ">
                              <h2 className="mr-3 p-1">Sort by: </h2>
                              <select className="bg-blue-500 text-white rounded-[10px] p-1" id="combo-box" value={selectedOption} onChange={handleOptionChange}>
                                <option value="">Month</option>
                                <option value="option1">Jan</option>
                                <option value="option2">Feb</option>
                                <option value="option3">Mar</option>
                                <option value="option1">Jun</option>
                                <option value="option2">Jul</option>
                                <option value="option3">Aug</option>
                                <option value="option1">Sept</option>
                                <option value="option2">Oct</option>
                                <option value="option3">Nov</option>
                              </select>
                            </div>

                          </div>
                          <div className="flex flex-col m-3">
                            <div className="flex flex-col w-full p-4 mb-4 bg-blue-20 rounded-[10px] items-center shadow-md">
                              <p className="font-bold text-3xl text-green-500">5</p>
                              <p>OrderForms</p>
                            </div>
                            <div className="flex flex-col w-full p-4 mb-4 bg-blue-20 rounded-[10px] items-center shadow-md">
                              <p className="font-bold text-3xl text-green-500">50</p>
                              <p>Sets</p>
                            </div>
                            <div className="flex flex-col w-full p-4 mb-4 bg-blue-20 rounded-[10px] items-center shadow-md">
                              <p className="font-bold text-3xl text-green-500">15,000</p>
                              <p>Gross Sales</p>
                            </div>
                            <div className="flex flex-col w-full p-4 mb-4 bg-blue-20 rounded-[10px] items-center shadow-md">
                              <p className="font-bold text-3xl text-green-500">5,000</p>
                              <p>Commission</p>
                            </div>
                            <div className="flex flex-col w-full p-4 bg-blue-20 rounded-[10px] items-center shadow-md">
                              <p className="font-bold text-3xl text-green-500">5</p>
                              <p>Customer Feedbacks</p>
                            </div>
                          </div>


                        </div>

                      </div>
                      <div className="flex flex-row text-center justify-center items-center p-5 w-full">
                        
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
  )
}

export default ResellersAdminComponent