import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
} from "./NIPTransactionsStyles";
import Main from "../../components/common/Main";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { DateRangePicker } from "rsuite";
import Table from "../../components/common/Table";
import {
    useGetAllNIPTransactionsQuery,
    useLazyGetAllNIPTransactionsQuery,
    useRetryNIPTransactionMutation,
} from "../../app/services/transaction";
import { forwardRef, useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import StatusTag from "../../components/common/StatusTag";
import formattedAmount from "../../utils/formatCurrency";
import NIPTransactionModalDetails from "../../components/transactions/NIPTransactionDetailsModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const TableColumns = [
    { id: "beneficiaryAccountName", label: "Beneneficiary Acc. Name" },
    { id: "beneficiaryAccountNumber", label: "Beneneficiary Acc. Number" },
    { id: "originatorAccountName", label: "Originator Acc. Name" },
    { id: "originatorAccountNumber", label: "Originator Acc. Number" },
    { id: "amount", label: "Amount", format: (value) => formattedAmount(value) },
    { id: "transactionReference", label: "Transaction Ref." },
    { id: "sessionId", label: "session Id" },
    { id: "paymentReference", label: "Payment Ref." },
    { id: "createdAt", label: "Date and Time" },
    {
        id: "status",
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

function NIPTransactions() {
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

    const { data: transactions, isLoading: getQueryIsLoading } = useGetAllNIPTransactionsQuery();

    const [
        triggerGetAllTransactions,
        { data: lazyQueryTransactions, isLoading: lazyQueryIsLoading },
    ] = useLazyGetAllNIPTransactionsQuery(lazyQueryOptions);

    const [
        reverseTransaction,
        {
            isLoading: reverseTransactionIsLoading,
            isSuccess: reverseTransactionIsSuccess,
            error: reverseTransactionError,
        },
    ] = useRetryNIPTransactionMutation();

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
                <NIPTransactionModalDetails
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
                HeaderText={"Retry NIP Transaction"}
                ConfirmationBody={"Are you sure you want to retry this transaction?"}
                confirmationText={"Yes, Retry"}
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
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                searchInputValue={searchFilters.searchFilterValue}
                                options={{
                                    "Session ID": "sessionId",
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
                                        ...(searchFilters?.searchFilterBy === "sessionId" && {
                                            sessionId: searchFilters?.searchFilterValue,
                                        }),
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
                                    }
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <Table
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

export default NIPTransactions;
