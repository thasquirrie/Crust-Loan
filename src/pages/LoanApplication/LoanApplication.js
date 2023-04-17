import {
    Container,
    Header,
    HeaderTitle,
    SearchFilters,
    SelectSearchBar,
    SelectSearchFilter,
} from "./LoanApplicationStyles";
import Main from "../../components/common/Main";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import Table from "../../components/common/Table";
import { useMemo, useState } from "react";
import {
    useApproveLoanMutation,
    useDisapproveLoanMutation,
    useGetAllClusterQuery,
    useGetAllLoansQuery,
    useLazyGetAllLoansQuery,
} from "../../app/services/loan";
import formattedAmount from "../../utils/formatCurrency";
import SelectCommon from "../../components/common/SelectCommon";
import { DateRangePicker } from "rsuite";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import ViewAgentProfile from "../../components/agents/ViewAgentProfileModal";
import SnackBar from "../../components/common/SnackBar";
import ConfirmationModalWithReason from "../../components/common/ConfirmationModalWithReason";
import StatusTag from "../../components/common/StatusTag";
import LoanHistoryModal from "../../components/loan/LoanHistoryModal";
const moment = require("moment");

const TableColumns = [
    { id: "name", label: "Name of Agent" },
    { id: "accountNumber", label: "Account Number" },
    { id: "appliedAmount", label: "Loan Amount", format: formattedAmount },
    { id: "clusterName", label: "Cluster" },
    {
        id: "dateCreated",
        label: "Loan Tenure",
        format: (time) => {
            const convertedTime = moment(time).format("ddd Do MMM, YYYY");
            return convertedTime;
        },
    },
    // { id: "creditScore", label: "Credit Score" },
    {
        id: "loanStatus",
        label: "Status",
        format: (value) => {
            switch (value) {
                case "ACTIVE":
                    return <StatusTag backgroundColor="#06C281" text={value} />;
                case "DISAPPROVED":
                    return <StatusTag backgroundColor="#292929" text={value} />;
                case "APPROVED":
                    return <StatusTag backgroundColor="#06C281" text={value} />;
                case "PENDING":
                    return <StatusTag backgroundColor="#FE6901" text={value} />;
                case "OFFER_ACCEPTED":
                    return <StatusTag backgroundColor="#FE6901" text={value} />;
                case "OFFER_DECLINED":
                    return <StatusTag backgroundColor="#FFBF00" text={value} />;
                case "REPAID":
                    return <StatusTag backgroundColor="green" text={value} />;
                default:
                    return <StatusTag backgroundColor="#292929" text={value} />;
            }
        },
    },
];

