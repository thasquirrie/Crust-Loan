import { forwardRef, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/posRequests/close.svg";
import { useApprovePosRequestMutation } from "../../app/services/pos";
import { CircularProgress } from "@mui/material";
import SnackBar from "../common/SnackBar";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApprovePosRequest({ open, setPosModalType, posRequestDetails }) {
    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const [
        triggerApprovePosRequest,
        {
            // data: mapPosToAggregatorData,
            isLoading: approvePosRequestIsLoading,
            isError: approvePosRequestIsError,
            isSuccess: approvePosRequestIsSuccess,
            error: approvePosRequestError,
        },
    ] = useApprovePosRequestMutation();

    useMemo(() => {
        if (approvePosRequestIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "Successfully approved POS request!",
                severity: "success",
            });

            setPosModalType("");
        } else if (approvePosRequestIsError) {
            const errorKey = Object.keys(approvePosRequestError?.data.errors)[0];
            const errorMessage = approvePosRequestError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [
        approvePosRequestIsSuccess,
        approvePosRequestIsError,
        approvePosRequestError,
        setPosModalType,
    ]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarInfo({
            open: false,
            severity: snackbarInfo.severity,
            message: snackbarInfo.message,
        });
    };

    return (
        <div>
            <SnackBar
                SnackbarMessage={snackbarInfo?.message}
                openSnackbar={snackbarInfo.open}
                handleClose={handleSnackbarClose}
                snackbarSeverity={snackbarInfo.severity}
            />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => {
                    setPosModalType("");
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalContainer>
                    <ModalHeader>
                        <h4>Accept POS Request?</h4>
                        <img
                            src={cancel}
                            alt="cancel"
                            onClick={() => {
                                setPosModalType("");
                            }}
                            style={{ color: "black" }}
                        />
                    </ModalHeader>
                    <ModalBody>
                        <p className="approvePosMessage">
                            Are you sure you want to approve this POS request?
                        </p>
                        <PosRequestDetails>
                            <h4>Request Information</h4>
                            <InformationDetail>
                                <p>Agent Name</p>
                                <p>{posRequestDetails?.agentName}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Bus. Name</p>
                                <p>{posRequestDetails?.businessName}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Business Acc. Num:</p>
                                <p>{posRequestDetails?.businessAccountNumber}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Request Type:</p>
                                <p>{posRequestDetails?.requestType}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Bus. Address:</p>
                                <p>{posRequestDetails?.businessAddress}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Bus. State:</p>
                                <p>{posRequestDetails?.businessState}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Status</p>
                                <p>{posRequestDetails?.status}</p>
                            </InformationDetail>
                        </PosRequestDetails>
                        <PosRequestButtons>
                            <DeclinePosRequestButton
                                onClick={() => {
                                    setPosModalType("");
                                }}
                            >
                                Cancel
                            </DeclinePosRequestButton>
                            <ApprovePosRequestButton
                                onClick={() => {
                                    triggerApprovePosRequest({
                                        id: posRequestDetails.id,
                                    });
                                }}
                                disabled={approvePosRequestIsLoading}
                            >
                                {approvePosRequestIsLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    "Approve Request"
                                )}
                            </ApprovePosRequestButton>
                        </PosRequestButtons>
                    </ModalBody>
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    width: 22rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;

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
    padding: 1rem 1rem;
    box-sizing: border-box;

    .approvePosMessage {
        font-weight: 400;
        font-size: 0.95rem;
        line-height: 1rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
        letter-spacing: 0.0571895px;
        color: #475661;
    }
`;

const PosRequestDetails = styled.div`
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
        padding-bottom: 1.5rem;
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
        font-size: 0.9rem;
        line-height: 1rem;
        color: #000000;
    }

    p:last-child {
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 1rem;
        color: #474747;
        word-break: break-word;
        text-align: right;
    }
`;

const PosRequestButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.8rem;

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
        display: block;
        border-radius: 4px;
        height: 3rem;
        width: 49%;
    }
`;

const ApprovePosRequestButton = styled.button`
    background: #933d0c;
    border: none;
    color: #ffffff;

    &:disabled {
        background: #7a7a7a;
    }
`;
const DeclinePosRequestButton = styled.button`
    background: #ffffff;
    color: #933d0c;
    border: 1px solid #933d0c;
`;
