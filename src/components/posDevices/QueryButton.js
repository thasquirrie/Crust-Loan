import styled from "styled-components"


const QueryButton = ({ text, onChange, active }) => {
  return (
    <SeacrhBtn active onClick={onChange}>
      {text}
    </SeacrhBtn>
  )
}

export default QueryButton


const SeacrhBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 14px;
    width: 141px;
    height: 48px;
    // background: rgba(224, 224, 224, 0.12);
    // background-color: ${props => (props.active ? 'red' : 'green')};
 
    border: 0.5px solid #D3D3D3;
`

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