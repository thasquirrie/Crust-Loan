import { forwardRef, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/pos/close.svg";
import { useDeclinePosRequestMutation } from "../../app/services/pos";
import SnackBar from "../common/SnackBar";
import { CircularProgress } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeclinePosRequest({ open, setPosModalType, posRequestDetails }) {
    const [rejectPosReason, setRejectPosReason] = useState("");
    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const [
        triggerDeclinePosRequest,
        {
            // data: mapPosToAggregatorData,
            isLoading: declinePosRequestIsLoading,
            isError: declinePosRequestIsError,
            isSuccess: declinePosRequestIsSuccess,
            error: declinePosRequestError,
        },
    ] = useDeclinePosRequestMutation();

    useMemo(() => {
        if (declinePosRequestIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "Successfully declined POS request!",
                severity: "success",
            });

            setPosModalType("");
        } else if (declinePosRequestIsError) {
            const errorKey = Object.keys(declinePosRequestError?.data.errors)[0];
            const errorMessage = declinePosRequestError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [
        declinePosRequestIsSuccess,
        declinePosRequestIsError,
        declinePosRequestError,
        setPosModalType,
    ]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarInfo({
            open: false,
            severity: snackbarInfo.severity,
            message: "",
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
                        <h4>Decline POS Request?</h4>
                        <img
                            src={cancel}
                            alt="cancel"
                            onClick={() => {
                                setPosModalType("");
                            }}
                        />
                    </ModalHeader>
                    <ModalBody>
                        <p className="declinePosMessage">
                            Are you sure you want to approve this POS request?
                        </p>
                        <PersonalInformation>
                            <h4>Reason</h4>
                            <InputField
                                value={rejectPosReason}
                                onChange={(e) => setRejectPosReason(e.target.value)}
                            />
                        </PersonalInformation>
                        <ActionButton>
                            <CancelButton
                                onClick={() => {
                                    setPosModalType("");
                                }}
                            >
                                Cancel
                            </CancelButton>
                            <AcceptButton
                                onClick={() => {
                                    triggerDeclinePosRequest({
                                        id: posRequestDetails.id,
                                    });
                                }}
                                disabled={declinePosRequestIsLoading || rejectPosReason === ""}
                            >
                                {declinePosRequestIsLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    "Decline Request"
                                )}
                            </AcceptButton>
                        </ActionButton>
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
    padding: 0.8rem;
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
    padding: 1rem 0.8rem;
    box-sizing: border-box;

    .declinePosMessage {
        font-weight: 400;
        font-size: 0.95rem;
        line-height: 1rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
        letter-spacing: 0.0571895px;
        color: #475661;
    }
`;

const InputField = styled.textarea`
    width: 98%;
    height: 5rem;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    padding: 0.8rem;
    box-sizing: border-box;
    outline: none;
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
        padding-bottom: 0.8rem;
    }
`;

const ActionButton = styled.div`
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
        border-radius: 6px;
        height: 3rem;
        width: 49%;
    }
`;

const AcceptButton = styled.button`
    background: #933d0c;
    border: none;
    color: #ffffff;

    &:disabled {
        background: #7a7a7a;
    }
`;

const CancelButton = styled.button`
    background: #ffffff;
    color: #933d0c;
    border: 1px solid #933d0c;
`;
