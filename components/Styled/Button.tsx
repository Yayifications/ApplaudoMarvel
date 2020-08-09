import styled from "styled-components";

interface ButtonProps {
  selected: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ selected }) => (selected ? "#1c1c1c" : "#cc1800")};
  color: white;
  font-family: "Oswald", sans-serif;
  padding: 10px;
  font-size: 16pt;
  border: none;
  margin: 0 3px;
  :hover {
    background-color: #780000;
    color: #f2f2f2;
  }
`;
export default Button;
