import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import ActionMenu from "./ActionMenu";
import arrow from "../../assets/common/arrow-pagination.svg";
import { TailSpin } from "react-loader-spinner";

export const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-root {
        background-color: #fffaf6;
        border: none;
    }
`;

export const StyledTableRow = styled(TableRow)`
    background: rgba(224, 224, 224, 0.12);

    & .MuiTableCell-root {
        border: none;
        margin: 1rem 0;
    }
`;

export default function StickyHeadTable({
    columns,
    rows,
    loading,
    currentPageNumber,
    onClickPrevPage,
    onClickNextPage,
    menuItems,
    totalPages,
    firstPage,
    lastPage,
    heightOfTable,
}) {
    const StyledTableContainer = styled(TableContainer)`
        max-height: calc(100vh - ${heightOfTable ? heightOfTable : "350px"});
    `;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
            <StyledTableContainer>
                <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ borderSpacing: "5px 10x", borderCollapse: "separate" }}
                >
                    <StyledTableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={"left"}
                                    style={{ minWidth: 150, fontWeight: 700 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                align={"center"}
                                style={{ minWidth: 30, fontWeight: 700 }}
                            ></TableCell>
                        </TableRow>
                    </StyledTableHead>
                    {!loading ? (
                        <TableBody>
                            {rows?.map((row) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row?.id}
                                    >
                                        {columns?.map((column) => {
                                            const value = row[column?.id];
                                            return (
                                                <>
                                                    <TableCell
                                                        key={value?.id}
                                                        align={"left"}
                                                        style={{
                                                            minWidth: 150,
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                </>
                                            );
                                        })}
                                        <TableCell
                                            align={"left"}
                                            sx={{
                                                minWidth: 90,
                                                "& .MuiButtonBase-root": {
                                                    padding: 0,
                                                },
                                            }}
                                        >
                                            <ActionMenu menuItems={menuItems} row={row} />
                                        </TableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    ) : (
                        <div
                            style={{
                                position: "absolute",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                width: "100vw",
                                marginTop: "10%",
                            }}
                        >
                            <TailSpin
                                height="80"
                                width="80"
                                color="#933D0C"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                    )}
                </Table>
            </StyledTableContainer>
            {!loading && totalPages > 1 ? (
                <PageCount>
                    <Prev onClick={onClickPrevPage} firstPage={firstPage}>
                        <img src={arrow} alt="arrow" />
                        <span>Prev</span>
                    </Prev>
                    <PageNumber>{currentPageNumber}</PageNumber>
                    <Next onClick={onClickNextPage} lastPage={lastPage}>
                        <span>Next</span>
                        <img src={arrow} alt="arrow" />
                    </Next>
                </PageCount>
            ) : null}
        </Paper>
    );
}

const PageCount = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 1rem 0;
    margin-right: 1rem;
`;

const Prev = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.firstPage ? "not-allowed" : "pointer")};

    img {
        margin-right: 0.5rem;
    }

    span {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.2rem;
        color: #7a7a7a;
    }
`;

const Next = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.lastPage ? "not-allowed" : "pointer")};

    img {
        transform: rotate(180deg);
    }

    span {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.2rem;
        color: #7a7a7a;
        margin-right: 0.5rem;
    }
`;

const PageNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.2rem;
    color: #7a7a7a;
    margin: 0 1.4rem;
    width: 30px;
    height: 30px;
    border: 0.8px solid #dbbeae;
    border-radius: 4px;
`;
