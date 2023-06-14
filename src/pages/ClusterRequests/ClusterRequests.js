import {
  Container,
  Header,
  HeaderTitle,
  SelectSearchFilter,
  SelectSearchBar,
  SearchFilters,
} from './ClusterRequestsStyles';
import { useEffect, useState } from 'react';
import Main from '../../components/common/Main';
import SelectCommon from '../../components/common/SelectCommon';
import Table from '../../components/common/Table';
import {
  useGetAllAgentsQuery,
  useLazyGetAllAgentsQuery,
  useLockAgentMutation,
  useUnlockAgentMutation,
} from '../../app/services/agents';
import TableSelectSearchBar from '../../components/common/TableSelectSearchBar';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import ClusterRequestDetailsModal from '../../components/clusters/ClusterRequestDetailsModal';
import { useGetAllClusterQuery } from '../../app/services/loan';
import SnackBar from '../../components/common/SnackBar';
import StatusTag from '../../components/common/StatusTag';
import { DateRangePicker } from 'rsuite';
import {
  useGetAllClusterRequestsQuery,
  useLazyGetAllClusterRequestsQuery,
} from '../../app/services/clusters';

const TableColumns = [
  { id: 'name', label: 'Agent Name' },
  { id: 'dateCreated', label: 'Date Added' },
  { id: 'state', label: 'Business State' },
  { id: 'phone', label: 'Phone Number' },
  { id: 'mobileMoneyOperator', label: 'Mobile Money Operator' },
  {
    id: 'status',
    label: 'Status',
    format: (value) => {
      switch (value) {
        case 'PENDING':
          return (
            <StatusTag
              backgroundColor='#ffebdd'
              textColor='#fe6901'
              text='Pending'
            />
          );
        case 'hold':
          return <StatusTag backgroundColor='#FF0000' text='Approved' />;
        case 'APPROVED':
          return (
            <StatusTag
              backgroundColor={'#ecfdf3'}
              textColor={'#008d4b'}
              text={'Approved'}
            />
          );
        case 'DISAPPROVED':
          return (
            <StatusTag
              backgroundColor='#fee4e2'
              textColor={'#e92e21'}
              text='Declined'
            />
          );
        default:
          return <StatusTag backgroundColor='#FF0000' text={value} />;
      }
    },
  },
];

