import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import cancel from "../../assets/posRequests/close.svg";
import { useGetPosHistoryQuery } from "../../app/services/pos";
import formattedTime from "../../utils/formatDate";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function POSHistoryModal({ open, handleClose, posDevicesModalDetails }) {
    const { data: posHistory } = useGetPosHistoryQuery(posDevicesModalDetails?.serialNumber, {
        skip: !posDevicesModalDetails?.serialNumber,
    });

    const posHistoryData = posHistory?.data?.content[0];

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={"lg"}
            >
                <ModalContainer>
                    <ModalHeader>
                        <h4>POS History</h4>
                        <img src={cancel} alt="cancel" onClick={handleClose} />
                    </ModalHeader>
                    <ModalBody>
                        <h4>Device Information</h4>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Status</td>
                                    <td>{posHistoryData?.status ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>
                                        {formattedTime(
                                            posHistoryData?.createdDate,
                                            "ddd Do MMM, YYYY | hh:mm a"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>SerialNumber</td>
                                    <td>{posHistoryData?.serialNumber ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td>Terminal ID</td>
                                    <td>{posHistoryData?.terminalId ?? "-"}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>Current Agent Information</h4>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Date Assigned</td>
                                    <td>
                                        {formattedTime(
                                            posHistoryData?.createdDate,
                                            "ddd Do MMM, YYYY | hh:mm a"
                                        ) ?? "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Agent Name</td>
                                    <td>{posHistoryData?.agentName ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td>Agent Account Number</td>
                                    <td>{posHistoryData?.accountNumber ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td>Agent Business Address</td>
                                    <td>{posHistoryData?.address ?? "-"}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>Previous Agent Information</h4>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Date Assigned</td>
                                    <td>25th Aug 2023</td>
                                </tr>
                                <tr>
                                    <td>Agent Name</td>
                                    <td>123756748790</td>
                                </tr>
                                <tr>
                                    <td>Agent Account Number</td>
                                    <td>P6574678387837</td>
                                </tr>
                                <tr>
                                    <td>Agent Business Address</td>
                                    <td>P6574678387837</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>Merchant Information</h4>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Merchant ID</td>
                                    <td>{posHistoryData?.merchantId ?? "-"}</td>
                                </tr>
                                <tr>
                                    <td>Merchant Name</td>
                                    <td>{posHistoryData?.institution ?? "-"}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>Aggregator Information</h4>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Aggregator Name</td>
                                    <td>{posHistoryData?.aggregatorName ?? "-"}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                </ModalContainer>
            </Dialog>
        </div>
    );
}

const ModalContainer = styled.div`
    width: 33rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem;
    padding-top: 0;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.8rem;
    padding-top: 1.8rem;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 100;

    h4 {
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.2rem;
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

    h4 {
        font-size: 1rem;
        width: 100%;
        text-align: left;
    }
`;

const Table = styled.table`
    border: 1px solid #d3d3d3;
    width: 100%;
    margin-bottom: 1.5rem;
    font-size: 0.75rem;

    tbody {
        border: 1px solid #d3d3d3;

        tr {
            height: 2.5rem;
            border: 1px solid #d3d3d3;

            td:first-child {
                width: 33%;
                border-right: 1px solid #d3d3d3;
                padding-left: 0.6rem;
            }

            td:last-child {
                padding-left: 1.5rem;
            }
        }
    }
`;
