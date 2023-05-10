import { forwardRef, useMemo, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/transactions/x.svg";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import SearchForUser from "../common/SearchForUser";
import { debounce } from "lodash";
import { useLazyGetAgentQuery, useCreateAggregatorMutation } from "../../app/services/pos";
import SnackBar from "../common/SnackBar";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAggrgatorModal({ open, handleClose }) {
    const [agentAccountNumber, setAgentAccountNumber] = useState("");
    const [agentDetails, setAgentDetails] = useState({});
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

    const [
        createAggregator,
        {
            isLoading: createAggregatorIsLoading,
            isError: createAggregatorIsError,
            isSuccess: createAggregatorIsSuccess,
            error: createAggregatorError,
        },
    ] = useCreateAggregatorMutation();

    const handleCreateAggregator = () => {
        createAggregator(agentDetails?.userId);
    };

    const [
        triggerGetAgent,
        {
            data: lazyQueryGetAgent,
            isSuccess: lazyQueryGetAgentIsSuccess,
            isLoading: lazyQueryGetAgentIsLoading,
            isError: lazyQueryGetAgentIsError,
            error: lazyQueryGetAgentError,
            fulfilledTimeStamp: lazyQueryGetAgentFulfilledTimeStamp,
        },
    ] = useLazyGetAgentQuery(lazyQueryOptions);

    const aggregatorAccountNumberChange = debounce((event) => {
        const value = event.target.value;
        triggerGetAgent(value);
    }, 500);

    const handleAggregatorAccountNumberChange = (event) => {
        setAgentAccountNumber(event.target.value);
        if (event.target.value.length === 10) {
            aggregatorAccountNumberChange(event);
        }
        return;
    };

    useEffect(() => {
        if (lazyQueryGetAgentFulfilledTimeStamp && lazyQueryGetAgentIsSuccess) {
            setAgentDetails(lazyQueryGetAgent?.data);
        } else if (lazyQueryGetAgentIsError) {
            const errorKey = Object.keys(lazyQueryGetAgentError?.data.errors)[0];
            const errorMessage = lazyQueryGetAgentError?.data.errors[errorKey];

            setAgentDetails(null);
            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [lazyQueryGetAgentFulfilledTimeStamp, lazyQueryGetAgentIsError, lazyQueryGetAgentIsSuccess]);

    useMemo(() => {
        if (createAggregatorIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "Aggregator Created Successfully",
                severity: "success",
            });
            setAgentAccountNumber("");
            setAgentDetails(null);
            handleClose();
        } else if (createAggregatorIsError) {
            const errorKey = Object.keys(createAggregatorError?.data.errors)[0];
            const errorMessage = createAggregatorError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [createAggregatorIsSuccess, createAggregatorIsError, createAggregatorError]);

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

    const closeHandleModal = () => {
        setAgentAccountNumber("");
        setAgentDetails(null);
        handleClose();
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
                onClose={() => {
                    handleClose();
                    setAgentAccountNumber("");
                    setAgentDetails({});
                }}
                aria-describedby="alert-dialog-slide-description"
            >
                <TransactionModalContainer>
                    <TransactionDetailsModalHeader>
                        <h4>Create Aggregator</h4>
                        <img src={cancel} alt="cancel" onClick={closeHandleModal} />
                    </TransactionDetailsModalHeader>
                    <TransactionDetaailsModalBody>
                        <SearchForUser
                            value={agentAccountNumber}
                            loading={lazyQueryGetAgentIsLoading}
                            onChange={handleAggregatorAccountNumberChange}
                            placeholder={"Account Number"}
                        />

                        <SearchForUser
                            value={agentAccountNumber.length === 10 && agentDetails?.agentName}
                            disabled={true}
                            placeholder={"Agent Name"}
                        />
                    </TransactionDetaailsModalBody>
                </TransactionModalContainer>
                <ConfirmationModalFooter>
                    <button
                        onClick={() => {
                            handleClose();
                            setAgentAccountNumber("");
                            setAgentDetails({});
                        }}
                    >
                        No, Cancel
                    </button>
                    <button
                        className="right-btn"
                        onClick={handleCreateAggregator}
                        disabled={
                            !agentDetails?.userId ||
                            createAggregatorIsLoading ||
                            createAggregatorIsError ||
                            agentAccountNumber.length !== 10
                        }
                    >
                        {createAggregatorIsLoading ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Create"
                        )}
                    </button>
                </ConfirmationModalFooter>
            </Dialog>
        </div>
    );
}

const TransactionModalContainer = styled.div`
    width: 100%;
    height: 100%;
    // background: #fff;
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
    padding: 1.8rem 1rem;
    box-sizing: border-box;
`;

const ConfirmationModalFooter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 0 1rem 1.3rem 1rem;

    button:first-child {
        color: #933d0c;
        background: #fff;
        font-weight: 700;
        width: 49%;
        border-radius: 9px;
        height: 3rem;
        border: 1.14819px solid #933d0c;
    }

    .right-btn {
        background: #933d0c;
        color: #fff;
        font-weight: 700;
        width: 49%;
        border-radius: 9px;
        height: 3rem;
        ${(props) =>
            props.disabled
                ? `background-color: #D0DCE4; cursor: not-allowed;`
                : `background-color: #933d0c; cursor: pointer;`}
        &:disabled {
            background-color: #7a7a7a;
            cursor: not-allowed;
        }
    }
`;
