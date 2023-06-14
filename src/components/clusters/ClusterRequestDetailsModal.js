import { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
import DisapproveRequest from './DisapproveRequest';
import StatusTag from '../common/StatusTag';
import ViewAgentProfile from '../agents/ViewAgentProfileModal';
import { useGetAllClusterQuery } from '../../app/services/loan';
import SelectCommonModified from '../common/SelectCommonModified';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ClusterRequestDetailsModal({
  open,
  handleClose,
  agentDetails,
  userId,
  clusters
}) {
  
  const [tab, setTab] = useState('posdevices');
  const [disapproveModal, setDisapproveModal] = useState(false);
  const [agentDetailsModal, setAgentDetailsModal] = useState(false);
  const [cluster, setCluster] = useState('');
  const [approvalInput, setApprovalInput] = useState({
    userId: '',
    clusterName: '',
    clusterRequestId: ''
  })

  

  // console.log({clusters});
  const clusterNameList = clusters && clusters?.data.reduce((acc, cluster) => {
    acc[cluster.clusterId] = cluster.name;
    acc[''] = 'Select cluster';
    return acc;
  }, {});

  

  const handleCloseDisapprove = () => {
    setDisapproveModal(false);
    handleClose();
  };

  const formatStatus = (value) => {
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
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (date) => new Date(date).toLocaleTimeString('en-Us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return (
    <div>
      {disapproveModal && (
        <DisapproveRequest
          HeaderText={'Reason for Disapproval'}
          confirmationBody={'Select reason for disaaproving cluster request'}
          open={disapproveModal}
          confirmationText={'Disapprove'}
          close={handleCloseDisapprove}
        />
      )}

      {agentDetailsModal && (
        <ViewAgentProfile
          open={agentDetailsModal}
          handleClose={() => {
            setAgentDetailsModal(false);
            handleClose();
          }}
          userId={userId}
        />
      )}
      <Dialog
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <ModalContainer>
          <>
            <ModalHeader>
              <div>
                <AgentName>{agentDetails.name}</AgentName>
                <p className='request'>Join Cluster request</p>
              </div>
              <div>{formatStatus(agentDetails.status)}</div>
            </ModalHeader>
            <ModalBody>
              <AgentInformationTitle>
                <h4>Agent Information</h4>
              </AgentInformationTitle>
              <AgentInformation>
                <DetailsTile>
                  <span>Date of request</span>
                  <span>{formatDate(agentDetails.dateCreated)}</span>
                </DetailsTile>
                <DetailsTile>
                  <span>Time of request</span>
                  <span>{formatTime(agentDetails.dateCreated)}</span>
                </DetailsTile>
                <DetailsTile>
                  <span>Business State</span>
                  <span>Abuja</span>
                </DetailsTile>
              </AgentInformation>
              <AgentInformation>
                <DetailsTile>
                  <span>Mobile Money Operator</span>
                  <span>{agentDetails.mobileMoneyOperator}</span>
                </DetailsTile>
                <DetailsTile>
                  <span>Duration</span>
                  <span>{agentDetails.mobileMoneyAgentDuration} months</span>
                </DetailsTile>
                <DetailsTile>
                  <span>Phone number</span>
                  <span>081234567</span>
                </DetailsTile>
              </AgentInformation>
              <BusinessAddress>
                <span>Business Address</span>
                <span>{agentDetails.address}</span>

                <span onClick={() => setAgentDetailsModal(true)}>
                  See more details
                </span>
              </BusinessAddress>
              <AddAgentToClusterContainer>
                <h4>Select a cluster to add agent</h4>
                <span>Cluster name</span>
                <SelectCommonModified options={clusters.data} onChange={(e) => {
                  console.log(e.target[e.target.selectedIndex].text, approvalInput);
                  setApprovalInput({
                    clusterRequestId: e.target.value,
                    clusterName: e.target[e.target.selectedIndex].text
                  })
                }} value={approvalInput.clusterName} />
              </AddAgentToClusterContainer>
              <ActionContainer>
                <ButtonContainerWithBorder
                  onClick={() => {
                    setDisapproveModal(true);
                    console.log({ disapproveModal });
                    handleClose();
                  }}
                >
                  Disapprove
                </ButtonContainerWithBorder>
                <ButtonContainer>Approve</ButtonContainer>
              </ActionContainer>
            </ModalBody>
          </>
        </ModalContainer>
      </Dialog>
    </div>
  );
}

const ModalContainer = styled.div`
  // width: 100%;
  width: 45rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 40px; */
  /* overflow: hidden; */
`;

const ModalHeader = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  width: 100%;
  background: #fff5ee;
  box-sizing: border-box;
  padding: 2rem;
  border-bottom: 1px solid #dbdef7;

  .request {
    color: #667085;
    font-size: 1rem;
  }

  div:last-child {
    align-self: center;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const ButtonContainer = styled.button`
  width: 49%;
  height: 52px;
  border-radius: 9px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: -0.02em;
  cursor: pointer;
  border: none;
  ${(props) =>
    props.textColor ? `color: ${props.textColor};` : `color: #ffffff;`}
  ${(props) => {
    return props.backgroundColor
      ? `background-color: ${props.backgroundColor};`
      : `background-color: #933d0c;`;
  }}
    ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}

    &:disabled {
    background-color: #7a7a7a;
    cursor: not-allowed;
  }
`;

const ButtonContainerWithBorder = styled(ButtonContainer)`
  color: #933d0c;
  background: #ffffff;
  border: 1px solid #933D0C;
`;

const AgentName = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const AgentInformationTitle = styled.div`
  padding: 2rem;
  align-self: baseline;
  border-bottom: 1px solid #dbdef7;
  width: 100%;
`;

const AgentInformation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  gap: 9rem;
`;

const DetailsTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;

  span:first-child {
    font-weight: 700;
    font-size: 1rem;
  }

  span:last-child {
    font-size: 1.125rem;
    color: #667085;
  }
`;

const BusinessAddress = styled.div`
  align-self: baseline;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;

  span:first-child {
    font-weight: 700;
    font-size: 1rem;
  }

  span:nth-child(2) {
    font-size: 1.125rem;
    color: #667085;
  }

  span:last-child {
    font-weight: 600;
    padding: 0.1rem;
    border-bottom: 2px solid #933d0c;
    align-self: end;
    color: #933d0c;
    margin-top: 2.5rem;
    cursor: pointer;
  }
`;

const AddAgentToClusterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: baseline;
  padding: 2rem;
  width: 100%;

  h4 {
    margin-bottom: 1rem;
  }

  span {
    color: #667085;
    margin-bottom: 0.5rem;
  }
`;

const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  gap: 2%;
`;