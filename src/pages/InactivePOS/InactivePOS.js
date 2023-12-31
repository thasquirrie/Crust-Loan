import React, { useState } from "react";
import Main from "../../components/common/Main";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
    DownloadButtonContainer,
} from "./InactivePOSStyles";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { DateRangePicker } from "rsuite";
import {
    useLazyGetInactivePOSActivityQuery,
    useGetInactivePOSActivityQuery,
    useLazyDownloadInactivePosActivityRecordsQuery,
    useGetAggregatorQuery,
} from "../../app/services/pos";
import Table from "../../components/common/Table";
import ButtonCommonLink from "../../components/common/ButtonCommonLink";
import { lazyQueryOptions } from "../../utils/queryOptions";
import SelectCommon from "../../components/common/SelectCommon";

const TableColumns = [
    { id: "serialNumber", label: "SERIAL NO." },
    { id: "terminalId", label: "TERMINAL NO." },
    { id: "agentName", label: "AGENT NAME" },
    { id: "agentAccountNumber", label: "AGENT ACC. NO." },
    { id: "aggregatorName", label: "AGG. NAME" },
    { id: "aggregatorAccountNumber", label: "AGG. ACC. NO." },
];

function InactivePOS() {
    const [posActivityParams, setPosActivityParams] = useState({
        page: 1,
    });
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const { data: posActivity, isLoading: getQueryIsLoading } = useGetInactivePOSActivityQuery();
    const [
        triggerPosActivity,
        { data: lazyQueryPosActivity, isLoading: lazyQueryPosActivityIsLoading },
    ] = useLazyGetInactivePOSActivityQuery(lazyQueryOptions);

    const [
        triggerDownloadPosActivity,
        {
            data: lazyQueryDownloadPosActivity,
            isLoading: lazyQueryDownloadIsLoading,
            isError: lazyQueryDownloadIsError,
        },
    ] = useLazyDownloadInactivePosActivityRecordsQuery(lazyQueryOptions);

    const { data: aggregatorList } = useGetAggregatorQuery();

    const aggregatorNameList = aggregatorList?.data?.content?.reduce((acc, aggregator) => {
        acc[""] = "Select Aggregator";
        acc[aggregator.id] = aggregator.aggregatorName;
        return acc;
    }, {});

    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Inactive POS</h1>
                        <p>{posActivity?.data?.totalElements} total POS</p>
                    </HeaderTitle>
                    <DownloadButtonContainer>
                        <ButtonCommonLink
                            text={"Download Report"}
                            href={lazyQueryDownloadPosActivity?.data}
                            disabled={
                                lazyQueryDownloadIsLoading ||
                                lazyQueryDownloadIsError ||
                                !lazyQueryDownloadPosActivity?.data ||
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
                                        ...(searchFilters.searchFilterBy ===
                                            "agentAccountNumber" && {
                                            agentAccountNumber: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters.searchFilterBy === "serialNumber" && {
                                            serialNumber: searchFilters.searchFilterValue,
                                        }),
                                        ...(searchFilters.searchFilterBy === "terminalId" && {
                                            terminalId: searchFilters.searchFilterValue,
                                        }),
                                    });

                                    if (
                                        posActivityParams?.startDate &&
                                        posActivityParams?.endDate
                                    ) {
                                        triggerDownloadPosActivity({
                                            ...posActivityParams,
                                            ...(searchFilters.searchFilterBy ===
                                                "agentAccountNumber" && {
                                                agentAccountNumber:
                                                    searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters.searchFilterBy === "serialNumber" && {
                                                serialNumber: searchFilters.searchFilterValue,
                                            }),
                                            ...(searchFilters.searchFilterBy === "terminalId" && {
                                                terminalId: searchFilters.searchFilterValue,
                                            }),
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
                                    });
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <SelectCommon
                                options={aggregatorNameList}
                                value={posActivityParams?.aggregatorId || ""}
                                onChange={(e) => {
                                    setPosActivityParams({
                                        ...posActivityParams,
                                        aggregatorId: e.target.value,
                                    });
                                    triggerPosActivity({
                                        ...posActivityParams,
                                        aggregatorId: e.target.value,
                                    });

                                    if (
                                        posActivityParams?.startDate &&
                                        posActivityParams?.endDate
                                    ) {
                                        triggerDownloadPosActivity({
                                            ...posActivityParams,
                                            aggregatorId: e.target.value,
                                        });
                                    }
                                }}
                            />
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
                                            ...(searchFilters.searchFilterBy ===
                                                "agentAccountNumber" && {
                                                agentAccountNumber:
                                                    searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters.searchFilterBy === "serialNumber" && {
                                                serialNumber: searchFilters.searchFilterValue,
                                            }),
                                            ...(searchFilters.searchFilterBy === "terminalId" && {
                                                terminalId: searchFilters.searchFilterValue,
                                            }),
                                        });
                                    }
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <Table
                    columns={TableColumns}
                    heightOfTable={"410px"}
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

export default InactivePOS;
