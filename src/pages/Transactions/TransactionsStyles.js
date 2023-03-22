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

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;

    h1 {
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: -0.01em;
        color: #292929;
        margin: 0;
        margin-bottom: 0.8rem;
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

const DownloadButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 15%;
    margin-left: auto;
    margin-bottom: 1rem;
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

    div:nth-child(2),
    div:nth-child(3) {
        width: 10vw;
        margin-left: 1rem;
    }
`;

export {
    Container,
    Header,
    HeaderTitle,
    DownloadButtonContainer,
    SelectSearchFilter,
    SelectSearchBar,
    SearchFilters,
};
