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

const TableColumns = [
    { id: "agentName", label: "Agent Name" },
    { id: "businessName", label: "Bus. Name" },
    { id: "businessAccountNumber", label: "Bus. Acc. No." },
    { id: "requestType", label: "Request Type" },
    { id: "businessAddress", label: "Bus. Address" },
    { id: "businessState", label: "Bus. State" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Date of Request" },
];

function POSRequest() {
    const [posRequestParams, setPosRequestParams] = useState({
        page: 1,
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

    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>POS Requests</h1>
                        <p>{posRequests?.data?.totalElements} Requests</p>
                    </HeaderTitle>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                placeholder={'Click "Search Icon" to search'}
                                options={{
                                    "Agent  Name": "agent Name",
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <DateRangePicker
                                appearance="default"
                                placeholder="Date Range"
                                style={{ width: 230 }}
                                readOnly={false}
                            />
                            <SelectCommon
                                options={{
                                    " ": "Request Type",
                                    "Outright Sale": "outright Sale",
                                    "Caution Deposit": "caution Deposit",
                                    "Lease To Own": "Lease To Own",
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
                                options={{
                                    " ": "State",
                                }}
                                value={posRequestParams?.state}
                                onChange={(e) => {
                                    setPosRequestParams({
                                        ...posRequestParams,
                                        state: e.target.value,
                                    });
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        state: e.target.value,
                                    });
                                }}
                            />
                            <SelectCommon
                                options={{
                                    " ": "Request Status",
                                    Pending: "Pending",
                                    Approved: "Approved",
                                    Mapped: "Mapped",
                                    Declined: "Declined",
                                }}
                                value={posRequestParams?.requestStatus}
                                onChange={(e) => {
                                    setPosRequestParams({
                                        ...posRequestParams,
                                        requestStatus: e.target.value,
                                    });
                                    triggerPosRequests({
                                        ...posRequestParams,
                                        requestStatus: e.target.value,
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
