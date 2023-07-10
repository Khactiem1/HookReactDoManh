import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/App.context";
import { clearAccesTokenLST } from "../../Utils/Auth";

const Header: React.FC = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    clearAccesTokenLST();
    setIsAuthenticated(false);
    navigate("/login");
  };
  const content = (
    <ul>
      <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <button> Tiếng Việt</button>
      </li>
      <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <button>Tiếng Anh</button>
      </li>
    </ul>
  );
  return (
    <nav className="fixed z-30 w-full bg-gray-50">
      <div className="py-3 px-3 lg:px-5 lg:pl-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <button className="hidden p-2 mr-4 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a className="text-md font-semibold flex items-center lg:mr-1.5">
              <img
                src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/logo.svg"
                className="mr-2 h-8"
                alt="Creative Tim Logo"
              />
              <span className="hidden md:inline-block self-center text-xl font-bold whitespace-nowrap">
                Soft UI Flowbite PRO
              </span>
            </a>
            <form action="#" method="GET" className="hidden lg:block lg:pl-8">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-80">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center">
            <Popover content={content}>
              <button className="btn btn-info">Ngôn ngữ</button>
            </Popover>
            <button className="p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <div className="ml-3">
              <div>
                <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.6435-9/127237104_2700481883600081_3470089079184236824_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4jZ9A2ykSfkAX9nS0Fg&_nc_ht=scontent-sin6-2.xx&oh=00_AfAhmU0v6_eeRtarCeZrvXwVTx7hM7Rsyx4FdFWg2ztkNQ&oe=641AF2A1"
                    alt="user photo"
                  />
                </button>
              </div>
            </div>
            <button
              className="sm:inline-flex ml-5 text-white bg-gradient-to-br from-pink-500 to-voilet-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
              onClick={() => handleLogOut()}
            >
              <LogoutOutlined className="pr-3" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
