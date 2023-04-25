import { forwardRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/pos/close.svg";
import { useState } from "react";
import SelectCommon from "../common/SelectCommon";
import {
    useCreatePosMutation,
    useGetAllMerchantsQuery,
    useLazyGetPosQuery,
} from "../../app/services/pos";
import { CircularProgress } from "@mui/material";
import SnackBar from "../common/SnackBar";
import { lazyQueryOptions } from "../../utils/queryOptions";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreatePOS({ open, setPosDevicesModalType }) {
    const [tab, setTab] = useState("single");
    const [CreatePOSInput, setCreatePOSInput] = useState({
        serialNumber: "",
        institutionId: "",
    });

    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const { data: merchants } = useGetAllMerchantsQuery();
    const [triggerGetPos] = useLazyGetPosQuery(lazyQueryOptions);

    const [
        triggerCreatePos,
        {
            isLoading: createPosIsLoading,
            isSuccess: createPosIsSuccess,
            isError: createPosIsError,
            error: createPosError,
        },
    ] = useCreatePosMutation();

    const merchantsNameList = merchants?.data?.reduce((acc, merchant) => {
        acc[""] = "Select Merchant";
        acc[merchant.id] = merchant.name;
        return acc;
    }, {});

    const handleClose = () => {
        setPosDevicesModalType("");
        setCreatePOSInput({
            serialNumber: "",
            institutionId: "",
        });
    };

    useEffect(() => {
        if (createPosIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "POS Created Successfully",
                severity: "success",
            });
            triggerGetPos();
            handleClose();
        } else if (createPosIsError) {
            const errorKey = Object.keys(createPosError?.data?.errors);
            const errorMessage = createPosError?.data?.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [createPosIsSuccess, createPosIsError, createPosError]);

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
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "8px",
                    },
                }}
            >
                <ModalContainer>
                    <ModalHeader>
                        <h4>Create POS</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </ModalHeader>
                    <PillsContainer>
                        <Pills
                            selected={tab === "single"}
                            onClick={() => {
                                setTab("single");
                            }}
                        >
                            Single
                        </Pills>
                        <Pills
                            selected={tab === "multiple"}
                            onClick={() => {
                                setTab("multiple");
                            }}
                        >
                            Multiple
                        </Pills>
                    </PillsContainer>
                    {tab === "single" ? (
                        <ModalBody>
                            <DesignatorInformation>
                                <h4>POS Information</h4>
                                <Input>
                                    <label htmlFor="text">Serial Number</label>
                                    <input
                                        type={"text"}
                                        onChange={(e) => {
                                            setCreatePOSInput({
                                                ...CreatePOSInput,
                                                serialNumber: e.target.value,
                                            });
                                        }}
                                        value={CreatePOSInput.serialNumber}
                                    />
                                    {/* <p className="errorMessage">Serial Number already exists</p> */}
                                </Input>
                                <br />
                                <br />
                                <h4>Merchant Information</h4>
                                <SelectCommon
                                    value={CreatePOSInput.institutionId}
                                    options={merchantsNameList}
                                    onChange={(e) => {
                                        setCreatePOSInput({
                                            ...CreatePOSInput,
                                            institutionId: e.target.value,
                                        });
                                    }}
                                />
                            </DesignatorInformation>
                            <ActionButton>
                                <CancelButton onClick={handleClose}>Cancel</CancelButton>
                                <AcceptButton
                                    disabled={
                                        CreatePOSInput.serialNumber === "" ||
                                        CreatePOSInput.institutionId === ""
                                    }
                                    onClick={() => {
                                        triggerCreatePos(CreatePOSInput);
                                    }}
                                >
                                    {createPosIsLoading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        "Create"
                                    )}
                                </AcceptButton>
                            </ActionButton>
                        </ModalBody>
                    ) : (
                        <ModalBody></ModalBody>
                    )}
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
    padding: 0.2rem 0.8rem 0.8rem 0.8rem;
    box-sizing: border-box;
`;

const DesignatorInformation = styled.div`
    width: 100%;
    margin-top: 1rem;

    h4 {
        display: block;
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 1rem;
        width: 100%;
    }
`;

const Input = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

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
        border: 1px solid #933d0c;
    }

    .errorMessage {
        display: block;
        font-size: 0.675rem;
        margin-top: 0.1rem;
        color: #ff0000;
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

const PillsContainer = styled.div`
    display: flex;
    align-items: baseline;
    width: 25%;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap: 0.6rem;
`;

const Pills = styled.p`
    cursor: pointer;
    padding: 7.5px 18px;
    border: none;
    border-radius: 20px;
    background: ${(props) => (props.selected ? "#FE6901" : "#fffff")};
    color: ${(props) => (props.selected ? "#ffffff" : "#292929")};
`;
