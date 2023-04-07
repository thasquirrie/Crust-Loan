import styled from "styled-components";
import arrowDown from "../../assets/common/arrow-down.svg";

function SelectCommon({ options, onChange, value }) {
    return (
        <SelectContainer>
            <select onChange={onChange} value={value}>
                {options &&
                    Object.keys(options).map((key) => (
                        <option key={key} value={key}>
                            {options[key]}
                        </option>
                    ))}
            </select>
        </SelectContainer>
    );
}

export default SelectCommon;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url(${arrowDown});
        background-repeat: no-repeat;
        background-position-x: 91%;
        background-position-y: 12px;
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        padding: 0 1rem;
        padding-right: 2.5rem;
        width: 100%;
        height: 48px;
        border: 1px solid #d3d3d3;
        border-radius: 4.5px;
        outline: none;
    }
`;
