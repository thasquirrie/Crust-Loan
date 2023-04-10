import React, { useState } from "react";
import Main from "../../components/common/Main";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
} from "./POSTransactionActivityStyles";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { DateRangePicker } from "rsuite";
import SelectCommon from "../../components/common/SelectCommon";
import { useGetAllPosActivityQuery, useLazyGetAllPosActivityQuery } from "../../app/services/pos";
import Table from "../../components/common/Table";
import formattedAmount from "../../utils/formatCurrency";

const TableColumns = [
    { id: "serialNumber", label: "SERIAL NO." },
    { id: "terminalId", label: "TERMINAL NO." },
    { id: "agentName", label: "AGENT NAME" },
    { id: "agentAccountNumber", label: "AGENT ACC. NO." },
    { id: "aggregatorName", label: "AGG. NAME" },
    { id: "aggregatorAccountNumber", label: "AGG. ACC. NO." },
    { id: "withdrawAmount", label: "WITHDRAWAL AMOUNT", format: formattedAmount },
    { id: "numberOfWithdrawals", label: "WITHDRAWAL COUNT" },
    { id: "status", label: "STATUS" },
];

function POSTransactionActivity() {
    const [posActivityParams, setPosActivityParams] = useState({
        page: 1,
    });
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const { data: posActivity, isLoading: getQueryIsLoading } = useGetAllPosActivityQuery();
    const [
        triggerPosActivity,
        { data: lazyQueryPosActivity, isLoading: lazyQueryPosActivityIsLoading },
    ] = useLazyGetAllPosActivityQuery(lazyQueryOptions);

    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>POS Transactions Activity</h1>
                        {/* <p>{posActivity?.data?.totalElements} Requests</p> */}
                    </HeaderTitle>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                searchInputValue={searchFilters.searchFilterValue}
                                options={{
                                    "Serial Number": "serialNumber",
                                    "Ref. NO.": "referenceNumber",
                                    TerminalId: "terminalId",
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
                                placeholder={'Click "Search Icon" to search'}
                                onClickSearchIcon={() => {
                                    triggerPosActivity({
                                        ...posActivityParams,
                                        serialNumber:
                                            searchFilters.searchFilterBy === "serialNumber"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                        referenceNumber:
                                            searchFilters.searchFilterBy === "referenceNumber"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                        terminalId:
                                            searchFilters.searchFilterBy === "terminalId"
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
                                    triggerPosActivity({
                                        ...posActivityParams,
                                        serialNumber: "",
                                        referenceNumber: "",
                                        terminalId: "",
                                    });
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <DateRangePicker
                                appearance="default"
                                placeholder="Date Range"
                                style={{ width: 230 }}
                                readOnly={false}
                                onClean={() => {
                                    delete posActivityParams.startDate;
                                    delete posActivityParams.endDate;
                                    triggerPosActivity(posActivityParams);
                                }}
                                onChange={(value) => {
                                    const startDate =
                                        value && value[0]?.toISOString()?.split("T")[0];
                                    const endDate = value && value[1]?.toISOString()?.split("T")[0];

                                    if (startDate && endDate) {
                                        setPosActivityParams({
                                            ...posActivityParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                        triggerPosActivity({
                                            ...posActivityParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                    }
                                }}
                            />

                            <SelectCommon
                                options={{
                                    "": "All",
                                    SUCCESSFUL: "Successful",
                                    FAILED: "Failed",
                                }}
                                value={posActivityParams?.transactionStatus}
                                onChange={(e) => {
                                    setPosActivityParams({
                                        ...posActivityParams,
                                        status: e.target.value,
                                    });
                                    triggerPosActivity({
                                        ...posActivityParams,
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
                        lazyQueryPosActivity?.data?.content
                            ? lazyQueryPosActivity.data.content
                            : posActivity?.data?.content
                    }
                    currentPageNumber={posActivityParams.page}
                    onClickPrevPage={() => {
                        if (posActivityParams.page === 1) return;
                        setPosActivityParams({
                            ...posActivityParams,
                            page: posActivityParams.page - 1,
                        });
                        triggerPosActivity({
                            ...posActivityParams,
                            page: posActivityParams.page - 1,
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryPosActivity?.data?.totalPages
                            ? lazyQueryPosActivity.data.totalPages
                            : posActivity?.data?.totalPages;

                        if (posActivityParams.page === lastPageNumber) return;
                        setPosActivityParams({
                            ...posActivityParams,
                            page: posActivityParams.page + 1,
                        });
                        triggerPosActivity({
                            ...posActivityParams,
                            page: posActivityParams.page + 1,
                        });
                    }}
                    firstPage={posActivityParams.page === 1}
                    lastPage={
                        lazyQueryPosActivity?.data?.totalPages
                            ? lazyQueryPosActivity.data.totalPages === posActivityParams.page
                            : posActivity?.data?.totalPages === posActivityParams.page
                    }
                    loading={getQueryIsLoading || lazyQueryPosActivityIsLoading}
                    totalPages={
                        lazyQueryPosActivity?.data?.totalPages
                            ? lazyQueryPosActivity.data.totalPages
                            : posActivity?.data?.totalPages
                    }
                />
            </Container>
        </Main>
    );
}

export default POSTransactionActivity;
