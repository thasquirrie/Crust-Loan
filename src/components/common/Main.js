import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function Main({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openLoansDropdown, setOpenLoansDropdown] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleOpenLoansDropdown = () => {
        setOpenLoansDropdown(!openLoansDropdown);
    };

    const location = useLocation();
    const user = useSelector((state) => state.auth.user);

    return user ? (
        <div>
            <Navbar />
            <Sidebar
                openSidebar={openSidebar}
                handleOpenSidebar={handleOpenSidebar}
                openLoansDropdown={openLoansDropdown}
                handleOpenLoansDropdown={handleOpenLoansDropdown}
            />
            {children}
        </div>
    ) : (
        <Navigate to="/auth/login" from={location} replace />
    );
}

export default Main;
