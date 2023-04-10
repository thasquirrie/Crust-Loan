import React from "react";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
    DownloadButtonContainer,
} from "./POSTMSTransactionStyles";
import Main from "../../components/common/Main";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { DateRangePicker } from "rsuite";
import SelectCommon from "../../components/common/SelectCommon";
import { useState } from "react";
import Table from "../../components/common/Table";
import {
    useGetAllPosTransactionsQuery,
    useLazyGetAllPosTransactionsQuery,
} from "../../app/services/pos";
import PosTmsTransactionDetailsModal from "../../components/pos/PosTmsTransactionDetailsModal";
import { useLazyDownloadPosTransactionQuery } from "../../app/services/pos";
import { PosTmsStatusCodes } from "../../utils/posTmsStatus";
import ButtonCommonLink from "../../components/common/ButtonCommonLink";
// import StatusTag from "../../components/common/StatusTag";

const TableColumns = [
    { id: "serialNumber", label: "SERIAL NO." },
    { id: "terminalId", label: "TERMINAL NO." },
    { id: "transactionReference", label: "REF NO." },
    { id: "processor", label: "CARD PROCESSOR" },
    {
        id: "amount",
        label: "AMOUNT",
        format: (amount) => {
            let kobo = amount / 100;
            const formattedAmount = new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
            }).format(kobo);

            return formattedAmount;
        },
    },
    { id: "createdAt", label: "DATE AND TIME" },
    { id: "cardType", label: "CARD TYPE" },
    {
        id: "responseCode",
        label: "STATUS",
        format: (status) => {
            return PosTmsStatusCodes[status];
        },
    },
    { id: "responseCode", label: "STATUS CODE" },
];

