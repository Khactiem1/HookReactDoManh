import React, { Fragment } from "react";
import Header from "../Components/Header/Header";
import MenuSidebar from "../Components/MenuSidebar/MenuSidebar";
import "./LayoutDefault.css";
interface Props {
  children: any;
}
const LayoutDefault: React.FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      <div className="flex overflow-hiden bg-white pt-16">
        <MenuSidebar></MenuSidebar>
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="px-4 pt-6">{children}</div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default LayoutDefault;
