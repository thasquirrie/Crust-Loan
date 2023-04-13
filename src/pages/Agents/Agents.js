import {
    Container,
    Header,
    HeaderTitle,
    SelectSearchFilter,
    SelectSearchBar,
    SearchFilters,
} from "./AgentStyles";
import { useEffect, useState } from "react";
import Main from "../../components/common/Main";
import SelectCommon from "../../components/common/SelectCommon";
import Table from "../../components/common/Table";
import {
    useGetAllAgentsQuery,
    useLazyGetAllAgentsQuery,
    useLockAgentMutation,
    useUnlockAgentMutation,
} from "../../app/services/agents";
import TableSelectSearchBar from "../../components/common/TableSelectSearchBar";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import ViewAgentProfile from "../../components/agents/ViewAgentProfileModal";
import { useGetAllClusterQuery } from "../../app/services/loan";
import SnackBar from "../../components/common/SnackBar";
import StatusTag from "../../components/common/StatusTag";

const TableColumns = [
    { id: "agentName", label: "Agent Name" },
    { id: "accountNumber", label: "Account Number" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "email", label: "Email" },
    { id: "clusterGroup", label: "Cluster Group" },
    {
        id: "verificationStatus",
        label: "Verification Status",
        format: (value) => {
            switch (value) {
                case true:
                    return <StatusTag backgroundColor="#06C281" text="VERIFIED" />;
                case false:
                    return <StatusTag backgroundColor="#FF0000" text="NOT VERIFIED" />;
                default:
                    return <StatusTag backgroundColor="#FF0000" text={value} />;
            }
        },
    },
    { id: "dateCreated", label: "Date Added" },
];

