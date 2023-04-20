import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 0 2rem;
    margin: 0 auto;
    margin-top: 7rem;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
`;

const CreateAssignPOSContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 20px 0px;
    margin-left: auto;
    height: 60.74px;
    margin-bottom: 1rem;
    cursor: pointer;
    background: #933d0c;
    box-shadow: 0px 1.81212px 3.62425px 1.35909px rgba(0, 0, 0, 0.15),
        0px 0.453031px 1.35909px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
`;

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

    h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #292929;
        margin: 0;
        margin-bottom: 12px;
    }

    p {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.01em;
        margin: 0;
        color: #7a7a7a;
    }
`;

const SelectSearchFilter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
`;

const SelectSearchBar = styled.div`
    width: 35%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SearchFilters = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: auto;

    button:nth-child(2),
    button:nth-child(3) {
        width: 10vw;
        margin-left: 1rem;
    }
`;

const CreatePosBtn = styled.div`
    font-style: normal;
    font-weight: 400;
    padding-left: 45px;
    font-size: 16.0746px;
    line-height: 18px;
    color: #ffffff;
`;
const AssignMultipleDeviceBtn = styled.div`
    padding-left: 25px;
    padding-right: 25px;
`;

export {
    Container,
    Header,
    CreateAssignPOSContainer,
    HeaderTitle,
    SelectSearchFilter,
    AssignMultipleDeviceBtn,
    SelectSearchBar,
    SearchFilters,
    CreatePosBtn,
};
