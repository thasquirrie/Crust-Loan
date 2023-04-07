import React, { useState } from "react";
import Main from "../../components/common/Main";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
} from "./POSRequestStyles";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { DateRangePicker } from "rsuite";
import SelectCommon from "../../components/common/SelectCommon";
import { useGetAllPosRequestsQuery, useLazyGetAllPosRequestsQuery } from "../../app/services/pos";
import Table from "../../components/common/Table";
import MapPosRequestToAggregator from "../../components/posRequests/MapPosRequestToAggregator";
import ApprovePosRequest from "../../components/posRequests/ApprovePosRequest";
import DeclinePosRequest from "../../components/posRequests/DeclinePosRequest";
import AssignPosToAgent from "../../components/posRequests/AssignPosToAgent";
import states from "../../utils/states";

const TableColumns = [
    { id: "agentName", label: "Agent Name" },
    { id: "businessName", label: "Bus. Name" },
    { id: "businessAccountNumber", label: "Account No." },
    { id: "requestType", label: "Request Type" },
    { id: "businessAddress", label: "Bus. Address" },
    { id: "businessState", label: "Bus. State" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Date of Request" },
];

function POSRequest() {
    const MAP_POS_REQUEST_TO_AGGREGATOR = "MAP_POS_REQUEST_TO_AGGREGATOR";
    const APPROVE_POS_REQUEST = "APPROVE_POS_REQUEST";
    const DECLINE_POS_REQUEST = "DECLINE_POS_REQUEST";
    const ASSIGN_POS_TO_AGENT = "ASSIGN_POS_TO_AGENT";

    const [posRequestParams, setPosRequestParams] = useState({
        page: 1,
    });
    const [posModalType, setPosModalType] = useState("");
    const [posRequestDetails, setPosRequestDetails] = useState(null);

    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const { data: posRequests, isLoading: getQueryIsLoading } = useGetAllPosRequestsQuery();
    const [
        triggerPosRequests,
        { data: lazyQueryPosRequests, isLoading: lazyQueryPosRequestsIsLoading },
    ] = useLazyGetAllPosRequestsQuery(lazyQueryOptions);

    function generateTableMenuItems(row) {
        let tableMenuItems = [];
        switch (row?.status) {
            case "PENDING":
                tableMenuItems.push({
                    name: "Map POS Request to Aggregator",
                    onClick: () => {
                        setPosModalType(MAP_POS_REQUEST_TO_AGGREGATOR);
                        setPosRequestDetails(row);
                    },
                });
                break;
            case "APPROVED":
                tableMenuItems.push({
                    name: "Assign POS to Agent",
                    onClick: () => {
                        setPosModalType(ASSIGN_POS_TO_AGENT);
                        setPosRequestDetails(row);
                    },
                });
                break;
            case "DECLINED":
                // tableMenuItems.push({
                //     name: "Send Reapply Notification",
                //     onClick: (id) => console.log(id),
                // });
                break;
            case "MAPPED":
                tableMenuItems.push(
                    {
                        name: "Approve Request",
                        onClick: () => {
                            setPosModalType(APPROVE_POS_REQUEST);
                            setPosRequestDetails(row);
                        },
                    },
                    {
                        name: "Decline Request",
                        onClick: () => {
                            setPosModalType(DECLINE_POS_REQUEST);
                            setPosRequestDetails(row);
                        },
                    }
                );
                break;
            default:
                break;
        }

        return tableMenuItems;
    }

    return (
        <Main>
            <MapPosRequestToAggregator
                open={posModalType === MAP_POS_REQUEST_TO_AGGREGATOR}
                setPosModalType={setPosModalType}
                posRequestDetails={posRequestDetails}
            />
            <ApprovePosRequest
                open={posModalType === APPROVE_POS_REQUEST}
                posRequestDetails={posRequestDetails}
                setPosModalType={setPosModalType}
            />
            <DeclinePosRequest
                open={posModalType === DECLINE_POS_REQUEST}
                posRequestDetails={posRequestDetails}
                setPosModalType={setPosModalType}
            />
            <AssignPosToAgent
                open={posModalType === ASSIGN_POS_TO_AGENT}
                posRequestDetails={posRequestDetails}
                setPosModalType={setPosModalType}
            />
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>POS Requests</h1>
                        <p>{posRequests?.data?.totalElements} Requests</p>
                    </HeaderTitle>
                    <br />
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                searchInputValue={searchFilters.searchFilterValue}
                                placeholder={'Click "Search Icon" to search'}
                                options={{
                                    "Account  Number": "accountNumber",
                                }}
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
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        businessAccountNumber:
                                            searchFilters.searchFilterBy === "accountNumber"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                    });
                                }}
                                showClearSearch={
                                    searchFilters.searchFilterValue.length > 0 ? true : false
                                }
                                onClickClear={() => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: "",
                                    });
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        accountNumber: "",
                                    });
                                }}
                                onChange={(value) => {
                                    const startDate =
                                        value && value[0]?.toISOString()?.split("T")[0];
                                    const endDate = value && value[1]?.toISOString()?.split("T")[0];

                                    if (startDate && endDate) {
                                        setPosRequestParams({
                                            ...posRequestParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                        triggerPosRequests({
                                            ...posRequestParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                    }
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <DateRangePicker
                                maxDate={new Date()}
                                appearance="default"
                                placeholder="Date Range"
                                style={{ width: 230 }}
                                readOnly={false}
                                onClean={() => {
                                    delete posRequestParams.startDate;
                                    delete posRequestParams.endDate;
                                    triggerPosRequests(posRequestParams);
                                }}
                                onChange={(value) => {
                                    const startDate =
                                        value && value[0]?.toISOString()?.split("T")[0];
                                    const endDate = value && value[1]?.toISOString()?.split("T")[0];

                                    if (startDate && endDate) {
                                        setPosRequestParams({
                                            ...posRequestParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                        triggerPosRequests({
                                            ...posRequestParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                    }
                                }}
                            />
                            <SelectCommon
                                options={{
                                    "": "Request Type",
                                    "OUTRIGHT SALE": "Outright Sale",
                                    "CAUTION DEPOSIT": "Caution Deposit",
                                    "LEASE TO OWN": "Lease to Own",
                                }}
                                value={posRequestParams?.requestType}
                                onChange={(e) => {
                                    setPosRequestParams({
                                        ...posRequestParams,
                                        requestType: e.target.value,
                                    });
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        requestType: e.target.value,
                                    });
                                }}
                            />
                            <SelectCommon
                                options={states}
                                value={posRequestParams?.businessState}
                                onChange={(e) => {
                                    setPosRequestParams({
                                        ...posRequestParams,
                                        businessState: e.target.value,
                                    });
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        businessState: e.target.value,
                                    });
                                }}
                            />
                            <SelectCommon
                                options={{
                                    "": "Status",
                                    PENDING: "Pending",
                                    APPROVED: "Approved",
                                    MAPPED: "Mapped",
                                    DECLINED: "Declined",
                                }}
                                value={posRequestParams?.requestStatus}
                                onChange={(e) => {
                                    setPosRequestParams({
                                        ...posRequestParams,
                                        status: e.target.value,
                                    });
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        status: e.target.value,
                                    });
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <Table
                    columns={TableColumns}
                    rows={
                        lazyQueryPosRequests?.data?.content
                            ? lazyQueryPosRequests.data.content
                            : posRequests?.data?.content
                    }
                    currentPageNumber={posRequestParams.page}
                    menuItems={generateTableMenuItems}
                    onClickPrevPage={() => {
                        if (posRequestParams.page === 1) return;
                        setPosRequestParams({
                            ...posRequestParams,
                            page: posRequestParams.page - 1,
                        });
                        triggerPosRequests({
                            ...posRequestParams,
                            page: posRequestParams.page - 1,
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryPosRequests?.data?.totalPages
                            ? lazyQueryPosRequests.data.totalPages
                            : posRequests?.data?.totalPages;

                        if (posRequestParams.page === lastPageNumber) return;
                        setPosRequestParams({
                            ...posRequestParams,
                            page: posRequestParams.page + 1,
                        });
                        triggerPosRequests({
                            ...posRequestParams,
                            page: posRequestParams.page + 1,
                        });
                    }}
                    firstPage={posRequestParams.page === 1}
                    lastPage={
                        lazyQueryPosRequests?.data?.totalPages
                            ? lazyQueryPosRequests.data.totalPages === posRequestParams.page
                            : posRequests?.data?.totalPages === posRequestParams.page
                    }
                    loading={getQueryIsLoading || lazyQueryPosRequestsIsLoading}
                    totalPages={
                        lazyQueryPosRequests?.data?.totalPages
                            ? lazyQueryPosRequests.data.totalPages
                            : posRequests?.data?.totalPages
                    }
                />
            </Container>
        </Main>
    );
}

export default POSRequest;
