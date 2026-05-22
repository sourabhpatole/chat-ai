import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./routes/homePage/HomePage.jsx";
import DashboardPage from "./routes/dashboardpage/DashboardPage";
import ChatPage from "./routes/chatPage/chatPage.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout";
import DashboardLayout from "./layouts/dashboardLayout/dashboardLayout";
import SignInPage from "./routes/signInPage/signInPage";
import SignUpPage from "./routes/signUpPage/signUpPage";
import { ClerkProvider } from "@clerk/clerk-react";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/sign-in/*",
        Component: SignInPage,
      },
      {
        path: "/sign-up/*",
        Component: SignUpPage,
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
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log(PUBLISHABLE_KEY);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
);
