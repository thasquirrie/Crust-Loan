import {
  Container,
  DownloadButtonContainer,
  Header,
  HeaderRow,
  HeaderTitle,
  SearchFilters,
  SelectSearchBar,
  SelectSearchFilter,
} from './ClusterStyles';
import Main from '../../components/common/Main';
import Table from '../../components/common/Table';
import { forwardRef, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import SearchForUser from '../../components/common/SearchForUser';
import ButtonCommon from '../../components/common/ButtonCommon';
import { useGetAllClustersQuery, useLazyGetAllClustersQuery } from '../../app/services/clusters';

const TableColumns = [
  { id: 'name', label: 'Cluster Name' },
  { id: 'numberOfMembers', label: 'Members' },
  { id: 'clusterHeads', label: 'Cluster Head' },
  { id: 'growthAssociate', label: 'Growth Associate' },
];

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Clusters() {
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
 
  const [searchFilters, setSearchFilters] = useState({
    searchFilterBy: 'accountNumber',
    searchFilterValue: '',
  });

  const [clustersParams, setAllClustersParams] = useState({
    page: 1,
  });

  const lazyQueryOptions = {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refreshOnWindowFocus: true,
  };

  const { data: clusters, isLoading: getQueryIsLoading } =
    useGetAllClustersQuery();
  // const {}

  const [
    triggerGetAllClusters,
    { data: lazyQueryClusters, isLoading: lazyQueryIsLoading },
  ] = useLazyGetAllClustersQuery(lazyQueryOptions);


  const tableMenuItems = [
    {
      name: 'View Cluster Members',
      onClick: () => {
        
      }
    },
    {
      name: 'Add to Cluster',
    },
    {
      name: 'Delete Cluster',
    },
  ];

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

  console.log({ clustersParams });

  return (
    <Main>
      <Snackbar
        open={openSnackbar?.open}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={'error'}
          sx={{ width: '100%' }}
        >
          {openSnackbar?.message}
        </Alert>
      </Snackbar>
      <Container>
        <Header>
          <HeaderRow>
            <HeaderTitle>
              <h1>Clusters</h1>
              <div style={{display: 'flex', }}>
              <p>
                {lazyQueryClusters?.data?.length !== undefined
                  ? lazyQueryClusters?.data?.length
                  : clusters?.data?.length}{' '}
                pending requests
              </p>
              <a href='/clusters/requests' style={{color: '#933d0c', marginLeft: '.5rem', borderBottom: '1px solid #933d0c', fontWeight: 500, textDecoration: 'none'}}>View requests</a>
              </div>
            </HeaderTitle>
            <div>

            </div>
            <DownloadButtonContainer>
              <ButtonCommon
                text={'Create a Cluster'}
                marginTop={0}
                backgroundColor={'#933d0c'}
                disabled={false}

              />
            </DownloadButtonContainer>
          </HeaderRow>
          <SelectSearchFilter>
            <SelectSearchBar>
              <SearchForUser
                value={searchFilters.searchFilterValue}
                // searchInputValue={searchFilters.searchFilterValue}
                // options={{
                //   'Account Number': 'accountNumber',
                //   'Transaction Ref.': 'transactionRef',
                //   'Platform Ref.': 'platformRef',
                // }}
                // selectOnChange={(e) => {
                //   setSearchFilters({
                //     ...searchFilters,
                //     searchFilterBy: e.target.value,
                //   });
                // }}
                // searchInputOnChange={(e) => {
                //   setSearchFilters({
                //     ...searchFilters,
                //     searchFilterValue: e.target.value,
                //   });
                // }}
                placeholder={'Find a cluster'}
                // onClickSearchIcon={() => {
                //   triggerGetAllclusters({
                //     ...clustersParams,
                //     ...(searchFilters?.searchFilterBy === 'accountNumber' && {
                //       accountNumber: searchFilters?.searchFilterValue,
                //     }),
                //     ...(searchFilters?.searchFilterBy === 'platformRef' && {
                //       platformRef: searchFilters?.searchFilterValue,
                //     }),
                //     ...(searchFilters?.searchFilterBy === 'transactionRef' && {
                //       transactionRef: searchFilters?.searchFilterValue,
                //     }),
                //   });

                //   if (
                //     clustersParams?.startDate &&
                //     clustersParams?.endDate
                //   ) {
                //     triggerDownloadclusters({
                //       ...clustersParams,
                //       ...(searchFilters?.searchFilterBy === 'accountNumber' && {
                //         accountNumber: searchFilters?.searchFilterValue,
                //       }),
                //       ...(searchFilters?.searchFilterBy === 'platformRef' && {
                //         platformRef: searchFilters?.searchFilterValue,
                //       }),
                //       ...(searchFilters?.searchFilterBy ===
                //         'transactionRef' && {
                //         transactionRef: searchFilters?.searchFilterValue,
                //       }),
                //     });
                //   }
                // }}
                // showClearSearch={
                //   searchFilters.searchFilterValue.length > 0 ? true : false
                // }
                // onClickClear={() => {
                //   setSearchFilters({
                //     ...searchFilters,
                //     searchFilterValue: '',
                //   });
                //   triggerGetAllclusters({
                //     ...clustersParams,
                //     accountNumber: '',
                //     platformRef: '',
                //     transactionRef: '',
                //   });
                // }}
              />
            </SelectSearchBar>
          </SelectSearchFilter>
        </Header>

        <Table
          heightOfTable={'420px'}
          columns={TableColumns}
          rows={
            lazyQueryClusters?.data
              ? lazyQueryClusters.data
              : clusters?.data
          }
          loading={getQueryIsLoading || lazyQueryIsLoading}
          currentPageNumber={clustersParams.page}
          onClickPrevPage={() => {
            if (clustersParams.page === 1) return;
            setAllClustersParams({
              ...clustersParams,
              page: clustersParams.page - 1,
            });
            triggerGetAllClusters({
              ...clustersParams,
              page: clustersParams.page - 1,
              ...(searchFilters?.searchFilterBy === 'accountNumber' && {
                accountNumber: searchFilters?.searchFilterValue,
              }),
              ...(searchFilters?.searchFilterBy === 'platformRef' && {
                platformRef: searchFilters?.searchFilterValue,
              }),
              ...(searchFilters?.searchFilterBy === 'transactionRef' && {
                transactionRef: searchFilters?.searchFilterValue,
              }),
            });
          }}
          onClickNextPage={() => {
            const lastPageNumber = lazyQueryClusters?.data?.totalPages
              ? lazyQueryClusters.data.totalPages
              : Clusters?.data?.totalPages;

            if (clustersParams.page === lastPageNumber) return;
            setAllClustersParams({
              ...clustersParams,
              page: clustersParams.page + 1,
            });
            triggerGetAllClusters({
              ...clustersParams,
              page: clustersParams.page + 1,
              ...(searchFilters?.searchFilterBy === 'accountNumber' && {
                accountNumber: searchFilters?.searchFilterValue,
              }),
              ...(searchFilters?.searchFilterBy === 'platformRef' && {
                platformRef: searchFilters?.searchFilterValue,
              }),
              ...(searchFilters?.searchFilterBy === 'transactionRef' && {
                transactionRef: searchFilters?.searchFilterValue,
              }),
            });
          }}
          menuItems={tableMenuItems}
          totalPages={
            lazyQueryClusters?.data?.totalPages !== undefined
              ? lazyQueryClusters.data.totalPages
              : clusters?.data?.totalPages
          }
          firstPage={clustersParams.page === 1}
          lastPage={
            clustersParams.page ===
            (lazyQueryClusters?.data?.totalPages
              ? lazyQueryClusters.data.totalPages
              : clusters?.data?.totalPages)
          }
        />
      </Container>
    </Main>
  );
}

export default Clusters;
