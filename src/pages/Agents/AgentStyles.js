import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: flex-start;
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
    margin-bottom: 43px;
`;

const HeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
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
        // width: 10vw;
        margin-left: 1rem;
    }
`;

const AdminContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    h1 {
        font-family: "DM Sans";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 27px;
        color: #292929;
    }
    p {
        width: 29.1px;
        height: 29.1px;
        color: #fff;
        background: #00a89b;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        margin-left: 31px;
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
    AdminContainer,
};
