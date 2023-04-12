import Main from "../../components/common/Main.js";
import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
    DownloadButtonContainer,
    
} from "./POSDevicesStyles.js";
import { useState } from "react";
import CreatePosButton from "../../components/posDevices/CreatePosButton.js";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar.js";
import PosDevicesTable from "../../components/posDevices/PosDevicesTable.js";


const TableColumns = [
    { id: "serialNumber", label: "SERIAL NO." },
    { id: "terminalId", label: "TERMINAL NO." },
    { id: "merchantName", label: "Merchant Name" },
    { id: "agentName", label: "Agent Name" },
    {
        id: "agentAccount",
        label: "Agent ACC. No.",
    
    },
    { id: "aggregatorname", label: "Aggregator Name" },
    { id: "state", label: "POS State" }
];

const PosDevices = () => {
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "serialNumber",
        searchFilterValue: "",
    });

    const [posTransactionParams, setPosTransactionParams] = useState({
        page: 1,
    });

  return (
   <Main>
    <Container>
        
    <Header>
                        <HeaderTitle>
                            <div>
                               <h1>POS </h1>
                            <p>
                                1000 POS Devices
                            </p>  
                            </div>
                            <DownloadButtonContainer>
                            <CreatePosButton 
                              text={"Create POS"}
                              />
                        </DownloadButtonContainer> 
                        </HeaderTitle>
                        
                        <SelectSearchFilter>
                            <SelectSearchBar>
                                <TableSelectSearchBar
                                    searchInputValue={searchFilters.searchFilterValue}
                                    // placeholder={'Click "Search Icon" to search'}
                                    options={{
                                        "Serial Number": "serialNumber",
                                        "Agent Acc. No.": "terminalId",
                                        "Aggr. Acc. No..": "terminalId",
                                        "Terminal ID.": "terminalId",
                                        "Merchant Name.": "terminalId",
                                        "POS State": "state",
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
                                        // triggerPosTransactions({
                                        //     ...posTransactionParams,
                                        //     ...searchFilterOptions,
                                        // });
                                    }}
                                    onClickClear={() => {
                                        setSearchFilters({
                                            ...searchFilters,
                                            searchFilterValue: "",
                                        });
                                        // triggerPosTransactions({
                                        //     ...posTransactionParams,
                                        //     serialNumber: "",
                                        //     terminalId: "",
                                        //     transactionReference: "",
                                        // });
                                    }}
                                />
                            </SelectSearchBar>
                            {/* <SearchFilters> */}
                                {/* <DateRangePicker
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
                                /> */}
                                {/* <SelectCommon
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
                                /> */}
                                {/* <SelectCommon
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
                                /> */}
                            {/* </SearchFilters> */}
                        </SelectSearchFilter>
                    </Header>

                    < PosDevicesTable  
                     heightOfTable={"420px"}
                     columns={TableColumns}
                    //  rows={
                    //      lazyQueryPosTransactions?.data?.content
                    //          ? lazyQueryPosTransactions.data.content
                    //          : posTransactions?.data?.content
                    //  }
                    //  currentPageNumber={posTransactionParams.page}
                    //  onClickPrevPage={() => {
                    //      if (posTransactionParams.page === 1) return;
                    //      setPosTransactionParams({
                    //          ...posTransactionParams,
                    //          page: posTransactionParams.page - 1,
                    //      });
                    //      triggerPosTransactions({
                    //          ...posTransactionParams,
                    //          page: posTransactionParams.page - 1,
                    //          ...searchFilterOptions,
                    //      });

                    //      if (posTransactionParams?.startDate && posTransactionParams?.endDate) {
                    //          triggerDownloadTransactions({
                    //              ...posTransactionParams,
                    //              page: posTransactionParams.page - 1,
                    //              ...searchFilterOptions,
                    //          });
                    //      }
                    //  }}
                    //  onClickNextPage={() => {
                    //      const lastPageNumber = lazyQueryPosTransactions?.data?.totalPages
                    //          ? lazyQueryPosTransactions.data.totalPages
                    //          : posTransactions?.data?.totalPages;

                    //      if (posTransactionParams.page === lastPageNumber) return;
                    //      setPosTransactionParams({
                    //          ...posTransactionParams,
                    //          page: posTransactionParams.page + 1,
                    //      });
                    //      triggerPosTransactions({
                    //          ...posTransactionParams,
                    //          page: posTransactionParams.page + 1,
                    //          ...searchFilterOptions,
                    //      });

                    //      if (posTransactionParams?.startDate && posTransactionParams?.endDate) {
                    //          triggerDownloadTransactions({
                    //              ...posTransactionParams,
                    //              page: posTransactionParams.page + 1,
                    //              ...searchFilterOptions,
                    //          });
                    //      }
                    //  }}
                    //  firstPage={posTransactionParams.page === 1}
                    //  menuItems={tableMenuItems}
                    //  lastPage={
                    //      lazyQueryPosTransactions?.data?.totalPages
                    //          ? lazyQueryPosTransactions.data.totalPages ===
                    //            posTransactionParams.page
                    //          : posTransactions?.data?.totalPages === posTransactionParams.page
                    //  }
                    //  loading={getQueryIsLoading || lazyQueryPosTransactionsIsLoading}
                    //  totalPages={
                    //      lazyQueryPosTransactions?.data?.totalPages !== undefined
                    //          ? lazyQueryPosTransactions.data.totalPages
                    //          : posTransactions?.data?.totalPages
                    //  }
                    //  showEmptyBody={posTransactions?.data?.totalElements === 0}
                    />
    </Container>
   </Main>
  )
}

export default PosDevices