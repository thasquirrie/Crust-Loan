import styled from "styled-components";

function ComingSoon({ text, mainText }) {
    return (
        <Container>
            <h4>{mainText}</h4>
            <p>{text}</p>
        </Container>
    );
}

export default ComingSoon;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`;
