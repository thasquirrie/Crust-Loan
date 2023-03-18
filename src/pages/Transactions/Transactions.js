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
import ButtonCommon from "../../components/common/ButtonCommon";
import SelectCommon from "../../components/common/SelectCommon";
import { DateRangePicker } from "rsuite";
import Table from "../../components/common/Table";
import {
    useGetAllTransactionServicesQuery,
    useGetAllTransactionsQuery,
    useLazyGetAllTransactionsQuery,
} from "../../app/services/transaction";
import { useDispatch } from "react-redux";
import { setTransactionServices } from "../../features/transaction/transactionSlice";
import { useEffect, useState } from "react";
import { setAllTransactions } from "../../features/transaction/transactionSlice";

const TableColumns = [
    { id: "accountName", label: "Agent Name" },
    { id: "accountNumber", label: "Account Number" },
    { id: "amount", label: "Amount" },
    { id: "platformTransactionRef", label: "Platform Ref." },
    { id: "crustTransactionRef", label: "TransactionRef" },
    { id: "createdAt", label: "Date and Time" },
    { id: "fee", label: "Fee" },
    { id: "transactionType", label: "Type" },
    { id: "transactionStatus", label: "Status" },
];

function Transactions() {
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const [transactionParams, setAllTransactionParams] = useState({
        page: 1,
        transactionType: "",
        transactionStatus: "",
        startDate: "",
        endDate: "",
    });

    const dispatch = useDispatch();

    const { data: transactionServices } = useGetAllTransactionServicesQuery();
    const {
        data: transactions,
        isLoading: getQueryIsLoading,
        isError: getQueryIsError,
        error: getQueryError,
    } = useGetAllTransactionsQuery();
    const [
        trigger,
        {
            data: lazyQueryTransactions,
            isLoading: lazyQueryIsLoading,
            isError: lazyQueryIsError,
            error: lazyQueryError,
        },
    ] = useLazyGetAllTransactionsQuery({
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    });

    useEffect(() => {
        if (transactionServices && transactions) {
            dispatch(setTransactionServices(transactionServices));
            dispatch(setAllTransactions(transactions));
        }
    }, [transactions, transactionServices, dispatch]);

    const transactionServicesArray = transactionServices?.data.reduce((acc, curr) => {
        acc[""] = "All";
        acc[curr] = curr;
        return acc;
    }, {});

    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Transactions</h1>
                        <p>{transactions?.data?.totalElements} Transactions</p>
                    </HeaderTitle>
                    <DownloadButtonContainer>
                        <ButtonCommon text={"Download Report"} />
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
                                onClickSearchIcon={() =>
                                    trigger({
                                        ...transactionParams,
                                        accountNumber:
                                            searchFilters.searchFilterBy === "accountNumber"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                        platformRef:
                                            searchFilters.searchFilterBy === "platformRef"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                        transactionRef:
                                            searchFilters.searchFilterBy === "transactionRef"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                    })
                                }
                                showClearSearch={
                                    searchFilters.searchFilterValue.length > 0 ? true : false
                                }
                                onClickClear={() => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: "",
                                    });
                                    trigger({
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
                                    trigger(transactionParams);
                                }}
                                onChange={(value) => {
                                    const startDate =
                                        value && value[0]?.toISOString()?.split("T")[0];
                                    const endDate = value && value[1]?.toISOString()?.split("T")[0];

                                    if (startDate && endDate) {
                                        setAllTransactionParams({
                                            ...transactionParams,
                                            startDate,
                                            endDate: endDate,
                                        });
                                        trigger({
                                            ...transactionParams,
                                            startDate,
                                            endDate: endDate,
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
                                    trigger({
                                        ...transactionParams,
                                        transactionType: e.target.value,
                                    });
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
                                    trigger({
                                        ...transactionParams,
                                        transactionStatus: e.target.value,
                                    });
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
                        trigger({
                            ...transactionParams,
                            page: transactionParams.page - 1,
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
                        trigger({
                            ...transactionParams,
                            page: transactionParams.page + 1,
                        });
                    }}
                />
            </Container>
        </Main>
    );
}

export default Transactions;
