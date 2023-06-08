import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/pos/close.svg";
import arrowRight from "../../assets/pos/arrow-right.svg";
import { useState } from "react";
import {
    useGetPosCategoryQuery,
    useLazyGetAgentByAccountNumberQuery,
    useLazyGetAggregatorQuery,
    useLazyGetPosQuery,
    useReassignPosToAgentMutation,
    useReassignPosToAggregatorMutation,
} from "../../app/services/pos";
import { lazyQueryOptions } from "../../utils/queryOptions";
import SelectCommon from "../common/SelectCommon";
import { useEffect } from "react";
import {
    resetGetAgentByAccountNumber,
    setGetAgentByAccountNumber,
} from "../../features/pos/posSlice";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../common/SnackBar";
import { CircularProgress } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReassignPOSModal({ open, setPosDevicesModalType, posDeviceDetails }) {
    const REASSIGN_TO_AGENT = "agent";
    const REASSIGN_TO_AGGREGATOR = "aggregator";

    const [reassignTo, setReassignTo] = useState("");
    const [assignToAgentInput, setAssignToAgentInput] = useState({
        accountNumber: "",
        posCategoryId: "",
    });

    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const handleClose = () => {
        setPosDevicesModalType("");
        setAssignToAgentInput({
            accountNumber: "",
            posCategoryId: "",
        });
        setReassignTo("");
        dispatch(resetGetAgentByAccountNumber());
    };

    const dispatch = useDispatch();
    const agentDetails = useSelector((state) => state.pos.getAgentByAccountNumber);

    const [
        triggerGetAgent,
        {
            data: agentData,
            isSuccess: agentIsSuccess,
            isError: agentIsError,
            error: agentError,
            fulfilledTimeStamp: agentFulfilledTimeStamp,
        },
    ] = useLazyGetAgentByAccountNumberQuery(lazyQueryOptions);

    const [
        triggerGetAggregator,
        {
            data: aggregatorData,
            isSuccess: aggregatorIsSuccess,
            isError: aggregatorIsError,
            error: aggregatorError,
            fulfilledTimeStamp: aggregatorFulfilledTimeStamp,
        },
    ] = useLazyGetAggregatorQuery(lazyQueryOptions);

    const [triggerGetPos] = useLazyGetPosQuery(lazyQueryOptions);

    const [
        reassignPosToAgent,
        {
            isLoading: reassignPosToAgentIsLoading,
            isSuccess: reassignPosToAgentIsSuccess,
            isError: reassignPosToAgentIsError,
            error: reassignPosToAgentError,
        },
    ] = useReassignPosToAgentMutation();

    const [
        reassignPosToAggregator,
        {
            isLoading: reassignPosToAggregatorIsLoading,
            isSuccess: reassignPosToAggregatorIsSuccess,
            isError: reassignPosToAggregatorIsError,
            error: reassignPosToAggregatorError,
        },
    ] = useReassignPosToAggregatorMutation();

    const { data: poscategory } = useGetPosCategoryQuery();

    const posCategoryList = poscategory?.data?.reduce((acc, category) => {
        acc[""] = "Select Category";
        acc[category.id] = category.name;
        return acc;
    }, {});

    useEffect(() => {
        if (agentFulfilledTimeStamp && agentIsSuccess) {
            dispatch(setGetAgentByAccountNumber(agentData));
        } else if (agentIsError) {
            const errorKey = Object.keys(agentError?.data?.errors);
            const errorMessage = agentError?.data?.errors[errorKey];

            setSnackbarInfo({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
    }, [agentData, agentFulfilledTimeStamp, agentIsError, agentIsSuccess]);

    useEffect(() => {
        if (aggregatorFulfilledTimeStamp && aggregatorIsSuccess) {
            dispatch(setGetAgentByAccountNumber(aggregatorData));
            if (aggregatorData?.data?.totalElements === 0) {
                setSnackbarInfo({
                    open: true,
                    severity: "error",
                    message: "No Aggregator Found",
                });
            }
        } else if (aggregatorIsError) {
            const errorKey = Object.keys(aggregatorError?.data?.errors);
            const errorMessage = aggregatorError?.data?.errors[errorKey];

            setSnackbarInfo({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
    }, [aggregatorData, aggregatorFulfilledTimeStamp, aggregatorIsError, aggregatorIsSuccess]);

    useEffect(() => {
        if (reassignPosToAgentIsSuccess) {
            setSnackbarInfo({
                open: true,
                severity: "success",
                message: "POS Device Reassigned Successfully",
            });
            triggerGetPos();
            handleClose();
        } else if (reassignPosToAgentIsError) {
            const errorKey = Object.keys(reassignPosToAgentError?.data?.errors);
            const errorMessage = reassignPosToAgentError?.data?.errors[errorKey];

            setSnackbarInfo({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
    }, [reassignPosToAgentIsError, reassignPosToAgentIsSuccess]);

    useEffect(() => {
        if (reassignPosToAggregatorIsSuccess) {
            setSnackbarInfo({
                open: true,
                severity: "success",
                message: "POS Device Reassigned Successfully",
            });
            triggerGetPos();
            handleClose();
        } else if (reassignPosToAggregatorIsError) {
            const errorKey = Object.keys(reassignPosToAggregatorError?.data?.errors);
            const errorMessage = reassignPosToAggregatorError?.data?.errors[errorKey];

            setSnackbarInfo({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
    }, [reassignPosToAggregatorIsError, reassignPosToAggregatorIsSuccess]);

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
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalContainer>
                    <ModalHeader>
                        <h4>Reassign POS</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </ModalHeader>
                    <ModalBody>
                        <PersonalInformation>
                            <h4>POS Information</h4>
                            <InformationDetail>
                                <p>Serial Number</p>
                                <p>{posDeviceDetails?.serialNumber}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Terminal ID</p>
                                <p>{posDeviceDetails?.terminalId}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Current Aggregator</p>
                                <p>{posDeviceDetails?.aggregatorName ?? "NA"}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Current Agent</p>
                                <p>{posDeviceDetails?.agentName ?? "NA"}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Current State</p>
                                <p>{posDeviceDetails?.state ?? "NA"}</p>
                            </InformationDetail>
                        </PersonalInformation>
                        {reassignTo === "" && (
                            <Reassign>
                                <h4>Reassign to</h4>
                                <Aggregator onClick={() => setReassignTo(REASSIGN_TO_AGGREGATOR)}>
                                    <p>Aggregator</p>
                                    <img src={arrowRight} alt={"arrow-right"} />
                                </Aggregator>
                                <Agent
                                    onClick={() => {
                                        setReassignTo(REASSIGN_TO_AGENT);
                                    }}
                                >
                                    <p>To Agent</p>
                                    <img src={arrowRight} alt={"arrow-right"} />
                                </Agent>
                            </Reassign>
                        )}
                        {reassignTo === REASSIGN_TO_AGENT && (
                            <AgentInformation>
                                <h4>Agent Information</h4>
                                <Input>
                                    <label>Account Number</label>
                                    <input
                                        type={"text"}
                                        value={assignToAgentInput?.accountNumber}
                                        onChange={(e) => {
                                            setAssignToAgentInput({
                                                ...assignToAgentInput,
                                                accountNumber: e.target.value,
                                            });
                                            if (e.target.value.length === 10) {
                                                triggerGetAgent(e.target.value);
                                            } else {
                                                dispatch(resetGetAgentByAccountNumber());
                                            }
                                        }}
                                    />
                                </Input>
                                {agentDetails && agentFulfilledTimeStamp && (
                                    <>
                                        <InputWithValue>
                                            <label>Agent Name</label>
                                            <input
                                                type={"text"}
                                                value={agentDetails?.agentName}
                                                readOnly
                                            />
                                        </InputWithValue>
                                        <InputWithValue>
                                            <label>State</label>
                                            <input
                                                type={"text"}
                                                value={agentDetails?.state}
                                                readOnly
                                            />
                                        </InputWithValue>
                                        <div className="select-category">
                                            <label>Category</label>
                                            <SelectCommon
                                                options={posCategoryList}
                                                value={assignToAgentInput?.posCategoryId}
                                                onChange={(e) => {
                                                    setAssignToAgentInput({
                                                        ...assignToAgentInput,
                                                        posCategoryId: e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </AgentInformation>
                        )}
                        {reassignTo === REASSIGN_TO_AGGREGATOR && (
                            <AgentInformation>
                                <h4>Aggregator Information</h4>
                                <Input>
                                    <label>Account Number</label>
                                    <input
                                        type={"text"}
                                        value={assignToAgentInput?.accountNumber}
                                        onChange={(e) => {
                                            setAssignToAgentInput({
                                                ...assignToAgentInput,
                                                accountNumber: e.target.value,
                                            });
                                            if (e.target.value.length === 10) {
                                                triggerGetAggregator({
                                                    accountNumber: e.target.value,
                                                });
                                            } else {
                                                dispatch(resetGetAgentByAccountNumber());
                                            }
                                        }}
                                    />
                                </Input>
                                {agentDetails?.totalElements > 0 &&
                                    aggregatorFulfilledTimeStamp && (
                                        <>
                                            <InputWithValue>
                                                <label>Agent Name</label>
                                                <input
                                                    type={"text"}
                                                    value={agentDetails?.content[0]?.aggregatorName}
                                                    readOnly
                                                />
                                            </InputWithValue>
                                            <InputWithValue>
                                                <label>State</label>
                                                <input
                                                    type={"text"}
                                                    value={
                                                        agentDetails?.content[0]?.aggregatorState
                                                    }
                                                    readOnly
                                                />
                                            </InputWithValue>
                                        </>
                                    )}
                            </AgentInformation>
                        )}
                        {reassignTo !== "" && reassignTo === REASSIGN_TO_AGENT && (
                            <ActionButton>
                                <CancelButton onClick={handleClose}>Cancel</CancelButton>
                                <AcceptButton
                                    disabled={
                                        assignToAgentInput?.posCategoryId === "" || agentError
                                    }
                                    onClick={() => {
                                        reassignPosToAgent({
                                            id: posDeviceDetails?.id,
                                            posCategoryId: parseInt(
                                                assignToAgentInput?.posCategoryId
                                            ),
                                            accountNumber: assignToAgentInput?.accountNumber,
                                        });
                                    }}
                                >
                                    {reassignPosToAgentIsLoading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        "Reassign POS"
                                    )}
                                </AcceptButton>
                            </ActionButton>
                        )}

                        {reassignTo !== "" && reassignTo === REASSIGN_TO_AGGREGATOR && (
                            <ActionButton>
                                <CancelButton onClick={handleClose}>Cancel</CancelButton>
                                <AcceptButton
                                    disabled={
                                        aggregatorError ||
                                        assignToAgentInput?.accountNumber === "" ||
                                        agentDetails?.totalElements === 0
                                    }
                                    onClick={() => {
                                        reassignPosToAggregator({
                                            id: posDeviceDetails?.id,
                                            accountNumber: assignToAgentInput?.accountNumber,
                                        });
                                    }}
                                >
                                    {reassignPosToAggregatorIsLoading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        "Reassign POS"
                                    )}
                                </AcceptButton>
                            </ActionButton>
                        )}
                    </ModalBody>
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    width: 26rem;
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
    background: #fff;
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
    padding: 1.8rem 0.8rem;
    padding-bottom: 0.8rem;
    box-sizing: border-box;
`;

const Reassign = styled.div`
    width: 100%;
    margin-top: 2rem;

    h4 {
        display: block;
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        padding-bottom: 1rem;
    }

    div {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0.5rem;
        border-radius: 6px;
        margin: auto auto;
        margin-bottom: 1rem;
    }
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
        font-size: 0.8rem;
        line-height: 0.9rem;
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

const ActionButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

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

const Aggregator = styled.div`
    cursor: pointer;
    background: #fff;
    border: 1px solid #9cabb5;
    color: #474747;
    font-weight: 400;

    &:hover {
        background: #fffaf6;
        border: 1px solid #933d0c;
        color: #933d0c;
        font-weight: 800;
    }
`;

const Agent = styled.div`
    background: #fff;
    border: 1px solid #9cabb5;
    color: #474747;
    font-weight: 400;
    width: 100%;
    cursor: pointer;

    &:hover {
        background: #fffaf6;
        border: 1px solid #933d0c;
        color: #933d0c;
        font-weight: 800;
    }
`;

const AgentInformation = styled.div`
    width: 100%;
    margin-top: 2rem;

    h4 {
        display: block;
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        margin-bottom: 1rem;
    }

    .select-category {
        label {
            font-weight: 400;
            font-size: 13.7255px;
            line-height: 18px;
            letter-spacing: 0.0571895px;
            color: rgb(71, 71, 71);
            margin-bottom: 0.3rem;
        }
    }
`;

const Input = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1.2rem;
    outline: none;

    label {
        font-weight: 400;
        font-size: 13.7255px;
        line-height: 18px;
        letter-spacing: 0.0571895px;
        color: #474747;
        margin-bottom: 0.3rem;
    }

    input {
        width: 100%;
        height: 48px;
        padding: 0px 1rem;
        background: #ffffff;
        border: 1px solid #d3d3d3;
        border-radius: 4.57516px;
        box-sizing: border-box;
        outline: none;
    }

    input:focus {
        border: none;
        border: 1px solid #933d0c;
    }
`;

const InputWithValue = styled(Input)`
    input {
        background: #fffaf6;
        border: none;
    }

    input:disabled {
        cursor: text;
    }
`;
