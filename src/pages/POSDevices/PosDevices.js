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
import { useState } from "react";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar.js";
import { useGetPosQuery, useLazyGetPosQuery } from "../../app/services/pos.js";
import { lazyQueryOptions } from "../../utils/queryOptions.js";
import QueryButton from "../../components/posDevices/QueryButton.js";
import AssignMultipleDevicesToAgg from "../../components/posDevices/AssignMultipleDevicesToAggModal.js";
import CheckboxTable from "../../components/common/TableWithCheckbox.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import mennIcon from "../../assets/common/Kebab.svg";

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
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "serialNumber",
        searchFilterValue: "",
    });
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState([]);
    const [uploadedSelectedDevice, setUploadedSelectedDevice] = useState([]);

    const [posDevicesParams, setPosDevicesParams] = useState({
        page: 1,
    });
    const [activeBtn, setActiveBtn] = useState("all");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const tableMenuItems = [
        {
            name: "View more",
            onClick: (id) => {
                // setPosTransactionModalDetails(id);
                // setOpenTransactionDetailsModal(true);
            },
        },
        {
            name: "Reassign POS",
            onClick: (id) => {
                // setPosTransactionModalDetails(id);
                // setOpenTransactionDetailsModal(true);
            },
        },
    ];

    const [
        triggerGetPos,
        {
            data: lazyQueryGetPosData,
            isLoading: lazyQueryGetPosIsLoading,
            // isSuccess: lazyQueryGetPosIsSuccess,
            fulfilledTimeStamp: lazyQueryGetPosFulfilledTimeStamp,
        },
    ] = useLazyGetPosQuery(lazyQueryOptions);
    const { data: posDevices, isLoading: posDevicesIsLoading } = useGetPosQuery();

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

    return (
        <Main>
            <AssignMultipleDevicesToAgg
                open={openModal}
                handleClose={() => setOpenModal(false)}
                setSelected={setUploadedSelectedDevice}
                selected={uploadedSelectedDevice}
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
                            <CreatePosBtn>Create POS</CreatePosBtn>
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
                                showClearSearch={
                                    searchFilters.searchFilterValue.length > 0 ? true : false
                                }
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
                    menuItems={tableMenuItems}
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
