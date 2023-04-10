import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import monitor from "../../assets/sidebar/monitor.svg";
import people from "../../assets/sidebar/people.svg";
import home from "../../assets/sidebar/home.svg";
import sideBarArrow from "../../assets/sidebar/sidebarArrow.svg";
import transaction from "../../assets/sidebar/transaction.svg";
import loan from "../../assets/sidebar/loan.svg";
import accordionClose from "../../assets/sidebar/accordionClose.svg";
import dashboard from "../../assets/sidebar/dashboard.svg";
import posManagement from "../../assets/sidebar/posManagement.svg";
import posTMS from "../../assets/sidebar/posTMS.svg";
import posActivity from "../../assets/sidebar/posActivity.svg";
import clusterManagement from "../../assets/sidebar/clusterManagement.svg";
import signOut from "../../assets/sidebar/signOut.svg";

function Sidebar({
    openSidebar,
    handleOpenSidebar,
    openLoansDropdown,
    handleOpenLoansDropdown,
    openPOSManagementDropdown,
    handleOpenPOSManagementDropdown,
}) {
    const location = useLocation();

    return (
        <Container openSidebar={openSidebar}>
            <SidebarButton onClick={handleOpenSidebar} openSidebar={openSidebar}>
                <img src={sideBarArrow} alt="" />
            </SidebarButton>
            <SidebarLinksContainer>
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
                <Agents openSidebar={openSidebar} isActive={location.pathname === "/agent"}>
                    <Link to="/agent">
                        <img src={people} alt="" />
                        Agents
                    </Link>
                </Agents>
                <Transactions
                    openSidebar={openSidebar}
                    isActive={location.pathname === "/transaction"}
                >
                    <Link to="/transaction">
                        <img src={transaction} alt="" />
                        Transactions
                    </Link>
                </Transactions>
                <LoanManagement
                    openSidebar={openSidebar}
                    openLoansDropdown={
                        location.pathname.includes("/loan") ? true : openLoansDropdown
                    }
                    isActive={location.pathname.includes("/loan")}
                >
                    <div className="loanContainer" onClick={handleOpenLoansDropdown}>
                        <div className="loanMenu">
                            <img src={loan} alt="" />
                            Loans
                        </div>
                        <img className="accordionCloseIcon" src={accordionClose} alt="" />
                    </div>
                    <LoanManagementSubMenu
                        openLoansDropdown={
                            location.pathname.includes("/loan") ? true : openLoansDropdown
                        }
                        openSidebar={openSidebar}
                        activeSubMenuItem={location.pathname}
                    >
                        <div className="SubMenuItem" id="loanApplication">
                            <Link to="/loan/application">
                                <img src={dashboard} alt="" />
                                Loan Applications
                            </Link>
                        </div>
                        <div className="SubMenuItem">
                            <Link to="/">
                                <img src={clusterManagement} alt="" />
                                Cluster Management
                            </Link>
                        </div>
                    </LoanManagementSubMenu>
                </LoanManagement>
                <POSManagement
                    openSidebar={openSidebar}
                    openPOSManagementDropdown={
                        location.pathname.includes("/pos") ? true : openPOSManagementDropdown
                    }
                    isActive={location.pathname.includes("/pos")}
                >
                    <div
                        className="posManagementContainer"
                        onClick={handleOpenPOSManagementDropdown}
                    >
                        <div className="posMenu">
                            <img src={posManagement} alt="" />
                            POS Management
                        </div>
                        <img className="accordionCloseIcon" src={accordionClose} alt="" />
                    </div>
                    <POSManagementSubMenu
                        openPOSManagementDropdown={
                            location.pathname.includes("/pos") ? true : openPOSManagementDropdown
                        }
                        activeSubMenuItem={location.pathname}
                    >
                        {/* <div className="SubMenuItem" id="posDashboard">
                            <Link to="/">
                                <img src={dashboard} alt="" />
                                Dashboard
                            </Link>
                        </div> */}
                        <div className="SubMenuItem">
                            <Link to="/pos/tms">
                                <img src={posTMS} alt="" />
                                POS TMS
                            </Link>
                        </div>
                        <div className="SubMenuItem">
                            <Link to="/pos/transaction_activity">
                                <img src={posActivity} alt="" />
                                POS Activity
                            </Link>
                        </div>
                        {/* <div className="SubMenuItem">
                            <Link to="/">
                                <img src={posManagement} alt="" />
                                POS Devices
                            </Link>
                        </div>
                        <div className="SubMenuItem" id="posRequest">
                            <Link to="/pos/requests">
                                <img src={posManagement} alt="" />
                                POS Requests
                            </Link>
                        </div>
                        <div className="SubMenuItem">
                            <Link to="/">
                                <img src={posManagement} alt="" />
                                Aggregator Management
                            </Link>
                        </div>
                       */}
                    </POSManagementSubMenu>
                </POSManagement>
            </SidebarLinksContainer>
            <SignOut openSidebar={openSidebar}>
                <img src={signOut} alt="" />
                <p>Sign Out</p>
            </SignOut>
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: ${(props) => (props.openSidebar ? "3%" : "20%")};
    transition: all 0.2s ease-in-out;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 7rem 0 0 0;
    position: relative;
    box-sizing: border-box;
`;

const SidebarLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 90%;
    overflow: auto;
    box-sizing: border-box;
`;

const AdminManagement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #d0dce4;
    opacity: ${(props) => (props.openSidebar ? "0" : "1")};
    transition: all 0.2s ease-in-out;

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
        padding: 1.5rem 1.5rem;
        opacity: ${(props) => (props.openSidebar ? "0" : "1")};
        white-space: nowrap;
        transition: all 0.2s ease-in-out;

        img {
            margin-right: 1rem;
        }
    }

    &:hover {
        background-color: #fffaf6;
        a {
            color: #933d0c;

            img {
                /* filter: hue-rotate(180deg); */
            }
        }
    }

    ${(props) =>
        props.isActive &&
        css`
            background-color: #fffaf6;
            a {
                color: #933d0c;
            }
        `}
`;

const LoanManagement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #d0dce4;
    opacity: ${(props) => (props.openSidebar ? "0" : "1")};
    transition: all 0.2s ease-in-out;

    .loanContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 1.5rem;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;
        width: 100%;
        cursor: pointer;

        img {
            opacity: ${(props) => (props.openSidebar ? "0" : "1")};
            transition: all 0.2s ease-in-out;
        }

        .accordionCloseIcon {
            transform: ${(props) => (props.openLoansDropdown ? "rotate(180deg)" : "rotate(0deg)")};
        }

        .loanMenu {
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
            transition: all 0.2s ease-in-out;

            img {
                margin-right: 1rem;
                opacity: ${(props) => (props.openSidebar ? "0" : "1")};
            }
        }
    }

    &:hover {
        .loanContainer {
            background-color: #fffaf6;
            .loanMenu {
                color: #933d0c;

                img {
                    /* filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg); */
                }
            }

            img {
                /* filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg); */
            }
        }
    }

    ${(props) =>
        props.isActive &&
        css`
            .loanContainer {
                background-color: #fffaf6;
                .loanMenu {
                    color: #933d0c;
                }
            }
        `}
`;

const POSManagement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #d0dce4;
    opacity: ${(props) => (props.openSidebar ? "0" : "1")};
    transition: all 0.2s ease-in-out;

    .posManagementContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 1.5rem;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;
        text-overflow: ellipsis;
        width: 100%;
        cursor: pointer;

        img {
            opacity: ${(props) => (props.openSidebar ? "0" : "1")};
            transition: all 0.2s ease-in-out;
        }

        .accordionCloseIcon {
            transform: ${(props) =>
                props.openPOSManagementDropdown ? "rotate(180deg)" : "rotate(0deg)"};
        }

        .posMenu {
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
            box-sizing: border-box;
            text-overflow: ellipsis;
            transition: all 0.2s ease-in-out;

            img {
                margin-right: 1rem;
                opacity: ${(props) => (props.openSidebar ? "0" : "1")};
            }
        }
    }

    &:hover {
        .posManagementContainer {
            background-color: #fffaf6;
            .posMenu {
                color: #933d0c;

                img {
                    /* filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg); */
                }
            }

            img {
                /* filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg); */
            }
        }
    }

    ${(props) =>
        props.isActive &&
        css`
            .posManagementContainer {
                background-color: #fffaf6;
                .posMenu {
                    color: #933d0c;
                }
            }
        `}
