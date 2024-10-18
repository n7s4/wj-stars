import React, { FC } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ManageLayout from "../Layouts/ManageLayout";
import MainLayout from "../Layouts/MainLayouts";
import QuestionLayout from "../Layouts/QuestionLayout";
import Home from "../pages/Home";
import List from "../pages/manage/List";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Star from "../pages/Star/index";
import Login from "../pages/Login";
import Trash from "../pages/Trash";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);
export default router;

//-------分割线 ----------
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const HOME_PATHNAME = "/";
export const MANAGE_LIST_PATHNAME = "/manage/list";
export const isLoginOrRegister = (pathname: string) => {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
};
export const isNoNeedUserInfo = (pathname: string) => {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
    return true;
  return false;
};
