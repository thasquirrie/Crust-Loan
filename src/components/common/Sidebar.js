import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import monitor from "../../assets/sidebar/monitor.svg";
import people from "../../assets/sidebar/people.svg";
import home from "../../assets/sidebar/home.svg";
import sideBarArrow from "../../assets/sidebar/sidebarArrow.svg";
import transaction from "../../assets/sidebar/transaction.svg";

function Sidebar({ openSidebar, handleOpenSidebar }) {
    return (
        <Container openSidebar={openSidebar}>
            <SidebarButton onClick={handleOpenSidebar}>
                <img src={sideBarArrow} alt="" />
            </SidebarButton>
            <AdminManagement openSidebar={openSidebar}>
                <Link to="/">
                    <img src={monitor} alt="" />
                    Admin Management
                </Link>
            </AdminManagement>
            <CoreHome openSidebar={openSidebar}>
                <Link to="/">
                    <img src={home} alt="" />
                    Core Home
                </Link>
            </CoreHome>
            <Agents openSidebar={openSidebar}>
                <Link to="/">
                    <img src={people} alt="" />
                    Agents
                </Link>
            </Agents>
            <Transactions openSidebar={openSidebar}>
                <Link to="/">
                    <img src={transaction} alt="" />
                    Transactions
                </Link>
            </Transactions>
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: ${(props) => (props.openSidebar ? "3%" : "17%")};
    transition: all 0.4s ease-in-out;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 7rem 0;
    box-sizing: border-box;
    position: relative;
`;

const AdminManagement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 1.5rem 1.5rem;
    box-sizing: border-box;
    border-bottom: 1px solid #d0dce4;
    opacity: ${(props) => (props.openSidebar ? "0" : "1")};
    overflow: hidden;
    transition: all 0.4s ease-in-out;

    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.0571895px;
        color: #474747;
        text-decoration: none;
        width: 100%;
        opacity: ${(props) => (props.openSidebar ? "0" : "1")};
        overflow: hidden;
        white-space: nowrap;
        transition: all 0.4s ease-in-out;

        img {
            margin-right: 1rem;
        }
    }

    &:hover {
        background-color: #fffaf6;
        a {
            color: #933d0c;

            img {
                filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg);
            }
        }
    }
`;

const SidebarButton = styled.div`
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #933d0c;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 4rem;
    right: -1.1rem;
    cursor: pointer;
`;

const CoreHome = styled(AdminManagement)``;
const Agents = styled(AdminManagement)``;
const Transactions = styled(AdminManagement)``;
