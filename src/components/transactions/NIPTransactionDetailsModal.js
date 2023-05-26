import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/transactions/x.svg";
import download from "../../assets/transactions/download.svg";
import crustLogoFooter from "../../assets/transactions/crustLogoFooter.svg";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import formattedAmount from "../../utils/formatCurrency";
const moment = require("moment");

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const formattedTime = (time) => {
    const formatString = "ddd Do MMM, YYYY | hh:mm a";
    const convertedTime = moment(time).format(formatString);
    return convertedTime;
};

export default function NIPTransactionModalDetails({
    open,
    handleClose,
    transaction,
    onClickReverseTransaction,
}) {
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <TransactionModalContainer>
                    <TransactionDetailsModalHeader>
                        <h4>NIP Transaction Details</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </TransactionDetailsModalHeader>
                    <TransactionDetaailsModalBody>
                        <PersonalInformation>
                            <h4>Personal/Private Information</h4>
                            <InformationDetail>
                                <p>Beneficiary Acc. Name</p>
                                <p>{transaction?.beneficiaryAccountName}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Beneficiary Acc. Number</p>
                                <p>{transaction?.beneficiaryAccountNumber}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Originator Acc. Name</p>
                                <p>{transaction?.originatorAccountName}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Originator Acc. Number</p>
                                <p>{transaction?.originatorAccountNumber}</p>
                            </InformationDetail>
                        </PersonalInformation>
                        <TransactionInformation>
                            <h4>Transaction Information</h4>
                            <InformationDetail>
                                <p>Date and Time</p>
                                <p>{formattedTime(transaction?.createdAt)}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Transaction Amount</p>
                                <p>{formattedAmount(transaction?.amount)}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Payment Reference Number</p>
                                <p>{transaction?.paymentReference}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Session ID</p>
                                <p>{transaction?.sessionId}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Transaction Reference</p>
                                <p>{transaction?.transactionReference}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Transaction Status</p>
                                <p>{transaction?.status}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Narration</p>
                                <p>{transaction?.narration}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Destination Instittion Code</p>
                                <p>{transaction?.destinationInstitutionCode}</p>
                            </InformationDetail>
                        </TransactionInformation>
                        <DownloadandReverseTransactionButtons>
                            <button onClick={onClickReverseTransaction}>Retry Transaction</button>
                        </DownloadandReverseTransactionButtons>
                    </TransactionDetaailsModalBody>
                    <TransactionDetailsModalFooter>
                        <p>
                            Kindly note that this receipt is made accessible strictly to aid work
                            processes and should <br />
                            only be used for that purpose. This receipt should not be transferred
                            out of the work <br /> environment for personal use.
                        </p>
                        <img src={crustLogoFooter} alt="crustLogoFooter" />
                    </TransactionDetailsModalFooter>
                </TransactionModalContainer>
            </Dialog>
        </div>
    );
}

const TransactionModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TransactionDetailsModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.8rem;
    background: #933d0c;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;

    h4 {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.2rem;
        color: #ffffff;
        margin-right: 5rem;
    }

    img {
        cursor: pointer;
        width: 1.3rem;
    }
`;

const TransactionDetaailsModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.8rem 0.8rem;
    box-sizing: border-box;
`;

const PersonalInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        border-bottom: 1px solid rgba(210, 210, 210, 0.5);
    }
`;

const TransactionInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1.8rem;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        border-bottom: 1px solid rgba(210, 210, 210, 0.5);
    }
`;

const MoneyInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1.8rem;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        border-bottom: 1px solid rgba(210, 210, 210, 0.5);
    }
`;

const POSInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1.8rem;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        border-bottom: 1px solid rgba(210, 210, 210, 0.5);
    }
`;

const BeneficiaryInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 1.8rem;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        border-bottom: 1px solid rgba(210, 210, 210, 0.5);
    }
`;

const InformationDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    border-bottom: 1px solid rgba(210, 210, 210, 0.5);

    p {
        width: 100%;
        margin: 0;
        padding-bottom: 0.5rem;
    }

    p:first-child {
        font-weight: 400;
        font-size: 0.8rem;
        line-height: 0.9rem;
        color: #474747;
    }

    p:last-child {
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 1rem;
        color: #000000;
        word-break: break-word;
    }
`;

const DownloadandReverseTransactionButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.8rem;

    button {
        display: block;
        background: #933d0c;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        height: 3rem;
        width: 100%;
    }
`;

const TransactionDetailsModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0.8rem;
    background: #933d0c;
    box-sizing: border-box;
    position: sticky;
    bottom: 0;
    z-index: 100;

    p {
        font-weight: 400;
        font-size: 0.5rem;
        line-height: 0.6rem;
        color: #ffffff;
    }
`;
