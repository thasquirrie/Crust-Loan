import { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
import StatusTag from '../../components/common/StatusTag';
import ButtonCommon from '../../components/common/ButtonCommon';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function UpdateLoanModal({
  open,
  handleClose,
  agentDetails,
  userId,
  clusters,
}) {
  const [option, setOption] = useState('true');

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
      year: 'numeric',
    });
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-Us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    console.log({option});

  return (
    <div>
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
                <AgentName>Jamilu Musa</AgentName>
                <p className='request'>Update loan status</p>
              </div>
              <div>{formatStatus('Overdue')}</div>
            </ModalHeader>
            <ModalBody>
              <AgentInformationTitle>
                <h4>Loan details</h4>
              </AgentInformationTitle>
              <AgentInformation>
                <DetailsTile>
                  <span>Loan Amount</span>
                  <span>N100, 000.00</span>
                </DetailsTile>
                <DetailsTile>
                  <span>Date Applied</span>
                  <span>23/05/2023</span>
                </DetailsTile>
                <DetailsTile>
                  <span>Due Date</span>
                  <span>30/5/2023</span>
                </DetailsTile>
              </AgentInformation>
              <AgentInformation>
                <DetailsTile>
                  <span>Cluster</span>
                  <span>Divine Grace</span>
                </DetailsTile>
              </AgentInformation>
            <div style={{width: '100%', alignSelf: ' baseline', paddingLeft: '2rem', paddingRight: '2rem', borderTop: '1px solid #dbdef7', marginBottom: '2rem'}}>
                <span style={{ display:'block', fontSize: '1.25rem', paddingTop: '2rem' }}>
                  Have you confirmed agent's payment on this outstanding loan?
                </span>
                <div style={{display: 'flex', gap: '2.5rem', marginTop: '1rem', marginBottom: '2rem'}}>
                  <label style={{display: 'flex', gap: '.5rem', fontSize: '1.25rem', alignItems: 'center'}}>
                    <input
                      type='radio'
                      value={true}
                      onChange={(e) => setOption(true)}
                      checked={option}
                      style={{width: '1.25rem', height: '1.25rem', accentColor: option ? '#933d0c': '#d0dc34'}}
                    />
                    Yes
                  </label>
                  <label style={{display: 'flex', gap: '.5rem', fontSize: '1.25rem', alignItems: 'center'}}>
                    <input
                      type='radio'
                      value={false}
                      onChange={(e) => setOption(false)}
                      checked={!option}
                      style={{width: '1.25rem', height: '1.25rem', accentColor: !option ? '#933d0c': '#d0dce4'}}
                    />
                    No
                  </label>
                </div>
                <ButtonCommon marginTop={'1rem'} text={'Change status to repaid'}/>
              </div>
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
  border: 1px solid #933d0c;
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
