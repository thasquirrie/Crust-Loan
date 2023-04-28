import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

function ButtonCommonLink({
    text,
    marginTop,
    backgroundColor,
    textColor,
    disabled,
    isLoading,
    href,
    download,
}) {
    return (
        <ButtonContainer
            marginTop={marginTop}
            backgroundColor={backgroundColor}
            textColor={textColor}
            disabled={disabled}
        >
            <Link to={href} download={download ? download : undefined}  disabled={disabled} target="_blank">
                {isLoading ? <CircularProgress size={20} color="inherit" /> : text}
            </Link>
        </ButtonContainer>
    );
}

export default ButtonCommonLink;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 52px;
    border-radius: 9px;
    border: none;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2rem;
    letter-spacing: -0.02em;
    /* padding: 0.5rem; */
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
        ${(props) =>
            props.disabled
                ? `pointer-events: none`
                : `cursor: pointer;`}
    }
`;
