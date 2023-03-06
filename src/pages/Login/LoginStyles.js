import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 25%;
    margin-top: -10rem;

    h4 {
        font-weight: 700;
        font-size: 1.3rem;
        line-height: 1.5rem;
        letter-spacing: -0.01em;
        color: #2c1505;
        margin-bottom: 2.5rem;
    }
`;

const ForgotPassword = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 1rem;

    a {
        font-weight: 400;
        font-size: 13.7782px;
        line-height: 25px;
        letter-spacing: 0.15665px;
        text-decoration-line: underline;
        color: #292929;
    }
`;

export { Container, SignInContainer, ForgotPassword };