`;

const LoanManagementSubMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    display: ${(props) => (props.openLoansDropdown ? "flex" : "none")};
    transition: all 0.2s ease-in-out;
    animation: easeIn 0.2s ease-in-out forwards;

    .SubMenuItem {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding-left: 1rem;
        box-sizing: border-box;
        opacity: ${(props) => (props.openSidebar ? "0" : "1")};
        transition: all 0.2s ease-in-out;

        a {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            padding: 1.5rem;
            letter-spacing: 0.0571895px;
            color: #474747;
            text-decoration: none;
            opacity: ${(props) => (props.openSidebar ? "0" : "1")};
            transition: all 0.2s ease-in-out;

            width: 98%;
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            img {
                margin-right: 1rem;
            }
        }

        &:hover {
            background-color: #fffaf6;
            a {
                color: #933d0c;

                img {
                    /* filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg); */
                }
            }
        }
    }

    ${(props) =>
        props.activeSubMenuItem === "/loan/application" &&
        css`
            #loanApplication {
                background-color: #fffaf6;
                a {
                    color: #933d0c;
                }
            }
        `}
`;

const POSManagementSubMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    display: ${(props) => (props.openPOSManagementDropdown ? "flex" : "none")};
    transition: all 0.2s ease-in-out;
    animation: easeIn 0.2s ease-in-out forwards;
    text-overflow: ellipsis;

    @keyframes easeIn {
        0% {
            opacity: 0;
            transform: translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .SubMenuItem {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding-left: 1rem;
        box-sizing: border-box;
        opacity: ${(props) => (props.openSidebar ? "0" : "1")};
        transition: all 0.2s ease-in-out;

        a {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            padding: 1.5rem;
            letter-spacing: 0.0571895px;
            color: #474747;
            text-decoration: none;
            opacity: ${(props) => (props.openSidebar ? "0" : "1")};
            transition: all 0.2s ease-in-out;

            width: 98%;
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            img {
                margin-right: 1rem;
            }
        }

        &:hover {
            background-color: #fffaf6;
            a {
                color: #933d0c;

                img {
                    color: #933d0c;
                }
            }
        }
    }

    ${(props) =>
        props.activeSubMenuItem === "/pos/requests" &&
        css`
            #posRequest {
                background-color: #fffaf6;
                a {
                    color: #933d0c;
                }
            }
        `}
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

    img {
        transform: ${(props) => (props.openSidebar ? "rotate(180deg)" : "rotate(0deg)")};
        transition: all 0.2s ease-in-out;
        transform-origin: center;
    }
`;

const CoreHome = styled(AdminManagement)``;
const Agents = styled(AdminManagement)``;
const Transactions = styled(AdminManagement)``;

const SignOut = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 1.5rem;
    opacity: ${(props) => (props.openSidebar ? "0" : "1")};
    z-index: ${(props) => (props.openSidebar ? "-1" : "1")};
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;

    img {
        margin-right: 1rem;
    }

    p {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #292929;
    }
`;