const ClusterRequests = () => {
  const [clusterRequestsParams, setClusterRequestsParams] = useState({
    page: 0,
  });

  const [agentDetails, setAgentDetails] = useState(null);
  const [clusterRequestsModal, setClusterRequestsModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    searchFilterBy: 'accountNumber',
    searchFilterValue: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  const lazyQueryOptions = {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refreshOnWindowFocus: true,
  };

  const { data: agents, isLoading: getQueryIsLoading } = useGetAllAgentsQuery();

  const { data: clusterRequests } = useGetAllClusterRequestsQuery();
  const {data: clusters } = useGetAllClusterQuery();

  console.log({ clusterRequests });

  const [
    triggerGetAllAgents,
    { data: lazyQueryAgents, isLoading: lazyQueryIsLoading },
  ] = useLazyGetAllAgentsQuery(lazyQueryOptions);

  const [
    triggerGetAllClusters,
    { data: lazyGetClusterRequests, isLoading: lazyQueryRequestsIsLoading },
  ] = useLazyGetAllClusterRequestsQuery(lazyQueryOptions);
  // const [
  //     triggerLockAgent,
  //     { isLoading: lockAgentIsLoading, isSuccess: lockAgentIsSuccess, error: lockAgentError },
  // ] = useLockAgentMutation();

  // const [
  //     triggerUnlockAgent,
  //     {
  //         isLoading: unlockAgentIsLoading,
  //         isSuccess: unlockAgentIsSuccess,
  //         error: unlockAgentError,
  //     },
  // ] = useUnlockAgentMutation();

  function generateTableMenuItems(row) {
    console.log({ row });
    let tableMenuItems = [
      {
        name: 'Cluster Agent Details',
        onClick: () => {
          setClusterRequestsModal(true);
          setAgentDetails(row);
        },
      },
    ];

    return tableMenuItems;
  }

//   const clusterNameList = clusterRequests?.data?.reduce((acc, cluster) => {
//     acc[''] = 'Cluster';
//     acc[cluster.name] = cluster.name;
//     return acc;
//   }, {});

  // useEffect(() => {
  //     if (lockAgentIsSuccess) {
  //         setOpenSnackbar({
  //             open: true,
  //             severity: "success",
  //             message: `You have successfully locked ${agentDetails?.agentName}`,
  //         });
  //         setAgentModalType("");
  //         triggerGetAllAgents(clusterRequestsParams);
  //     } else if (lockAgentError) {
  //         const errorKey = Object.keys(lockAgentError?.data.errors)[0];
  //         const errorMessage = lockAgentError?.data.errors[errorKey];
  //         setOpenSnackbar({
  //             open: true,
  //             severity: "error",
  //             message: errorMessage,
  //         });
  //     }
  //     setAgentModalType("");
  // }, [lockAgentIsSuccess]);

  // useEffect(() => {
  //     if (unlockAgentIsSuccess) {
  //         setOpenSnackbar({
  //             open: true,
  //             severity: "success",
  //             message: `You have successfully unlocked ${agentDetails?.agentName}`,
  //         });
  //         setAgentModalType("");

  //         triggerGetAllAgents(clusterRequestsParams);
  //     } else if (unlockAgentError) {
  //         const errorKey = Object.keys(unlockAgentError?.data.errors)[0];
  //         const errorMessage = unlockAgentError?.data.errors[errorKey];
  //         setOpenSnackbar({
  //             open: true,
  //             severity: "error",
  //             message: errorMessage,
  //         });
  //     }
  //     setAgentModalType("");
  // }, [unlockAgentIsSuccess]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar({
      open: false,
      severity: 'success',
      message: '',
    });
  };

  return (
    <Main>
      {agentDetails && (
        <ClusterRequestDetailsModal
          open={clusterRequestsModal}
          userId={agentDetails && agentDetails?.id}
          handleClose={() => {
            setClusterRequestsModal(false);
            // setAgentDetails(null);
          }}
          agentDetails={agentDetails}
          clusters={clusters}
        />
      )}
      <SnackBar
        openSnackbar={openSnackbar?.open}
        handleClose={handleSnackbarClose}
        snackbarSeverity={openSnackbar?.severity}
        SnackbarMessage={openSnackbar?.message}
      />
      <Container>
        <Header>
          <HeaderTitle>
            <h1>Cluster Requests</h1>
          </HeaderTitle>
          <SelectSearchFilter>
            <SelectSearchBar>
              <TableSelectSearchBar
                selectValue={searchFilters.searchFilterBy}
                searchInputValue={clusterRequestsParams.phoneOrEmailOrAccountNumber}
                options={{
                  'Account Number': 'phoneOrEmailOrAccountNumber',
                  'Phone Number': 'phoneOrEmailOrAccountNumber',
                  Email: 'phoneOrEmailOrAccountNumber',
                }}
                selectOnChange={(e) => {
                  setSearchFilters({
                    ...searchFilters,
                    searchFilterBy: e.target.value,
                  });
                }}
                searchInputOnChange={(e) => {
                  setClusterRequestsParams({
                    ...clusterRequestsParams,
                    phoneOrEmailOrAccountNumber: e.target.value,
                  });
                }}
                placeholder={'Find Agent by Phone No, Email, Account No'}
                onClickSearchIcon={(e) => {
                  triggerGetAllAgents({
                    ...clusterRequestsParams,
                    phoneOrEmailOrAccountNumber:
                      clusterRequestsParams.phoneOrEmailOrAccountNumber,
                  });
                }}
                showClearSearch={
                  clusterRequestsParams?.phoneOrEmailOrAccountNumber?.length > 0
                    ? true
                    : false
                }
                onClickClear={() => {
                  setSearchFilters({
                    ...searchFilters,
                    searchFilterValue: '',
                  });
                  setClusterRequestsParams({
                    ...clusterRequestsParams,
                    phoneOrEmailOrAccountNumber: '',
                  });
                  triggerGetAllAgents({
                    ...clusterRequestsParams,
                    phoneOrEmailOrAccountNumber: '',
                  });
                }}
              />
            </SelectSearchBar>
          </SelectSearchFilter>
        </Header>
        <Table
          columns={TableColumns}
          rows={
            lazyGetClusterRequests?.data?.content
              ? lazyGetClusterRequests.data.content
              : clusterRequests?.data?.content
          }
          loading={getQueryIsLoading || lazyQueryIsLoading}
          currentPageNumber={clusterRequestsParams.page}
          onClickPrevPage={() => {
            if (clusterRequestsParams.page === 1) return;
            setClusterRequestsParams({
              ...clusterRequestsParams,
              page: clusterRequestsParams.page - 1,
            });
            triggerGetAllClusters({
              ...clusterRequestsParams,
              page: clusterRequestsParams.page - 1,
            });
          }}
          onClickNextPage={() => {
            const lastPageNumber = lazyGetClusterRequests?.data?.totalPages
              ? lazyGetClusterRequests.data.totalPages
              : clusterRequests?.data?.totalPages;

            if (clusterRequestsParams.page === lastPageNumber) return;
            setClusterRequestsParams({
                ...clusterRequestsParams,
                page: clusterRequestsParams.page + 1,
            });
            console.log({clusterRequestsParams})
            triggerGetAllClusters({
              ...clusterRequestsParams,
              page: clusterRequestsParams.page + 1,
            });
          }}
          menuItems={generateTableMenuItems}
          totalPages={
            lazyGetClusterRequests?.data?.totalPages
              ? lazyGetClusterRequests.data.totalPages
              : clusterRequests?.data?.totalPages
          }
          firstPage={clusterRequestsParams.page === 0}
          lastPage={
            clusterRequestsParams.page ===
            (lazyGetClusterRequests?.data?.totalPages
              ? lazyGetClusterRequests.data.totalPages
              : clusterRequests?.data?.totalPages)
          }
        />
      </Container>
    </Main>
  );
};

export default ClusterRequests;
