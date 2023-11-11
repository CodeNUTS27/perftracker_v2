import React, { useState } from 'react'
import Header from './Header'
import ResellerList from './ResellerList';


const ApprovalAdminComponent = () => {


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
                                <Header category="Page" title="Approvals" />
                            </div>
                            <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                                <div className="flex flex-col w-full h-full">
                                    <div className="flex flex-row w-full h-full mb-10">

                                        {/* Card 1: Reseller Search*/}
                                        <div className="flex flex-col flex-grow h-full w-full border-1 shadow-md p-4 mr-4 rounded-3xl bg-white items-start justify-start">
                                            <div className="flex flex-row text-center justify-center items-center p-5 h-full w-full">
                                                <h1 className="font-semibold text-blue-500 text-2xl">Registrants</h1>
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
                                            <div className="flex flex-row text-center justify-center items-center p-5 h-full w-full">
                                                <h1 className="font-semibold text-blue-500 text-2xl">Details</h1>
                                            </div>
                                            {/* Section: Upper */}
                                            <div className="flex flex-col w-full px-8 pt-2 pb-0 bg-white items-start justify-start self-start">

                                                {/* Side Text */}
                                                <div className="flex flex-row w-full h-full">
                                                    <div className="flex flex-row ml-1 w-full h-full">
                                                        <div className="flex flex-col w-full h-full">
                                                            {/* Textbox for Username */}
                                                            <div className="w-full h-[3.5rem] relative flex flex-col items-start justify-start self-start">
                                                                <div className="flex flex-row w-full h-full mb-2">
                                                                    <h2 className="flex mr-5 bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        Sign-up date:
                                                                    </h2>
                                                                    <h2 className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        October 27, 2023
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                            {/* Textbox for Username */}
                                                            <div className="w-full h-[2.5rem] relative flex flex-col items-start justify-start self-start">
                                                                <div className="flex flex-row w-full h-full mb-2">
                                                                    <h2 className="flex mr-5 bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        First Name:
                                                                    </h2>
                                                                    <h2 className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        Michelle Alyson
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                            {/* Textbox for Username */}
                                                            <div className="w-full h-[2.5rem] relative flex flex-col items-start justify-start self-start">
                                                                <div className="flex flex-row w-full h-full mb-2">
                                                                    <h2 className="flex mr-5 bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        Last Name:
                                                                    </h2>
                                                                    <h2 className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        Fuentes
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                            {/* Textbox for Username */}
                                                            <div className="w-full h-[2.5rem] relative flex flex-col items-start justify-start self-start">
                                                                <div className="flex flex-row w-full h-full mb-2">
                                                                    <h2 className="flex mr-5 bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        Address:
                                                                    </h2>
                                                                    <h2 className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        CAA, Las Pinas City
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                            {/* Textbox for Username */}
                                                            <div className="w-full h-[2.5rem] relative flex flex-col items-start justify-start self-start">
                                                                <div className="flex flex-row w-full h-full mb-2">
                                                                    <h2 className="flex mr-5 bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        Contact Number:
                                                                    </h2>
                                                                    <h2 className="flex bg-white text-gray-600 dark:text-gray-400" htmlFor="username">
                                                                        0912345678
                                                                    </h2>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col w-full mt-6">

                                                    <div className="flex flex-col m-3">
                                                        <div className="flex flex-col w-full p-4 mb-4 bg-blue-20 rounded-[10px] items-center shadow-md">
                                                            <h2 className="font-semibold text-blue-600">CREATE NEW ACCOUNT</h2>
                                                            <div className="flex m-4">

                                                            </div>
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

                                                            <div className="w-full h-[4.5rem] relative flex flex-col items-start justify-start self-start"> 
                                                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 cursor-pointer text-center w-full h-[40px] mt-2 text-sm"> Send </button>
                                                            </div>
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

export default ApprovalAdminComponent