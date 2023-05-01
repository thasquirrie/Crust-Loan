import styled from "styled-components";

function InputCommon({ inputType, inputLabel, onChange, value }) {
    return (
        <Container>
            <label htmlFor={inputType}>{inputLabel}</label>
            <input type={inputType} name={inputType} onChange={onChange} value={value} />
        </Container>
    );
}

export default InputCommon;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;

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
        outline: none;
    }
`;
