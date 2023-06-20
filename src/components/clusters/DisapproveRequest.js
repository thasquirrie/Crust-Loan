import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/pos/close.svg";
import { CircularProgress } from "@mui/material";
import SelectCommon from '../common/SelectCommon';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisapproveRequest({
    open,
    HeaderText,
    clickConfirmation,
    disableConfirmButton,
    loading,
    close,
    confirmationBody,
    confirmationText,
    setDisapproveInput,
    userId,
    clusterRequestId
}) {
    const options = [
        'Select a reason',
        'Agent is not a mobile money operator',
        'Agent business address cannot be verified'
    ]


    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalContainer>
                    <ModalHeader>
                        <h4>{HeaderText}</h4>
                        <img src={cancel} alt="cancel" onClick={close} />
                    </ModalHeader>
                    <ModalBody>
                        <p className="declinePosMessage">{confirmationBody}</p>
                        <PersonalInformation>
                           
                            {/* <InputField value={reason} onChange={onChangeReasonBody} /> */}
                            <SelectCommon options={options} onChange={(e) => {
                                setDisapproveInput({
                                userId: userId,
                                reason: e.target.value,
                                clusterRequestId: clusterRequestId
                            })}} />
                        </PersonalInformation>
                        <ActionButton>
                            <CancelButton onClick={close}>Cancel</CancelButton>
                            <AcceptButton
                                onClick={clickConfirmation}
                                disabled={disableConfirmButton}
                            >
                                {loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    confirmationText
                                )}
                            </AcceptButton>
                        </ActionButton>
                    </ModalBody>
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    width: 22rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;

    h4 {
        font-weight: 700;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #933d0c;
        margin-right: 5rem;
    }

    img {
        cursor: pointer;
        width: 1.3rem;
    }
`;

const ModalBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem;
    box-sizing: border-box;

    .declinePosMessage {
        font-weight: 400;
        font-size: 0.95rem;
        line-height: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        letter-spacing: 0.0571895px;
        color: #475661;
    }
`;

const InputField = styled.textarea`
    width: 98%;
    height: 5rem;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    padding: 1rem;
    box-sizing: border-box;
    outline: none;
`;

const PersonalInformation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h4 {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        padding-bottom: 1rem;
    }
`;

const ActionButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.8rem;

    a {
        background: #ffffff;
        color: #933d0c;
        border: 1px solid #933d0c;
        height: 3rem;
        border-radius: 4px;
        width: ${(props) => (props.transactionStatus === "FAILED" ? "49%" : "100%")};
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-decoration: none;

        img {
            margin-right: 0.5rem;
        }
    }

    button {
        display: block;
        border-radius: 6px;
        height: 3rem;
        width: 49%;
    }
`;

const AcceptButton = styled.button`
    background: #933d0c;
    border: none;
    color: #ffffff;

    &:disabled {
        background: #7a7a7a;
    }
`;

const CancelButton = styled.button`
    background: #ffffff;
    color: #933d0c;
    border: 1px solid #933d0c;
`;
