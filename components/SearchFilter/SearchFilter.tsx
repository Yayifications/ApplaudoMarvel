import styled from "styled-components";

interface SearchFilterFace {
    types: string[],
    selected: number;
    value : string;
    onClick: (e: any) => void;
    onFilterChange: (e : any) =>void;
    onFilter: (e:any) => void;
}

const Container = styled("div")`
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 15%;
    background: #fff;
    border: 1px solid #444;
    .item{
        margin: 10px 0;
    }
    .selected{
        background: #f00;
        color: #fff;
    }
    input{
        margin: 0 10px;
    }
`;

const Type = styled("button")`
    margin: 10px;
    padding: 0 10px;
    cursor: pointer;
`;

const SearchFilter: React.FC<SearchFilterFace> = ({ types, selected, value, onClick ,onFilterChange,onFilter}) => {
    return (
        <Container className="filter">
            <span className="item">Filter by:</span>
            <div className="item"> 
               
                {
                    types.map((v, k) => (
                        <Type
                            onClick={onClick}
                            key={k}
                            name={v}
                            aria-label="filter"
                            className={k == selected ? "selected" : ""}
                        >
                            {v.charAt(0).toUpperCase() + v.substring(1)}
                        </Type>
                    ))
                }
            </div>
            <div className="item"> 
                <input onChange={onFilterChange} value={value} />
                <button onClick={onFilter}>Filter</button>
            </div>
          
        </Container>

    );
}

export default SearchFilter;