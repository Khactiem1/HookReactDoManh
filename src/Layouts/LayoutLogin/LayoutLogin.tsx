import React, { Fragment } from "react";
interface Props {
  children: any;
}
const LayoutLogin: React.FC<Props> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default LayoutLogin;
