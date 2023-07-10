import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu, MenuProps, MenuTheme, Switch } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(<Link to="/">Dashboard</Link>, "1"),
  getItem("Quản lý", "sub1", <MailOutlined />, [
    getItem(<Link to="/products">Product</Link>, "2", <AppstoreOutlined />),
    getItem("Option", "sub1-2", <AppstoreOutlined />, [
      getItem("Option 1", "3"),
      getItem("Option 2", "4"),
    ]),
  ]),
];
const MenuSidebar: React.FC = () => {
  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");
  const changeMode = (value: boolean) => {
    setMode(value ? "vertical" : "inline");
  };
  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };
  return (
    <aside
      id="sidebar"
      className="flex hidden fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width lg:w-64"
      aria-label="Sidebar"
    >
      <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50">
        <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
          <div className="flex-1 bg-gray-50 px-3" id="sidebar-items">
            <ul className="pb-2 pt-1">
              <li className="m-2">
                <Switch className="reset-btn-tw" onChange={changeMode} />
                <p className="px-2 py-1 inline tu">Mode</p>
                <Switch className="reset-btn-tw" onChange={changeTheme} />
                <p className="px-2 py-1 inline tu">Style</p>
              </li>
              <li>
                <Menu
                  style={{ width: 250 }}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode={mode}
                  theme={theme}
                  items={items}
                />
              </li>
            </ul>
            <hr className="border-0 h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100" />
          </div>
        </div>
        <div className="hidden relative bottom-0 left-0 justify-center w-full lg:flex bg-gray-100 space-x-4 p-4">
          <a className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-dark-500 hover:bg-gray-200">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          </a>
          <a className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-dark-500 hover:bg-gray-200">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-dark-500 hover:bg-gray-200"
          >
            <svg
              className="h-5 w-5 rounded-full mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 3900 3900"
            >
              <path fill="#b22234" d="M0 0h7410v3900H0z" />
              <path
                d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                stroke="#fff"
                strokeWidth={300}
              />
              <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default MenuSidebar;
