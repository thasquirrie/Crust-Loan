import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import Ellipse from "../../assets/agents/Ellipse 207.svg";
import Bank from "../../assets/agents/bank.svg";
import Code from "../../assets/agents/code.svg";
import Diagram from "../../assets/agents/diagram.svg";
import Mail from "../../assets/agents/fi_mail.svg";
import Phone from "../../assets/agents/fi_smartphone.svg";
import Graph from "../../assets/agents/graph.svg";
import House from "../../assets/agents/house-2.svg";
import Icon from "../../assets/agents/icon.svg";
import pdf from "../../assets/agents/pdf.svg";
import PersonalCard from "../../assets/agents/personalcard.svg";
import Cards from "../../assets/agents/cards.svg";
import Cluster from "../../assets/agents/Cluster icon.svg";
import Bag from "../../assets/agents/Office_Bag_Home_Icon_UIA.svg";
import Arrow from "../../assets/agents/arrow-square.svg";
import Circle from "../../assets/agents/calendar-circle.svg";
import Map from "../../assets/agents/map.svg";
import Text from "../../assets/agents/receipt-text.svg";
import Shop from "../../assets/agents/shop.svg";
import Box from "../../assets/agents/strongbox.svg";
import User from "../../assets/agents/user-tag.svg";
import Wallet from "../../assets/agents/wallet.svg";
import LinkCircle from "../../assets/agents/link-circle.svg";
import { useGetUserDetailsQuery } from "../../app/services/loan";
import formattedAmount from "../../utils/formatCurrency";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewAgentProfile({ open, handleClose, userId }) {
    const [tab, setTab] = useState("personal");

    const { data: userDetails, isLoading: userDetailsIsLoading } = useGetUserDetailsQuery(userId, {
        skip: !userId,
    });

    // console()

    return (
        <div>
            <Dialog
                maxWidth={"xl"}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalContainer>
                    {userDetailsIsLoading ? (
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                height: "100vh",
                            }}
                        >
                            <TailSpin
                                height="80"
                                width="80"
                                color="#933D0C"
                                ariaLabel="bars-loading"
                                wrapperStyle={{
                                    marginBottom: "10vh",
                                }}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    ) : (
                        <>
                            <ModalHeader>
                                <AgentHeader>
                                    <AgentHeaderInfo>
                                        <Avatar>
                                            <p>
                                                {userDetails?.data?.personal.firstName[0]}
                                                {userDetails?.data?.personal.lastName[0]}
                                            </p>
                                        </Avatar>
                                        <AgentNameDetails>
                                            <h4>
                                                {userDetails?.data?.personal.firstName}{" "}
                                                {userDetails?.data?.personal.lastName}
                                            </h4>
                                            <AgentDetail>
                                                <p>
                                                    <span>Born</span>{" "}
                                                    <span>
                                                        {moment(
                                                            userDetails?.data?.personal.dateOfBirth
                                                        ).format("DD MMM YYYY")}
                                                    </span>{" "}
                                                </p>
                                                <img src={Ellipse} alt={"ellips"} />
                                                <span>
                                                    {userDetails?.data?.personal.gender ?? "NA"}
                                                </span>
                                                <img src={Ellipse} alt={"ellips"} />
                                                <span>
                                                    {userDetails?.data?.personal.maritalStatus ??
                                                        "NA"}
                                                </span>
                                                <img src={Ellipse} alt={"ellips"} />
                                                <span>
                                                    {userDetails?.data?.personal.location || "NA"}
                                                </span>
                                            </AgentDetail>
                                        </AgentNameDetails>
                                    </AgentHeaderInfo>
                                    <p style={{ fontWeight: "700" }}>
                                        {
                                            // calculate age from date of birth
                                            userDetails?.data?.personal.dateOfBirth &&
                                                moment().diff(
                                                    moment(userDetails?.data?.personal.dateOfBirth),
                                                    "years"
                                                )
                                        }{" "}
                                        years
                                    </p>
                                </AgentHeader>
                                <PillsContainer>
                                    {userDetails?.data?.personal && (
                                        <Pills
                                            onClick={() => {
                                                setTab("personal");
                                            }}
                                            active={tab === "personal"}
                                        >
                                            <p>Personal</p>
                                        </Pills>
                                    )}
                                    {userDetails?.data?.business && (
                                        <Pills
                                            onClick={() => {
                                                setTab("business");
                                            }}
                                            active={tab === "business"}
                                        >
                                            <p>Business</p>
                                        </Pills>
                                    )}
                                    {userDetails?.data?.guarantors && (
                                        <Pills
                                            onClick={() => {
                                                setTab("guarantors");
                                            }}
                                            active={tab === "guarantors"}
                                        >
                                            <p>Guarantors</p>
                                        </Pills>
                                    )}
                                </PillsContainer>
                            </ModalHeader>
                            <ModalBody>
                                {tab === "personal" && (
                                    <>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Bank-related Info</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Code} alt={"bank"} />
                                                        Account Number
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.account?.accountNumber
                                                            ? userDetails?.data?.account
                                                                  ?.accountNumber
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Bank} alt={"bank"} />
                                                        Account Balance
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.account?.accountBalance
                                                            ? `N${userDetails?.data?.account?.accountBalance}`
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Cards} alt={"bank"} />
                                                        BVN
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal.bvn
                                                            ? userDetails?.data?.personal.bvn
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Cards} alt={"bank"} />
                                                        Transaction Limit
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.account
                                                            ?.transactionLimit
                                                            ? formattedAmount(
                                                                  userDetails?.data?.account
                                                                      ?.dailyTransactionLimit
                                                              )
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Diagram} alt={"bank"} />
                                                        BVN Credit History
                                                    </p>
                                                    <p>NA</p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Graph} alt={"bank"} />
                                                        Credit History
                                                    </p>
                                                    <p>NA</p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Identity Info</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={PersonalCard} alt={"bank"} />
                                                        Identification Type
                                                    </p>
                                                    <p>
                                                        <p>
                                                            {userDetails?.data?.personal?.idType
                                                                ? userDetails?.data?.personal
                                                                      ?.idType
                                                                : "NA"}
                                                        </p>
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Code} alt={"bank"} />
                                                        ID Type No.
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal?.idNumber
                                                            ? userDetails?.data?.personal?.idNumber
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Contact Info</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Phone} alt={"bank"} />
                                                        Phone Number
                                                    </p>
                                                    <p>{userDetails?.data?.personal?.phone}</p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Mail} alt={"bank"} />
                                                        Email Address
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal?.email
                                                            ? userDetails?.data?.personal?.email
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={House} alt={"bank"} />
                                                        Personal Address
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal.address ? (
                                                            userDetails?.data?.personal?.address
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Cluster Info</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Cluster} alt={"bank"} />
                                                        Cluster Name
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal?.cluster
                                                            ? userDetails?.data?.personal?.cluster
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Icon} alt={"bank"} />
                                                        Cluster Head
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal?.clusterHead
                                                            ? userDetails?.data?.personal
                                                                  ?.clusterHead
                                                            : "NA"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Phone} alt={"bank"} />
                                                        Phone Number
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.personal
                                                            .clsuterHeadPhoneNumber ? (
                                                            userDetails?.data?.personal
                                                                ?.clsuterHeadPhoneNumber
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                    </>
                                )}
                                {tab === "business" && (
                                    <>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Business ID</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Shop} alt={"bank"} />
                                                        Business Name
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business
                                                            ?.businessName ? (
                                                            userDetails?.data?.business
                                                                ?.businessName
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Map} alt={"bank"} />
                                                        Business Address
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business.location ? (
                                                            userDetails?.data?.business?.location
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Arrow} alt={"bank"} />
                                                        Registration Status
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business?.registered
                                                            ? "Registered"
                                                            : "Not Registered"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Diagram} alt={"bank"} />
                                                        Business Reg. Number
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business.rcNumber ? (
                                                            userDetails?.data?.business?.rcNumber
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Mobile Money History</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Wallet} alt={"bank"} />
                                                        Mobile Money Agent?
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business
                                                            .mobileMoneyAgent
                                                            ? "Yes"
                                                            : "No"}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Circle} alt={"bank"} />
                                                        How long?
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business.howLong ? (
                                                            userDetails?.data?.business.howLong
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Bag} alt={"bank"} />
                                                        Mobile Money Co.
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business.mobileMoney ? (
                                                            userDetails?.data?.business.mobileMoney
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Text} alt={"bank"} />
                                                        Transaction Size
                                                    </p>
                                                    <p>
                                                        {userDetails?.data?.business
                                                            .monthlyTransactionSize ? (
                                                            userDetails?.data?.business
                                                                .monthlyTransactionSize
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Text} alt={"bank"} />6 Month
                                                        Account Statement
                                                    </p>
                                                    <AccountStatement>
                                                        <img src={pdf} alt={"bank"} />
                                                        <a
                                                            href={
                                                                userDetails?.data?.business
                                                                    .accountStatementUrl
                                                            }
                                                            download
                                                        >
                                                            Download
                                                        </a>
                                                    </AccountStatement>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                    </>
                                )}
                                {tab === "guarantors" && (
                                    <>
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Guarantor 1</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={User} alt={"bank"} />
                                                        Guarantor's Name
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {
                                                            userDetails?.data?.guarantors[0]
                                                                .firstName
                                                        }{" "}
                                                        {userDetails?.data?.guarantors[0].lastName}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Phone} alt={"bank"} />
                                                        Phone Number
                                                    </p>
                                                    <p>08012345678</p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Box} alt={"bank"} />
                                                        Occupation
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {
                                                            userDetails?.data?.guarantors[0]
                                                                .occupation
                                                        }
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={LinkCircle} alt={"bank"} />
                                                        Relationship
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {
                                                            userDetails?.data?.guarantors[0]
                                                                .relationship
                                                        }
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={LinkCircle} alt={"bank"} />
                                                        NIN
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {userDetails?.data?.guarantors[0]
                                                            .idNumber ? (
                                                            userDetails?.data?.guarantors[0]
                                                                .idNumber
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>

                                        <br />
                                        <HorizontalLine />
                                        <TitleHead>
                                            <h5>Guarantor 2</h5>
                                        </TitleHead>
                                        <HorizontalLine />
                                        <TitleHeadItemContainer>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={User} alt={"bank"} />
                                                        Guarantor's Name
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {
                                                            userDetails?.data?.guarantors[1]
                                                                .firstName
                                                        }{" "}
                                                        {userDetails?.data?.guarantors[1].lastName}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Phone} alt={"bank"} />
                                                        Phone Number
                                                    </p>
                                                    <p>08012345678</p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={Box} alt={"bank"} />
                                                        Occupation
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {
                                                            userDetails?.data?.guarantors[1]
                                                                .occupation
                                                        }
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={LinkCircle} alt={"bank"} />
                                                        Relationship
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {
                                                            userDetails?.data?.guarantors[1]
                                                                .relationship
                                                        }
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                            <TitleHeadItem>
                                                <InfoContainer>
                                                    <p>
                                                        <img src={LinkCircle} alt={"bank"} />
                                                        NIN
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        {userDetails?.data?.guarantors[1]
                                                            .idNumber ? (
                                                            userDetails?.data?.guarantors[1]
                                                                .idNumber
                                                        ) : (
                                                            <span>NA</span>
                                                        )}
                                                    </p>
                                                </InfoContainer>
                                            </TitleHeadItem>
                                        </TitleHeadItemContainer>
                                    </>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    width: 50rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* overflow: hidden; */
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.5rem;
    padding-top: 1.5rem;
    background: #fff;
    box-sizing: border-box;
`;

const AgentHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.5rem;
    padding-top: 1.5rem;
    background: #fff;
    box-sizing: border-box;

    h4 {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.2rem;
        color: black;
        margin-right: 5rem;
    }

    img {
        width: 0.3rem;
    }
`;

const ModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1.5rem 2.8rem 1.5rem;
    overflow-y: auto;
    scrollbar-width: thin;
`;

const TitleHeadItem = styled.div`
    width: 33%;
    margin: 2rem 0;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;

    p:first-child {
        display: flex;
        align-items: center;
        font-size: 0.75rem;
        font-weight: 700;
        color: #7a7a7a;

        img {
            margin-right: 10px;
            width: 15px;
        }
    }

    p:last-child {
        font-size: 0.875rem;
    }
`;

const TitleHeadItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 2rem;
`;

const TitleHead = styled.div`
    align-self: baseline;
    margin: 5px 0;

    h5 {
        text-align: left;
        padding: 0 2rem;
    }
`;

const PillsContainer = styled.div`
    display: flex;
    align-items: baseline;
    width: auto;
    justify-content: center;
    margin: 1rem 0;

    div:nth-child(2) {
        margin: 0.9rem;
    }
`;

const Pills = styled.div`
    cursor: pointer;
    padding: 7.5px 18px;
    border: 1px solid #933d0c;
    border-radius: 20px;
    background: ${(props) => (props.active ? "#FFFAF6" : "#fff")};
    border: ${(props) => (props.active ? "1px solid #933d0c" : "1px solid #7a7a7a")};

    p {
        color: ${(props) => (props.active ? "#933d0c" : "#0C0400")};
    }
`;

const AgentHeaderInfo = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
`;

const Avatar = styled.div`
    padding: 0.8rem;
    border-radius: 50%;
    background-color: #933d0c;
    margin-right: 1rem;

    p {
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
    }
`;

const AgentNameDetails = styled.div`
    display: flex;
    flex-direction: column;
`;
const AgentDetail = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;

    p {
        span:first-child {
            font-weight: 700;
        }

        span:nth-child(2) span:nth-child(3) {
            color: #7a7a7a;
        }
    }

    img {
        margin: 0 0.5rem;
    }
`;

const HorizontalLine = styled.hr`
    width: 100%;
    padding: 0;
    margin: 0;
    margin: 0.5rem 0;
`;

const AccountStatement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 1rem 0;

    a {
        text-decoration: none;
        color: #292929;
        font-size: 0.875rem;
        font-weight: 700;
        border: 0.5625px solid #d0dce4;
        padding: 0.4rem 1rem;
        border-radius: 5px;
        margin-left: 1rem;
        cursor: pointer;
    }
`;
