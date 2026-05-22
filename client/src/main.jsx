import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/homePage/HomePage.jsx";
import DashboardPage from "./routes/dashboardpage/DashboardPage";
import ChatPage from "./routes/chatPage/chatPage";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        Component: DashboardLayout,
        children: [
          { path: "/dashboard", Component: DashboardPage },
          { path: "/dashboard/chats/:id", Component: ChatPage },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
