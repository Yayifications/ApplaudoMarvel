import { useState, useEffect } from "react";
import MarvelURL from "../../utils/marvelUrl";
import axios from "axios";
import DisplayComponent from "../DisplayComponent/DisplayComponent";
import InfiniteScroll from "react-infinite-scroller";
import SearchFilter from "../SearchFilter/SearchFilter";
import FavoriteComic from "../FavoriteComic";
import styled from "styled-components";
import BrowseContainer from "../../styles/styles";

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

const defaultParams = {
  limit: 5,
  filterType: "",
  filter: "",
};

const filterTypes = {
  format: "&format=",
  title: "&titleStartsWith=",
  issueNumber: "&issueNumber=",
};

const ComicBrowser: React.FC = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);
  const [params, setParams] = useState({ ...defaultParams });
  const [loading, setLoading] = useState(false);

  const loadData = async (band?: Boolean) => {
    setLoading(false);
    let marvel = [""];
    if (band) {
      marvel = MarvelURL(
        `comics?orderBy=issueNumber&limit=${params.limit}&offset=${
          offset * params.limit
        }${filterTypes[params.filterType] + params.filter}`
      );
      setOffset(offset + 1);
    } else {
      marvel = MarvelURL(
        `comics?orderBy=issueNumber&limit=${params.limit}&offset=0${
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
            setComics([...comics, ...data.results]);
          } else {
            setComics([...data.results]);
          }

          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFilterChange = (e) => {
    setParams({
      ...defaultParams,
      filter: e.target.value,
      filterType: params.filterType,
    });
  };

  const onFilterTypeChange = (e) => {
    setParams({
      ...defaultParams,
      filterType: e.target.name,
    });
  };

  const onFilter = () => {
    setOffset(0);
    setLoading(false);
    setComics([]);
    loadData(false);
  };

  var items = [];
  comics.map((obj, index) => {
    items.push(
      <DisplayComponent
        id={obj.id}
        tipo={2}
        key={index}
        url={`/comics/${obj.id}`}
        name={obj.title}
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
      <FavoriteComic />

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
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
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

export default ComicBrowser;