function LoanApplication() {
    const APPROVED_LOAN = "APPROVED";
    const LOAN_HISTORY = "LOAN_HISTORY";
    const DISAPPROVED_LOAN = "DISAPPROVED";
    const VIEW_AGENT_DETAILS = "VIEW_AGENT_DETAILS";

    const [loanModalType, setLoanModalType] = useState("");
    const [agentDetails, setAgentDetails] = useState(null);
    const [disapproveLoanReason, setDisapproveLoanReason] = useState("");
    const [loanApplicationParams, setLoanApplicationParams] = useState({
        page: 1,
        size: 50,
    });

    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const { data: clusters } = useGetAllClusterQuery();

    const { data: loanApplications, isLoading: getQueryLoanApplicationIsLoading } =
        useGetAllLoansQuery();

    const [
        triggerLoanApplications,
        { data: lazyQueryLoanApplications, isLoading: lazyQueryLoanApplicationsIsLoading },
    ] = useLazyGetAllLoansQuery(lazyQueryOptions);

    const [
        triggerApproveLoanApplication,
        {
            isLoading: lazyApproveLoanApplicationIsLoading,
            isSuccess: lazyApproveLoanApplicationIsSuccess,
            IsError: lazyApproveLoanApplicationIsError,
            error: lazyApproveLoanApplicationError,
        },
    ] = useApproveLoanMutation(lazyQueryOptions);

    const [
        triggerDisapproveLoanApplication,
        {
            isLoading: lazyDisapproveLoanApplicationIsLoading,
            isSuccess: lazyDisapproveLoanApplicationIsSuccess,
            IsError: lazyDisapproveLoanApplicationIsError,
            error: lazyDisapproveLoanApplicationError,
        },
    ] = useDisapproveLoanMutation(lazyQueryOptions);

    const clusterNameList = clusters?.data?.reduce((acc, cluster) => {
        acc[""] = "Cluster";
        acc[cluster.name] = cluster.name;
        return acc;
    }, {});

    function generateTableMenuItems(row) {
        let tableMenuItems = [
            {
                name: "Loan History",
                onClick: () => {
                    setLoanModalType(LOAN_HISTORY);
                    setAgentDetails(row);
                },
            },
            {
                name: "View Agent Details",
                onClick: () => {
                    setLoanModalType(VIEW_AGENT_DETAILS);
                    setAgentDetails(row);
                },
            },
        ];
        switch (row?.loanStatus) {
            case "PENDING":
                tableMenuItems.push(
                    {
                        name: "Disaprove Loan Request",
                        onClick: () => {
                            setLoanModalType(DISAPPROVED_LOAN);
                            setAgentDetails(row);
                        },
                    },
                    {
                        name: "Approve Loan Request",
                        onClick: () => {
                            setLoanModalType(APPROVED_LOAN);
                            setAgentDetails(row);
                        },
                    }
                );
                break;
            default:
                break;
        }

        return tableMenuItems;
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarInfo({
            open: false,
            severity: snackbarInfo.severity,
            message: snackbarInfo.message,
        });
    };

    useMemo(() => {
        if (lazyApproveLoanApplicationIsSuccess) {
            triggerLoanApplications(loanApplicationParams);
            setLoanModalType("");

            setSnackbarInfo({
                open: true,
                severity: "success",
                message: "Loan Application Approved Successfully",
            });
        } else if (lazyApproveLoanApplicationIsError) {
            const errorKey = Object.keys(lazyApproveLoanApplicationError?.data.errors)[0];
            const errorMessage = lazyApproveLoanApplicationError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [lazyApproveLoanApplicationIsSuccess, lazyApproveLoanApplicationIsError]);

    useMemo(() => {
        if (lazyDisapproveLoanApplicationIsSuccess) {
            triggerLoanApplications(loanApplicationParams);
            setLoanModalType("");
            setDisapproveLoanReason("");

            setSnackbarInfo({
                open: true,
                severity: "success",
                message: "Loan Application Disapproved Successfully",
            });
        } else if (lazyDisapproveLoanApplicationIsError) {
            const errorKey = Object.keys(lazyDisapproveLoanApplicationError?.data.errors)[0];
            const errorMessage = lazyDisapproveLoanApplicationError?.data.errors[errorKey];

            setSnackbarInfo({
                open: true,
                message: errorMessage,
                severity: "error",
            });
        }
    }, [
        lazyDisapproveLoanApplicationIsSuccess,
        lazyDisapproveLoanApplicationIsError,
        lazyDisapproveLoanApplicationError,
        triggerLoanApplications,
        loanApplicationParams,
    ]);

    return (
        <Main>
            <ConfirmationModal
                open={loanModalType === APPROVED_LOAN}
                HeaderText="Approve Loan"
                ConfirmationBody="Are you sure you want to approve this loan?"
                handleClose={() => setLoanModalType("")}
                confirmationText="Yes, Approve"
                onClickConfirm={() => {
                    triggerApproveLoanApplication(agentDetails);
                }}
                loading={lazyApproveLoanApplicationIsLoading}
            />
            {agentDetails && (
                <ViewAgentProfile
                    open={loanModalType === VIEW_AGENT_DETAILS}
                    userId={loanModalType === VIEW_AGENT_DETAILS ? agentDetails?.userId : null}
                    handleClose={() => {
                        setLoanModalType("");
                        setAgentDetails(null);
                    }}
                />
            )}

            {agentDetails && (
                <LoanHistoryModal
                    open={loanModalType === LOAN_HISTORY}
                    agentDetails={loanModalType === LOAN_HISTORY ? agentDetails : null}
                    handleClose={() => {
                        setLoanModalType("");
                        setAgentDetails(null);
                    }}
                />
            )}

            <ConfirmationModalWithReason
                open={loanModalType === DISAPPROVED_LOAN}
                HeaderText="Disapprove Loan"
                handleClose={() => setLoanModalType("")}
                confirmationText={"Yes, Disapprove"}
                onChangeReasonBody={(e) => setDisapproveLoanReason(e.target.value)}
                reason={disapproveLoanReason}
                confirmationBody={
                    "Are you sure you want to disapprove this loan request? Please provide a reason for disapproving this loan."
                }
                disableConfirmButton={disapproveLoanReason.length === 0}
                onClickConfirmButton={() => {
                    triggerDisapproveLoanApplication({
                        loanId: agentDetails?.id,
                        reason: disapproveLoanReason,
                    });
                }}
                loading={lazyDisapproveLoanApplicationIsLoading}
            />
            <Container>
                <SnackBar
                    SnackbarMessage={snackbarInfo?.message}
                    openSnackbar={snackbarInfo.open}
                    handleClose={handleSnackbarClose}
                    snackbarSeverity={snackbarInfo.severity}
                />
                <Header>
                    <HeaderTitle>
                        <h1>Loan Application</h1>
                        <p>
                            {lazyQueryLoanApplications?.data?.totalElements !== undefined
                                ? lazyQueryLoanApplications?.data?.totalElements
                                : loanApplications?.data?.totalElements}{" "}
                            Loan Applications
                        </p>
                    </HeaderTitle>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                options={{
                                    "Account Number": "accountNumber",
                                }}
                                placeholder={'Click "Enter" to search'}
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
                                    triggerLoanApplications({
                                        ...loanApplicationParams,
                                        accountNumber:
                                            searchFilters.searchFilterBy === "accountNumber"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                        clusterName:
                                            searchFilters.searchFilterBy === "clusterName"
                                                ? searchFilters.searchFilterValue
                                                : "",
                                    });
                                }}
                                searchInputValue={searchFilters.searchFilterValue}
                                showClearSearch={
                                    searchFilters.searchFilterValue.length > 0 ? true : false
                                }
                                onClickClear={() => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: "",
                                    });
                                    triggerLoanApplications({
                                        ...loanApplicationParams,
                                        accountNumber: "",
                                        clusterName: "",
                                    });
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <DateRangePicker
                                appearance="default"
                                placeholder="Date Range"
                                readOnly={false}
                                onClean={() => {
                                    delete loanApplicationParams.fromDate;
                                    delete loanApplicationParams.toDate;
                                    triggerLoanApplications(loanApplicationParams);
                                }}
                                onChange={(value) => {
                                    const startDate =
                                        value && value[0]?.toISOString()?.split("T")[0];
                                    const endDate = value && value[1]?.toISOString()?.split("T")[0];

                                    if (startDate && endDate) {
                                        setLoanApplicationParams({
                                            ...loanApplicationParams,
                                            fromDate: startDate,
                                            toDate: endDate,
                                        });
                                        triggerLoanApplications({
                                            ...loanApplicationParams,
                                            fromDate: startDate,
                                            toDate: endDate,
                                        });
                                    }
                                }}
                            />
                            <SelectCommon
                                options={clusterNameList}
                                value={loanApplicationParams?.clusterName}
                                onChange={(e) => {
                                    setLoanApplicationParams({
                                        ...loanApplicationParams,
                                        clusterName: e.target.value,
                                    });
                                    triggerLoanApplications({
                                        ...loanApplicationParams,
                                        clusterName: e.target.value,
                                    });
                                }}
                            />
                            <SelectCommon
                                options={{
                                    "": "Status",
                                    APPROVED: "APPROVED",
                                    DISAPPROVED: "DISAPPROVED",
                                    PENDING: "PENDING",
                                    OFFER_ACCEPTED: "OFFER_ACCEPTED",
                                    OFFER_DECLINED: "OFFER_DECLINED",
                                    ACTIVE: "ACTIVE",
                                    REPAID: "REPAID",
                                    DUE: "DUE",
                                    OVERDUE: "OVERDUE",
                                }}
                                value={loanApplicationParams?.loanStatus}
                                onChange={(e) => {
                                    setLoanApplicationParams({
                                        ...loanApplicationParams,
                                        loanStatus: e.target.value,
                                    });
                                    triggerLoanApplications({
                                        ...loanApplicationParams,
                                        loanStatus: e.target.value,
                                    });
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <Table
                    columns={TableColumns}
                    menuItems={generateTableMenuItems}
                    rows={
                        lazyQueryLoanApplications?.data?.content
                            ? lazyQueryLoanApplications.data.content
                            : loanApplications?.data?.content
                    }
                    loading={lazyQueryLoanApplicationsIsLoading || getQueryLoanApplicationIsLoading}
                    currentPageNumber={loanApplicationParams.page}
                    onClickPrevPage={() => {
                        if (loanApplicationParams.page === 1) return;
                        setLoanApplicationParams({
                            ...loanApplicationParams,
                            page: loanApplicationParams.page - 1,
                        });
                        triggerLoanApplications({
                            ...loanApplicationParams,
                            page: loanApplicationParams.page - 1,
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryLoanApplications?.data?.totalPages
                            ? lazyQueryLoanApplications.data.totalPages
                            : loanApplications?.data?.totalPages;

                        if (loanApplicationParams.page === lastPageNumber) return;
                        setLoanApplicationParams({
                            ...loanApplicationParams,
                            page: loanApplicationParams.page + 1,
                        });
                        triggerLoanApplications({
                            ...loanApplicationParams,
                            page: loanApplicationParams.page + 1,
                        });
                    }}
                    totalPages={
                        lazyQueryLoanApplications?.data?.totalPages !== undefined
                            ? lazyQueryLoanApplications.data.totalPages
                            : loanApplications?.data?.totalPages
                    }
                    firstPage={loanApplicationParams.page === 1}
                    lastPage={
                        loanApplicationParams.page ===
                        (lazyQueryLoanApplications?.data?.totalPages
                            ? lazyQueryLoanApplications.data.totalPages
                            : loanApplications?.data?.totalPages)
                    }
                />
            </Container>
        </Main>
    );
}

export default LoanApplication;
