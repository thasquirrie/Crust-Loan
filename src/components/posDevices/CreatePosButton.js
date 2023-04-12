import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function CreatePosButton({
    text,
    marginTop,
    backgroundColor,
    textColor,
    disabled,
    isLoading,
    href,
    handleOpen,
    download,
}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <ButtonContainer
            marginTop={marginTop}
            backgroundColor={backgroundColor}
            textColor={textColor}
            disabled={disabled}
        >
            <Link to={href} download={download ? download : undefined} target="_blank">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : text}
            </Link>

            <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
            color:'#fff'
        }}
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
            
                    <MenuItem
                        // key={item.name}
                        onClick={(e) => {
                            handleOpen()
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
                        Assign Multiple Devices
                    </MenuItem>
                
            </Menu>
        </ButtonContainer>
    );
}

export default CreatePosButton;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    // height: 52px;
    height: 60.74px;
    border-radius: 9px;
    border: none;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    letter-spacing: -0.02em;
    cursor: pointer;
    ${(props) => (props.textColor ? `color: ${props.textColor};` : `color: #ffffff;`)}
    ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
    ${(props) =>
        props.disabled
            ? `background-color: #D0DCE4; cursor: not-allowed;`
            : `background-color: #933d0c; cursor: pointer;`}

    a {
        text-decoration: none;
        color: #fff;
    }
`;
