import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";

import { SignedIn, UserButton, SignIn } from "@clerk/clerk-react";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Go AI</span>
        </Link>

        <div className="user">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
