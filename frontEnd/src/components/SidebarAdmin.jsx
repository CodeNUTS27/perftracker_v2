import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import { linksAdmin } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const SidebarAdmin = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="w-full pl-3 pr-2 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-center items-center flex-col mr-2">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 m-1 flex text-sm font-extrabold tracking-tight dark:text-white text-slate-900">
              <div className="w-full flex flex-row mt-8 mb-4 logo-title">PerfTracker</div>
            </Link>

            {/*PROFILE ADMIN */}

            <div className="w-full flex mt-0 items-center ml-0 py-4 mr-0 px-0 flex-col justify-start">

              <div className="flex relative items-center flex-col justify-start">
                <img
                  className="rounded-full object-cover w-24 h-24"
                  src={avatar}
                  alt="user-profile"
                />
                <svg style={{fill: '#4cc366'}} className="absolute right-[3px] w-[30px] bottom-[-3px] h-[30px]">
                  <path d="M170 512q0-140 101-241t241-101 241 101 101 241-101 241-241 101-241-101-101-241z"></path>
                </svg>
                <div className="flex items-center ml-2 flex-col justify-between">
                  <p className="p-2 font-semibold mb-1 text-base text-center">
                    Christian Angelo A. Silva
                  </p>
                  <p className="text-gray-400 text-[14px]">
                    Administrator
                  </p>

                </div>


              </div>
              
            </div>

           
          </div>

          <TooltipComponent content="Menu" position="BottomCenter">
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </TooltipComponent>

          <div className="mt-10 ">
            {linksAdmin.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/admin/${link.name.replace(/\s+/g, '')}`}
                    key={`${link.name}-admin`}

                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>


                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarAdmin;