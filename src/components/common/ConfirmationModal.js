import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/common/x_black.svg";
import { CircularProgress } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmationModal({
    open,
    handleClose,
    onClickConfirm,
    HeaderText,
    ConfirmationBody,
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
                    <ConfirmationModalBody>
                        <p>{ConfirmationBody}</p>
                    </ConfirmationModalBody>
                    <ConfirmationModalFooter>
                        <button onClick={handleClose}>No, Cancel</button>
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

export default ConfirmationModal;

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
        color: #933d0c;
        margin-right: 4rem;
    }

    img {
        cursor: pointer;
    }
`;

const ConfirmationModalBody = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2.5rem 0;
    padding: 0 1rem;

    p {
        font-weight: 400;
        font-size: 1.1rem;
        line-height: 1.2rem;
        text-align: center;
        letter-spacing: -0.01em;
        color: #292929;
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
