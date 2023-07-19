import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

function ButtonCommon({
  text,
  onClick,
  marginTop,
  backgroundColor,
  textColor,
  disabled,
  isLoading,
  border
}) {
  return (
    <ButtonContainer
      onClick={onClick}
      marginTop={marginTop}
      backgroundColor={backgroundColor}
      textColor={textColor}
      disabled={disabled}
      border={border}
    >
      {isLoading ? <CircularProgress size={20} color='inherit' /> : text}
    </ButtonContainer>
  );
}

export default ButtonCommon;

const ButtonContainer = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 9px;
  border: none;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: -0.02em;
  cursor: pointer;
  ${(props) => {
    console.log({props})
    return (props.border ? `border: 1px solid #933d0c` : `border: none`)}};
  ${(props) =>
    props.textColor ? `color: ${props.textColor};` : `color: #ffffff;`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}
    ${(props) =>
    props.backgroundColor
      ? `background-color: ${props.backgroundColor};`
      : `background-color: #933d0c;`}

    &:disabled {
    background-color: #7a7a7a;
    cursor: not-allowed;
  }
`;
