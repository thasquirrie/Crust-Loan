import { useEffect, useState } from "react";
import Main from "../../components/common/Main.js";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    CreatePosBtn,
    SelectSearchFilter,
    CreateAssignPOSContainer,
    AssignMultipleDeviceBtn,
} from "./POSDevicesStyles.js";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar.js";
import {
    useGetPosQuery,
    useLazyGetPosQuery,
    useUnmapAgentPOSMutation,
    useUnmapAggregatorPOSMutation,
} from "../../app/services/pos.js";
import { lazyQueryOptions } from "../../utils/queryOptions.js";
import QueryButton from "../../components/posDevices/QueryButton.js";
import AssignMultipleDevicesToAgg from "../../components/posDevices/AssignMultipleDevicesToAggModal.js";
import CheckboxTable from "../../components/common/TableWithCheckbox.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import mennIcon from "../../assets/common/Kebab.svg";
import POSHistoryModal from "../../components/posDevices/POSHistoryModal.js";
import CreatePOS from "../../components/posDevices/CreatePOS.js";
import ReassignPOSModal from "../../components/posDevices/ReassignPOS.js";
import UnmapPOSModal from "../../components/posDevices/UnmapPOSModal.js";
import SnackBar from "../../components/common/SnackBar";
import ConfirmationModal from "../../components/common/ConfirmationModal.js";

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
    { id: "state", label: "POS State" },
];

