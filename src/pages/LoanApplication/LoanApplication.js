import {
    Container,
    Header,
    HeaderTitle,
    SelectSearchBar,
    SelectSearchFilter,
} from "./LoanApplicationStyles";
import Main from "../../components/common/Main";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import Table from "../../components/common/Table";

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

function LoanApplication() {
    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Loan Application</h1>
                        <p>1200 Loan Applications</p>
                    </HeaderTitle>
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
                    </SelectSearchFilter>
                </Header>
                <Table columns={TableColumns} />
            </Container>
        </Main>
    );
}

export default LoanApplication;
