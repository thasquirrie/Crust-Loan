import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Main({ children }) {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [openLoansDropdown, setOpenLoansDropdown] = useState(false);
    const [openPOSManagementDropdown, setOpenPOSManagementDropdown] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleOpenLoansDropdown = () => {
        setOpenLoansDropdown(!openLoansDropdown);
    };

    const handleOpenPOSManagementDropdown = () => {
        setOpenPOSManagementDropdown(!openPOSManagementDropdown);
    };

    const location = useLocation();
    const user = useSelector((state) => state.auth.user);

    return user ? (
        <Container>
            <Navbar />
            <Sidebar
                openSidebar={openSidebar}
                handleOpenSidebar={handleOpenSidebar}
                openLoansDropdown={openLoansDropdown}
                handleOpenLoansDropdown={handleOpenLoansDropdown}
                openPOSManagementDropdown={openPOSManagementDropdown}
                handleOpenPOSManagementDropdown={handleOpenPOSManagementDropdown}
            />
            {children}
        </Container>
    ) : (
        <Navigate to="/auth/login" from={location} replace />
    );
}

export default Main;

const Container = styled.div`
    width: 100%;
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
`;
