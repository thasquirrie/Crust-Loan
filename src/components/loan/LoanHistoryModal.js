import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/common/x_black.svg";
import Ellipse from "../../assets/agents/Ellipse 207.svg";
import { useViewLoanHistoryQuery } from "../../app/services/loan";
import formattedAmount from "../../utils/formatCurrency";
import moment from "moment";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const formattedTime = (time) => {
    const formatString = "ddd Do MMM, YYYY";
    const convertedTime = moment(time).format(formatString);
    return convertedTime;
};

export default function LoanHistoryModal({ open, agentDetails, handleClose }) {
    const [expandedLoanId, setExpandedLoanId] = useState(null);

    const { data: loanHistory } = useViewLoanHistoryQuery(agentDetails?.userId, {
        skip: !agentDetails?.userId,
    });

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={"lg"}
            >
                <ModalContainer>
                    <>
                        <ModalHeader>
                            <NameTitle>
                                <h4>{agentDetails?.name} Loan History</h4>
                                <h6>
                                    Account Number: <span>{agentDetails?.accountNumber}</span>
                                </h6>
                            </NameTitle>
                            <img src={cancel} alt="cancel" onClick={handleClose} />
                        </ModalHeader>
                        <ModalBody>
                            <BodyHeader>
                                <p>Current Loan Application</p>
                                {loanHistory?.data[0]?.dateDue && (
                                    <p>Due: {loanHistory?.data[0]?.dateDue?.split(" ")[0]}</p>
                                )}
                            </BodyHeader>
                            <CurrentLoanCardContainer
                                open={expandedLoanId === loanHistory?.data[0]?.loanId}
                            >
                                <LoanCardContainerExpanded>
                                    <CardLeftDetails>
                                        <p>
                                            {formattedAmount(loanHistory?.data[0]?.appliedAmount)}
                                        </p>
                                        <p>
                                            <span>Applied: </span>
                                            {formattedTime(loanHistory?.data[0]?.dateCreated)}
                                            <img src={Ellipse} alt={"ellipse"} />{" "}
                                            {loanHistory?.data[0]?.dateCreated?.split(" ")[1]}
                                        </p>
                                    </CardLeftDetails>
                                    <CardRightDetails
                                        type={loanHistory?.data[0]?.status}
                                        open={expandedLoanId === loanHistory?.data[0]?.loanId}
                                    >
                                        {expandedLoanId !== loanHistory?.data[0]?.loanId && (
                                            <LoanStatus
                                                type={loanHistory?.data[0]?.status}
                                                open={
                                                    expandedLoanId === loanHistory?.data[0]?.loanId
                                                }
                                            >
                                                {loanHistory?.data[0]?.status}
                                            </LoanStatus>
                                        )}
                                        <p
                                            onClick={() =>
                                                setExpandedLoanId(
                                                    expandedLoanId === loanHistory?.data[0]?.loanId
                                                        ? null
                                                        : loanHistory?.data[0]?.loanId
                                                )
                                            }
                                        >
                                            {expandedLoanId === loanHistory?.data[0]?.loanId
                                                ? "See Less..."
                                                : "See More Details..."}
                                        </p>
                                    </CardRightDetails>
                                </LoanCardContainerExpanded>
                                {loanHistory?.data[0]?.status === "APPROVED" ||
                                loanHistory?.data[0]?.status === "PENDING" ? (
                                    <ApprovedExpandedLoanDetails
                                        open={expandedLoanId === loanHistory?.data[0]?.loanId}
                                    >
                                        <CardDetails>
                                            <p>Applied</p>
                                            <p>
                                                {formattedTime(loanHistory?.data[0]?.dateCreated)}
                                            </p>
                                            <p>
                                                {loanHistory?.data[0]?.dateCreated?.split(" ")[1]}
                                            </p>
                                        </CardDetails>
                                        <CardDetails>
                                            <p>
                                                {loanHistory?.data[0]?.status === "APPROVED"
                                                    ? "Approved"
                                                    : "Pending Loan Approval"}
                                            </p>
                                            {loanHistory?.data[0]?.status === "APPROVED" && (
                                                <>
                                                    <p>
                                                        {formattedTime(
                                                            loanHistory?.data[0]?.dateApproved
                                                        )}
                                                    </p>
                                                    <p>
                                                        {
                                                            loanHistory?.data[0]?.dateApproved?.split(
                                                                " "
                                                            )[1]
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </CardDetails>
                                    </ApprovedExpandedLoanDetails>
                                ) : loanHistory?.data[0]?.status === "OFFER_DECLINED" ||
                                  loanHistory?.data[0]?.status === "DISAPPROVED" ? (
                                    <OfferDeclinedLoanDetails
                                        open={expandedLoanId === loanHistory?.data[0]?.loanId}
                                    >
                                        <div className="OfferDeclinedLoanDetailsContainer">
                                            <CardDetails>
                                                <p>Applied</p>
                                                <p>
                                                    {formattedTime(
                                                        loanHistory?.data[0]?.dateCreated
                                                    )}
                                                </p>
                                                <p>
                                                    {
                                                        loanHistory?.data[0]?.dateCreated?.split(
                                                            " "
                                                        )[1]
                                                    }
                                                </p>
                                            </CardDetails>
                                            <CardDetails>
                                                <p>
                                                    {loanHistory?.data[0]?.status ===
                                                    "OFFER_DECLINED"
                                                        ? "Declined Offer"
                                                        : "Disapproved"}
                                                </p>
                                                <p>
                                                    {formattedTime(
                                                        loanHistory?.data[0]?.dateOfferDeclined ??
                                                            loanHistory?.data[0]?.dateDisapproved
                                                    )}
                                                </p>
                                                <p>
                                                    {loanHistory?.data[0]?.dateOfferDeclined?.split(
                                                        " "
                                                    )[1] ??
                                                        loanHistory?.data[0]?.dateDisapproved?.split(
                                                            " "
                                                        )[1]}
                                                </p>
                                            </CardDetails>
                                        </div>
                                        <div className="reason">
                                            <p>
                                                {loanHistory?.data[0]?.status === "OFFER_DECLINED"
                                                    ? "Reason for Decline"
                                                    : "Reason for Disapproval"}
                                            </p>
                                            <p>{loanHistory?.data[0]?.reason ?? "N/A"}</p>
                                        </div>
                                    </OfferDeclinedLoanDetails>
                                ) : loanHistory?.data[0]?.status === "REPAID" ||
                                  loanHistory?.data[0]?.status === "ACTIVE" ? (
                                    <RepaidExpandedLoanDetails
                                        open={expandedLoanId === loanHistory?.data[0]?.loanId}
                                    >
                                        <CardDetails>
                                            <p>Applied</p>
                                            <p>
                                                {formattedTime(loanHistory?.data[0]?.dateCreated)}
                                            </p>
                                            <p>
                                                {loanHistory?.data[0]?.dateCreated?.split(" ")[1]}
                                            </p>
                                        </CardDetails>
                                        {loanHistory?.data[0]?.status === "ACTIVE" && (
                                            <CardDetails>
                                                <p>Approved</p>
                                                <p>
                                                    {formattedTime(
                                                        loanHistory?.data[0]?.dateApproved
                                                    )}
                                                </p>
                                                <p>
                                                    {
                                                        loanHistory?.data[0]?.dateApproved?.split(
                                                            " "
                                                        )[1]
                                                    }
                                                </p>
                                            </CardDetails>
                                        )}
                                        <CardDetails>
                                            <p>Offer Accepted</p>
                                            <p>
                                                {formattedTime(
                                                    loanHistory?.data[0]?.dateOfferAccepted
                                                )}
                                            </p>
                                            <p>
                                                {
                                                    loanHistory?.data[0]?.dateOfferAccepted?.split(
                                                        " "
                                                    )[1]
                                                }
                                            </p>
                                        </CardDetails>
                                        <CardDetails>
                                            <p>Disbursed</p>
                                            <p>
                                                {formattedTime(loanHistory?.data[0]?.dateDisbursed)}
                                            </p>
                                            <p>
                                                {loanHistory?.data[0]?.dateDisbursed?.split(" ")[1]}
                                            </p>
                                        </CardDetails>
                                        <CardDetails>
                                            <p>Due</p>
                                            <p>{formattedTime(loanHistory?.data[0]?.dateDue)}</p>
                                            <p>{loanHistory?.data[0]?.dateDue?.split(" ")[1]}</p>
                                        </CardDetails>
                                        {loanHistory?.data[0]?.status === "REPAID" && (
                                            <CardDetails>
                                                <p>Repaid</p>
                                                <p>
                                                    {formattedTime(
                                                        loanHistory?.data[0]?.dateRepaid
                                                    )}
                                                </p>
                                                <p>
                                                    {
                                                        loanHistory?.data[0]?.dateRepaid?.split(
                                                            " "
                                                        )[1]
                                                    }
                                                </p>
                                            </CardDetails>
                                        )}
                                    </RepaidExpandedLoanDetails>
                                ) : null}
                            </CurrentLoanCardContainer>
                            {loanHistory?.data?.length > 1 && (
                                <BodyHeader>
                                    <p>Past Loans</p>
                                </BodyHeader>
                            )}
                            {loanHistory?.data
                                ?.filter((loan, index) => index !== 0)
                                .map((loan) => (
                                    <ExpandedLoanCardContainer
                                        open={expandedLoanId === loan?.loanId}
                                        key={loan?.loanId}
                                    >
                                        <LoanCardContainerExpanded>
                                            <CardLeftDetails>
                                                <p>{formattedAmount(loan?.appliedAmount)}</p>
                                                <p>
                                                    <span>Applied: </span>
                                                    {formattedTime(loan.dateCreated)}
                                                    <img src={Ellipse} alt={"ellipse"} />{" "}
                                                    {loan.dateCreated?.split(" ")[1]}
                                                </p>
                                            </CardLeftDetails>
                                            <CardRightDetails
                                                type={loan?.status}
                                                open={expandedLoanId === loan?.loanId}
                                            >
                                                {expandedLoanId !== loan.loanId && (
                                                    <LoanStatus
                                                        type={loan?.status}
                                                        open={expandedLoanId === loan?.loanId}
                                                    >
                                                        {loan?.status}
                                                    </LoanStatus>
                                                )}
                                                <p
                                                    onClick={() =>
                                                        setExpandedLoanId(
                                                            expandedLoanId === loan.loanId
                                                                ? null
                                                                : loan.loanId
                                                        )
                                                    }
                                                >
                                                    {expandedLoanId === loan.loanId
                                                        ? "See Less..."
                                                        : "See More Details..."}
                                                </p>
                                            </CardRightDetails>
                                        </LoanCardContainerExpanded>
                                        {loan?.status === "APPROVED" ||
                                        loan?.status === "PENDING" ? (
                                            <ApprovedExpandedLoanDetails
                                                open={expandedLoanId === loan?.loanId}
                                            >
                                                <CardDetails>
                                                    <p>Applied</p>
                                                    <p>{formattedTime(loan?.dateCreated)}</p>
                                                    <p>{loan?.dateCreated?.split(" ")[1]}</p>
                                                </CardDetails>
                                                <CardDetails>
                                                    <p>Approved</p>
                                                    {loan?.status === "APPROVED" && (
                                                        <>
                                                            <p>
                                                                {formattedTime(loan?.dateApproved)}
                                                            </p>
                                                            <p>
                                                                {loan?.dateApproved?.split(" ")[1]}
                                                            </p>
                                                        </>
                                                    )}
                                                </CardDetails>
                                            </ApprovedExpandedLoanDetails>
                                        ) : loan?.status === "OFFER_DECLINED" ||
                                          loan?.status === "DISAPPROVED" ? (
                                            <OfferDeclinedLoanDetails
                                                open={expandedLoanId === loan?.loanId}
                                            >
                                                <div className="OfferDeclinedLoanDetailsContainer">
                                                    <CardDetails>
                                                        <p>Applied</p>
                                                        <p>{formattedTime(loan?.dateCreated)}</p>
                                                        <p>{loan?.dateCreated?.split(" ")[1]}</p>
                                                    </CardDetails>
                                                    <CardDetails>
                                                        <p>
                                                            {loan?.status === "OFFER_DECLINED"
                                                                ? "Declined Offer"
                                                                : "Disapproved"}
                                                        </p>
                                                        <p>
                                                            {formattedTime(
                                                                loanHistory?.data[0]
                                                                    ?.dateOfferDeclined ??
                                                                    loanHistory?.data[0]
                                                                        ?.dateDisapproved
                                                            )}
                                                        </p>
                                                        <p>
                                                            {loan?.dateOfferDeclined?.split(
                                                                " "
                                                            )[1] ??
                                                                loan?.dateDisapproved?.split(
                                                                    " "
                                                                )[1]}
                                                        </p>
                                                    </CardDetails>
                                                </div>
                                                <div className="reason">
                                                    <p>
                                                        {loan?.status === "OFFER_DECLINED"
                                                            ? "Reason for Decline"
                                                            : "Reason for Disapproval"}
                                                    </p>
                                                    <p>{loan?.reason ?? "N/A"}</p>
                                                </div>
                                            </OfferDeclinedLoanDetails>
                                        ) : loan?.status === "REPAID" ||
                                          loan?.status === "ACTIVE" ? (
                                            <RepaidExpandedLoanDetails
                                                open={expandedLoanId === loan?.loanId}
                                            >
                                                <CardDetails>
                                                    <p>Applied</p>
                                                    <p>{formattedTime(loan?.dateCreated)}</p>
                                                    <p>{loan?.dateCreated?.split(" ")[1]}</p>
                                                </CardDetails>
                                                {loan?.status === "ACTIVE" && (
                                                    <CardDetails>
                                                        <p>Approved</p>
                                                        <p>{formattedTime(loan?.dateApproved)}</p>
                                                        <p>{loan?.dateApproved?.split(" ")[1]}</p>
                                                    </CardDetails>
                                                )}
                                                <CardDetails>
                                                    <p>Offer Accepted</p>
                                                    <p>{formattedTime(loan?.dateOfferAccepted)}</p>
                                                    <p>{loan?.dateOfferAccepted?.split(" ")[1]}</p>
                                                </CardDetails>
                                                <CardDetails>
                                                    <p>Disbursed</p>
                                                    <p>{formattedTime(loan?.dateDisbursed)}</p>
                                                    <p>{loan?.dateDisbursed?.split(" ")[1]}</p>
                                                </CardDetails>
                                                <CardDetails>
                                                    <p>Due</p>
                                                    <p>{formattedTime(loan?.dateDue)}</p>
                                                    <p>{loan?.dateDue?.split(" ")[1]}</p>
                                                </CardDetails>
                                                {loan?.status === "REPAID" && (
                                                    <CardDetails>
                                                        <p>Repaid</p>
                                                        <p>{formattedTime(loan?.dateRepaid)}</p>
                                                        <p>{loan?.dateRepaid?.split(" ")[1]}</p>
                                                    </CardDetails>
                                                )}
                                            </RepaidExpandedLoanDetails>
                                        ) : (
                                            <RepaidExpandedLoanDetails
                                                open={expandedLoanId === loan?.loanId}
                                            >
                                                <CardDetails>
                                                    <p>Applied</p>
                                                    <p>{formattedTime(loan?.dateCreated)}</p>
                                                    <p>{loan?.dateCreated?.split(" ")[1]}</p>
                                                </CardDetails>
                                                <CardDetails>
                                                    <p>Approved</p>
                                                    <p>{formattedTime(loan?.dateApproved)}</p>
                                                    <p>{loan?.dateApproved?.split(" ")[1]}</p>
                                                </CardDetails>
                                                <CardDetails>
                                                    <p>Offer Accepted</p>
                                                    <p>{formattedTime(loan?.dateOfferAccepted)}</p>
                                                    <p>{loan?.dateOfferAccepted?.split(" ")[1]}</p>
                                                </CardDetails>
                                                {loan?.status === "DISBURSED" && (
                                                    <CardDetails>
                                                        <p>Disbursed</p>
                                                        <p>{formattedTime(loan?.dateDisbursed)}</p>
                                                        <p>{loan?.dateDisbursed?.split(" ")[1]}</p>
                                                    </CardDetails>
                                                )}
                                                {loan?.status === "DUE" && (
                                                    <CardDetails>
                                                        <p>Due</p>
                                                        <p>{formattedTime(loan?.dateDue)}</p>
                                                        <p>{loan?.dateDue?.split(" ")[1]}</p>
                                                    </CardDetails>
                                                )}
                                            </RepaidExpandedLoanDetails>
                                        )}
                                    </ExpandedLoanCardContainer>
                                ))}
                        </ModalBody>
                    </>
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const CardDetails = styled.div`
    padding: 0.4rem;
    background-color: #fff;
    border-radius: 4px;
    width: 100%;
    margin-right: 0.4rem;

    p:first-child {
        font-weight: 700;
        font-size: 11px;
        margin-bottom: 0.4rem;
    }

    p:nth-child(2),
    p:nth-child(3) {
        color: #292929;
        font-size: 11px;
        margin-top: 0 !important;
    }
`;

const ApprovedExpandedLoanDetails = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};
    width: 100%;
    justify-content: space-between;
    font-size: 0.5rem;

    div:first-child {
        width: 30%;
    }

    div:last-child {
        width: 69%;
        padding: 0.4rem;
        background-color: #fff;
        border-radius: 4px;
        margin: 0 !important;

        p:first-child {
            font-weight: 700;
        }

        p:nth-child(2),
        p:nth-child(3) {
            color: #292929;
        }
    }
`;

const OfferDeclinedLoanDetails = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .OfferDeclinedLoanDetailsContainer {
        display: ${({ open }) => (open ? "flex" : "none")};
        width: 100%;
        justify-content: space-between;
        font-size: 0.5rem;

        div:first-child {
            width: 30%;
        }

        div:last-child {
            width: 68%;
            padding: 0.4rem;
            background-color: #fff;
            border-radius: 4px;
            margin: 0;

            p:first-child {
                font-weight: 700;
                margin-bottom: 0.4rem;
            }

            p:nth-child(2),
            p:nth-child(3) {
                color: #292929;
                margin-top: 0 !important;
            }
        }
    }

    .reason {
        width: 100%;
        background-color: #fff;
        margin-top: 0.4rem;
        padding: 0.4rem;

        p:first-child {
            font-weight: 700;
            font-size: 11px;
            line-height: 13px;
            color: #292929;
        }

        p:nth-child(2) {
            font-size: 11px;
            line-height: 13px;
            color: #292929;
        }
    }
`;

const RepaidExpandedLoanDetails = styled.div`
    display: ${({ open }) => (open ? "flex" : "none")};
    width: 100%;
    justify-content: space-between;
    font-size: 0.5rem;

    div:last-child {
        margin: 0 !important;
    }
`;

const ExpandedLoanCardContainer = styled.div`
    width: 100%;
    background-color: ${({ open }) => (open ? "#fffaf6" : "")};
    padding: ${({ open }) => (open ? "0.4rem" : "0")};
    margin: 0.5rem 0;
`;
const CurrentLoanCardContainer = styled.div`
    width: 100%;
    background-color: ${({ open }) => (open ? "#fffaf6" : "")};
    padding: ${({ open }) => (open ? "0.4rem" : "0")};
    margin-bottom: 3.5rem;
`;

const CardRightDetails = styled.div`
    p:last-child {
        font-size: 11px;
        color: blue;
        text-align: right;
        cursor: pointer;
        margin-top: 0.3rem;
    }
`;

const LoanStatus = styled.div`
    font-size: 10px;
    background-color: ${({ type }) => {
        if (type === "ACTIVE" || type === "APPROVED") {
            return "#06C281";
        } else if (type === "REPAID") {
            return "green";
        } else if (type === "DISAPPROVED") {
            return "#292929";
        } else if (type === "OFFER_DECLINED") {
            return "#FFBF00";
        } else if (type === "PENDING" || type === "OFFER_ACCEPTED") {
            return "#FE6901";
        } else {
            return "#292929";
        }
    }};
    color: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 2px;
    font-weight: 700;
    text-align: center;
`;

const CardLeftDetails = styled.div`
    p:first-child {
        font-weight: 700;
    }

    p:last-child {
        font-size: 11px;
        span {
            font-weight: 700;
            margin-right: 2px;
        }
    }
`;

const LoanCardContainerExpanded = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem 0.8rem;
    border-radius: 4px;
    box-shadow: 10px 6px 20px rgba(0, 0, 0, 0.03);
    margin-bottom: 0.4rem;
    background-color: #fff;
`;

const BodyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 1.5rem;
    font-weight: 700;
`;

const NameTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h6 {
        font-size: 0.75rem;
        line-height: 0.9rem;
        padding-top: 0.3rem;
    }
`;

const ModalContainer = styled.div`
    width: 40rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.8rem;
    background: #fff;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #d3d3d3;

    h4 {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.2rem;
        color: black;
        margin-right: 5rem;
    }

    img {
        cursor: pointer;
        width: 1.3rem;
    }
`;

const ModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.8rem 0.8rem;
    box-sizing: border-box;
`;
