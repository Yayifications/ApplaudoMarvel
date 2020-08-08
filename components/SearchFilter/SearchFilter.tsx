import styled from "styled-components";

interface SearchFilterFace {
    types: string[],
    selected: number;
    onClick: (e:any) => void;
}

const Container = styled("div")`

    .selected{
        color: #f00;
    }
`;

const Type = styled("a")`
    padding: 0 10px;
    cursor: pointer;
    `;

const SearchFilter: React.FC<SearchFilterFace> = ({ types, selected, onClick }) => {
    return (
        <Container>
            <span>Filter by:</span>
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
        </Container>
    );
}

export default SearchFilter;