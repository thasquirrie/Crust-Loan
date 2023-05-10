import { forwardRef, useEffect, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/pos/close.svg";

import { CircularProgress } from "@mui/material";
import GetAggregatorDetails from "./GetAggregatorsDetails";
import { useState } from "react";
import { useLazyGetAggregatorQuery, useMapPosToAggregatorsMutation } from "../../app/services/pos";
import { debounce } from "lodash";
import SnackBar from "../common/SnackBar";
import { useDispatch, useSelector } from "react-redux";
import { resetGetAggregator, setGetAggregator } from "../../features/pos/posSlice";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MapPosRequestToAggregator({ open, posRequestDetails, setPosModalType }) {
    const [aggregatorAccountNumber, setAggregatorAccountNumber] = useState("");
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
    const getAggregatorData = useSelector((state) => state.pos.getAggregator);

    const [
        triggerMapPosToAggregator,
        {
            isLoading: mapPosToAggregatortIsLoading,
            isError: mapPosToAggregatortIsError,
            isSuccess: mapPosToAggregatortIsSuccess,
            error: mapPosToAggregatortError,
        },
    ] = useMapPosToAggregatorsMutation();

    const [
        triggerGetAggregator,
        {
            data: lazyQueryGetAggregatorData,
            isLoading: lazyQueryGetAggregatorIsLoading,
            // isSuccess: lazyQueryGetAggregatorIsSuccess,
            fulfilledTimeStamp: lazyQueryGetAggregatorFulfilledTimeStamp,
        },
    ] = useLazyGetAggregatorQuery(lazyQueryOptions);

    const aggregatorAccountNumberChange = debounce((event) => {
        const value = event.target.value;
        triggerGetAggregator({
            accountNumber: value,
        });
    }, 500);

    const handleAggregatorAccountNumberChange = (event) => {
        setAggregatorAccountNumber(event.target.value);
        if (event.target.value.length === 10) {
            aggregatorAccountNumberChange(event);
        } else {
            dispatch(resetGetAggregator());
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
        if (mapPosToAggregatortIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "Successfully Mapped POS to Aggregator!",
                severity: "success",
            });
            setAggregatorAccountNumber("");
            setPosModalType("");
        } else if (mapPosToAggregatortIsError) {
            const errorKey = Object.keys(mapPosToAggregatortError?.data.errors)[0];
            const errorMessage = mapPosToAggregatortError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [
        mapPosToAggregatortIsSuccess,
        mapPosToAggregatortIsError,
        mapPosToAggregatortError,
        setPosModalType,
    ]);

    useEffect(() => {
        if (lazyQueryGetAggregatorFulfilledTimeStamp) {
            dispatch(setGetAggregator(lazyQueryGetAggregatorData));
        }
    }, [lazyQueryGetAggregatorData, dispatch, lazyQueryGetAggregatorFulfilledTimeStamp]);

    const handleClose = () => {
        setPosModalType("");
        setAggregatorAccountNumber("");
        dispatch(resetGetAggregator());
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
                <MapPosRequestModalContainer>
                    <PosRequestDetailsModalHeader>
                        <h4>Map POS to Aggregator</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </PosRequestDetailsModalHeader>
                    <PosRequestDetailsModalBody>
                        <AgentInformation>
                            <h4>Agent Information</h4>
                            <AgentDetail>
                                <p>Agent Name</p>
                                <p>{posRequestDetails?.agentName}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>Business Name</p>
                                <p>{posRequestDetails?.businessName}</p>
                            </AgentDetail>
                            <AgentDetail>
                                <p>State</p>
                                <p>{posRequestDetails?.businessState}</p>
                            </AgentDetail>
                        </AgentInformation>
                        <AggregatorInformation>
                            <h4>Aggregator Information</h4>
                            <GetAggregatorDetails
                                value={aggregatorAccountNumber}
                                loading={lazyQueryGetAggregatorIsLoading}
                                placeHolder="Account Number"
                                onChange={handleAggregatorAccountNumberChange}
                                noDataFound={getAggregatorData?.content?.length === 0}
                            />
                            {getAggregatorData?.content[0] && (
                                <>
                                    <AggregatorDetailsContainer>
                                        <AggregatorDetail>
                                            <p>Aggregator Name :</p>
                                            <p>
                                                {
                                                    lazyQueryGetAggregatorData?.data?.content[0]
                                                        ?.aggregatorName
                                                }
                                            </p>
                                        </AggregatorDetail>
                                        <AggregatorDetail>
                                            <p>State :</p>
                                            <p>
                                                {
                                                    lazyQueryGetAggregatorData?.data?.content[0]
                                                        ?.aggregatorState
                                                }
                                            </p>
                                        </AggregatorDetail>
                                    </AggregatorDetailsContainer>
                                </>
                            )}
                        </AggregatorInformation>
                    </PosRequestDetailsModalBody>
                    <AssignPOSButtonsContainer>
                        <button onClick={handleClose}>Cancel</button>
                        <button
                            onClick={() => {
                                triggerMapPosToAggregator({
                                    id: posRequestDetails.id,
                                    accountNumber: aggregatorAccountNumber,
                                });
                            }}
                            disabled={
                                !getAggregatorData?.content[0] || mapPosToAggregatortIsLoading
                            }
                        >
                            {mapPosToAggregatortIsLoading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                "Map POS"
                            )}
                        </button>
                    </AssignPOSButtonsContainer>
                </MapPosRequestModalContainer>
            </Dialog>
        </div>
    );
}

const MapPosRequestModalContainer = styled.div`
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

const PosRequestDetailsModalHeader = styled.div`
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

const PosRequestDetailsModalBody = styled.div`
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
        font-size: 0.9rem;
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

const AggregatorDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    border-bottom: 1px solid rgba(210, 210, 210, 0.5);

    &:first-child {
        border-top: 1px solid rgba(210, 210, 210, 0.5);
        padding-top: 12px;
    }

    p {
        margin: 0;
        padding-bottom: 0.5rem;
    }

    p:first-child {
        font-weight: 400;
        font-size: 0.9rem;
        line-height: 1rem;
        color: #474747;
        margin-bottom: 12px;
        padding: 0;
    }

    p:last-child {
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 1rem;
        color: #474747;
        /* word-break: break-word; */
    }
`;

const AggregatorDetailsContainer = styled.div`
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

const AssignPOSButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* margin-top: 48px; */

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
