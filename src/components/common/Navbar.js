import styled from "styled-components";
import monitorImg from "../../assets/navbar/monitor.svg";

function Navbar() {
    return (
        <Container>
            <h4>Crust Infrastructure</h4>
            <AccessPortal>
                <img src={monitorImg} alt="monitor" />
                <p>Access Portal</p>
            </AccessPortal>
        </Container>
    );
}

export default Navbar;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #2c1505;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 0px 2%;
    box-sizing: border-box;
    height: 48px;

    h4 {
        color: #ffffff;
        font-weight: 700;
        font-size: 1.1rem;
        line-height: 1.3rem;
        letter-spacing: -0.01em;
        margin: 0px;
    }
`;

const AccessPortal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
        margin-right: 0.5rem;
    }

    p {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.2rem;
        letter-spacing: -0.02em;
        color: #ffffff;
        margin: 0px;
    }
`;
