import { useState, useEffect } from "react";
import MarvelURL from "../../utils/marvelUrl";
import axios from "axios";
import DisplayComponent from "../DisplayComponent/DisplayComponent";
import InfiniteScroll from "react-infinite-scroller";
import SearchFilter from "../SearchFilter/SearchFilter";
import FavoriteCharacters from "../FavoriteCharacters";
import styled from "styled-components";

const defaultParams = {
  limit: 10,
  filterType: "",
  filter: "",
};
const filterTypes = {
  name: "&nameStartsWith=",
  comics: "&comics=",
  stories: "&stories=",
};
const MainScrollComponent = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: row-reverse;
  justify-content: center;
  @media screen and (max-width: 992px) {
    /* your code here */
    flex-direction: column;
  }
`;
const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding: 0 20px;
`;
const CharacterBrowser: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [params, setParams] = useState({ ...defaultParams });
  const [loading, setLoading] = useState(false);

  const loadData = async (band?: boolean) => {
    setLoading(false);
    let marvel = [""];
    if (band) {
      marvel = MarvelURL(
        `characters?orderBy=name&limit=${params.limit}&offset=${
          offset * params.limit
        }${filterTypes[params.filterType] + params.filter}`
      );
      setOffset(offset + 1);
    } else {
      marvel = MarvelURL(
        `characters?orderBy=name&limit=${params.limit}&offset=0${
          filterTypes[params.filterType] + params.filter
        }`
      );
      setOffset(1);
    }
    axios
      .get(marvel[0])
      .then((res) => {
        const data = res.data.data;
        if (data.results.length > 0) {
          if (band) {
            setCharacters([...characters, ...data.results]);
          } else {
            setCharacters([...data.results]);
          }
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFilterChange = (e) => {
    if (params.filterType != "") {
      setParams({
        ...defaultParams,
        filter: e.target.value,
        filterType: params.filterType,
      });
    } else {
      setParams({
        ...defaultParams,
      });
    }
  };
  const onFilterTypeChange = (e) => {
    setParams({
      ...defaultParams,
      filterType: e.target.name,
    });
  };
  const onFilter = () => {
    setLoading(false);
    setCharacters([]);
    loadData(false);
  };
  var items = [];
  characters.map((obj, index) => {
    items.push(
      <DisplayComponent
        id={obj.id}
        tipo={1}
        key={index}
        url={`/character/${obj.id}`}
        name={obj.name}
        description={obj.description}
        imageURL={obj.thumbnail.path + "." + obj.thumbnail.extension}
      />
    );
  });
  useEffect(() => {
    loadData(true);
  }, []);
  return (
    <div>
      <FavoriteCharacters />
      <MainScrollComponent>
        <SearchFilter
          onClick={onFilterTypeChange}
          types={Object.keys(filterTypes)}
          value={params.filter}
          selected={Object.keys(filterTypes).indexOf(params.filterType)}
          onFilterChange={onFilterChange}
          onFilter={onFilter}
        />
        <CardListContainer>
          {items.length > 0 ? (
            <InfiniteScroll
              className="scroll"
              pageStart={0}
              loadMore={() => {
                loadData(true);
              }}
              hasMore={loading}
              threshold={800}
            >
              {items}
            </InfiniteScroll>
          ) : (
            <p>No Search Results Found</p>
          )}
        </CardListContainer>
      </MainScrollComponent>
    </div>
  );
};
export default CharacterBrowser;
