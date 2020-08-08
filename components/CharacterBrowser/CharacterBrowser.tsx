import { useState, useEffect } from "react";
import MarvelURL from '../../variables/marvelUrl';
import axios from 'axios';
import DisplayComponent from "../DisplayComponent/DisplayComponent";
import InfiniteScroll from 'react-infinite-scroller';
import SearchFilter from "../SearchFilter/SearchFilter";
import FavoriteCharacters from "../FavoriteCharacters";
import styled from 'styled-components';

const defaultParams = {
    limit: 5,
    filterType: "",
    filter: "",
}

const filterTypes = {
    name: "&nameStartsWith=",
    comics: "&comics=",
    stories: "&stories="
};

const CharacterBrowser: React.FC = () => {
    const [characters, setCharacters] = useState([]);
    const [offset, setOffset] = useState(0);
    const [params, setParams] = useState({ ...defaultParams });
    const [loading, setLoading] = useState(false);
    
    const loadData = async (band?: boolean) => {
        setLoading(false);
        const marvel = MarvelURL(`characters?orderBy=name&limit=${params.limit}&offset=${offset * params.limit}${filterTypes[params.filterType] + params.filter}`);

        axios.get(marvel[0])
            .then(res => {
                const data = res.data.data;

                if (data.results.length > 0) {
                    if (band) {
                        setOffset(offset + 1);
                        setCharacters([...characters,...data.results]);

                    } else {
                        setOffset(0);
                        setCharacters([...data.results]);

                    }

                    setLoading(true);
                }
            })
            .catch(error => {
                console.log(error);
            }

        )
    }

    const onFilterChange = e => {
        setParams({
            ...defaultParams,
            filter: e.target.value,
            filterType: params.filterType
        })
    }

    const onFilterTypeChange = e => {
        setParams({
            ...defaultParams,
            filterType: e.target.name
        })
    }

    const onFilter = () => {
        setOffset(0);
        setLoading(false);
        setCharacters([]);
        loadData(false);
    }

    var items = [];
    characters.map((obj, index) => {
        items.push(
            <DisplayComponent
                key={index}
                url={`/character/${obj.id}`}
                name={obj.name}
                description={obj.description}
                imageURL={obj.thumbnail.path + "." + obj.thumbnail.extension}
            />
        );
    })

    useEffect(() => {
        loadData(true);
    }, []);

    return (
        <div>
            <FavoriteCharacters />
            <div>
                <div>
                    <input onChange={onFilterChange} value={params.filter} />
                </div>
                <SearchFilter
                    onClick={onFilterTypeChange}
                    types={Object.keys(filterTypes)}
                    selected={Object.keys(filterTypes).indexOf(params.filterType)}
                />
                <button onClick={onFilter}>Filter</button>
            </div>
            {items.length > 0 ?
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {
                        loadData(true)
                    }}
                    hasMore={loading}
                    threshold={800}
                    loader={<div className="loader" key={0}>Loading ...</div>}>
                    {items}
                </InfiniteScroll> : <p>No Search Results Found</p>}
        </div>


    );



}

export default CharacterBrowser;