import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ActionMenu({ menuItems, row }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{
                    "& ul": {
                        margin: "0px",
                        padding: "0px",
                    },
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.name}
                        onClick={(e) => {
                            item.onClick(row);
                            setAnchorEl(null);
                        }}
                        sx={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#474747",

                            "&:hover": {
                                backgroundColor: "#FFFAF6",
                                color: "#933D0C",
                            },
                        }}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