const PosTransaction = () => {
    const [posTransactionModalDetails, setPosTransactionModalDetails] = useState(null);
    const [openTransactionDetailsModal, setOpenTransactionDetailsModal] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "serialNumber",
        searchFilterValue: "",
    });

    const [posTransactionParams, setPosTransactionParams] = useState({
        page: 1,
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const { data: posTransactions, isLoading: getQueryIsLoading } =
        useGetAllPosTransactionsQuery(posTransactionParams);

    const [
        triggerPosTransactions,
        { data: lazyQueryPosTransactions, isLoading: lazyQueryPosTransactionsIsLoading },
    ] = useLazyGetAllPosTransactionsQuery(lazyQueryOptions);

    const [
        triggerDownloadTransactions,
        {
            data: lazyQueryDownloadTransactions,
            isLoading: lazyQueryDownloadIsLoading,
            isError: lazyQueryDownloadIsError,
        },
    ] = useLazyDownloadPosTransactionQuery(lazyQueryOptions);

    const tableMenuItems = [
        {
            name: "View more",
            onClick: (id) => {
                setPosTransactionModalDetails(id);
                setOpenTransactionDetailsModal(true);
            },
        },
    ];

    const searchFilterOptions = {
        ...(searchFilters?.searchFilterBy === "serialNumber" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                serialNumber: searchFilters?.searchFilterValue,
            }),
        ...(searchFilters?.searchFilterBy === "terminalId" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                terminalId: searchFilters?.searchFilterValue,
            }),
        ...(searchFilters?.searchFilterBy === "transactionReference" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                transactionReference: searchFilters?.searchFilterValue,
            }),
    };

    return (
        <>
            <Main>
                {posTransactionModalDetails && (
                    <PosTmsTransactionDetailsModal
                        open={openTransactionDetailsModal}
                        handleClose={() => setPosTransactionModalDetails(null)}
                        transaction={posTransactionModalDetails}
                    />
                )}
                <Container>
                    <Header>
                        <HeaderTitle>
                            <h1>POS Transactions</h1>
                            <p>
                                {lazyQueryPosTransactions?.data?.totalElements
                                    ? lazyQueryPosTransactions?.data?.totalElements
                                    : posTransactions?.data?.totalElements}{" "}
                                Total Transactions
                            </p>
                        </HeaderTitle>
                        <DownloadButtonContainer>
                            <ButtonCommonLink
                                text={"Download Report"}
                                href={lazyQueryDownloadTransactions?.data}
                                disabled={
                                    lazyQueryDownloadIsLoading ||
                                    lazyQueryDownloadIsError ||
                                    !lazyQueryDownloadTransactions?.data ||
                                    !posTransactionParams?.startDate ||
                                    !posTransactionParams?.endDate
                                }
                                isLoading={lazyQueryDownloadIsLoading}
                                download={true}
                            />
                        </DownloadButtonContainer>
                        <SelectSearchFilter>
                            <SelectSearchBar>
                                <TableSelectSearchBar
                                    searchInputValue={searchFilters.searchFilterValue}
                                    placeholder={'Click "Search Icon" to search'}
                                    options={{
                                        "Serial Number": "serialNumber",
                                        TerminalId: "terminalId",
                                        "Reference No": "transactionReference",
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
                                        triggerPosTransactions({
                                            ...posTransactionParams,
                                            ...searchFilterOptions,
                                        });
                                    }}
                                    onClickClear={() => {
                                        setSearchFilters({
                                            ...searchFilters,
                                            searchFilterValue: "",
                                        });
                                        triggerPosTransactions({
                                            ...posTransactionParams,
                                            serialNumber: "",
                                            terminalId: "",
                                            transactionReference: "",
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
                                        const {
                                            startDate,
                                            endDate,
                                            ...restOfPosTransactionParams
                                        } = posTransactionParams;
                                        setPosTransactionParams(restOfPosTransactionParams);
                                        triggerPosTransactions({
                                            ...restOfPosTransactionParams,
                                            ...searchFilterOptions,
                                        });
                                    }}
                                    onChange={(value) => {
                                        const startDate =
                                            value && value[0]?.toISOString()?.split("T")[0];
                                        const endDate =
                                            value && value[1]?.toISOString()?.split("T")[0];

                                        if (startDate && endDate) {
                                            setPosTransactionParams({
                                                ...posTransactionParams,
                                                startDate,
                                                endDate,
                                            });
                                            triggerPosTransactions({
                                                ...posTransactionParams,
                                                startDate,
                                                endDate,
                                                ...searchFilterOptions,
                                            });
                                            triggerDownloadTransactions({
                                                ...posTransactionParams,
                                                startDate,
                                                endDate,
                                                ...searchFilterOptions,
                                            });
                                        }
                                    }}
                                />
                                <SelectCommon
                                    options={{
                                        "": "Card Processor",
                                        interswitch: "interswitch",
                                        unifiedpayment: "unifiedpayment",
                                    }}
                                    value={posTransactionParams?.requestType}
                                    onChange={(e) => {
                                        setPosTransactionParams({
                                            ...posTransactionParams,
                                            processor: e.target.value,
                                        });
                                        triggerPosTransactions({
                                            ...posTransactionParams,
                                            ...searchFilterOptions,
                                            processor: e.target.value,
                                        });

                                        if (
                                            posTransactionParams?.startDate &&
                                            posTransactionParams?.endDate
                                        ) {
                                            triggerDownloadTransactions({
                                                ...posTransactionParams,
                                                ...searchFilterOptions,
                                                processor: e.target.value,
                                            });
                                        }
                                    }}
                                />
                                <SelectCommon
                                    options={{
                                        "": "CardType",
                                        MasterCard: "MasterCard",
                                        Visa: "Visa",
                                        Verve: "Verve",
                                    }}
                                    value={posTransactionParams?.state}
                                    onChange={(e) => {
                                        setPosTransactionParams({
                                            ...posTransactionParams,
                                            cardType: e.target.value,
                                        });
                                        triggerPosTransactions({
                                            ...posTransactionParams,
                                            ...searchFilterOptions,
                                            cardType: e.target.value,
                                        });

                                        if (
                                            posTransactionParams?.startDate &&
                                            posTransactionParams?.endDate
                                        ) {
                                            triggerDownloadTransactions({
                                                ...posTransactionParams,
                                                ...searchFilterOptions,
                                                cardType: e.target.value,
                                            });
                                        }
                                    }}
                                />
                            </SearchFilters>
                        </SelectSearchFilter>
                    </Header>
                    <Table
                        heightOfTable={"420px"}
                        columns={TableColumns}
                        rows={
                            lazyQueryPosTransactions?.data?.content
                                ? lazyQueryPosTransactions.data.content
                                : posTransactions?.data?.content
                        }
                        currentPageNumber={posTransactionParams.page}
                        onClickPrevPage={() => {
                            if (posTransactionParams.page === 1) return;
                            setPosTransactionParams({
                                ...posTransactionParams,
                                page: posTransactionParams.page - 1,
                            });
                            triggerPosTransactions({
                                ...posTransactionParams,
                                page: posTransactionParams.page - 1,
                                ...searchFilterOptions,
                            });

                            if (posTransactionParams?.startDate && posTransactionParams?.endDate) {
                                triggerDownloadTransactions({
                                    ...posTransactionParams,
                                    page: posTransactionParams.page - 1,
                                    ...searchFilterOptions,
                                });
                            }
                        }}
                        onClickNextPage={() => {
                            const lastPageNumber = lazyQueryPosTransactions?.data?.totalPages
                                ? lazyQueryPosTransactions.data.totalPages
                                : posTransactions?.data?.totalPages;

                            if (posTransactionParams.page === lastPageNumber) return;
                            setPosTransactionParams({
                                ...posTransactionParams,
                                page: posTransactionParams.page + 1,
                            });
                            triggerPosTransactions({
                                ...posTransactionParams,
                                page: posTransactionParams.page + 1,
                                ...searchFilterOptions,
                            });

                            if (posTransactionParams?.startDate && posTransactionParams?.endDate) {
                                triggerDownloadTransactions({
                                    ...posTransactionParams,
                                    page: posTransactionParams.page + 1,
                                    ...searchFilterOptions,
                                });
                            }
                        }}
                        firstPage={posTransactionParams.page === 1}
                        menuItems={tableMenuItems}
                        lastPage={
                            lazyQueryPosTransactions?.data?.totalPages
                                ? lazyQueryPosTransactions.data.totalPages ===
                                  posTransactionParams.page
                                : posTransactions?.data?.totalPages === posTransactionParams.page
                        }
                        loading={getQueryIsLoading || lazyQueryPosTransactionsIsLoading}
                        totalPages={
                            lazyQueryPosTransactions?.data?.totalPages !== undefined
                                ? lazyQueryPosTransactions.data.totalPages
                                : posTransactions?.data?.totalPages
                        }
                        showEmptyBody={posTransactions?.data?.totalElements === 0}
                    />
                </Container>
            </Main>
        </>
    );
};

export default PosTransaction;