const PosDevices = () => {
    const VIEW_POS_HISTORY = "VIEW_POS_HISTORY";
    const VIEW_POS_DETAILS = "VIEW_POS_DETAILS";
    const UNMAP_POS = "UNMAP_POS";
    const UNMAP_POS_FROM_AGGREGATOR = "UNMAP_POS_FROM_AGGREGATOR";
    const CREATE_POS = "CREATE_POS";
    const REASSIGN_POS = "REASSIGN_POS";

    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "serialNumber",
        searchFilterValue: "",
    });
    const [posDevicesModalType, setPosDevicesModalType] = useState("");
    const [posDevicesModalDetails, setPosDevicesModalDetails] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [unmapConfirmationModal, setUnmapConfirmationModal] = useState({
        open: false,
        type: "",
    });
    const [selected, setSelected] = useState([]);
    const [uploadedSelectedDevice, setUploadedSelectedDevice] = useState([]);
    const [activeBtn, setActiveBtn] = useState("all");

    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const [posDevicesParams, setPosDevicesParams] = useState({
        page: 1,
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { data: posDevices, isLoading: posDevicesIsLoading } = useGetPosQuery();

    const [triggerGetPos, { data: lazyQueryGetPosData, isLoading: lazyQueryGetPosIsLoading }] =
        useLazyGetPosQuery(lazyQueryOptions);

    const [
        triggerUnmapAggregatorPos,
        {
            isLoading: unmapAggregatorPosIsLoading,
            isSuccess: unmapAggregatorPosIsSuccess,
            isError: unmapAggregatorPosIsError,
            error: unmapAggregatorPosError,
        },
    ] = useUnmapAggregatorPOSMutation();

    const [
        triggerUnmapAgentPos,
        {
            isLoading: unmapAgentPosIsLoading,
            isSuccess: unmapAgentPosIsSuccess,
            isError: unmapAgentPosIsError,
            error: unmapAgentPosError,
        },
    ] = useUnmapAgentPOSMutation();

    function generateTableMenuItems(row) {
        let tableMenuItems = [
            {
                name: "View POS History",
                onClick: (row) => {
                    setPosDevicesModalType(VIEW_POS_HISTORY);
                    setPosDevicesModalDetails(row);
                },
            },
            {
                name: "View POS Details",
                onClick: (row) => {
                    setPosDevicesModalType(VIEW_POS_DETAILS);
                    setPosDevicesModalDetails(row);
                },
            },
            {
                name: "Reassign POS",
                onClick: (row) => {
                    setPosDevicesModalType(REASSIGN_POS);
                    setPosDevicesModalDetails(row);
                }
            },
            {
                name: "Unmap POS from aggregator",
                onClick: (row) => {
                    setPosDevicesModalType(UNMAP_POS_FROM_AGGREGATOR);
                    setPosDevicesModalDetails(row);
                },
            },
        ];
        switch (row?.status) {
            case "ASSIGNED":
                tableMenuItems.push({
                    name: "Unmap POS from agent",
                    onClick: (row) => {
                        setPosDevicesModalType(UNMAP_POS);
                        setPosDevicesModalDetails(row);
                    },
                });
                break;
            default:
                break;
        }
        return tableMenuItems;
    }

    useEffect(() => {
        if (unmapAgentPosIsSuccess) {
            setUnmapConfirmationModal({
                open: false,
                type: "",
            });
            setOpenSnackbar({
                open: true,
                severity: "success",
                message: "POS Unmapped Successfully",
            });
        } else if (unmapAgentPosIsError) {
            const errorKey = Object.keys(unmapAgentPosError?.data.errors)[0];
            const errorMessage = unmapAgentPosError?.data.errors[errorKey];
            setOpenSnackbar({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
        setUnmapConfirmationModal({
            open: false,
            type: "",
        });
    }, [unmapAgentPosIsSuccess, unmapAgentPosIsError]);

    useEffect(() => {
        if (unmapAggregatorPosIsSuccess) {
            setOpenSnackbar({
                open: true,
                severity: "success",
                message: `You have successfully unmapped POS from aggregator`,
            });
        } else if (unmapAggregatorPosIsError) {
            const errorKey = Object.keys(unmapAggregatorPosError?.data.errors)[0];
            console.log("ERRORS :", unmapAggregatorPosError);
            const errorMessage = unmapAggregatorPosError?.data.errors[errorKey];
            setOpenSnackbar({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
        setUnmapConfirmationModal({
            open: false,
            type: "",
        });
    }, [unmapAggregatorPosIsSuccess, unmapAggregatorPosIsError]);

    const searchFilterOptions = {
        ...(searchFilters?.searchFilterBy === "serialNumber" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                serialNumber: searchFilters?.searchFilterValue,
            }),
        ...(searchFilters?.searchFilterBy === "terminalId" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                terminalId: searchFilters?.searchFilterValue,
            }),
        ...(searchFilters?.searchFilterBy === "aggregatorName" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                aggregatorName: searchFilters?.searchFilterValue,
            }),
        ...(searchFilters?.searchFilterBy === "agentAccountNumber" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                agentAccountNumber: searchFilters?.searchFilterValue,
            }),
        ...(searchFilters?.searchFilterBy === "merchantName" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                merchantName: searchFilters?.searchFilterValue,
            }),
    };

    const openSelectedDevicesModal = () => {
        setOpenModal(true);
        setUploadedSelectedDevice(selected);
    };

    const handleClearSelectedPosDevices = () => {
        setSelected([]);
    };

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
        <Main>
            <AssignMultipleDevicesToAgg
                open={openModal}
                handleClose={() => setOpenModal(false)}
                setSelected={setUploadedSelectedDevice}
                selected={uploadedSelectedDevice}
                clearSelectedPosDevices={handleClearSelectedPosDevices}
            />
            {posDevicesModalDetails && (
                <POSHistoryModal
                    open={posDevicesModalType === VIEW_POS_HISTORY}
                    handleClose={() => setPosDevicesModalType("")}
                    posDevicesModalDetails={posDevicesModalType === VIEW_POS_HISTORY ? posDevicesModalDetails : null}
                />
            )}
            {posDevicesModalDetails && (
                <POSHistoryModal
                    open={posDevicesModalType === VIEW_POS_DETAILS}
                    handleClose={() => setPosDevicesModalType("")}
                    posDevicesModalDetails={posDevicesModalType === VIEW_POS_DETAILS ? posDevicesModalDetails : null}
                />
            )}

            {posDevicesModalDetails && (
                <UnmapPOSModal
                    open={posDevicesModalType === UNMAP_POS_FROM_AGGREGATOR || posDevicesModalType === UNMAP_POS}
                    HeaderText={`
					${posDevicesModalType === UNMAP_POS_FROM_AGGREGATOR ? "Unmap POS from Aggregator" : "Unmap POS from Agent"}
					`}
                    RiderText={"Device Information"}
                    ConfirmationSerialNumberText={"POS Serial Number :"}
                    ConfirmationSerialNumber={posDevicesModalDetails.serialNumber}
                    ConfirmationTerminalIDText={"POS Terminal ID :"}
                    ConfirmationTerminalID={posDevicesModalDetails.terminalId}
                    ConfirmationMerchantNameText={"Merchant Name :"}
                    ConfirmationMerchantName={posDevicesModalDetails.institution}
                    confirmationText={"Unmap Device"}
                    handleClose={() => setPosDevicesModalType("")}
                    onClickConfirm={() => {
                        setUnmapConfirmationModal({
                            open: true,
                            type: posDevicesModalType,
                        });
                        setPosDevicesModalType("");
                    }}
                />
            )}

            <ConfirmationModal
                open={unmapConfirmationModal.open}
                HeaderText={`
					${unmapConfirmationModal.type === UNMAP_POS_FROM_AGGREGATOR ? "Unmap POS from Aggregator" : "Unmap POS from Agent"}
					`}
                ConfirmationBody={`Are you sure you want to unmap this device from this ${
                    unmapConfirmationModal.type === UNMAP_POS_FROM_AGGREGATOR ? "Aggregator" : "Agent"
                } ?`}
                confirmationText={"Yes, Unmap"}
                handleClose={() =>
                    setUnmapConfirmationModal({
                        open: false,
                        type: "",
                    })
                }
                loading={
                    unmapConfirmationModal.type === UNMAP_POS_FROM_AGGREGATOR
                        ? unmapAggregatorPosIsLoading
                        : unmapAgentPosIsLoading
                }
                onClickConfirm={() => {
                    if (unmapConfirmationModal.type === UNMAP_POS_FROM_AGGREGATOR) {
                        triggerUnmapAggregatorPos({
                            id: posDevicesModalDetails?.id,
                        });
                    } else if (unmapConfirmationModal.type === UNMAP_POS) {
                        triggerUnmapAgentPos({
                            id: posDevicesModalDetails?.id,
                        });
                    }
                }}
            />

            <SnackBar
                openSnackbar={openSnackbar?.open}
                handleClose={handleSnackbarClose}
                snackbarSeverity={openSnackbar?.severity}
                SnackbarMessage={openSnackbar?.message}
            />

            <CreatePOS open={posDevicesModalType === CREATE_POS} setPosDevicesModalType={setPosDevicesModalType} />
            <ReassignPOSModal
                open={posDevicesModalType === REASSIGN_POS}
                posDeviceDetails={posDevicesModalDetails}
                setPosDevicesModalType={setPosDevicesModalType}
            />
            <Container>
                <Header>
                    <HeaderTitle>
                        <div>
                            <h1>POS </h1>
                            <p>
                                {lazyQueryGetPosData?.data?.totalElements
                                    ? lazyQueryGetPosData?.data?.totalElements
                                    : posDevices?.data?.totalElements}{" "}
                                POS Devices
                            </p>
                        </div>
                        <CreateAssignPOSContainer>
                            <CreatePosBtn onClick={() => setPosDevicesModalType(CREATE_POS)}>Create POS</CreatePosBtn>
                            <AssignMultipleDeviceBtn onClick={handleClick}>
                                <img src={mennIcon} alt="" />
                            </AssignMultipleDeviceBtn>
                        </CreateAssignPOSContainer>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            sx={{
                                "& ul": {
                                    margin: "0px",
                                    padding: "0px",
                                },
                            }}
                        >
                            <MenuItem
                                onClick={(e) => {
                                    openSelectedDevicesModal();
                                    setAnchorEl(null);
                                }}
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#474747",

                                    "&:hover": {
                                        backgroundColor: "#FFFAF6",
                                        color: "#933D0C",
                                    },
                                }}
                            >
                                Assign Multiple Devices
                            </MenuItem>
                        </Menu>
                    </HeaderTitle>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                searchInputValue={searchFilters.searchFilterValue}
                                options={{
                                    "Serial Number": "serialNumber",
                                    "Terminal ID": "terminalId",
                                    "Aggr. Name": "aggregatorName",
                                    "Agent Acc. No.": "agentAccountNumber",
                                    "Merchant Name": "merchantName",
                                }}
                                showClearSearch={searchFilters.searchFilterValue.length > 0 ? true : false}
                                selectOnChange={(e) => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterBy: e.target.value,
                                    });
                                }}
                                searchInputOnChange={(e) => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: e.target.value,
                                    });
                                }}
                                onClickSearchIcon={() => {
                                    triggerGetPos({
                                        ...posDevicesParams,
                                        ...searchFilterOptions,
                                    });
                                }}
                                onClickClear={() => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: "",
                                    });
                                    triggerGetPos({
                                        ...posDevicesParams,
                                        serialNumber: "",
                                        terminalId: "",
                                        merchantName: "",
                                        agentAccountNumber: "",
                                        aggregatorName: "",
                                    });
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <QueryButton
                                text={"Assigned"}
                                active={activeBtn === "assigned"}
                                onChange={() => {
                                    setActiveBtn("assigned");
                                    triggerGetPos({
                                        ...posDevicesParams,
                                        status: "ASSIGNED",
                                    });
                                }}
                            />
                            <QueryButton
                                text={"Not assigned"}
                                active={activeBtn === "unassigned"}
                                onChange={() => {
                                    setActiveBtn("unassigned");
                                    triggerGetPos({
                                        ...posDevicesParams,
                                        status: "NOT_ASSIGNED",
                                    });
                                }}
                            />
                            <QueryButton
                                text={"All"}
                                active={activeBtn === "all"}
                                onChange={() => {
                                    setActiveBtn("all");
                                    triggerGetPos({
                                        ...posDevicesParams,
                                        status: "",
                                    });
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <CheckboxTable
                    heightOfTable={"420px"}
                    columns={TableColumns}
                    rows={
                        lazyQueryGetPosData?.data?.content
                            ? lazyQueryGetPosData.data.content
                            : posDevices?.data?.content
                    }
                    currentPageNumber={posDevicesParams.page}
                    onClickPrevPage={() => {
                        if (posDevicesParams.page === 1) return;
                        setPosDevicesParams({
                            ...posDevicesParams,
                            page: posDevicesParams.page - 1,
                        });
                        triggerGetPos({
                            ...posDevicesParams,
                            page: posDevicesParams.page - 1,
                            ...searchFilterOptions,
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryGetPosData?.data?.totalPages
                            ? lazyQueryGetPosData.data.totalPages
                            : posDevices?.data?.totalPages;

                        if (posDevicesParams.page === lastPageNumber) return;
                        setPosDevicesParams({
                            ...posDevicesParams,
                            page: posDevicesParams.page + 1,
                        });
                        triggerGetPos({
                            ...posDevicesParams,
                            page: posDevicesParams.page + 1,
                            ...searchFilterOptions,
                        });
                    }}
                    firstPage={posDevicesParams.page === 1}
                    menuItems={generateTableMenuItems}
                    lastPage={
                        lazyQueryGetPosData?.data?.totalPages
                            ? lazyQueryGetPosData.data.totalPages === posDevicesParams.page
                            : posDevices?.data?.totalPages === posDevicesParams.page
                    }
                    loading={posDevicesIsLoading || lazyQueryGetPosIsLoading}
                    totalPages={
                        lazyQueryGetPosData?.data?.totalPages !== undefined
                            ? lazyQueryGetPosData.data.totalPages
                            : posDevices?.data?.totalPages
                    }
                    setSelected={setSelected}
                    selected={selected}
                />
            </Container>
        </Main>
    );
};

export default PosDevices;
