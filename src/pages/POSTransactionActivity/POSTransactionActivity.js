import React, { useState } from "react";
import Main from "../../components/common/Main";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
    DownloadButtonContainer
} from "./POSTransactionActivityStyles";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { DateRangePicker } from "rsuite";
import { useGetAllPosActivityQuery, useLazyGetAllPosActivityQuery ,  useLazyDownloadPosActivityRecordsQuery} from "../../app/services/pos";
import Table from "../../components/common/Table";
import formattedAmount from "../../utils/formatCurrency";
import ButtonCommonLink from "../../components/common/ButtonCommonLink"
import SelectCommon from "../../components/common/SelectCommon";


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


    const [
      triggerDownloadPosActivity,
      {
        data: lazyQueryDownloadPosActivity,
        isLoading: lazyQueryDownloadIsLoading,
        isError: lazyQueryDownloadIsError,
      },
    ] = useLazyDownloadPosActivityRecordsQuery(lazyQueryOptions);

    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>POS Transactions Activity</h1>
                        {/* <p>{posActivity?.data?.totalElements} Requests</p> */}
                    </HeaderTitle>
                    <DownloadButtonContainer>
            <ButtonCommonLink
              text={'Download Report'}
               href={lazyQueryDownloadPosActivity?.data}
               disabled={
                   lazyQueryDownloadIsLoading ||
                   lazyQueryDownloadIsError ||
                   !lazyQueryDownloadPosActivity?.data 
                    ||
                   !posActivityParams?.startDate ||
                   !posActivityParams?.endDate
               }
               isLoading={lazyQueryDownloadIsLoading}
              download={true}
            />
          </DownloadButtonContainer>

                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                searchInputValue={searchFilters.searchFilterValue}
                                options={{
                                    "Agent Account Number": "agentAccountNumber",
                                    "Aggregator Account Number": "aggregatorAccountNumber",
                                    "Serial Number": "serialNumber",
                                    "Terminal Id": "terminalId",
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
                                            ...(searchFilters.searchFilterBy === "agentAccountNumber" && {
                                              agentAccountNumber: searchFilters?.searchFilterValue}),
                                            ...(searchFilters.searchFilterBy ===
                                            "aggregatorAccountNumber" && {
                                              aggregatorAccountNumber:searchFilters.searchFilterValue
                                            }),
                                            ...(searchFilters.searchFilterBy === "serialNumber" && {
                                              serialNumber: searchFilters.searchFilterValue}),
                                              ...(searchFilters.searchFilterBy === "terminalId" && {
                                                terminalId: searchFilters.searchFilterValue})
                                    });

                                    if(posActivityParams?.startDate && posActivityParams?.endDate){
                                      triggerDownloadPosActivity({
                                        ...posActivityParams,
                                        ...(searchFilters.searchFilterBy === "agentAccountNumber" && {
                                          agentAccountNumber: searchFilters?.searchFilterValue}),
                                        ...(searchFilters.searchFilterBy ===
                                        "aggregatorAccountNumber" && {
                                          aggregatorAccountNumber:searchFilters.searchFilterValue
                                        }),
                                        ...(searchFilters.searchFilterBy === "serialNumber" && {
                                          serialNumber: searchFilters.searchFilterValue}),
                                          ...(searchFilters.searchFilterBy === "terminalId" && {
                                            terminalId: searchFilters.searchFilterValue})
                                    });
                                    }
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
                                        agentAccountNumber: "",
                                        terminalId: "",
                                        aggregatorAccountNumber: ""
                                    });
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <DateRangePicker
                            placement="autoHorizontalStart"
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

                                        triggerDownloadPosActivity({
                                          ...posActivityParams,
                                          startDate,
                                          endDate: endDate,
                                          ...(searchFilters.searchFilterBy === "agentAccountNumber" && {
                                            agentAccountNumber: searchFilters?.searchFilterValue}),
                                          ...(searchFilters.searchFilterBy ===
                                          "aggregatorAccountNumber" && {
                                            aggregatorAccountNumber:searchFilters.searchFilterValue
                                          }),
                                          ...(searchFilters.searchFilterBy === "serialNumber" && {
                                            serialNumber: searchFilters.searchFilterValue}),
                                            ...(searchFilters.searchFilterBy === "terminalId" && {
                                              terminalId: searchFilters.searchFilterValue})
                                      });
                                    }
                                }}
                            />
                               <SelectCommon
                                options={{
                                    "": "All",
                                    active: "Active",
                                    inactive:"Inactive",
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
                                        ...(searchFilters.searchFilterBy === "agentAccountNumber" && {
                                            agentAccountNumber: searchFilters?.searchFilterValue}),
                                          ...(searchFilters.searchFilterBy ===
                                          "aggregatorAccountNumber" && {
                                            aggregatorAccountNumber:searchFilters.searchFilterValue
                                          }),
                                          ...(searchFilters.searchFilterBy === "serialNumber" && {
                                            serialNumber: searchFilters.searchFilterValue}),
                                            ...(searchFilters.searchFilterBy === "terminalId" && {
                                              terminalId: searchFilters.searchFilterValue})
                                      });
                                    

                                    if (
                                        posActivityParams?.startDate && posActivityParams?.endDate
                                    ) {
                                        triggerDownloadPosActivity({
                                            ...posActivityParams,
                                            status: e.target.value,
                                            ...(searchFilters.searchFilterBy === "agentAccountNumber" && {
                                                agentAccountNumber: searchFilters?.searchFilterValue}),
                                              ...(searchFilters.searchFilterBy ===
                                              "aggregatorAccountNumber" && {
                                                aggregatorAccountNumber:searchFilters.searchFilterValue
                                              }),
                                              ...(searchFilters.searchFilterBy === "serialNumber" && {
                                                serialNumber: searchFilters.searchFilterValue}),
                                                ...(searchFilters.searchFilterBy === "terminalId" && {
                                                  terminalId: searchFilters.searchFilterValue})
                                        });
                                    }
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
