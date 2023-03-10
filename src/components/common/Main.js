import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Main({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openLoansDropdown, setOpenLoansDropdown] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleOpenLoansDropdown = () => {
        setOpenLoansDropdown(!openLoansDropdown);
    };

    return (
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
    );
}

export default Main;
