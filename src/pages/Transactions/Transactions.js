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
} from "../../app/services/transaction";
import { useDispatch } from "react-redux";
import { setTransactionServices } from "../../features/transaction/transactionSlice";
import { useEffect } from "react";

const TableColumns = [
    { id: "name", label: "Agent Name" },
    { id: "code", label: "Account Number" },
    {
        id: "population",
        label: "Amount",
    },
    {
        id: "size",
        label: "Platform Ref.",
    },
    {
        id: "size",
        label: "TransactionRef",
    },
    {
        id: "size",
        label: "Date and Time",
    },
    {
        id: "density",
        label: "Fee",
    },
    {
        id: "density",
        label: "Type",
    },
    {
        id: "density",
        label: "Status",
    },
];

function Transactions() {
    const { data: transactionServices } = useGetAllTransactionServicesQuery();
    const { data: transactions } = useGetAllTransactionsQuery();

    const dispatch = useDispatch();

    useEffect(() => {
        if (transactionServices) {
            dispatch(setTransactionServices(transactionServices));
        }
    }, [transactionServices, dispatch]);

    const transactionServicesArray = transactionServices?.data.reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});

    console.log(transactions);

    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Transactions</h1>
                        <p>1200 Transactions</p>
                    </HeaderTitle>
                    <DownloadButtonContainer>
                        <ButtonCommon text={"Download Report"} />
                    </DownloadButtonContainer>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                options={{
                                    "Account Number": "accountNumner",
                                    "Transaction Ref.": "transactionRef",
                                    "Platform Ref.": "platformRef",
                                }}
                                placeholder={'Click "Enter" to search'}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <DateRangePicker
                                appearance="default"
                                placeholder="Date Range"
                                style={{ width: 230 }}
                                readOnly={false}
                            />

                            <SelectCommon options={transactionServicesArray} />
                            <SelectCommon
                                options={{
                                    Reverse: "Reverse",
                                    Successful: "Successful",
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <Table columns={TableColumns} />
            </Container>
        </Main>
    );
}

export default Transactions;
