import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import ActionMenu from "../common/ActionMenu";
import { useState } from "react";
import { StyledTableContainer, StyledTableHead, StyledTableRow } from "../../utils/sharedStyles";

const PosDevicesTable = ({
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
    setSelected,
    selected,
}) => {
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

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
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onChange={handleSelectAllClick}
                                    checked={rows?.length > 0 && selected.length === rows?.length}
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#933D0C",
                                        },
                                    }}
                                />
                            </TableCell>
                            {columns.map((headCell) => (
                                <TableCell key={headCell.id}>{headCell.label}</TableCell>
                            ))}
                            {menuItems && (
                                <TableCell
                                    align={"center"}
                                    style={{ minWidth: 30, fontWeight: 700 }}
                                ></TableCell>
                            )}
                        </TableRow>
                    </StyledTableHead>
                    {!loading ? (
                        totalPages === 0 ? (
                            <NoRecordFound>
                                <h4>NO RECORD FOUND 😢!</h4>
                            </NoRecordFound>
                        ) : (
                            <TableBody>
                                {rows?.map((row) => {
                                    const isItemSelected = isSelected(row);
                                    return (
                                        <StyledTableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            aria-checked={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onClick={(event) => handleClick(event, row)}
                                                    key={row?.id}
                                                    selected={isItemSelected}
                                                    checked={isItemSelected}
                                                    sx={{
                                                        "&.Mui-checked": {
                                                            color: "#933D0C",
                                                        },
                                                    }}
                                                />
                                            </TableCell>
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
                                            })}
                                            {menuItems && (
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
                                            )}
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        )
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
        </Paper>
    );
};

export default PosDevicesTable;

const NoRecordFound = styled.div`
    position: absolute;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100vw;
    margin-top: 10%;

    h4 {
        color: #933d0c;
        text-align: center;
        font-weight: 700;
        font-size: 1.8rem;
    }
`;
