import React, { useState, forwardRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ConfirmationModal from "./ConfirmationModal";
import { logOut } from "../../features/auth/authSlice";
import { Slide } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

function Main({ children }) {
    const [openSidebar, setOpenSidebar] = useState(true);
    const [openLoansDropdown, setOpenLoansDropdown] = useState(false);
    const [openPOSManagementDropdown, setOpenPOSManagementDropdown] = useState(false);
    const [openSignOutModal, setOpenSignOutModal] = useState(false);

    const dispatch = useDispatch();

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

    const handleSignOut = () => {
        setOpenSignOutModal(false);
        dispatch(logOut());
    };

    return user ? (
        <Container>
            <Navbar />
            <ConfirmationModal
                open={openSignOutModal}
                handleClose={() => {
                    setOpenSignOutModal(false);
                }}
                onClickConfirm={handleSignOut}
                HeaderText="Sign out?"
                ConfirmationBody={`Are you sure you want to sign out?`}
                confirmationText="Yes, Sign out"
                loading={false}
                customTransition={Transition}
                customPaperPropsStyle={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    width: "23rem",
                }}
            />
            <Sidebar
                openSidebar={openSidebar}
                handleOpenSidebar={handleOpenSidebar}
                openLoansDropdown={openLoansDropdown}
                handleOpenLoansDropdown={handleOpenLoansDropdown}
                openPOSManagementDropdown={openPOSManagementDropdown}
                handleOpenPOSManagementDropdown={handleOpenPOSManagementDropdown}
                setOpenSignOutModal={setOpenSignOutModal}
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
    position: relative;
`;
