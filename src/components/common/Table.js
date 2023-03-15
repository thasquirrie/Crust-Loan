import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";

const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
        id: "population",
        label: "Population",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "size",
        label: "Size\u00a0(km\u00b2)",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "density",
        label: "Density",
        minWidth: 170,
        align: "right",
        format: (value) => value.toFixed(2),
    },
];

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
        border-radius: 6px;
        margin: 1rem 0;
    }
`;

export default function StickyHeadTable() {
    return (
        <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
            <TableContainer sx={{ maxHeight: "50vh" }}>
                <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ borderSpacing: "0px 10x", borderCollapse: "separate" }}
                >
                    <StyledTableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 700 }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {rows.slice(0, 50).map((row) => {
                            return (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
