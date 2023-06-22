import styled from 'styled-components';
import arrowDown from '../../assets/common/arrow-down.svg';

function SelectCommonModified({ options, onChange, value, disabled }) {
  return (
    <SelectContainer>
      <select onChange={onChange} value={value} disabled={disabled}>
        <option>Select a cluster</option>
        {options &&
          Object.keys(options).map((key) => {
            return (
              <option key={key} value={options[key].name}>
                {options[key].name}
              </option>
            );
          })}
      </select>
    </SelectContainer>
  );
}

export default SelectCommonModified;

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
    background-position-x: 95%;
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
