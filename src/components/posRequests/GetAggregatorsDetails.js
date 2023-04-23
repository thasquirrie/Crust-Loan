import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const GetAggregatorDetails = ({ placeHolder, loading, onChange, value, marginBottom, noDataFound }) => {


    return (
        <FormContainer marginBottom={marginBottom}>
            <h3>{placeHolder}</h3>
            <div className="input_container">
                <input type="tel" value={value} onChange={onChange} placeholder={placeHolder} />
                <div className="loader">
                    {loading && <CircularProgress size={20} color="inherit" />}
                </div>
            </div>
            {noDataFound && <p>No aggregator found for this account number!</p>}
        </FormContainer>
    );
};

export default GetAggregatorDetails;

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    margin-bottom: ${(props) => (props.marginBottom ? "0px" : "32px")};

    h3 {
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 18px;
        letter-spacing: 0.0571895px;
        color: #474747;
        margin-bottom: 6px;
    }
    .input_container {
        position: relative;
    }
    .loader {
        position: absolute;
        right: 17px;
        top: 15px;
    }

    input {
        width: 100%;
        height: 54.9px;
        padding: 0px 1rem;
        background: #ffffff;
        border: 0.800654px solid #d3d3d3;
        border-radius: 4.57516px;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border: none;
        border: 1px solid #933d0c;
    }

    p {
        margin-top: 5px;
        color: red;
        font-size: 12px;
    }
`;
