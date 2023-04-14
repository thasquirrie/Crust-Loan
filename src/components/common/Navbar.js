import styled from "styled-components";
import monitorImg from "../../assets/navbar/monitor.svg";
import { useSelector } from "react-redux";

function Navbar() {
    const user = useSelector((state) => state.auth.user);

    return (
        <Container>
            <h4>Crust Infrastructure</h4>
            {!user ? (
                <AccessPortal>
                    <img src={monitorImg} alt="monitor" />
                    <p>Access Portal</p>
                </AccessPortal>
            ) : (
                <CurrentUser>
                    <p>
                        {user?.user?.firstName} {user?.user?.lastName}
                    </p>
                    <p className="avatar">
                        {user?.user?.firstName[0].toUpperCase()}
                        {user?.user?.firstName[1].toUpperCase()}
                    </p>
                </CurrentUser>
            )}
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
    position: fixed;
    top: 0;
    left: 0;
    padding: 0px 2%;
    box-sizing: border-box;
    height: 48px;
    z-index: 100;

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

const CurrentUser = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    p {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.2rem;
        letter-spacing: -0.02em;
        color: #ffffff;
        margin: 0px;
    }

    .avatar {
        border-radius: 50%;
        background-color: #00a89b;
        padding: 0.25rem 0.5rem;
        font-weight: 700;
        font-size: 12px;
        line-height: 24px;
        color: #ffffff;
        margin-left: 0.6rem;
    }
`;
