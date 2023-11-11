import React from 'react'
import ExampleBar from './Charts/ExampleBar'

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barSalesSeries, barPrimaryXAxis, barPrimaryYAxis } from '../data/dummy';
import { ChartsHeader } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const ReportsAdminComponent = () => {

    const { currentMode } = useStateContext();
    return (
        <div>

            <div className=" w-full flex p-8 relative self-start items-center flex-col justify-start rounded-3xl">

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
                            <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                                <div className="flex flex-col w-full h-full">
                                    <div className="flex flex-col w-full h-full mb-10">
                                        {/*DATE AND TIME */}
                                        <div className="w-full flex flex-row items-center justify-center ">
                                            <div>
                                                <h2 className="w-full self-start text-[20px] ml-4 font-semibold">RHY-RHY FURNITURE SHOP MONTHLY REPORT ( <span className="text-blue-500 font-semibold">October 2023</span> )</h2>
                                            </div>
                                        </div>


                                        {/* 2 CARDS */}
                                        <div className="w-full h-[156px ] flex relative self-start mt-4 flex-row justify-start mb-8 flex-wrap">

                                            <div className="self-center justify-center flex flex-row flex-wrap">

                                                {/*Card Detailed Amounts */}
                                                <div className="w-full bg-blue-50 self-center justify-center flex flex-row flex-wrap rounded-3xl mb-6 ">
                                                    <div className="w-full flex flex-row items-center justify-center my-8">
                                                        <h2 className="text-center font-semibold text-lg text-blue-900 ">Detailed Amounts in Peso (PHP)</h2>
                                                    </div>

                                                    <div className="flex flex-row w-full h-full">
                                                        {/*CARDS : TOTAL (OVERALL) SALES */}
                                                        <div className=" flex-2 w-full h-full flex  self-center mx-4 mb-6 items-center rounded-[30px] flex-col justify-center bg-white ">
                                                            <svg
                                                                viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                                className="w-10 h-10 self-end mt-4 mr-4"
                                                            >
                                                                <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                            </svg>
                                                            <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                                <p className="w-full font-semibold text-blue-700 self-start pb-2 text-2xl">P 727,524.00</p>
                                                                <p className="text-blue-700 text-center text-sm">Total Gross Sales</p>
                                                            </div>
                                                        </div>

                                                        {/*CARDS : TOTAL (OVERALL) COMMISSION */}
                                                        <div className=" flex-2 w-full h-full flex  self-center mx-4 mb-6 items-center rounded-[30px] flex-col justify-center bg-white  ">
                                                            <svg
                                                                viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                                className="w-10 h-10 self-end mt-4 mr-4"
                                                            >
                                                                <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                            </svg>
                                                            <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                                <p className="w-full font-semibold text-blue-700 self-start pb-2 text-2xl">P 727,524.00</p>
                                                                <p className="text-blue-700 text-center text-sm">Total Gross Commissions</p>
                                                            </div>
                                                        </div>

                                                        {/*CARDS : TOTAL (OVERALL) BONUSES */}
                                                        <div className=" flex-2 w-full h-full flex self-center mx-4 mb-6 items-center rounded-[30px] flex-col justify-center bg-white  ">
                                                            <svg
                                                                viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                                className="w-10 h-10 self-end mt-4 mr-4"
                                                            >
                                                                <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                            </svg>
                                                            <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                                <p className="w-full font-semibold text-blue-700 self-start pb-2 text-2xl">P 727,524.00</p>
                                                                <p className="text-blue-700 text-center text-sm">Total Gross Bonuses</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/*Card Detailed Counts */}
                                                <div className="w-full bg-blue-50 self-center justify-center flex flex-row flex-wrap rounded-3xl mb-6">
                                                    <div className="w-full flex flex-row items-center justify-center my-8">
                                                        <h2 className="text-center font-semibold text-lg text-blue-900">Detailed Counts of Figures</h2>
                                                    </div>

                                                    <div className="flex flex-row w-full h-full">
                                                        {/*CARDS : TOTAL (OVERALL) SALES */}
                                                        <div className="flex-2 w-full h-full flex  self-center mx-4 mb-6 items-center rounded-[30px] flex-col justify-center bg-white ">
                                                            <svg
                                                                viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                                className="w-10 h-10 self-end mt-4 mr-4"
                                                            >
                                                                <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                            </svg>
                                                            <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                                <p className="w-full font-semibold text-blue-700 self-start pb-2 text-2xl">270</p>
                                                                <p className="text-blue-700 text-center text-sm">Total Resellers</p>
                                                            </div>
                                                        </div>

                                                        {/*CARDS : TOTAL (OVERALL) COMMISSION */}
                                                        <div className="flex-2 w-full h-full flex  self-center mx-4 mb-6 items-center rounded-[30px] flex-col justify-center bg-white  ">
                                                            <svg
                                                                viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                                className="w-10 h-10 self-end mt-4 mr-4"
                                                            >
                                                                <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                            </svg>
                                                            <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                                <p className="w-full font-semibold text-blue-700 self-start pb-2 text-2xl">798</p>
                                                                <p className="text-blue-700 text-center text-sm">Total Delivered Orders</p>
                                                            </div>
                                                        </div>

                                                        {/*CARDS : TOTAL (OVERALL) BONUSES */}
                                                        <div className="flex-2 w-full h-full flex  self-center mx-4 mb-6 items-center rounded-[30px] flex-col justify-center bg-white  ">
                                                            <svg
                                                                viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                                className="w-10 h-10 self-end mt-4 mr-4"
                                                            >
                                                                <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                            </svg>
                                                            <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                                <p className="w-full font-semibold text-blue-700 self-start pb-2 text-2xl">699</p>
                                                                <p className="text-blue-700 text-center text-sm">Total Sets Sold</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/*Card Charts */}
                                                <div className="w-full bg-blue-50 self-center justify-center flex flex-row flex-wrap rounded-3xl mb-6">
                                                    <div className="w-full flex flex-row items-center justify-center my-8">
                                                        <h2 className="text-center font-semibold text-lg text-blue-900">Data Analytics: Charts</h2>
                                                    </div>

                                                    {/*CARDS : TOTAL (OVERALL) COMMISSION */}
                                                    <div className=" w-full h-full flex  self-center mx-4 mb-6 items-center flex-col justify-center ">


                                                        <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                            <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                <h2 className="font-semibold text-blue-600 text-center text-xl">Gross Sales of All Resellers <br /> October 2023</h2>
                                                                <div className="flex w-full h-full items-center justify-center self-center">

                                                                    <div>
                                                                        <ChartComponent
                                                                            id="charts"
                                                                            primaryXAxis={{
                                                                                valueType: 'Category',
                                                                                interval: 1,
                                                                                title: 'Name of Resellers',
                                                                                majorGridLines: { width: 0 },
                                                                                
                                                                            }}
                                                                            primaryYAxis={{
                                                                                minimum: 1,
                                                                                maximum: 100,
                                                                                interval: 5,
                                                                                labelFormat: '₱{value}',
                                                                                title: 'Amount of Sales',
                                                                                majorGridLines: { width: 1 },
                                                                                majorTickLines: { width: 1 },
                                                                                lineStyle: { width: 1 },
                                                                                labelStyle: { color: '#000000' },
                                                                            }}
                                                                            chartArea={{ border: { width: 0 } }}
                                                                            tooltip={{ enable: true }}
                                                                            background={currentMode === 'Dark' ? '#33373E' : '#fff'}
                                                                            legendSettings={{ background: 'white' }}
                                                                        >
                                                                            <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                                                                            <SeriesCollectionDirective>
                                                                                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                                                                                {barSalesSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
                                                                            </SeriesCollectionDirective>
                                                                        </ChartComponent>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                    {/*CARDS : TOTAL (OVERALL) BONUSES */}
                                                    <div className=" w-full h-full flex  self-center mx-4 mb-6 items-center  flex-col justify-center">

                                                        <div className=" m-3 p-2 shadow-lg bg-white rounded-3xl">
                                                            <div className="flex flex-col w-full h-full p-6 bg-white ">
                                                                <h2 className="font-semibold text-blue-600 text-center text-xl">Gross Commission of All Resellers <br /> October 2023</h2>
                                                                <ExampleBar />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>






                                                {/*CARDS : TOTAL (OVERALL) SALES */}
                                                <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-2 w-full h-full flex flex-wrap self-center mt-0 items-center ml-4 mr-2 mb-4 rounded-[30px] flex-col justify-center bg-white basis-1/4 ">
                                                    <svg
                                                        viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                        className="w-10 h-10 self-end mt-4 mr-4"
                                                    >
                                                        <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                    </svg>
                                                    <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                        <p className="font-semibold text-blue-700 self-start pb-2 text-2xl">270</p>
                                                        <p className="text-blue-700 text-center text-sm">Total Resellers</p>
                                                    </div>
                                                </div>

                                                {/*CARDS : TOTAL (OVERALL) SALES */}
                                                <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-2 w-full h-full flex flex-wrap self-center mt-0 items-center ml-4 mr-2 mb-4 rounded-[30px] flex-col justify-center bg-white basis-1/4 ">
                                                    <svg
                                                        viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                        className="w-10 h-10 self-end mt-4 mr-4"
                                                    >
                                                        <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                    </svg>
                                                    <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                        <p className="font-semibold text-blue-700 self-start pb-2 text-2xl">798</p>
                                                        <p className="text-blue-700 text-center text-sm">Total Delivered Orders</p>
                                                    </div>
                                                </div>

                                                {/*CARDS : TOTAL (OVERALL) SALES */}
                                                <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-2 w-full h-full flex flex-wrap self-center mt-0 items-center ml-4 mr-2 mb-4 rounded-[30px] flex-col justify-center bg-white basis-1/4 ">
                                                    <svg
                                                        viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                                                        className="w-10 h-10 self-end mt-4 mr-4"
                                                    >
                                                        <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                                                    </svg>
                                                    <div className="flex self-start items-start mx-8 flex-col pb-4 justify-start">
                                                        <p className="font-semibold text-blue-700 self-start pb-2 text-2xl">699</p>
                                                        <p className="text-blue-700 text-center text-sm">Total Sets Sold</p>
                                                    </div>
                                                </div>

                                            </div>




                                        </div>

                                        {/*BANNER/TITLE : TOP 5 RESELLERS */}
                                        <div className="w-full flex relative items-center flex-col justify-start mb-6">
                                            <div className="flex w-full h-full flex-wrap self-start mt-8 items-center mx-1 mb-1 flex-row justify-center">
                                                <span className="text-2xl self-start text-center font-semibold">
                                                    <p style={{ fontSize: '20px' }} className="font-semibold">TOP 5 RESELLERS FOR THE MONTH OF</p>
                                                    <p style={{ fontSize: '20px' }} className="text-blue-500">October 2023</p>
                                                </span>
                                            </div>
                                        </div>

                                        {/*CARDS : TOP 4 RESELLERS */}
                                        <div className=" w-full h-[368px] flex self-start my-4 flex-row justify-start ">

                                            {/*TOP4*/}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className=" w-full h-[240px] flex flex-wrap flex-1 self-end items-start ml-4 my-0 mr-2 pl-4 pr-4 flex-row justify-center rounded-[30px]">
                                                <img
                                                    alt="image"
                                                    src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&ixlib=rb-1.2.1&w=200"
                                                    className="w-24 h-24 self-start mt-6 object-cover rounded-full"
                                                />
                                                <div className="w-full h-24 flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="text-15 self-start text-center font-bold leading-5 ">
                                                        Quinones, Mark Richard
                                                    </p>
                                                    <p className="text-2xl self-center  mt-4 text-center font-bold leading-5 text-[#4cc366]">
                                                        PR: 48%
                                                    </p>
                                                </div>
                                            </div>

                                            {/*TOP2*/}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className=" w-full h-[300px] flex flex-wrap flex-1 self-end items-start ml-4 my-0 mr-2 pl-4 pr-4 flex-row justify-center rounded-[30px]">
                                                <img
                                                    alt="image"
                                                    src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&ixlib=rb-1.2.1&w=200"
                                                    className="w-24 h-24 self-start mt-6 object-cover rounded-full"
                                                />
                                                <div className="w-full h-24 flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="text-15 self-start text-center font-bold leading-5 ">
                                                        Quinones, Mark Richard
                                                    </p>
                                                    <p className="text-2xl self-center  mt-4 text-center font-bold leading-5 text-[#4cc366]">
                                                        PR: 48%
                                                    </p>
                                                </div>
                                                <svg viewBox="0 0 1024 1024" style={{ fill: '#C0C0C0' }} className="w-8 h-8">
                                                    <path d="M832 192v-128h-640v128h-192v128c0 106.038 85.958 192 192 192 20.076 0 39.43-3.086 57.62-8.802 46.174 66.008 116.608 113.796 198.38 130.396v198.406h-64c-70.694 0-128 57.306-128 128h512c0-70.694-57.306-128-128-128h-64v-198.406c81.772-16.6 152.206-64.386 198.38-130.396 18.19 5.716 37.544 8.802 57.62 8.802 106.042 0 192-85.962 192-192v-128h-192zM192 436c-63.962 0-116-52.038-116-116v-64h116v64c0 40.186 7.43 78.632 20.954 114.068-6.802 1.246-13.798 1.932-20.954 1.932zM948 320c0 63.962-52.038 116-116 116-7.156 0-14.152-0.686-20.954-1.932 13.524-35.436 20.954-73.882 20.954-114.068v-64h116v64z"></path>
                                                </svg>
                                            </div>

                                            {/*TOP1*/}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className=" w-full h-full flex flex-wrap flex-1 self-end items-start ml-4 my-0 mr-2 pl-4 pr-4 flex-row justify-center rounded-[30px]">
                                                <img
                                                    alt="image"
                                                    src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&ixlib=rb-1.2.1&w=200"
                                                    className="w-24 h-24 self-start mt-6 object-cover rounded-full"
                                                />
                                                <div className="w-full h-24 flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="text-15 self-start text-center font-bold leading-5 ">
                                                        Quinones, Mark Richard
                                                    </p>
                                                    <p className="text-2xl self-center  mt-4 text-center font-bold leading-5 text-[#4cc366]">
                                                        PR: 48%
                                                    </p>
                                                </div>
                                                <svg viewBox="0 0 1024 1024" style={{ fill: '#ffbe00' }} className="w-12 h-12">
                                                    <path d="M832 192v-128h-640v128h-192v128c0 106.038 85.958 192 192 192 20.076 0 39.43-3.086 57.62-8.802 46.174 66.008 116.608 113.796 198.38 130.396v198.406h-64c-70.694 0-128 57.306-128 128h512c0-70.694-57.306-128-128-128h-64v-198.406c81.772-16.6 152.206-64.386 198.38-130.396 18.19 15.716 37.544 8.802 57.62 8.802 106.042 0 192-85.962 192-192v-128h-192zM192 436c-63.962 0-116-52.038-116-116v-64h116v64c0 40.186 7.43 78.632 20.954 114.068-6.802 1.246-13.798 1.932-20.954 1.932zM948 320c0 63.962-52.038 116-116 116-7.156 0-14.152-0.686-20.954-1.932 13.524-35.436 20.954-73.882 20.954-114.068v-64h116v64z"></path>
                                                </svg>
                                            </div>

                                            {/*TOP3*/}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className=" w-full h-[300px] flex flex-wrap flex-1 self-end items-start ml-4 my-0 mr-2 pl-4 pr-4 flex-row justify-center rounded-[30px]">
                                                <img
                                                    alt="image"
                                                    src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&ixlib=rb-1.2.1&w=200"
                                                    className="w-24 h-24 self-start mt-6 object-cover rounded-full"
                                                />
                                                <div className="w-full h-24 flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="text-15 self-start text-center font-bold leading-5=">
                                                        Quinones, Mark Richard
                                                    </p>
                                                    <p className="text-2xl self-center  mt-4 text-center font-bold leading-5 text-[#4cc366]">
                                                        PR: 48%
                                                    </p>
                                                </div>
                                                <svg viewBox="0 0 1024 1024" style={{ fill: '#CD7F32' }} className="w-8 h-8">
                                                    <path d="M832 192v-128h-640v128h-192v128c0 106.038 85.958 192 192 192 20.076 0 39.43-3.086 57.62-8.802 46.174 66.008 116.608 113.796 198.38 130.396v198.406h-64c-70.694 0-128 57.306-128 128h512c0-70.694-57.306-128-128-128h-64v-198.406c81.772-16.6 152.206-64.386 198.38-130.396 18.19 5.716 37.544 8.802 57.62 8.802 106.042 0 192-85.962 192-192v-128h-192zM192 436c-63.962 0-116-52.038-116-116v-64h116v64c0 40.186 7.43 78.632 20.954 114.068-6.802 1.246-13.798 1.932-20.954 1.932zM948 320c0 63.962-52.038 116-116 116-7.156 0-14.152-0.686-20.954-1.932 13.524-35.436 20.954-73.882 20.954-114.068v-64h116v64z"></path>
                                                </svg>
                                            </div>

                                            {/*TOP5*/}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className=" w-full h-[240px] flex flex-wrap flex-1 self-end items-start ml-4 my-0 mr-2 pl-4 pr-4 flex-row justify-center rounded-[30px]">
                                                <img
                                                    alt="image"
                                                    src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&ixlib=rb-1.2.1&w=200"
                                                    className="w-24 h-24 self-start mt-6 object-cover rounded-full"
                                                />
                                                <div className="w-full h-24 flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="text-15 self-start text-center font-bold leading-5=">
                                                        Quinones, Mark Richard
                                                    </p>
                                                    <p className="text-2xl self-center  mt-4 text-center font-bold leading-5 text-[#4cc366]">
                                                        PR: 48%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/*BANNER/TITLE : DATA ANALYTICS */}
                                        <div className="w-full flex relative items-center flex-col justify-start mt-4 mb-6">
                                            <div className="flex w-full h-full flex-wrap self-start mt-8 items-center mx-1 mb-1 flex-row justify-center">
                                                <span className="text-2xl self-start text-center font-semibold">
                                                    <p style={{ fontSize: '20px' }} className="font-semibold">DATA ANALYTICS</p>
                                                    <p style={{ fontSize: '20px' }} className="text-blue-500">October 2023</p>
                                                </span>
                                            </div>
                                        </div>

                                        {/*CARD ROW 1 : DATA ANALYTICS */}
                                        <div className="w-full h-[280px] flex self-start mt-4 pt-4 flex-row justify-start">

                                            {/*MONTHLY SALES REVENUE OF RESELLERS */}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="bg-blue-100 flex flex-2 basis-1/2 w-full  h-full flex-wrap self-start shadow-md my-0 items-center ml-4 mr-2 flex-col justify-center rounded-[30px]">
                                                <div className="flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="self-start text-[15px] text-center leading-[1.15px] font-semibold mb-1">Monthly Sales Revenue of Resellers</p>
                                                </div>
                                            </div>

                                            {/*BEST SELLING FURNITURE SETS */}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex flex-1 basis-1/4 w-full h-full flex-wrap self-start shadow-md my-0 items-center ml-4 mr-2 flex-row justify-center bg-blue-200 rounded-[30px]">
                                                <div className="flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="self-start text-[15px] text-center leading-[1.15px] font-semibold mb-1">Best-Selling Furniture Sets</p>
                                                </div>
                                            </div>

                                            {/*BEST SELLING FURNITURE ITEMS */}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="bg-blue-300 flex basis-1/4 flex-1 w-full h-full flex-wrap self-start shadow-md my-0 items-center ml-4 mr-2 flex-row justify-center v rounded-[30px]">
                                                <div className="flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="self-start text-[15px] text-center leading-[1.15px] font-semibold mb-1">Bests-Selling Furniture Items</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/*CARD ROW 2 : DATA ANALYTICS */}
                                        <div className="w-full h-[280px] flex self-start mt-4 pt-4 flex-row justify-start">

                                            {/*MONTHLY SALES REVENUE OF RESELLERS */}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="bg-blue-100 flex flex-2 basis-1/2 w-full  h-full flex-wrap self-start shadow-md my-0 items-center ml-4 mr-2 flex-col justify-center rounded-[30px]">
                                                <div className="flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="self-start text-[15px] text-center leading-[1.15px] font-semibold mb-1">Monthly Sales Revenue of Resellers</p>

                                                </div>
                                            </div>

                                            {/*BEST SELLING FURNITURE SETS */}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex flex-1 basis-1/4 w-full h-full flex-wrap self-start shadow-md my-0 items-center ml-4 mr-2 flex-row justify-center bg-blue-200 rounded-[30px]">
                                                <div className="flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="self-start text-[15px] text-center leading-[1.15px] font-semibold mb-1">Best-Selling Furniture Sets</p>
                                                </div>
                                            </div>

                                            {/*BEST SELLING FURNITURE ITEMS */}
                                            <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="bg-blue-300 flex basis-1/4 flex-1 w-full h-full flex-wrap self-start shadow-md my-0 items-center ml-4 mr-2 flex-row justify-center v rounded-[30px]">
                                                <div className="flex items-center ml-0 px-4 flex-col justify-center">
                                                    <p className="self-start text-[15px] text-center leading-[1.15px] font-semibold mb-1">Bests-Selling Furniture Items</p>
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
    )
}

export default ReportsAdminComponent