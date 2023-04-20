import styled from "styled-components";

function StatusTag({ backgroundColor, text, textColor }) {
    return (
        <Container backgroundColor={backgroundColor} textColor={textColor}>
            <p>{text}</p>
        </Container>
    );
}

export default StatusTag;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "#FF0000")};

    p {
        font-weight: 700;
        color: ${(props) => (props.textColor ? props.textColor : "#FFF")};
        margin: 8px 6px;
    }
`;
