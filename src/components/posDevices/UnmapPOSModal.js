import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/common/x_black.svg";
import { CircularProgress } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UnmapPOSModal({
  open,
  handleClose,
  onClickConfirm,
  HeaderText,
  RiderText,
  ConfirmationSerialNumber,
  ConfirmationSerialNumberText,
  ConfirmationTerminalID,
  ConfirmationTerminalIDText,
  ConfirmationMerchantName,
  ConfirmationMerchantNameText,
  confirmationText,
  loading,
  customPaperPropsStyle,
  customTransition,
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={customTransition ? customTransition : Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: customPaperPropsStyle,
        }}
      >
        <ConfirmationModalContainer>
          <ConfirmationModalHeader>
            <h4>{HeaderText}</h4>
            <img src={cancel} alt="cancel" onClick={handleClose} />
          </ConfirmationModalHeader>

          <ConfirmationModalRider>
            <h6>{RiderText}</h6>
          </ConfirmationModalRider>

          <ConfirmationModalBody>
            <SerialNumber>
              <p className="serial-number">{ConfirmationSerialNumberText}</p>
              <p className="serial-number">{ConfirmationSerialNumber}</p>
            </SerialNumber>

            <TerminalID>
              <p className="terminal-id">{ConfirmationTerminalIDText}</p>
              <p className="terminal-id">{ConfirmationTerminalID}</p>
            </TerminalID>

            <MerchantName>
              <p className="merchant-name">{ConfirmationMerchantNameText}</p>
              <p className="merchant-name">{ConfirmationMerchantName}</p>
            </MerchantName>
          </ConfirmationModalBody>

          <ConfirmationModalFooter>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={onClickConfirm} disabled={loading}>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                confirmationText
              )}
            </button>
          </ConfirmationModalFooter>
        </ConfirmationModalContainer>
      </Dialog>
    </div>
  );
}

export default UnmapPOSModal;

const ConfirmationModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 9px;
`;

const ConfirmationModalHeader = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.2rem;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  h4 {
    color: #2c1505;
    margin-right: 4rem;
  }

  img {
    cursor: pointer;
  }
`;

const ConfirmationModalRider = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2rem;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 20px;
`;

const ConfirmationModalBody = styled.div`
  width: 90%;
  font-size: 16px;
  line-height: 1.2rem;
  letter-spacing: -0.01em;
`;

const SerialNumber = styled.div`
  justify-content: space-between;
  display: flex;
  border-top: 0.5px solid #d3d3d3;
  border-bottom: 0.5px solid #d3d3d3;

  .serial-number {
    margin-bottom: 8px;
    margin-top: 8px;
  }
`;

const TerminalID = styled.div`
  font-size: 14px;
  justify-content: space-between;
  display: flex;
  border-bottom: 0.5px solid #d3d3d3;

  .terminal-id {
    margin-bottom: 8px;
    margin-top: 8px;
  }
`;

const MerchantName = styled.div`
  font-size: 14px;
  justify-content: space-between;
  display: flex;
  border-bottom: 0.5px solid #d3d3d3;
  margin-bottom: 40px;

  .merchant-name {
    margin-bottom: 8px;
    margin-top: 8px;
  }
`;

const ConfirmationModalFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 1rem 1.3rem 1rem;

  button:first-child {
    color: #933d0c;
    background: #fff;
    font-weight: 700;
    width: 49%;
    border-radius: 9px;
    height: 3rem;
    border: 1.14819px solid #933d0c;
  }

  button:last-child {
    background: #933d0c;
    color: #fff;
    font-weight: 700;
    width: 49%;
    border-radius: 9px;
    height: 3rem;
  }

  &:disabled {
    background-color: #7a7a7a;
    cursor: not-allowed;
  }
`;
