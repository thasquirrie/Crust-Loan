import { forwardRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import closeModalIcon from "../../assets/posRequests/close.svg";
import {
    useGetAggregatorAgentQuery,
    useGetAggregatorTransactionQuery,
    useGetAggregatorPosDevicesQuery,
} from "../../app/services/pos";
import Table from "../../components/common/Table";
import Avatar from "react-avatar";
import {
    setAggregatorAgents,
    resetAggregatorAgents,
    resetAggregatorPos,
    setAggregatorPos,
} from "../../features/pos/posSlice";
import { useDispatch, useSelector } from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PosDevicesTableColumns = [
    { id: "serialNumber", label: "SERIAL NO." },
    { id: "terminalId", label: "TERMINAL NO." },
    { id: "merchantName", label: "Merchant Name" },
    { id: "agentName", label: "Agent Name" },
    { id: "agentAccountNumber", label: "Agent Acc. No." },
    { id: "posState", label: "POS State" },
];

const AggregatorAgentTableColumns = [
    { id: "agentName", label: "Agent Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "dateAdded", label: "Date Added" },
];

export default function ViewAggregatorSummary({ open, handleClose, aggregatorDetails }) {
    const [tab, setTab] = useState("posdevices");

    const { aggregatorPosDevices, aggregatorAgents, aggregatorTransactionCount } = useSelector(
        (state) => state.pos
    );
    const dispatch = useDispatch();

    const { data: aggregatorPosDeviceDetails, fulfilledTimeStamp: posDevicesTimestamp } =
        useGetAggregatorPosDevicesQuery(aggregatorDetails?.id, {
            skip: !aggregatorDetails?.id,
        });

    const { data: lazyQueryAggregatorAgents, fulfilledTimeStamp: agentsTimestamp } =
        useGetAggregatorAgentQuery(aggregatorDetails?.id, {
            skip: !aggregatorDetails?.id,
        });

    const { data: lazyQueryTransactionCount, fulfilledTimeStamp: transactionCountTimestamp } =
        useGetAggregatorTransactionQuery(aggregatorDetails?.id, {
            skip: !aggregatorDetails?.id,
        });

    useEffect(() => {
        if (posDevicesTimestamp) {
            dispatch(setAggregatorPos(aggregatorPosDeviceDetails));
        }
    }, [aggregatorPosDevices, dispatch, posDevicesTimestamp]);

    useEffect(() => {
        if (agentsTimestamp) {
            dispatch(setAggregatorAgents(lazyQueryAggregatorAgents));
        }
    }, [lazyQueryAggregatorAgents, dispatch, agentsTimestamp]);

    const hanldeCloseModal = () => {
        handleClose();
        setTab("posdevices");
        dispatch(resetAggregatorPos());
        dispatch(resetAggregatorAgents());
    };
    return (
        <div>
            <Dialog
                maxWidth={"xl"}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <ModalContainer>
                    <>
                        <ModalHeader>
                            <AggregatorHeader>
                                <h4>Aggregator Summary</h4>

                                <img
                                    onClick={hanldeCloseModal}
                                    src={closeModalIcon}
                                    alt="close modal"
                                />
                            </AggregatorHeader>

                            <AggregatorInfo>
                                <Avatar
                                    name={aggregatorDetails?.aggregatorName}
                                    round
                                    color="#933D0C"
                                />

                                <h4>{aggregatorDetails?.aggregatorName}</h4>

                                <ul className="aggregator-details">
                                    <li>
                                        Account No: <span>{aggregatorDetails?.aggregatorName}</span>
                                    </li>
                                    <li>
                                        Phone Number:{" "}
                                        <span>{aggregatorDetails?.aggregatorPhoneNumber}</span>
                                    </li>
                                    <li>
                                        State: <span>{aggregatorDetails?.aggregatorState}</span>
                                    </li>
                                </ul>
                            </AggregatorInfo>
                            <PillsContainer>
                                <Pills
                                    onClick={() => {
                                        setTab("posdevices");
                                    }}
                                    active={tab === "posdevices"}
                                >
                                    <p>POS Devices</p>
                                </Pills>

                                <Pills
                                    onClick={() => {
                                        setTab("agents");
                                    }}
                                    active={tab === "agents"}
                                >
                                    <p>Agents</p>
                                </Pills>

                                <Pills
                                    onClick={() => {
                                        setTab("postransactions");
                                    }}
                                    active={tab === "postransactions"}
                                >
                                    <p>POS Transactions</p>
                                </Pills>
                            </PillsContainer>
                        </ModalHeader>
                        <ModalBody>
                            {tab === "posdevices" && (
                                <>
                                    <TableContainer>
                                        {aggregatorPosDevices && (
                                            <ListOfItems>
                                                {aggregatorPosDevices.length} Assigned POS Devices
                                            </ListOfItems>
                                        )}

                                        <Table
                                            heightOfTable={"420px"}
                                            columns={PosDevicesTableColumns}
                                            rows={aggregatorPosDevices}
                                        />
                                    </TableContainer>
                                </>
                            )}
                            {tab === "agents" && (
                                <>
                                    <TableContainer>
                                        {aggregatorAgents && (
                                            <ListOfItems>
                                                {aggregatorAgents?.length} Mapped Agents
                                            </ListOfItems>
                                        )}

                                        <Table
                                            heightOfTable={"420px"}
                                            columns={AggregatorAgentTableColumns}
                                            rows={aggregatorAgents}
                                        />
                                    </TableContainer>
                                </>
                            )}
                            {tab === "postransactions" && (
                                <>
                                    <POSTransactionContainer>
                                        <POSTransactionCard>
                                            <div className="card-header">
                                                Total POS Transactions
                                            </div>
                                            <div className="card-amount">
                                                {
                                                    lazyQueryTransactionCount?.data
                                                        ?.totalPosTransactions
                                                }
                                            </div>
                                        </POSTransactionCard>
                                        <POSTransactionCard>
                                            <div className="card-header">POS Transfer Count</div>
                                            <div className="card-amount">
                                                {lazyQueryTransactionCount?.data?.posTransferCount}
                                            </div>
                                        </POSTransactionCard>
                                        <POSTransactionCard>
                                            <div className="card-header">POS Withdrawal Count</div>
                                            <div className="card-amount">
                                                {
                                                    lazyQueryTransactionCount?.data
                                                        ?.posWithdrawalCount
                                                }
                                            </div>
                                        </POSTransactionCard>
                                    </POSTransactionContainer>
                                </>
                            )}
                        </ModalBody>
                    </>
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    // width: 100%;
    width: 72.0625rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    /* overflow: hidden; */
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
`;

const AggregatorHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #fff;
    box-sizing: border-box;

    h4 {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.2rem;
        color: black;
    }

    img {
        cursor: pointer;
    }
`;

const AggregatorInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #fff;
    margin-top: 37px;

    h4 {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 12px;
        color: #933d0c;
        margin-top: 23px;
    }

    .aggregator-details {
        display: flex;
        margin-top: 29px;
        flex-direction: row;
        align-items: center;

        li {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 4px;
            display: flex;
            margin-right: 16px;
            align-items: center;
            color: #292929;
            span {
                margin-left: 4px;
            }
        }
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

const PillsContainer = styled.div`
    display: flex;
    align-items: baseline;
    width: auto;
    justify-content: center;
    margin: 1rem 0;

    div:nth-child(2) {
        margin: 0.9rem;
    }
`;

const Pills = styled.div`
    cursor: pointer;
    padding: 7.5px 18px;
    border: 1px solid #933d0c;
    border-radius: 20px;
    background: ${(props) => (props.active ? "#FFFAF6" : "#fff")};
    border: ${(props) => (props.active ? "1px solid #933d0c" : "1px solid #7a7a7a")};

    p {
        color: ${(props) => (props.active ? "#933d0c" : "#0C0400")};
    }
`;

const TableContainer = styled.div`
    margin-top: 69px;
    width: 100%;
`;

const ListOfItems = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 16px;
    color: #292929;
    margin-bottom: 37px;
`;

const POSTransactionContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 60px;
`;

const POSTransactionCard = styled.div`
    background: #ffffff;
    border: 0.5px solid #d3d3d3;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    padding-left: 20px;
    padding-top: 20px;
    margin-right: 16px;
    width: 337px;
    height: 142px;
    .card-header {
        font-style: normal;
        font-weight: 400;
        font-size: 15.72px;
        line-height: 19px;
        color: #292929;
    }
    .card-amount {
        font-style: normal;
        font-weight: 400;
        font-size: 48.8197px;
        line-height: 58px;
        margin-top: 6px;
        color: #0c0400;
    }
`;
