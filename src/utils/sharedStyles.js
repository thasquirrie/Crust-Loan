import styled from "styled-components";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableRow } from "@mui/material";


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

export const StyledTableContainer = styled(TableContainer)`
max-height: calc(100vh -  360px);
`;