const Agents = () => {
    const DEACTIVATE_AGENT = "DEACTIVATE_AGENT";
    const ACTIVATE_AGENT = "ACTIVATE_AGENT";
    const VIEW_AGENT_DETAILS = "VIEW_AGENT_DETAILS";

    const [agentsParams, setAllAgentsParams] = useState({
        page: 1,
    });

    const [agentDetails, setAgentDetails] = useState(null);

    const [agentModalType, setAgentModalType] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        searchFilterBy: "accountNumber",
        searchFilterValue: "",
    });

    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const lazyQueryOptions = {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refreshOnWindowFocus: true,
    };

    const { data: agents, isLoading: getQueryIsLoading } = useGetAllAgentsQuery();

    const { data: clusters } = useGetAllClusterQuery();

    const [triggerGetAllAgents, { data: lazyQueryAgents, isLoading: lazyQueryIsLoading }] =
        useLazyGetAllAgentsQuery(lazyQueryOptions);

    const [
        triggerLockAgent,
        { isLoading: lockAgentIsLoading, isSuccess: lockAgentIsSuccess, error: lockAgentError },
    ] = useLockAgentMutation();

    const [
        triggerUnlockAgent,
        {
            isLoading: unlockAgentIsLoading,
            isSuccess: unlockAgentIsSuccess,
            error: unlockAgentError,
        },
    ] = useUnlockAgentMutation();

    function generateTableMenuItems(row) {
        let tableMenuItems = [
            {
                name: "View Agent Details",
                onClick: () => {
                    setAgentModalType(VIEW_AGENT_DETAILS);
                    setAgentDetails(row);
                },
            },
        ];
        switch (row?.locked) {
            case true:
                tableMenuItems.push({
                    name: "Unlock Agent Account",
                    onClick: () => {
                        setAgentModalType(ACTIVATE_AGENT);
                        setAgentDetails(row);
                    },
                });
                break;
            case false:
                tableMenuItems.push({
                    name: `Lock Agent Account`,
                    onClick: () => {
                        setAgentModalType(DEACTIVATE_AGENT);
                        setAgentDetails(row);
                    },
                });
                break;
            default:
                break;
        }
        return tableMenuItems;
    }

    const clusterNameList = clusters?.data?.reduce((acc, cluster) => {
        acc[""] = "Cluster";
        acc[cluster.name] = cluster.name;
        return acc;
    }, {});

    useEffect(() => {
        if (lockAgentIsSuccess) {
            setOpenSnackbar({
                open: true,
                severity: "success",
                message: `You have successfully locked ${agentDetails?.agentName}`,
            });
            setAgentModalType("");
            triggerGetAllAgents(agentsParams);
        } else if (lockAgentError) {
            const errorKey = Object.keys(lockAgentError?.data.errors)[0];
            const errorMessage = lockAgentError?.data.errors[errorKey];
            setOpenSnackbar({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
        setAgentModalType("");
    }, [lockAgentIsSuccess]);

    useEffect(() => {
        if (unlockAgentIsSuccess) {
            setOpenSnackbar({
                open: true,
                severity: "success",
                message: `You have successfully unlocked ${agentDetails?.agentName}`,
            });
            setAgentModalType("");

            triggerGetAllAgents(agentsParams);
        } else if (unlockAgentError) {
            const errorKey = Object.keys(unlockAgentError?.data.errors)[0];
            const errorMessage = unlockAgentError?.data.errors[errorKey];
            setOpenSnackbar({
                open: true,
                severity: "error",
                message: errorMessage,
            });
        }
        setAgentModalType("");
    }, [unlockAgentIsSuccess]);

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
            {agentDetails && (
                <ViewAgentProfile
                    open={agentModalType === VIEW_AGENT_DETAILS}
                    userId={agentModalType === VIEW_AGENT_DETAILS ? agentDetails?.userId : null}
                    handleClose={() => {
                        setAgentModalType("");
                        setAgentDetails(null);
                    }}
                />
            )}
            <ConfirmationModal
                open={agentModalType === DEACTIVATE_AGENT}
                HeaderText={`Lock ${agentDetails?.agentName}?`}
                ConfirmationBody={`Are you sure you want to lock ${agentDetails?.agentName}'s Account?`}
                confirmationText={"Lock Account"}
                handleClose={() => setAgentModalType("")}
                loading={lockAgentIsLoading}
                onClickConfirm={() => {
                    triggerLockAgent(agentDetails?.phoneNumber);
                }}
            />
            <ConfirmationModal
                open={agentModalType === ACTIVATE_AGENT}
                HeaderText={`Unlock ${agentDetails?.agentName}?`}
                ConfirmationBody={`Are you sure you want to unlock ${agentDetails?.agentName}'s Account?`}
                confirmationText={"Unlock Account"}
                handleClose={() => setAgentModalType("")}
                loading={unlockAgentIsLoading}
                onClickConfirm={() => {
                    triggerUnlockAgent(agentDetails?.userId);
                }}
            />
            <SnackBar
                openSnackbar={openSnackbar?.open}
                handleClose={handleSnackbarClose}
                snackbarSeverity={openSnackbar?.severity}
                SnackbarMessage={openSnackbar?.message}
            />
            <Container>
                <Header>
                    <HeaderTitle>
                        <h1>Agent Management</h1>
                    </HeaderTitle>
                    <SelectSearchFilter>
                        <SelectSearchBar>
                            <TableSelectSearchBar
                                selectValue={searchFilters.searchFilterBy}
                                searchInputValue={agentsParams.phoneOrEmailOrAccountNumber}
                                options={{
                                    "Account Number": "phoneOrEmailOrAccountNumber",
                                    "Phone Number": "phoneOrEmailOrAccountNumber",
                                    Email: "phoneOrEmailOrAccountNumber",
                                }}
                                selectOnChange={(e) => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterBy: e.target.value,
                                    });
                                }}
                                searchInputOnChange={(e) => {
                                    setAllAgentsParams({
                                        ...agentsParams,
                                        phoneOrEmailOrAccountNumber: e.target.value,
                                    });
                                }}
                                placeholder={"Find Agent by Phone No, Email, Account No"}
                                onClickSearchIcon={(e) => {
                                    triggerGetAllAgents({
                                        ...agentsParams,
                                        phoneOrEmailOrAccountNumber:
                                            agentsParams.phoneOrEmailOrAccountNumber,
                                    });
                                }}
                                showClearSearch={
                                    agentsParams?.phoneOrEmailOrAccountNumber?.length > 0
                                        ? true
                                        : false
                                }
                                onClickClear={() => {
                                    setSearchFilters({
                                        ...searchFilters,
                                        searchFilterValue: "",
                                    });
                                    setAllAgentsParams({
                                        ...agentsParams,
                                        phoneOrEmailOrAccountNumber: "",
                                    });
                                    triggerGetAllAgents({
                                        ...agentsParams,
                                        phoneOrEmailOrAccountNumber: "",
                                    });
                                }}
                            />
                        </SelectSearchBar>
                        <SearchFilters>
                            <SelectCommon
                                options={{
                                    "": "Verification Status",
                                    true: "Verified",
                                    false: "Unverified",
                                }}
                                value={agentsParams?.verificationStatus}
                                onChange={(e) => {
                                    setAllAgentsParams({
                                        ...agentsParams,
                                        verificationStatus: e.target.value,
                                    });
                                    triggerGetAllAgents({
                                        ...agentsParams,
                                        verificationStatus: e.target.value,
                                    });
                                }}
                            />

                            <SelectCommon
                                options={clusterNameList}
                                value={agentsParams?.clusterName}
                                onChange={(e) => {
                                    setAllAgentsParams({
                                        ...agentsParams,
                                        clusterName: e.target.value,
                                    });
                                    triggerGetAllAgents({
                                        ...agentsParams,
                                        clusterName: e.target.value,
                                    });
                                }}
                            />
                        </SearchFilters>
                    </SelectSearchFilter>
                </Header>
                <Table
                    columns={TableColumns}
                    rows={
                        lazyQueryAgents?.data?.content
                            ? lazyQueryAgents.data.content
                            : agents?.data?.content
                    }
                    loading={getQueryIsLoading || lazyQueryIsLoading}
                    currentPageNumber={agentsParams.page}
                    onClickPrevPage={() => {
                        if (agentsParams.page === 1) return;
                        setAllAgentsParams({
                            ...agentsParams,
                            page: agentsParams.page - 1,
                        });
                        triggerGetAllAgents({
                            ...agentsParams,
                            page: agentsParams.page - 1,
                        });
                    }}
                    onClickNextPage={() => {
                        const lastPageNumber = lazyQueryAgents?.data?.totalPages
                            ? lazyQueryAgents.data.totalPages
                            : agents?.data?.totalPages;

                        if (agentsParams.page === lastPageNumber) return;
                        setAllAgentsParams({
                            ...agentsParams,
                            page: agentsParams.page + 1,
                        });
                        triggerGetAllAgents({
                            ...agentsParams,
                            page: agentsParams.page + 1,
                        });
                    }}
                    menuItems={generateTableMenuItems}
                    totalPages={
                        lazyQueryAgents?.data?.totalPages
                            ? lazyQueryAgents.data.totalPages
                            : agents?.data?.totalPages
                    }
                    firstPage={agentsParams.page === 1}
                    lastPage={
                        agentsParams.page ===
                        (lazyQueryAgents?.data?.totalPages
                            ? lazyQueryAgents.data.totalPages
                            : agents?.data?.totalPages)
                    }
                />
            </Container>
        </Main>
    );
};

export default Agents;
