import React, { Suspense, useContext } from "react";
import LayoutDefault from "../Layouts/LayoutDefault";
import LayoutLogin from "../Layouts/LayoutLogin/LayoutLogin";
import Dashboard from "../Pages/Dashboard";
// import Login from "../Pages/Login/Login";
// import Product from "../Pages/Product/Product";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../Context/App.context";
import NotFound from "../Pages/NotFound/NotFound";
const Product = React.lazy(() => import("../Pages/Product/Product"));
const Login = React.lazy(() => import("../Pages/Login/Login"));
//được bảo vệ
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
}
//bị từ chối
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
const routersPublic = [
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: (
          <LayoutDefault>
            <Dashboard />
          </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "",
    element: <RejectedRoute></RejectedRoute>,
    children: [
      {
        path: "login",
        element: (
          <LayoutLogin>
            <Login />
          </LayoutLogin>
        ),
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "products",
        element: (
          <LayoutDefault>
            <Suspense fallback={<p>... LOADING</p>}>
              <Product />
            </Suspense>
          </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
];
const routersPrivate = [{}];
export { routersPublic, routersPrivate };
// { path: "/products", component: Product, layout: LayoutDefault },
// { path: "/", component: Dashboard, layout: LayoutDefault },
