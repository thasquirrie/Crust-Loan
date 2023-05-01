import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/transactions/x.svg";
import download from "../../assets/transactions/download.svg";
import crustLogoFooter from "../../assets/transactions/crustLogoFooter.svg";
import { Link } from "react-router-dom";
import { useLazyDownloadPosTransactionQuery } from "../../app/services/pos";
import { CircularProgress } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { PosTmsStatusCodes } from "../../utils/posTmsStatus";
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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PosTmsTransactionDetailsModal({ open, handleClose, transaction }) {
    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const [
        triggerDownloadTransactions,
        { data: transactionPDF, isLoading: transactionPDFLoading, isError: transactionPDFError },
    ] = useLazyDownloadPosTransactionQuery(lazyQueryOptions);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar({
            open: false,
            severity: "success",
            message: "",
        });
    };
    return (
        <div>
            <Snackbar
                open={openSnackbar?.open}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
            >
                <Alert onClose={handleSnackbarClose} severity={"error"} sx={{ width: "100%" }}>
                    {openSnackbar?.message}
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <TransactionModalContainer>
                    <TransactionDetailsModalHeader>
                        <h4>POS Transaction Details</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </TransactionDetailsModalHeader>
                    <TransactionDetaailsModalBody>
                        <TransactionInformation>
                            <h4>Transaction Information</h4>
                            <InformationDetail>
                                <p>Date and Time</p>
                                <p>{formattedTime(transaction?.createdAt)}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Transaction Amount</p>
                                <p>{formattedAmount(transaction?.amount / 100)}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Reference Number</p>
                                <p>{transaction?.transactionReference}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Transaction Status Code</p>
                                <p>{transaction?.responseCode}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Card Pan</p>
                                <p>{transaction?.cardPan}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Transaction Status</p>
                                <p>{PosTmsStatusCodes[transaction?.responseCode]}</p>
                            </InformationDetail>
                        </TransactionInformation>
                        <MoneyInformation>
                            <h4>Card Information</h4>
                            <InformationDetail>
                                <p>Card Type</p>
                                <p>{transaction?.cardType}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Card processor</p>
                                <p>{transaction?.processor}</p>
                            </InformationDetail>
                        </MoneyInformation>
                        <MoneyInformation>
                            <h4>POS Information</h4>
                            <InformationDetail>
                                <p>POS Serial Number</p>
                                <p>{transaction?.serialNumber}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>POS Terminal ID</p>
                                <p>{transaction?.terminalId}</p>
                            </InformationDetail>
                        </MoneyInformation>
                        <DownloadandReverseTransactionButtons
                            disabled={true}
                            transactionStatus={transaction?.transactionStatus}
                        >
                            <Link
                                to={transactionPDF?.data}
                                target="_blank"
                                onClick={() =>
                                    triggerDownloadTransactions({
                                        transactionReference: transaction?.transactionReference,
                                    })
                                }
                            >
                                {!transactionPDFLoading ? (
                                    <>
                                        <img src={download} alt="download" />
                                        Download as PDF
                                    </>
                                ) : transactionPDFLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    transactionPDFError && <p>Unable to Fetch</p>
                                )}
                            </Link>
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
    cursor: not-allowed;
    pointer-events: none;

    a {
        background: #ffffff;
        color: #933d0c;
        border: 1px solid #933d0c;
        height: 3rem;
        border-radius: 4px;
        width: ${(props) => (props.transactionStatus === "FAILED" ? "49%" : "100%")};
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-decoration: none;

        img {
            margin-right: 0.5rem;
        }
    }

    button {
        display: ${(props) => (props.transactionStatus === "FAILED" ? "block" : "none")};
        background: #933d0c;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        height: 3rem;
        width: 49%;
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
        margin-right: 3.5rem;
    }
`;
