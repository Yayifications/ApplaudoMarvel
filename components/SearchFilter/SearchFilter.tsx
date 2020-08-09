import styled from "styled-components";
import Button from '../Styled/Button'
interface SearchFilterFace {
  types: string[],
  selected: number;
  value: string;
  onClick: (e: any) => void;
  onFilterChange: (e: any) => void;
  onFilter: (e: any) => void;
}
const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  font-family: 'Oswald', sans-serif;
`
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    align-items:center;
    background: #fff;
    font-size: 16px;
    font-family: 'Oswald', sans-serif;
    margin: 0 20px;
    margin-bottom: 20px;
    -webkit-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    .item{
        margin: 10px 0;
    }
    .selected{
        background: #f00;
        color: #fff;
    }
    @media screen and (min-width: 992px) {
 /* your code here */
      width: 400px;
      min-width: 400px;
      margin-left: 5%;
      margin-right: 20px;
      height: 200px;
  }
`;
const Type = styled("button")`
    margin: 10px;
    padding: 0 10px;
    cursor: pointer;
`;
const SearchFilter: React.FC<SearchFilterFace> = ({ types, selected, value, onClick, onFilterChange, onFilter }) => {
  return (
    <Container className="filter">
      <span className="item">Filter by:</span>
      <div className="item">
        {
          types.map((v, k) => (
            <Button
              onClick={onClick}
              key={k}
              name={v}
              aria-label="filter"
              selected={k === selected}
            >
              {v.charAt(0).toUpperCase() + v.substring(1)}
            </Button>
          ))
        }
      </div>
      <div className="item">
        <Input onChange={onFilterChange} value={value} />
        <Button onClick={onFilter}>Filter</Button>
      </div>
    </Container>
  );
}
export default SearchFilter;