import { forwardRef, useEffect, useMemo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/transactions/x.svg";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { StyledTableContainer, StyledTableHead, StyledTableRow } from "../../utils/sharedStyles";
import { lazyQueryOptions } from "../../utils/queryOptions";
import { useLazyGetAggregatorQuery,   useAssignPosDevicesToAggregatorMutation } from "../../app/services/pos";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import GetAggregatorDetails from "../posRequests/GetAggregatorsDetails"
import { setGetAggregator, resetGetAggregator } from "../../features/pos/posSlice";
import SnackBar from "../common/SnackBar";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const TableColumns = [
    { id: "serialNumber", label: "SERIAL NO." },
    { id: "terminalId", label: "TERMINAL NO." },
    { id: "institution", label: "Merchant Name" },
    { id: "agentName", label: "Agent Name" },
    {
        id: "accountNumber",
        label: "Agent Acc. No.",

    },
    { id: "aggregatorName", label: "Aggregator Name" },
    { id: "state", label: "POS State" }
];

export default function AssignMultipleDevicesToAgg({
    open,
    handleClose,
    selected,
    setSelected
}) {
    const [aggregatorAccountNumber, setAggregatorAccountNumber] = useState("");
    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const getAggregatorData = useSelector((state) => state.pos.getAggregator);

    const dispatch = useDispatch()

    const [
        triggerGetAggregator,
        {
            data: lazyQueryGetAggregatorData,
            isLoading: lazyQueryGetAggregatorIsLoading,
            // isSuccess: lazyQueryGetAggregatorIsSuccess,
            fulfilledTimeStamp: lazyQueryGetAggregatorFulfilledTimeStamp,
        },
    ] = useLazyGetAggregatorQuery(lazyQueryOptions);

    const [triggerAssignPosDevicesToAggregator , {
        isLoading: assignPosDevicesToAggregatorIsLoading,
        isError: assignPosDevicesToAggregatorIsError,
        isSuccess: assignPosDevicesToAggregatorIsSuccess,
        error: assignPosDevicesToAggregatorError,
    }] =   useAssignPosDevicesToAggregatorMutation()

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    useMemo(() => {
        if ( assignPosDevicesToAggregatorIsSuccess) {
            setSnackbarInfo({
                open: true,
                message: "Successfully Assigned POS to Aggregator!",
                severity: "success",
            });
            setAggregatorAccountNumber("");
        } else if (assignPosDevicesToAggregatorIsError) {
            
          const errorKey = Object.keys(assignPosDevicesToAggregatorError?.data?.error);
          const errorMessage = assignPosDevicesToAggregatorError?.data?.error;
        
            console.log("selectedDevices", errorMessage)

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [
        assignPosDevicesToAggregatorIsSuccess,
        assignPosDevicesToAggregatorIsError,
        assignPosDevicesToAggregatorError
    ]);

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

    useEffect(() => {
        if (lazyQueryGetAggregatorFulfilledTimeStamp) {
            dispatch(setGetAggregator(lazyQueryGetAggregatorData));
        }
    }, [lazyQueryGetAggregatorData, dispatch, lazyQueryGetAggregatorFulfilledTimeStamp, selected]);

    const selectedDevices =  selected.map(device => device.id)

   

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarInfo({
            open: false,
            severity: snackbarInfo.severity,
            message: "",
        });
        setSelected([])
        handleClose()
    };

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

<SnackBar
                SnackbarMessage={snackbarInfo.message}
                openSnackbar={snackbarInfo.open}
                handleClose={handleSnackbarClose}
                snackbarSeverity={snackbarInfo.severity}
            />
                <ModalContainer>
                    <TransactionDetailsModalHeader>
                        <h4>
                            Assign POS Devices To Aggregator
                        </h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </TransactionDetailsModalHeader>

                    <SearchFilters>
                        <div className="aggregator-details">
                            <GetAggregatorDetails
                                value={aggregatorAccountNumber}
                                loading={lazyQueryGetAggregatorIsLoading}
                                placeHolder="Search for Aggregator by Account Number"
                                onChange={handleAggregatorAccountNumberChange}
                                noDataFound={getAggregatorData?.content?.length === 0}
                            />
                            {getAggregatorData?.content[0] && (
                                <>
                                    <div className="agg-name">
                                        <p>Aggregator</p>
                                        <div>Alhaji Ibrahim</div>
                                    </div>
                                    <div className="agg-name">
                                        <p>Location</p>
                                        <div>Abuja</div>
                                    </div>
                                </>
                            )}
                        </div>
                        <AssignDevicesBtn
                        onClick={() => {
                            triggerAssignPosDevicesToAggregator({
                                ids:selectedDevices,
                                accountNumber:aggregatorAccountNumber
                            })
                        }}
                           disabled={!getAggregatorData?.content[0]}
                        >
                            Assign POS Devices
                        </AssignDevicesBtn>
                    </SearchFilters>

                    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none", marginTop: '55px' }}>
                        <StyledTableContainer>
                            <Table
                                stickyHeader
                                aria-label="sticky table"
                                style={{ borderSpacing: "5px 10x", borderCollapse: "separate" }}
                            >
                                <StyledTableHead>
                                    <TableRow>
                                        <TableCell
                                            align={"center"}
                                            style={{ minWidth: 30, fontWeight: 700 }}
                                        ></TableCell>
                                        {TableColumns.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                            >
                                                {headCell.label}
                                            </TableCell>
                                        ))}

                                    </TableRow>
                                </StyledTableHead>

                                <TableBody>
                                    {selected?.map((row) => {
                                        const isItemSelected = isSelected(row);
                                        return (
                                            <StyledTableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                aria-checked={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        onClick={(event) => handleClick(event, row)}
                                                        key={row?.id}
                                                        selected={isItemSelected}
                                                        checked={isItemSelected}
                                                    />
                                                </TableCell>
                                                {TableColumns?.map((column) => {
                                                    const value = row[column?.id];
                                                    return (
                                                        <>
                                                            <TableCell
                                                                key={value?.id}
                                                                align={"left"}
                                                                style={{
                                                                    minWidth: 150,
                                                                    whiteSpace: "nowrap",
                                                                }}
                                                            >
                                                                {value}
                                                            </TableCell>
                                                        </>
                                                    );
                                                })}

                                            </StyledTableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </StyledTableContainer>
                    </Paper>


                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 40px 48px 48px;
`;

const TransactionDetailsModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;

    h4 {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 18px;
        letter-spacing: 0.0571895px;
    }

    img {
        cursor: pointer;
        width: 1.3rem;
        background: black;
    }
`;

const SearchFilters = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-top:68px;
  width:100%;

  .aggregator-details {
    display:flex;
    align-items:center;
  
    .agg-name {
        margin-left:28px;
        p {
            font-style: normal;
            font-weight: 400;
            margin-bottom:6px;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 0.0571895px;
            color: #474747;
        }
        div {
            width: 217px;
            height: 55px;
            background: #FFFAF6;
            border: 0.800654px solid #FBFBFB;
            border-radius: 4.57516px;
            padding:13px 18px 13px 19px; 
        }
    }
  }
`

const AssignDevicesBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 206px;
    height: 55.74px;
    color:#fff;
    background: #933D0C;
    box-shadow: 0px 1.81212px 3.62425px 1.35909px rgba(0, 0, 0, 0.15), 0px 0.453031px 1.35909px rgba(0, 0, 0, 0.3);
`

const NoRecordFound = styled.div`
    position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100vw;
    margin-top: 10%;

    h4 {
        color: #933d0c;
        text-align: center;
        font-weight: 700;
        font-size: 1.8rem;
    }
`;











