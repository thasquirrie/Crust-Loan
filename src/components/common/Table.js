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

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
    createData("United States", "US", 327167434, 9833520),
    createData("Canada", "CA", 37602103, 9984670),
    createData("Australia", "AU", 25475400, 7692024),
    createData("Germany", "DE", 83019200, 357578),
    createData("Ireland", "IE", 4857000, 70273),
    createData("Mexico", "MX", 126577691, 1972550),
    createData("Japan", "JP", 126317000, 377973),
    createData("France", "FR", 67022000, 640679),
    createData("United Kingdom", "GB", 67545757, 242495),
    createData("Russia", "RU", 146793744, 17098246),
    createData("Nigeria", "NG", 200962417, 923768),
    createData("Brazil", "BR", 210147125, 8515767),
];

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
        /* border-radius: 6px; */
        margin: 1rem 0;
    }
`;

// set dynamic height calculated based on screen height
const StyledTableContainer = styled(TableContainer)`
    max-height: calc(100vh - 430px);
`;

export default function StickyHeadTable({ columns }) {
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
                    <TableBody>
                        {rows.slice(0, 50).map((row) => {
                            return (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <>
                                                <TableCell key={column.id} align={"left"}>
                                                    {column.format && typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            </>
                                        );
                                    })}
                                    <TableCell
                                        align={"center"}
                                        sx={{
                                            "& .MuiButtonBase-root": {
                                                padding: 0,
                                            },
                                        }}
                                    >
                                        <ActionMenu />
                                    </TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <PageCount>
                <Prev>
                    <img src={arrow} alt="arrow" />
                    <span>Prev</span>
                </Prev>
                <PageNumber>1</PageNumber>
                <Next>
                    <span>Next</span>
                    <img src={arrow} alt="arrow" />
                </Next>
            </PageCount>
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
    cursor: pointer;

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
    cursor: pointer;

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
