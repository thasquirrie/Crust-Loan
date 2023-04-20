import { forwardRef, useEffect, useState, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/pos/close.svg";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GetPosDetails from "./GetPosDetails";
import { useAssignPosToAgentMutation, useLazyGetPosQuery } from "../../app/services/pos";
import { debounce } from "lodash";
import { resetGetPos, setGetPos } from "../../features/pos/posSlice";
import SnackBar from "../common/SnackBar";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AssignPosToAgent({ open, setPosModalType, posRequestDetails }) {
    const [posSerialNumber, setPosSerialNumber] = useState("");
    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const dispatch = useDispatch();
    const getPosData = useSelector((state) => state.pos.getPos);

    const [
        triggerAssignPosToAgent,
        {
            isLoading: assignPosToAgentIsLoading,
            isError: assignPosToAgentIsError,
            isSuccess: assignPosToAgentIsSuccess,
            error: assignPosToAgentError,
        },
    ] = useAssignPosToAgentMutation();

    const [
        triggerGetPos,
        {
            data: lazyQueryGetPosData,
            isLoading: lazyQueryGetPosIsLoading,
            // isSuccess: lazyQueryGetPosIsSuccess,
            fulfilledTimeStamp: lazyQueryGetPosFulfilledTimeStamp,
        },
    ] = useLazyGetPosQuery(lazyQueryOptions);

    const posSerialNumberChange = debounce((event) => {
        const value = event.target.value;
        triggerGetPos({
            serialNumber: value,
        });
    }, 1000);

    const handlePosSerialNumberChange = (event) => {
        setPosSerialNumber(event.target.value);
        posSerialNumberChange.cancel();
        if (event.target.value === "") {
            dispatch(resetGetPos());
        } else {
            posSerialNumberChange(event);
        }
    };

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

    useMemo(() => {
        if (assignPosToAgentIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "Successfully Assigned POS to Agent!",
                severity: "success",
            });
            setPosSerialNumber("");
            setPosModalType("");
        } else if (assignPosToAgentIsError) {
            const errorKey = Object.keys(assignPosToAgentError?.data.errors)[0];
            const errorMessage = assignPosToAgentError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [
        assignPosToAgentIsSuccess,
        assignPosToAgentIsError,
        assignPosToAgentError,
        setPosModalType,
    ]);

    useEffect(() => {
        if (lazyQueryGetPosFulfilledTimeStamp && lazyQueryGetPosData) {
            dispatch(setGetPos(lazyQueryGetPosData));
        } else {
            dispatch(resetGetPos());
        }
    }, [lazyQueryGetPosData, dispatch, lazyQueryGetPosFulfilledTimeStamp]);

    const handleClose = () => {
        setPosModalType("");
        setPosSerialNumber("");
        dispatch(resetGetPos());
    };

    return (
        <div>
            <SnackBar
                SnackbarMessage={snackbarInfo.message}
                openSnackbar={snackbarInfo.open}
                handleClose={handleSnackbarClose}
                snackbarSeverity={snackbarInfo.severity}
            />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <TransactionModalContainer>
                    <TransactionDetailsModalHeader>
                        <h4>Assign POS to Agent</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </TransactionDetailsModalHeader>
                    <TransactionDetaailsModalBody>
                        <AgentInformation>
                            <h4>Agent Information</h4>
                            <AgentDetail>
                                <p>Agent Name:</p>
                                <p>{posRequestDetails?.agentName}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Business Name:</p>
                                <p>{posRequestDetails?.businessName}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Business Acc. No:</p>
                                <p>{posRequestDetails?.businessAccountNumber}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Request Type:</p>
                                <p>{posRequestDetails?.requestType}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Business Address:</p>
                                <p>{posRequestDetails?.businessAddress}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Business State:</p>
                                <p>{posRequestDetails?.businessState}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Status:</p>
                                <p>{posRequestDetails?.status}</p>
                            </AgentDetail>
                        </AgentInformation>
                        <AggregatorInformation>
                            <h4>Device Information</h4>

                            <GetPosDetails
                                value={posSerialNumber}
                                loading={lazyQueryGetPosIsLoading}
                                placeHolder="Serial Number"
                                onChange={handlePosSerialNumberChange}
                                noDataFound={getPosData?.content?.length === 0}
                            />
                            {getPosData?.content[0] && (
                                <>
                                    <PosDetailsContainer>
                                        <AggregatorDetail>
                                            <p>POS Serial Number :</p>
                                            <p>{getPosData?.content[0]?.serialNumber}</p>
                                        </AggregatorDetail>
                                        <AggregatorDetail>
                                            <p>POS Terminal ID :</p>
                                            <p>{getPosData?.content[0]?.terminalId}</p>
                                        </AggregatorDetail>
                                        <AggregatorDetail>
                                            <p>Merchant Name :</p>
                                            <p>{getPosData?.content[0]?.agentBusinessName}</p>
                                        </AggregatorDetail>
                                    </PosDetailsContainer>
                                </>
                            )}
                        </AggregatorInformation>
                    </TransactionDetaailsModalBody>
                    <AssignPOSButtonsContainer>
                        <button onClick={handleClose}>Cancel</button>
                        <button
                            onClick={() => {
                                triggerAssignPosToAgent({
                                    id: posRequestDetails.id,
                                    serialNumber: posSerialNumber,
                                });
                            }}
                            disabled={!getPosData?.content[0] || assignPosToAgentIsLoading}
                        >
                            {assignPosToAgentIsLoading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                "Assign POS"
                            )}
                        </button>
                    </AssignPOSButtonsContainer>
                </TransactionModalContainer>
            </Dialog>
        </div>
    );
}

const TransactionModalContainer = styled.div`
    width: 408px;
    max-width: 100%;
    height: 100%;
    background: #fff;
    padding: 24px;
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
    box-sizing: border-box;

    h4 {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #2c1505;
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
    margin-top: 42px;
    box-sizing: border-box;
`;

const AgentInformation = styled.div`
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

const AggregatorInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 34px;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 24px;
        width: 100%;
    }
`;

const AgentDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    border-bottom: 1px solid rgba(210, 210, 210, 0.5);

    p {
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

const PosDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    width: 100%;

    div:first-child {
        margin: 0;
    }
`;

const AggregatorDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    border-bottom: 1px solid rgba(210, 210, 210, 0.5);

    &:first-child {
        border-top: 1px solid rgba(210, 210, 210, 0.5);
        padding-top: 0.5rem;
    }

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

const AssignPOSButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
        display: block;
        color: #933d0c;
        background: transparent;
        border-radius: 8px;
        border: 1px solid #933d0c;
        height: 3rem;
        width: 49%;

        &:nth-child(2) {
            display: block;
            background: #933d0c;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            height: 3rem;
            width: 49%;
        }

        &:disabled {
            background: #7a7a7a;
        }
    }
`;
