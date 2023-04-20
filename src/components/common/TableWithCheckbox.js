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
import ActionMenu from "./ActionMenu";
import arrow from "../../assets/common/arrow-pagination.svg";
import { StyledTableContainer, StyledTableHead, StyledTableRow } from "./tableStyles/sharedStyles";

const CheckboxTable = ({
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
                                            key={row?.id}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onClick={(event) => handleClick(event, row)}
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
                                                            key={value}
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
};

export default CheckboxTable;

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
