import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Main({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };
    return (
        <div>
            <Navbar />
            <Sidebar openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar} />
            {children}
        </div>
    );
}

export default Main;
