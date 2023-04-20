import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../../assets/posRequests/closesvg";
import arrowRight from "../../../assets/pos/arrow-right.svg";
import { useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReassignPOSModal({
    open,
    setReassignModal,
    setNextModal,
    setDesignation,
    handleClose,
    transaction,
}) {
    const [chooseAggregator, setChooseAggregator] = useState("");
    const [chooseAgent, setChooseAgent] = useState("");
    const [overAggregator, setOverAggregator] = useState("");
    const [overAgent, setOverAgent] = useState("");

    const onClickHandlerAggregator = () => {
        setChooseAggregator("aggregator");
        setChooseAgent("");
        setDesignation("aggregator");
    };

    const onClickHandlerAgent = () => {
        setChooseAggregator("");
        setChooseAgent("agent");
        setDesignation("agent");
    };

    const onMouseOverHandler = (value) => {
        console.log("Yes");

        // return {
        //   background: '#fffaf6',
        //   border: '1px solid #933d0c',
        //   color: '#933d0c'
        // }
        if (value === "aggregator") {
            setOverAggregator("aggregator");
            // setOverAgent('');
        } else if (value === "agent") {
            setOverAgent("agent");
            setOverAggregator("");
        }
    };

    const onMouseOutHandler = (value) => {
        console.log("No");
        if (value === "aggregator") {
            setOverAggregator("");
        } else if (value === "agent") {
            setOverAgent("");
        }
    };
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setReassignModal(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalContainer>
                    <ModalHeader>
                        <h4>Reassign POS</h4>
                        <img
                            src={cancel}
                            alt="cancel"
                            // onClick={handleClose}
                            onClick={() => setReassignModal(false)}
                            style={{ color: "black" }}
                        />
                    </ModalHeader>
                    <ModalBody>
                        <PersonalInformation>
                            <h4>POS Information</h4>
                            <InformationDetail>
                                <p>Serial Number</p>
                                <p>Akudo Tunde-Musa</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Terminal ID</p>
                                <p>Agrobusiness</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Current Aggregator</p>
                                <p>{transaction?.accountNumber}</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Current Agent</p>
                                <p>Outright Sales</p>
                            </InformationDetail>
                            <InformationDetail>
                                <p>Current State</p>
                                <p>69 RD along Chicken republic</p>
                            </InformationDetail>
                        </PersonalInformation>

                        <Reassign>
                            <h4>Reassign to</h4>
                            <br />
                            <Aggregator
                                onClick={onClickHandlerAggregator}
                                onMouseOver={() => onMouseOverHandler("aggregator")}
                                onMouseOut={() => onMouseOutHandler("aggregator")}
                                aggregator={chooseAggregator}
                                overAggregator={overAggregator}
                            >
                                <p>Aggregator</p>
                                <img src={arrowRight} alt={"arrow-right"} />
                            </Aggregator>
                            <Agent
                                onClick={onClickHandlerAgent}
                                onMouseOver={() => onMouseOverHandler("agent")}
                                onMouseOut={() => onMouseOutHandler("agent")}
                                agent={chooseAgent}
                                overAgent={overAgent}
                            >
                                <p>Agent</p>
                                <img src={arrowRight} alt={"arrow-right"} />
                            </Agent>
                        </Reassign>

                        <ActionButton>
                            <CancelButton>Cancel</CancelButton>
                            <AcceptButton
                                onClick={() => {
                                    setReassignModal(false);
                                    setNextModal(true);
                                }}
                                disabled={!chooseAgent && !chooseAggregator}
                            >
                                Next
                            </AcceptButton>
                        </ActionButton>
                    </ModalBody>
                </ModalContainer>
            </Dialog>
            {console.log({ chooseAgent, chooseAggregator })}
        </div>
    );
}

const ModalContainer = styled.div`
    width: 22rem;
    height: 100%;
    /* background: #fff; */
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
    padding: 0.8rem;
    background: #fff;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;

    h4 {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.2rem;
        /* color: #ffffff; */
        color: black;
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
    padding: 1.8rem 0.8rem;
    box-sizing: border-box;
`;

const Reassign = styled.div`
    width: 100%;
    /* display: flex; */
    /* align-items: flex-start; */
    /* justify-content: space-between; */
    margin-top: 2rem;

    h4 {
        display: block;
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.1rem;
        color: #000000;
        margin: 0;
        padding-bottom: 0.5rem;
        width: 100%;
        padding-bottom: 1rem;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        /* border: 1px solid #9cabb5; */
        width: 95%;
        padding: 1rem 0.5rem;
        border-radius: 6px;
        margin: auto auto;
        margin-bottom: 1rem;
    }
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
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgba(210, 210, 210, 0.5);
    }
`;

const InformationDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    border-bottom: 1px solid rgba(210, 210, 210, 0.5);

    p {
        width: 100%;
        margin: 0;
        padding-bottom: 0.5rem;
    }

    p:first-child {
        font-weight: 400;
        font-size: 0.8rem;
        line-height: 0.9rem;
        color: #000000;
    }

    p:last-child {
        font-weight: 500;
        font-size: 0.9rem;
        line-height: 1rem;
        color: #474747;
        word-break: break-word;
        text-align: right;
    }
`;

const ActionButton = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

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
        border-radius: 4px;
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

const Aggregator = styled.div`
    background: ${({ aggregator, overAggregator }) =>
        aggregator || overAggregator ? "#fffaf6" : "#fff"};
    border: ${({ aggregator, overAggregator }) => {
        return aggregator || overAggregator ? "1px solid #933d0c" : "1px solid #9cabb5";
    }};
    color: ${({ aggregator, overAggregator }) => {
        return aggregator || overAggregator ? "#933d0c" : "#474747";
    }};
    font-weight: ${({ aggregator, overAggregator }) => (aggregator || overAggregator) && 800};
`;

const Agent = styled.div`
    background: ${({ agent, overAgent }) => (agent || overAgent ? "#fffaf6" : "#fff")};
    border: ${({ agent, overAgent }) => {
        return agent || overAgent ? "1px solid #933d0c" : "1px solid #9cabb5";
    }};
    color: ${({ agent, overAgent }) => (agent || overAgent ? "#933d0c" : "#474747")};
    font-weight: ${({ agent, overAgent }) => (agent || overAgent) && 800};
`;
