import styled from "styled-components";
import searchIcon from "../../assets/common/search.svg";
import arrowDown from "../../assets/common/arrow-down.svg";

function TableSelectSearchBar({
    options,
    selectOnChange,
    searchInputOnChange,
    placeholder,
    onClickSearchIcon,
    onClickClear,
    showClearSearch,
    searchInputValue,
}) {
    return (
        <Container>
            <SelectContainer>
                <select onChange={selectOnChange}>
                    {Object.keys(options).map((key) => (
                        <option key={key} value={options[key]}>
                            {key}
                        </option>
                    ))}
                </select>
            </SelectContainer>
            <SearchBar>
                <input
                    type={"text"}
                    name={"text"}
                    placeholder={placeholder}
                    onChange={searchInputOnChange}
                    value={searchInputValue}
                />
                <img src={searchIcon} alt="" onClick={onClickSearchIcon} />
            </SearchBar>
            {showClearSearch && (
                <ClearSearch onClick={onClickClear}>
                    <span>Clear</span>
                </ClearSearch>
            )}
        </Container>
    );
}

export default TableSelectSearchBar;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60%;
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
        border-right: none;
        border-radius: 4.5px 0 0 4.5px;
    }
`;

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
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

    input {
        width: 100%;
        height: 48px;
        padding: 0px 1rem;
        background: #ffffff;
        border: 1px solid #d3d3d3;
        border-radius: 0 4.5px 4.5px 0;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border: none;
        border: 1px solid #933d0c;
    }
`;

const ClearSearch = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    cursor: pointer;
`;
