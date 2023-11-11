import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

import { SidebarAdmin, Navbar, Footer, Button, ExampleBar, Pie, ExamplePie } from '.';
import { MdOutlineCancel } from 'react-icons/md';
import avatar from '../data/avatar.jpg';
import { userProfileData } from '../data/dummy';
import Header from './Header';

const AboutKPIsAdminComponent = () => {
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
                                <Header category="Page" title="About KPIs" />
                            </div>
                            <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                                <div className="flex flex-col w-full h-full">
                                    <div className="flex flex-col w-full h-full mb-10">
                                        {/* Card 1: Personal Information */}
                                        <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4 mr-4 rounded-3xl bg-white items-start justify-center">

                                            {/*Paragraph1 */}
                                            <div className="flex flex-row text-center justify-center items-center p-5">
                                                <h1 className="font-semibold text-blue-500 text-2xl">What are KPIs?</h1>
                                            </div>
                                            {/* Section: Upper */}
                                            <div className="flex flex-col w-full bg-white items-start justify-start self-start">

                                                {/* Side Text */}
                                                <div className="flex flex-col m-2 w-full h-full">
                                                    {/* Textbox for Username */}
                                                    <p className="text-justify px-5 pb-5 pt-2">A <strong>KPI is short for a key performance indicator</strong>, a measurable and quantifiable metric used to track progress towards a specific goal or objective. KPIs help organizations identify strengths and weaknesses, make data-driven decisions, and optimize performance.</p>

                                                    <a className=" px-5 pb-5 pt-2 italic text-right text-sm text-blue-700" href="https://www.klipfolio.com/resources/articles/what-is-a-key-performance-indicator"> https://www.klipfolio.com/resources/articles/what-is-a-key-performance-indicator </a>
                                                </div>

                                            </div>

                                            {/*Paragraph2 */}
                                            <div className="flex flex-row text-center justify-center items-center p-5">
                                                <h1 className="font-semibold text-blue-500 text-2xl">How does PerfTracker implements KPIs?</h1>
                                            </div>
                                            {/* Section: Upper */}
                                            <div className="flex flex-col w-full bg-white items-start justify-start self-start">

                                                {/* Side Text */}
                                                <div className="flex flex-row m-2 w-full h-full">
                                                    {/* Textbox for Username */}
                                                    <p className="text-justify px-5 pb-5 pt-2">In order to monitor and assess the performance of all the resellers, PerfTracker employs various Key Performance Indicators (KPIs) for specific objectives. These <strong>KPIs are measured through statistical methods </strong> in order to organize, compare, and summarize  different datasets to produce helpful and valuable information for data-driven decision-making within a business.  </p>
                                                </div>

                                            </div>
                                            
                                            {/*PERFORMANCE RATING BLUE BG */}
                                            <div className="m-4 self-center shadow-lg rounded-3xl h-full">
                                                <div className="flex flex-col bg-blue-50 w-full h-full rounded-3xl p-4">
                                                    {/*Paragraph3 */}
                                                    <div className="flex flex-row text-center justify-center items-center self-center p-5">
                                                        <h1 className="font-semibold text-blue-500 text-2xl text-center ">PERFORMANCE RATING (PR)</h1>
                                                    </div>
                                                    {/* Section: Upper */}
                                                    <div className="flex flex-col w-full items-start justify-start self-start">

                                                        {/* Side Text */}
                                                        <div className="flex flex-col m-2 w-full h-full">
                                                            {/* Textbox for Username */}
                                                            <p className="text-justify px-5 pb-5 pt-2">Each KPIs are computed and merged with each other to formulate a <strong>Performance Rating (PR)</strong> for the resellers. The PR of a reseller should not exceed <span className="text-red-600 font-bold">lower than 75%</span>, otherwise, certain actions may be initiated by the Admin. Resellers who maintain a PR <span className="text-green-600 font-bold">higher than 80%</span> may be recognized and included in the list of top-performing resellers.</p>

                                                            {/*  CARD PR CRITERIA*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                    <h2 className="text-lg font-semibold text-blue-800">Criteria for Rating the Perfomances of Resellers</h2>
                                                                    <br />
                                                                    <p>Resellers are rated depending on 4 different KPI metrics that they should work on which are the Sales Revenue, Customer Feedback, Activeness of Reseller, and Most Number of Sets Sold</p>
                                                                    <br />
                                                                    <p>PerfTracker allows monthly tracking of reseller's PR with the formula of:  </p>
                                                                    <br />

                                                                    <div className="self-center h-full ">
                                                                        {/*SALES REVENUE */}
                                                                        <div className="w-full h-full flex flex-col">
                                                                            {/*FORMULA */}
                                                                            <div className="flex flex-row w-full h-full justify-center items-center self-center">
                                                                                <div className="flex flex-col w-full h-full pl-[50px] ">
                                                                                    <p>(20%) - SR = Sales Revenue</p>
                                                                                    <p>(15%) - CF = Customer Satifaction</p>
                                                                                    <p>(15%) - A = Activeness of Reseller</p>
                                                                                    <p>(20%) - NS = Number of Sets Sold</p>
                                                                                    <p>----------------------------------</p>
                                                                                    <p>(100%) - PR = Sales Revenue</p>
                                                                                </div>
                                                                                <div className="flex flex-col w-full h-full pl-[50px]">
                                                                                    <p className="font-semibold">PR = (SR+CS+A+NS)/4</p>
                                                                                    <p className="italic text-[12px] mt-4">where SR, CS A, and NS, inside the parenthesis, are calculated on monthly basis</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>




                                                                </div>
                                                            </div>

                                                            {/*  CARD Sales KPI*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                    <h2 className="text-lg font-semibold text-blue-800">Sales Revenue KPI Metrics</h2>
                                                                    <br />
                                                                    <p>Resellers sell furniture sets and the accumulated amount of what they have sold are their <strong>Sales Revenue (SR).</strong></p>
                                                                    <br />
                                                                    <p>This is the monthly basis for rating the Sales Revenue (SR) of resellers</p>
                                                                    <br />

                                                                    <div className="self-center h-full ">
                                                                        {/*SALES REVENUE */}
                                                                        <div className="w-full h-full flex flex-col">
                                                                            <div className="flex flex-col w-full h-full justify-center self-center items-center">
                                                                                {/*FORMULA */}
                                                                                <p className="text-center mb-5 text-blue-600 font-semibold">MONTHLY SALES REVENUE BASIS OF RESELLERS: </p>
                                                                            </div>
                                                                            <div className="flex flex-row w-full h-full justify-center items-center self-center">
                                                                                <div className="flex flex-col w-full h-full self-center items-center justify-center ">
                                                                                    <p>100,000 & above    =   (20%)</p>
                                                                                    <p>90,000 - 99,000    =   (18%)</p>
                                                                                    <p>80,000 - 89,000    =   (16%)</p>
                                                                                    <p>70,000 - 79,000    =   (14%)</p>
                                                                                    <p>60,000 - 69,000    =   (12%)</p>
                                                                                    <p>50,000 - 59,000    =   (10%)</p>
                                                                                    <p>40,000 - 49,000    =   (8%)</p>
                                                                                    <p>30,000 - 39,000    =   (6%)</p>
                                                                                    <p>20,000 - 29,000    =   (4%)</p>
                                                                                    <p>19,000 & below     =   (2%)</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/*  CARD Customer Satisfaction KPI*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                    <h2 className="text-lg font-semibold text-blue-800">Customer Satisfaction KPI Metrics</h2>
                                                                    <br />
                                                                    <p>After selling the furniture sets, customers usually gives feedback for their way of giving gratitude or reviews towards the reseller. This is called <strong>Customer Satisfaction (CS).</strong></p>
                                                                    <br />
                                                                    <p>This is the monthly basis for rating the Customer Satisfaction (CS) of resellers</p>
                                                                    <br />

                                                                    <div className="self-center h-full ">
                                                                        {/*SATISFACTION */}
                                                                        <div className="w-full h-full flex flex-col">
                                                                            <div className="flex flex-col w-full h-full justify-center self-center items-center">
                                                                                {/*FORMULA */}
                                                                                <p className="text-center mb-5 text-blue-600 font-semibold">MONTHLY CUSTOMER SATISFACTION BASIS OF RESELLERS: </p>
                                                                            </div>
                                                                            <div className="flex flex-row w-full h-full justify-center items-center self-center">
                                                                                <div className="flex flex-col w-full h-full self-center items-center justify-center ">
                                                                                    <p>60 stars & above      =   (15%)</p>
                                                                                    <p>50 stars - 59 stars   =   (12%)</p>
                                                                                    <p>40 stars - 49 stars   =   (9%)</p>
                                                                                    <p>30 stars - 39 stars   =   (6%)</p>
                                                                                    <p>29 stars & below      =   (3%)</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            {/*  CARD Activeness KPI*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                    <h2 className="text-lg font-semibold text-blue-800">Activeness KPI metrics</h2>
                                                                    <br />
                                                                    <p>Performance of reseller is also measured the way how much he/she is eager to submit orders. This KPI metrics is <strong>Activeness of Resellers (A).</strong></p>
                                                                    <br />
                                                                    <p>This is the monthly basis for rating the Activeness (A) of resellers</p>
                                                                    <br />

                                                                    <div className="self-center h-full ">
                                                                        {/*Activeness */}
                                                                        <div className="w-full h-full flex flex-col">
                                                                            <div className="flex flex-col w-full h-full justify-center self-center items-center">
                                                                                {/*FORMULA */}
                                                                                <p className="text-center mb-5 text-blue-600 font-semibold">MONTHLY ACTIVENESS BASIS OF RESELLERS: </p>
                                                                            </div>
                                                                            <div className="flex flex-row w-full h-full justify-center items-center self-center">
                                                                                <div className="flex flex-col w-full h-full self-center items-center justify-center ">
                                                                                    <p>60 submitted & above          =   (15%)</p>
                                                                                    <p>50 submitted - 59 submitted   =   (12%)</p>
                                                                                    <p>40 submitted - 49 submitted   =   (9%)</p>
                                                                                    <p>30 submitted - 39 submitted   =   (6%)</p>
                                                                                    <p>29 submitted & below          =   (3%)</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/*  CARD Most Sold Sets KPI*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                    <h2 className="text-lg font-semibold text-blue-800">Most Sets Sold KPI metrics</h2>
                                                                    <br />
                                                                    <p>Resellers who sold most number of sets can receive bonuses from the admin and this is a real basis of how they are performing well in their tasks. This is how <strong>Most Sets Sold KPI (NS) works.</strong> </p>
                                                                    <br />
                                                                    <p>This is the monthly basis for considering the number of sets (NS) that a reseller should sell to customers</p>
                                                                    <br />

                                                                    <div className="self-center h-full ">
                                                                        {/*Most Sold Sets  */}
                                                                        <div className="w-full h-full flex flex-col">
                                                                            <div className="flex flex-col w-full h-full justify-center self-center items-center">
                                                                                {/*FORMULA */}
                                                                                <p className="text-center mb-5 text-blue-600 font-semibold">MONTHLY ACTIVENESS BASIS OF RESELLERS: </p>
                                                                            </div>
                                                                            <div className="flex flex-row w-full h-full justify-center items-center self-center">
                                                                                <div className="flex flex-col w-full h-full self-center items-center justify-center ">
                                                                                    <p>60 sets & above          =   (15%)</p>
                                                                                    <p>50 sets - 59 sets   =   (12%)</p>
                                                                                    <p>40 sets - 49 sets   =   (9%)</p>
                                                                                    <p>30 sets - 39 sets   =   (6%)</p>
                                                                                    <p>29 sets  & below          =   (3%)</p>
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
                                            
                                            {/*DATA ANALYTICS: CHARTS BLUE BG */}
                                            <div className="m-4 self-center shadow-lg rounded-3xl h-full">
                                                <div className="flex flex-col bg-blue-50 w-full h-full rounded-3xl p-4">
                                                    {/*Paragraph3 */}
                                                    <div className="flex flex-row text-center justify-center items-center self-center p-5">
                                                        <h1 className="font-semibold text-blue-500 text-2xl text-center ">DATA ANALYTICS: CHARTS</h1>
                                                    </div>
                                                    {/* Section: Upper */}
                                                    <div className="flex flex-col w-full items-start justify-start self-start">

                                                        {/* Side Text */}
                                                        <div className="flex flex-col m-2 w-full h-full">
                                                            {/* Textbox for Username */}
                                                            <p className="text-justify px-5 pb-5 pt-2">PerfTracker creates data analytics in a form of 2 charts: <strong>Bar Chart (BC)</strong> and <strong>Pie Chart (PC)</strong>. These charts are essential for monthly reports for the Admin and is useful for giving resellers a reference of how they work or perform within the business through looking at specific charts. </p>

                                                            {/*  CARD BARCHART*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                 <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                   <h2 className="font-semibold text-blue-600 text-center text-xl">Example of a Bar Chart</h2>
                                                                   <ExampleBar/>
                                                                </div>
                                                            </div>
                                                            
                                                            {/*  CARD PIECHART*/}
                                                            <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                                <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                   <h2 className="font-semibold text-blue-600 text-center text-xl">Example of a Pie Chart</h2>
                                                                   <ExamplePie/>
                                                                </div>
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
    );
}

export default AboutKPIsAdminComponent;




