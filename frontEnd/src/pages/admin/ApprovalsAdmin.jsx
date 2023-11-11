import React, { useEffect } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { SidebarAdmin, Navbar, Footer, ApprovalAdminComponent} from '../../components';

const ApprovalsAdmin = () => {
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
        {/* TOOLTIP COMPONENT */}
        <div className="fixed  right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
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

        {/* BUTTON: HAMBURGER, SIDEBAR */}
        <div className={activeMenu ? "w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white" : "w-0 dark:bg-secondary-dark-bg"}>
          <SidebarAdmin />
        </div>

        {/* OVERALL CONTAINER */}
        <div className={activeMenu ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full max-w-full overflow-x-auto  " : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"}>
          {/* NAVIGATION: MENU UPPER PART */}
          <div className="w-full max-w-full">
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>

            {/* BUTTON: THEME SETTINGS */}
            <div className="overflow-x-hidden">
              {themeSettings && <ThemeSettings />}
              <div className="max-w-full overflow-x-auto"> {/* Add a container with max width and overflow-x */}
                <ApprovalAdminComponent />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ApprovalsAdmin;