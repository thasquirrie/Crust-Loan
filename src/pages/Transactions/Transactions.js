import {
    Container,
    DownloadButtonContainer,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
} from "./TransactionsStyles";
import Main from "../../components/common/Main";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import SelectCommon from "../../components/common/SelectCommon";
import { DateRangePicker } from "rsuite";
import Table from "../../components/common/Table";
import {
    useGetAllTransactionServicesQuery,
    useGetAllTransactionsQuery,
    useLazyDownloadTransactionRecordsQuery,
    useLazyGetAllTransactionsQuery,
    useReverseTransactionMutation,
} from "../../app/services/transaction";
import { forwardRef, useEffect, useState } from "react";
import ButtonCommonLink from "../../components/common/ButtonCommonLink";
import TransactionModalDetails from "../../components/transactions/TransactionDetailsModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import StatusTag from "../../components/common/StatusTag";
import formattedAmount from "../../utils/formatCurrency";

const TableColumns = [
    { id: "accountName", label: "Agent Name" },
    { id: "accountNumber", label: "Account Number" },
    { id: "amount", label: "Amount", format: (value) => formattedAmount(value) },
    { id: "platformTransactionRef", label: "Platform Ref." },
    { id: "crustTransactionRef", label: "TransactionRef" },
    { id: "serviceProvider", label: "Processing Provider" },
    { id: "createdAt", label: "Date and Time" },
    { id: "fee", label: "Fee" },
    {
        id: "aggregatorCommission",
        label: "Aggregator Commision",
        format: (value) => formattedAmount(value),
    },
    { id: "transactionType", label: "Type" },
    {
        id: "transactionStatus",
        label: "Status",
        format: (value) => {
            switch (value) {
                case "SUCCESSFUL":
                    return <StatusTag backgroundColor="#06C281" text={value} />;
                case "FAILED":
                    return <StatusTag backgroundColor="#FF4747" text={value} />;
                case "PENDING":
                    return <StatusTag backgroundColor="#FE822B" text={value} />;
                case "REVERSED":
                    return <StatusTag backgroundColor="#077E8C" text={value} />;
                default:
                    return <StatusTag backgroundColor="#F9DEA9" text={value} />;
            }
        },
    },
];

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Transactions() {
    const [transactionModalDetails, setTransactionModalDetails] = useState(null);
    const [openReverseTransactionModal, setOpenReverseTransactionModal] = useState(false);
    const [openTransactionDetailsModal, setOpenTransactionDetailsModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const [transactionParams, setAllTransactionParams] = useState({
        page: 1,
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const { data: transactionServices } = useGetAllTransactionServicesQuery();
    const { data: transactions, isLoading: getQueryIsLoading } = useGetAllTransactionsQuery();

    const [
        triggerGetAllTransactions,
        { data: lazyQueryTransactions, isLoading: lazyQueryIsLoading },
    ] = useLazyGetAllTransactionsQuery(lazyQueryOptions);

    const [
        triggerDownloadTransactions,
        {
            data: lazyQueryDownloadTransactions,
            isLoading: lazyQueryDownloadIsLoading,
            isError: lazyQueryDownloadIsError,
        },
    ] = useLazyDownloadTransactionRecordsQuery(lazyQueryOptions);

    const [
        reverseTransaction,
        {
            isLoading: reverseTransactionIsLoading,
            isSuccess: reverseTransactionIsSuccess,
            error: reverseTransactionError,
        },
    ] = useReverseTransactionMutation();

    useEffect(() => {
        if (reverseTransactionIsSuccess) {
            setOpenSnackbar({
                open: true,
                severity: "success",
                message: "Transaction reversed successfully",
            });
        } else if (reverseTransactionError) {
            const errorKey = Object.keys(reverseTransactionError?.data.errors)[0];
            const errorMessage = reverseTransactionError?.data.errors[errorKey];
            setOpenSnackbar({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
        setOpenReverseTransactionModal(false);
    }, [reverseTransactionIsSuccess, reverseTransactionError]);

    const transactionServicesArray = transactionServices?.data.reduce((acc, curr) => {
        acc[""] = "All";
        acc[curr] = curr;
        return acc;
    }, {});

    const tableMenuItems = [
        {
            name: "View more",
            onClick: (id) => {
                setTransactionModalDetails(id);
                setOpenTransactionDetailsModal(true);
            },
        },
    ];

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
            <Snackbar
                open={openSnackbar?.open}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
            >
                <Alert onClose={handleSnackbarClose} severity={"error"} sx={{ width: "100%" }}>
                    {openSnackbar?.message}
                </Alert>
            </Snackbar>
            {transactionModalDetails && (
                <TransactionModalDetails
                    open={openTransactionDetailsModal}
                    handleClose={() => setTransactionModalDetails(null)}
                    transaction={transactionModalDetails}
                    onClickReverseTransaction={() => {
                        setOpenReverseTransactionModal(true);
                        setOpenTransactionDetailsModal(false);
                    }}
                />
            )}
            <ConfirmationModal
                open={openReverseTransactionModal}
                HeaderText={"Reverse Transaction"}
                ConfirmationBody={"Are you sure you want to reverse this transaction?"}
                confirmationText={"Yes, Reverse"}
                handleClose={() => setOpenReverseTransactionModal(false)}
                loading={reverseTransactionIsLoading}
                onClickConfirm={() => {
                    reverseTransaction(transactionModalDetails.id);
                }}
            />
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Transactions</h1>
                        <p>
                            {lazyQueryTransactions?.data?.totalElements !== undefined
                                ? lazyQueryTransactions?.data?.totalElements
                                : transactions?.data?.totalElements}{" "}
                            Transactions
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
                                !transactionParams?.startDate ||
                                !transactionParams?.endDate
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
                                    "Account Number": "accountNumber",
                                    "Transaction Ref.": "transactionRef",
                                    "Platform Ref.": "platformRef",
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
                                    triggerGetAllTransactions({
                                        ...transactionParams,
                                        ...(searchFilters?.searchFilterBy === "accountNumber" && {
                                            accountNumber: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters?.searchFilterBy === "platformRef" && {
                                            platformRef: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters?.searchFilterBy === "transactionRef" && {
                                            transactionRef: searchFilters?.searchFilterValue,
                                        }),
                                    });

                                    if (
                                        transactionParams?.startDate &&
                                        transactionParams?.endDate
                                    ) {
                                        triggerDownloadTransactions({
                                            ...transactionParams,
                                            ...(searchFilters?.searchFilterBy ===
                                                "accountNumber" && {
                                                accountNumber: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                                platformRef: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy ===
                                                "transactionRef" && {
                                                transactionRef: searchFilters?.searchFilterValue,
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
                                    triggerGetAllTransactions({
                                        ...transactionParams,
                                        accountNumber: "",
                                        platformRef: "",
                                        transactionRef: "",
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
                                    delete transactionParams.startDate;
                                    delete transactionParams.endDate;
                                    triggerGetAllTransactions(transactionParams);
                                }}
                                onChange={(value) => {
                                    const startDate =
                                        value && value[0]?.toISOString()?.split("T")[0];
                                    const endDate = value && value[1]?.toISOString()?.split("T")[0];

                                    if (startDate && endDate) {
                                        setAllTransactionParams({
                                            ...transactionParams,
                                            startDate,
                                            endDate,
                                        });
                                        triggerGetAllTransactions({
                                            ...transactionParams,
                                            startDate,
                                            endDate: endDate,
                                            ...(searchFilters?.searchFilterBy ===
                                                "accountNumber" && {
                                                accountNumber: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                                platformRef: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy ===
                                                "transactionRef" && {
                                                transactionRef: searchFilters?.searchFilterValue,
                                            }),
                                        });

                                        triggerDownloadTransactions({
                                            ...transactionParams,
                                            startDate,
                                            endDate: endDate,
                                            ...(searchFilters?.searchFilterBy ===
                                                "accountNumber" && {
                                                accountNumber: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                                platformRef: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy ===
                                                "transactionRef" && {
                                                transactionRef: searchFilters?.searchFilterValue,
                                            }),
                                        });
                                    }
                                }}
                            />
                            <SelectCommon
                                options={transactionServicesArray}
                                value={transactionParams?.transactionType}
                                onChange={(e) => {
                                    setAllTransactionParams({
                                        ...transactionParams,
                                        transactionType: e.target.value,
                                    });
                                    triggerGetAllTransactions({
                                        ...transactionParams,
                                        transactionType: e.target.value,
                                        ...(searchFilters?.searchFilterBy === "accountNumber" && {
                                            accountNumber: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters?.searchFilterBy === "platformRef" && {
                                            platformRef: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters?.searchFilterBy === "transactionRef" && {
                                            transactionRef: searchFilters?.searchFilterValue,
                                        }),
                                    });

                                    if (
                                        transactionParams?.startDate &&
                                        transactionParams?.endDate
                                    ) {
                                        triggerDownloadTransactions({
                                            ...transactionParams,
                                            transactionType: e.target.value,
                                            ...(searchFilters?.searchFilterBy ===
                                                "accountNumber" && {
                                                accountNumber: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                                platformRef: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy ===
                                                "transactionRef" && {
                                                transactionRef: searchFilters?.searchFilterValue,
                                            }),
                                        });
                                    }
                                }}
                            />
                            <SelectCommon
                                options={{
                                    "": "All",
                                    SUCCESSFUL: "Successful",
                                    REVERSED: "Reversed",
                                    FAILED: "Failed",
                                    PENDING: "Pending",
                                }}
                                value={transactionParams?.transactionStatus}
                                onChange={(e) => {
                                    setAllTransactionParams({
                                        ...transactionParams,
                                        transactionStatus: e.target.value,
                                    });
                                    triggerGetAllTransactions({
                                        ...transactionParams,
                                        transactionStatus: e.target.value,
                                        ...(searchFilters?.searchFilterBy === "accountNumber" && {
                                            accountNumber: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters?.searchFilterBy === "platformRef" && {
                                            platformRef: searchFilters?.searchFilterValue,
                                        }),
                                        ...(searchFilters?.searchFilterBy === "transactionRef" && {
                                            transactionRef: searchFilters?.searchFilterValue,
                                        }),
                                    });

                                    if (
                                        transactionParams?.startDate &&
                                        transactionParams?.endDate
                                    ) {
                                        triggerDownloadTransactions({
                                            ...transactionParams,
                                            transactionStatus: e.target.value,
                                            ...(searchFilters?.searchFilterBy ===
                                                "accountNumber" && {
                                                accountNumber: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                                platformRef: searchFilters?.searchFilterValue,
                                            }),
                                            ...(searchFilters?.searchFilterBy ===
                                                "transactionRef" && {
                                                transactionRef: searchFilters?.searchFilterValue,
                                            }),
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
                        lazyQueryTransactions?.data?.content
                            ? lazyQueryTransactions.data.content
                            : transactions?.data?.content
                    }
                    loading={getQueryIsLoading || lazyQueryIsLoading}
                    currentPageNumber={transactionParams.page}
                    onClickPrevPage={() => {
                        if (transactionParams.page === 1) return;
                        setAllTransactionParams({
                            ...transactionParams,
                            page: transactionParams.page - 1,
                        });
                        triggerGetAllTransactions({
                            ...transactionParams,
                            page: transactionParams.page - 1,
                            ...(searchFilters?.searchFilterBy === "accountNumber" && {
                                accountNumber: searchFilters?.searchFilterValue,
                            }),
                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                platformRef: searchFilters?.searchFilterValue,
                            }),
                            ...(searchFilters?.searchFilterBy === "transactionRef" && {
                                transactionRef: searchFilters?.searchFilterValue,
                            }),
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryTransactions?.data?.totalPages
                            ? lazyQueryTransactions.data.totalPages
                            : transactions?.data?.totalPages;

                        if (transactionParams.page === lastPageNumber) return;
                        setAllTransactionParams({
                            ...transactionParams,
                            page: transactionParams.page + 1,
                        });
                        triggerGetAllTransactions({
                            ...transactionParams,
                            page: transactionParams.page + 1,
                            ...(searchFilters?.searchFilterBy === "accountNumber" && {
                                accountNumber: searchFilters?.searchFilterValue,
                            }),
                            ...(searchFilters?.searchFilterBy === "platformRef" && {
                                platformRef: searchFilters?.searchFilterValue,
                            }),
                            ...(searchFilters?.searchFilterBy === "transactionRef" && {
                                transactionRef: searchFilters?.searchFilterValue,
                            }),
                        });
                    }}
                    menuItems={tableMenuItems}
                    totalPages={
                        lazyQueryTransactions?.data?.totalPages !== undefined
                            ? lazyQueryTransactions.data.totalPages
                            : transactions?.data?.totalPages
                    }
                    firstPage={transactionParams.page === 1}
                    lastPage={
                        transactionParams.page ===
                        (lazyQueryTransactions?.data?.totalPages
                            ? lazyQueryTransactions.data.totalPages
                            : transactions?.data?.totalPages)
                    }
                />
            </Container>
        </Main>
    );
}

export default Transactions;
