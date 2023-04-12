import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";

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

const StyledTableContainer = styled(TableContainer)`
max-height: calc(100vh -  360px);
`;

const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
  ];

const PosDevicesTable = (
    { columns,
        rows,
        loading,
        currentPageNumber,
        onClickPrevPage,
        onClickNextPage,
        menuItems,
        totalPages,
        firstPage,
        lastPage,
        heightOfTable,}
) => {
  return (
    <Paper  sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>

<StyledTableContainer>
                <Table
                    stickyHeader
                    aria-label="sticky table"
                    style={{ borderSpacing: "5px 10x", borderCollapse: "separate" }}
                >
                    <StyledTableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                             <Checkbox
                                color="primary"
                            
                                inputProps={{
                                'aria-label': 'select all desserts',
                                }}
                            />
                          </TableCell>
                          {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
          >
              {headCell.label}
          </TableCell>
        ))}
                        </TableRow>
                    </StyledTableHead>
                    {/* {!loading ? (
                        totalPages === 0 ? (
                            <NoRecordFound>
                                <h4>NO RECORD FOUND 😢!</h4>
                            </NoRecordFound>
                        ) : (
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
                                                            {column?.format
                                                                ? column?.format(value)
                                                                : value === ""
                                                                ? "NA"
                                                                : value}
                                                        </TableCell>
                                                    </>
                                                );
                                            })} */}
                                            {/* {menuItems && (
                                                <TableCell
                                                    align={"left"}
                                                    sx={{
                                                        minWidth: 90,
                                                        "& .MuiButtonBase-root": {
                                                            padding: 0,
                                                        },
                                                    }}
                                                >
                                                    <ActionMenu
                                                        menuItems={
                                                            typeof menuItems === "function"
                                                                ? menuItems(row)
                                                                : menuItems
                                                        }
                                                        row={row}
                                                    />
                                                </TableCell>
                                            )} */}
                                        {/* </StyledTableRow>
                                    );
                                })}
                            </TableBody> */}
                        {/* )
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
                    )} */}
                </Table>
            </StyledTableContainer>
        </Paper>
  )
}

export default PosDevicesTable