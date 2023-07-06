import { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
import StatusTag from '../../components/common/StatusTag';
import ButtonCommon from '../../components/common/ButtonCommon';
import Plus from '../../assets/loans/fi_plus.svg';
import Minus from '../../assets/loans/fi_minus-square.svg';
import Download from '../../assets/loans/download.svg';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function LoanInsightsModal({
  open,
  handleClose,
  agentDetails,
  userId,
  clusters,
}) {
  const [loanCheck, setLoanCheck] = useState(true);
  const [activityCheck, setActivityCheck] = useState(false);
  const [creditCheck, setCreditCheck] = useState(false);
  const [periculumCheck, setPericulumCheck] = useState(false);

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
              <div>{formatStatus('PENDING')}</div>
            </ModalHeader>
            <ModalBody>
              <EligibilityContainer>
                <Title>
                  <h5>Loan eligibility</h5>
                </Title>
                <DetailsContainer loanCheck={loanCheck}>
                  <TileContainer>
                    <div>
                      <span>Loan Amount paid</span>
                      <span>N100,000.00</span>
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '1rem',
                          fontWeight: '600',
                        }}
                      >
                        Application Score
                      </span>
                      <span style={{ fontSize: '1.25rem', color: '#667085' }}>
                        800
                      </span>
                    </div>
                  </TileContainer>
                  <div>
                    <LastDetailTile>
                      <span>Eligible loan amount</span>
                      <span>N80, 000.00</span>
                    </LastDetailTile>
                  </div>
                </DetailsContainer>
              </EligibilityContainer>
              <ActivityContainer>
                <Title>
                  <h5>Activity on Crust loans</h5>
                  <img
                    src={!activityCheck ? Plus : Minus}
                    alt='plus-sign'
                    onClick={() => setActivityCheck(!activityCheck)}
                  />
                </Title>
                <ActivityDetailsContainer activityCheck={activityCheck}>
                  <TileContainer>
                    <div>
                      <span>Total Loans</span>
                      <span>40</span>
                    </div>
                    <div>
                      <span>Total Loan Defaults</span>
                      <span>60</span>
                    </div>
                  </TileContainer>
                  <div>
                    <LastDetailTile>
                      <span>Total loan repaid</span>
                      <span>40</span>
                    </LastDetailTile>
                  </div>
                </ActivityDetailsContainer>
              </ActivityContainer>
              <CreditContainer>
                <Title>
                  <h5>Credit Bureau Insights</h5>
                  <img
                    src={!creditCheck ? Plus : Minus}
                    alt='plus-sign'
                    onClick={() => setCreditCheck(!creditCheck)}
                  />
                </Title>
                <CreditDetailsContainer creditCheck={creditCheck}>
                  <TileContainer>
                    <div>
                      <span>Active Loan</span>
                      <span>N80,000.00</span>
                    </div>
                    <div>
                      <span>Total closed loans</span>
                      <span>20</span>
                    </div>
                  </TileContainer>
                  <div>
                    <LastDetailTile>
                      <span>Total loan defaults</span>
                      <span>40</span>
                    </LastDetailTile>
                  </div>
                </CreditDetailsContainer>
              </CreditContainer>
              <PericulumContainer periculumCheck={periculumCheck}>
                <Title>
                  <h5>Periculum Insights</h5>
                  <img
                    src={!periculumCheck ? Plus : Minus}
                    alt='plus-sign'
                    onClick={() => setPericulumCheck(!periculumCheck)}
                  />
                </Title>
                <PericulumDetailsContainer periculumCheck={periculumCheck}>
                  <TileContainer>
                    <div>
                      <span>Total inflow</span>
                      <span>N20,000.00</span>
                    </div>
                    <DownloadContainer>
                      <img src={Download} alt='download-icon' />
                      <p>
                        Download bank statement
                      </p>
                    </DownloadContainer>
                  </TileContainer>
                </PericulumDetailsContainer>
              </PericulumContainer>
              <ActionContainer>
                <ButtonCommon
                  text={'Disapprove'}
                  backgroundColor={'#fff'}
                  textColor='#933d0c'
                  border={true}
                />
                <ButtonCommon text={'Approve'} />
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
  width: 35rem;
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

const EligibilityContainer = styled.div`
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 2rem;
  border-bottom: 1px solid #dbdfe7;
`;

const ActivityContainer = styled(EligibilityContainer)``;

const CreditContainer = styled(EligibilityContainer)``;

const PericulumContainer = styled(EligibilityContainer)`
  ${({ periculumCheck }) =>
    !periculumCheck
      ? 'border-bottom: 1px solid #dbdfe7'
      : 'border-bottom: none'};
  ${({ periculumCheck }) =>
    periculumCheck ? 'padding-bottom: 2rem' : 'padding-bottom: none'};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;

  img {
    cursor: pointer;
  }
`;

const DetailsContainer = styled.div`
  ${({ loanCheck }) => (loanCheck ? `display: flex` : `display: none`)};
  flex-direction: column;
`;

const ActivityDetailsContainer = styled(DetailsContainer)`
  ${({ activityCheck }) => (activityCheck ? `display: flex` : `display: none`)};
`;

const CreditDetailsContainer = styled(DetailsContainer)`
  ${({ creditCheck }) => (creditCheck ? `display: flex` : `display: none`)};
`;

const PericulumDetailsContainer = styled(DetailsContainer)`
  ${({ periculumCheck }) =>
    periculumCheck ? `display: flex` : `display: none`};
`;

const TileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span:first-child {
    display: block;
    font-size: 1rem;
    font-weight: 600;
  }

  span:last-child {
    font-size: 1.25rem;
    color: #667085;
  }
`;

const DownloadContainer = styled.div`
width: 43%;
display: flex;
gap: 0.2rem;
align-items: center;
cursor: pointer;

  p {
    color: #933d0c;
    font-size: 1rem;
    text-decoration: underline;
  }
`

const LastDetailTile = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  span:first-child {
    display: block;
    font-size: 1rem;
    font-weight: 600;
  }

  span:last-child {
    font-size: 1.25rem;
    color: #667085;
  }
`;

const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  gap: 2%;
`;

const AgentName = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
