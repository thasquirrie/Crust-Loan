import {
    Container,
    Header,
    HeaderTitle,
    HeaderContainer,
    CreateBtnContainer,
    SelectSearchFilter,
    SelectSearchBar,
} from "./AggregatorManagementStyles";
import Main from "../../components/common/Main";
import { useState } from "react";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import { useGetAggregatorQuery, useLazyGetAggregatorQuery } from "../../app/services/pos";
import Table from "../../components/common/Table";
import CreateAggrgatorModal from "../../components/posAggregators/CreateAggregatorModal";

const TableColumns = [
    { id: "aggregatorName", label: "Aggregator Name" },
    { id: "aggregatorAccountNumber", label: "Aggregator Account Number" },
    { id: "aggregatorPhoneNumber", label: "Aggregator Phone Number" },
    { id: "aggregatorState", label: "Aggregator State" },
    {
        id: "numberOfPosDevices",
        label: "NO. Of POS Devices",
    },
];

const AggregatorManagement = () => {
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });
    const [openCreateAggregatorModal, setOpenCreateAggregatorModal] = useState(false);

    const [aggregatorSearchParams, setAggregatorSearchParams] = useState({
        page: 1,
    });

    const searchFilterOptions = {
        ...(searchFilters?.searchFilterBy === "accountNumber" &&
            searchFilters?.searchFilterValue?.length > 0 && {
                accountNumber: searchFilters?.searchFilterValue,
            }),
    };

    const { data: aggregatorList, isLoading: aggregatorIsLoading } = useGetAggregatorQuery();

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };
    const [
        triggerAggregators,
        { data: lazyQueryAggregators, isLoading: lazyQueryAggregatorsIsLoading },
    ] = useLazyGetAggregatorQuery(lazyQueryOptions);

    const tableMenuItems = [
        {
            name: "View Summary",
            onClick: (id) => {
                console.log("open menu");
            },
        },
    ];

    return (
        <Main>
            <CreateAggrgatorModal
                handleClose={() => setOpenCreateAggregatorModal(false)}
                open={openCreateAggregatorModal}
            />
            <Container>
                <Header>
                    <HeaderContainer>
                        <HeaderTitle>
                            <h1>Aggregators</h1>
                            <p>
                                {lazyQueryAggregators?.data?.totalElements ??
                                    aggregatorList?.data?.totalElements}{" "}
                                Aggregators
                            </p>
                        </HeaderTitle>
                        <CreateBtnContainer onClick={() => setOpenCreateAggregatorModal(true)}>
                            <h1>Create Aggregator</h1>
                        </CreateBtnContainer>
                    </HeaderContainer>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                searchInputValue={searchFilters.searchFilterValue}
                                placeholder={'Click "Search Icon" to search'}
                                options={{
                                    "Account Number": "accountNumber",
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
                                    triggerAggregators({
                                        ...aggregatorSearchParams,
                                        ...searchFilterOptions,
                                    });
                                }}
                                onClickClear={() => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: "",
                                    });
                                    triggerAggregators({
                                        ...aggregatorSearchParams,
                                        accountNumber: "",
                                    });
                                }}
                            />
                        </SelectSearchBar>
                    </SelectSearchFilter>
                </Header>
                <Table
                    heightOfTable={"420px"}
                    columns={TableColumns}
                    rows={
                        lazyQueryAggregators?.data?.content
                            ? lazyQueryAggregators.data.content
                            : aggregatorList?.data?.content
                    }
                    loading={aggregatorIsLoading || lazyQueryAggregatorsIsLoading}
                    totalPages={
                        lazyQueryAggregators?.data?.totalPages !== undefined
                            ? lazyQueryAggregators.data.totalPages
                            : aggregatorList?.data?.totalPages
                    }
                    currentPageNumber={aggregatorSearchParams.page}
                    onClickPrevPage={() => {
                        if (aggregatorSearchParams.page === 1) return;
                        setAggregatorSearchParams({
                            ...aggregatorSearchParams,
                            page: aggregatorSearchParams.page - 1,
                        });
                        triggerAggregators({
                            ...aggregatorSearchParams,
                            page: aggregatorSearchParams.page - 1,
                            ...searchFilterOptions,
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryAggregators?.data?.totalPages
                            ? lazyQueryAggregators.data.totalPages
                            : aggregatorList?.data?.totalPages;

                        if (aggregatorSearchParams.page === lastPageNumber) return;
                        setAggregatorSearchParams({
                            ...aggregatorSearchParams,
                            page: aggregatorSearchParams.page + 1,
                        });
                        triggerAggregators({
                            ...aggregatorSearchParams,
                            page: aggregatorSearchParams.page + 1,
                            ...searchFilterOptions,
                        });
                    }}
                    firstPage={aggregatorSearchParams.page === 1}
                    menuItems={tableMenuItems}
                />
            </Container>
        </Main>
    );
};

export default AggregatorManagement;
