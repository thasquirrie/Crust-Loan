import styled from "styled-components";

function InputCommonWithIcon({ inputType, inputLabel, icon, onClickIcon, marginTop }) {
    return (
        <Container marginTop={marginTop}>
            <label htmlFor={inputType}>{inputLabel}</label>
            <div className="inputWithIcon">
                <input type={inputType} name={inputType} />
                <img src={icon} alt="" onClick={onClickIcon} />
            </div>
        </Container>
    );
}

export default InputCommonWithIcon;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    ${(props) => props.marginTop && `margin-top: ${props.marginTop};`}

    .inputWithIcon {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;

        img {
            cursor: pointer;
            position: absolute;
            right: 1rem;
        }
    }

    label {
        font-weight: 400;
        font-size: 13.7255px;
        line-height: 18px;
        letter-spacing: 0.0571895px;
        color: #474747;
        margin-bottom: 0.3rem;
    }

    input {
        width: 100%;
        height: 48px;
        padding: 0px 1rem;
        background: #ffffff;
        border: 1px solid #d3d3d3;
        border-radius: 4.57516px;
        box-sizing: border-box;
    }

    input:focus {
        border: none;
        border: 1px solid #933d0c;
    }
`;
