import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { Ecommerce } from '..';
import '../../App';
import { useStateContext } from '../../contexts/ContextProvider';



const Dashboard = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const location = useLocation();
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">

        {/*TOOLTIP COMPONENT */}
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>

          </TooltipComponent>
        </div>

        {/*BUTTON : HAMBURGER, SIDEBAR */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        {/*OVERALL CONTAINER */}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >

          {/*NAVIGATION : MENU UPPER PART */}
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>

          {/*BUTTON : THEME SETTINGS */}
          <div>
            {themeSettings && (<ThemeSettings />)}

          </div>

          {/*DASHBOARD RESELLER CONTAINER */}
          <div className="w-full h-[1470px] flex p-8 relative self-start items-center flex-col justify-start">

            {/*DATE AND TIME */}
            <div className="w-full flex flex-row items-center justify-between ">
              <div>
                <p className="w-full self-start text-[20px] ml-4 ">October 21, 2023 </p>
              </div>
              <div>
                <p className=" self-end text-[20px] mr-4"> Wednesday, 10:30 AM</p>
              </div>
            </div>

            {/* 3 CARDS upper */}
            <div className="w-full h-[156px ] flex relative self-start mt-8 flex-row justify-start mb-8">

              {/*CARDS : TOTAL REVENUE */}
              <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-1 w-full h-full flex flex-wrap self-start shadow-md mt-0 items-center ml-4 mr-2 rounded-[30px] flex-col justify-center bg-white basis-1/4">
                <svg
                  viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                  className=" w-10 h-10 self-end mt-4 mr-4"
                >
                  <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                </svg>
                <div className="flex self-start items-start ml-8 flex-col pb-4 justify-start">
                  <p style={{ fontSize: '37px' }} className="font-semibold text-blue-700 self-start pb-2">P 5.05k</p>
                  <p style={{ fontSize: '16px' }} className="text-blue-700 text-center">Total Revenue</p>
                </div>
              </div>

              {/*CARDS : TOTAL COMMISSION */}
              <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-1 w-full h-full flex flex-wrap self-start shadow-md mt-0 items-center ml-4 mr-2 rounded-[30px] flex-col justify-center bg-white basis-1/4">
                <svg
                  viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                  className=" w-10 h-10 self-end mt-4 mr-4"
                >
                  <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                </svg>
                <div className="flex self-start items-start ml-8 flex-col pb-4 justify-start">
                  <p style={{ fontSize: '37px' }} className="font-semibold text-blue-700 self-start pb-2">4.56k</p>
                  <p style={{ fontSize: '16px' }} className="text-blue-700 text-center">Total Commission</p>
                </div>
              </div>

              {/*CARD : TOTAL SETS SOLD*/}
              <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-1 w-full h-full flex flex-wrap self-start shadow-md mt-0 items-center ml-4 mr-2 rounded-[30px] flex-col justify-center bg-white basis-1/4">
                <svg
                  viewBox="0 0 1024 1024" style={{ fill: '#e14747' }}
                  className=" w-10 h-10 self-end mt-4 mr-4
                    "
                >
                  <path d="M682 768l98-98-208-208-170 170-316-316 60-60 256 256 170-170 268 268 98-98v256h-256z"></path>
                </svg>
                <div className="flex self-start items-start ml-8 flex-col pb-4 justify-start">
                  <p style={{ fontSize: '37px' }} className="font-semibold text-blue-700 self-start pb-2">47</p>
                  <p style={{ fontSize: '16px' }} className="text-blue-700 text-center">Total Sets Sold</p>
                </div>
              </div>

              {/*CARD : CUSTOMER SATIFACTION */}
              <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="flex-1 w-full h-full flex flex-wrap self-start mt-0 items-center ml-4 mr-2 rounded-[30px] flex-col justify-center bg-white basis-1/2">
                <svg
                  viewBox="0 0 1024 1024" style={{ fill: '#4cc366' }}
                  className=" w-10 h-10 self-end mt-4 mr-4"
                >
                  <path d="M682 256h256v256l-98-98-268 268-170-170-256 256-60-60 316-316 170 170 208-208z"></path>
                </svg>

                
                <div className="flex self-start items-start ml-8 flex-col pb-4 justify-start">

                {/*STARS*/}
                <div className="flex items-start justify-center">
                  <div className="flex items-start justify-center">
                    <svg
                      viewBox="0 0 950.8571428571428 1024" style={{fill: '#ffbe00'}}
                      className=" w-12 h-12 self-start ml-0 pb-4"
                    >
                      <path d="M950.857 369.714c0 10.286-7.429 20-14.857 27.429l-207.429 202.286 49.143 285.714c0.571 4 0.571 7.429 0.571 11.429 0 14.857-6.857 28.571-23.429 28.571-8 0-16-2.857-22.857-6.857l-256.571-134.857-256.571 134.857c-7.429 4-14.857 6.857-22.857 6.857-16.571 0-24-13.714-24-28.571 0-4 0.571-7.429 1.143-11.429l49.143-285.714-208-202.286c-6.857-7.429-14.286-17.143-14.286-27.429 0-17.143 17.714-24 32-26.286l286.857-41.714 128.571-260c5.143-10.857 14.857-23.429 28-23.429s22.857 12.571 28 23.429l128.571 260 286.857 41.714c13.714 2.286 32 9.143 32 26.286z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 950.8571428571428 1024" style={{fill: '#ffbe00'}}
                      className=" w-12 h-12 self-start pb-4"
                    >
                      <path d="M950.857 369.714c0 10.286-7.429 20-14.857 27.429l-207.429 202.286 49.143 285.714c0.571 4 0.571 7.429 0.571 11.429 0 14.857-6.857 28.571-23.429 28.571-8 0-16-2.857-22.857-6.857l-256.571-134.857-256.571 134.857c-7.429 4-14.857 6.857-22.857 6.857-16.571 0-24-13.714-24-28.571 0-4 0.571-7.429 1.143-11.429l49.143-285.714-208-202.286c-6.857-7.429-14.286-17.143-14.286-27.429 0-17.143 17.714-24 32-26.286l286.857-41.714 128.571-260c5.143-10.857 14.857-23.429 28-23.429s22.857 12.571 28 23.429l128.571 260 286.857 41.714c13.714 2.286 32 9.143 32 26.286z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 950.8571428571428 1024" style={{fill: '#ffbe00'}}
                      className=" w-12 h-12 self-start pb-4"
                    >
                      <path d="M950.857 369.714c0 10.286-7.429 20-14.857 27.429l-207.429 202.286 49.143 285.714c0.571 4 0.571 7.429 0.571 11.429 0 14.857-6.857 28.571-23.429 28.571-8 0-16-2.857-22.857-6.857l-256.571-134.857-256.571 134.857c-7.429 4-14.857 6.857-22.857 6.857-16.571 0-24-13.714-24-28.571 0-4 0.571-7.429 1.143-11.429l49.143-285.714-208-202.286c-6.857-7.429-14.286-17.143-14.286-27.429 0-17.143 17.714-24 32-26.286l286.857-41.714 128.571-260c5.143-10.857 14.857-23.429 28-23.429s22.857 12.571 28 23.429l128.571 260 286.857 41.714c13.714 2.286 32 9.143 32 26.286z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 950.8571428571428 1024" style={{fill: '#ffbe00'}}
                      className=" w-12 h-12 self-start pb-4"
                    >
                      <path d="M950.857 369.714c0 10.286-7.429 20-14.857 27.429l-207.429 202.286 49.143 285.714c0.571 4 0.571 7.429 0.571 11.429 0 14.857-6.857 28.571-23.429 28.571-8 0-16-2.857-22.857-6.857l-256.571-134.857-256.571 134.857c-7.429 4-14.857 6.857-22.857 6.857-16.571 0-24-13.714-24-28.571 0-4 0.571-7.429 1.143-11.429l49.143-285.714-208-202.286c-6.857-7.429-14.286-17.143-14.286-27.429 0-17.143 17.714-24 32-26.286l286.857-41.714 128.571-260c5.143-10.857 14.857-23.429 28-23.429s22.857 12.571 28 23.429l128.571 260 286.857 41.714c13.714 2.286 32 9.143 32 26.286z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 950.8571428571428 1024" style={{fill: '#D9D9D9'}}
                      className=" w-12 h-12 self-start pb-4"
                    >
                      <path d="M950.857 369.714c0 10.286-7.429 20-14.857 27.429l-207.429 202.286 49.143 285.714c0.571 4 0.571 7.429 0.571 11.429 0 14.857-6.857 28.571-23.429 28.571-8 0-16-2.857-22.857-6.857l-256.571-134.857-256.571 134.857c-7.429 4-14.857 6.857-22.857 6.857-16.571 0-24-13.714-24-28.571 0-4 0.571-7.429 1.143-11.429l49.143-285.714-208-202.286c-6.857-7.429-14.286-17.143-14.286-27.429 0-17.143 17.714-24 32-26.286l286.857-41.714 128.571-260c5.143-10.857 14.857-23.429 28-23.429s22.857 12.571 28 23.429l128.571 260 286.857 41.714c13.714 2.286 32 9.143 32 26.286z"></path>
                    </svg>
                  </div>
                </div>

                  <p style={{ fontSize: '16px' }} className="text-blue-700 text-center">Customer Satisfaction Rate </p>
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

              <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }} className="w-full h-[255px] flex flex-2 flex-wrap self-start items-center ml-4 mr-2 my-0 flex-col justify-center rounded-[30px]">

              </div>

              <div className="w-full h-[327px] flex self-start mt-4 pt-4">
                <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }}  className="w-full h-full flex basis-1/2 flex-wrap self-start items-center ml-4 mr-2 my-0 flex-col justify-center rounded-[30px]">
                </div>


                <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }}  className="w-full h-full flex basis-1/4 flex-wrap self-start items-center ml-4 mr-2 my-0 flex-col justify-center rounded-[30px]">
                </div>



                <div style={{ boxShadow: '-5px 5px 10px 0px #d4d4d4' }}  className="w-full h-full flex basis-1/4 flex-wrap self-start items-center ml-4 mr-2 my-0 flex-col justify-center rounded-[30px]">

                </div>
              </div>

              




          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;