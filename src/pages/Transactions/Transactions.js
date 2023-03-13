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

function Transactions() {
    return (
        <Main>
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Transactions</h1>
                        <p>1200 Transactions</p>
                    </HeaderTitle>
                    <DownloadButtonContainer>
                        <ButtonCommon text={"Download"} />
                    </DownloadButtonContainer>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                options={{
                                    "Account Number": "accountNumner",
                                    "Transaction Ref.": "transactionRef",
                                    "Platform Ref.": "platformRef",
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
                                    "Inter Bank": "InterBank",
                                    Local: "Locsl",
                                }}
                            />
                            <SelectCommon
                                options={{
                                    Reverse: "Reverse",
                                    Successful: "Successful",
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
            </Container>
        </Main>
    );
}

export default Transactions;
