import styled from "styled-components";

const QueryButton = ({ text, onChange, active }) => {
    return (
        <SeacrhBtn active={active} onClick={onChange}>
            <p>{text}</p>
        </SeacrhBtn>
    );
};

export default QueryButton;

const SeacrhBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 14px;
    width: 8rem;
    height: 48px;
    border-radius: 4px;
    background: rgba(224, 224, 224, 0.12);
    border: 0.5px solid ${({ active }) => (active ? "#933D0C" : "#d3d3d3;")};
    box-sizing: border-box;

    p {
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.1rem;
        color: #474747;
        margin: 0;
    }
`;

// import styled from 'styled-components';

// const Button = ({ type, children }) => {
//   return (
//     <ButtonComponent type={type}>
//       {children}
//     </ButtonComponent>
//   );
// };

// const ButtonComponent = styled.button`
//   height: 44px;
//   border-radius: 4px;
//   font-size: 12px;
//   font-family: Arial;
//   font-weight: 900;
//   padding: 16px 32px;
//   margin: 20px;
//   color: #ffffff;
//   background-color: ${({ type }) => backgroundColors[type]};
//   :hover {
//     background-color: ${({ type }) => hoverBgColors[type]};
//   }
// `;

// const backgroundColors = {
//   primary: '#1C76E2',
//   warning: '#E10D30',
//   default: '#155EC2',
//   success: '#12AC3F',
// };

// const hoverBgColors = {
//   primary: '#15447D',
//   warning: '#900B21',
//   default: '#0C3875',
//   success: '#0B6F29',
// };

// export default Button;

// https://medium.com/@erica13chai/exploring-ways-to-use-styled-components-with-buttons-94d096db51a7
