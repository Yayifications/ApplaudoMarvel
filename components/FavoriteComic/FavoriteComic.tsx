import { useState, useReducer, useEffect } from "react"
import { useRouter } from "next/router";
import dataComics from '../../localstorage/dataComics';
import styled from 'styled-components';

const FavoritesContainer = styled("div")`
    margin: 20px;
    background: #fff;
    border: 1px solid #454545;
    display:flex;
    flex-direction: row;
    img{
        margin:10px;
        cursor:pointer;
        border: 1px solid #444;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
    }
`;

const FavoriteComics: React.FC = () => {
    const [favorites, setFavorites] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const [getAllComics, saveComic, getComic, deleteComic] = dataComics();
        const o = getAllComics();
        const keys = Object.keys(o);
        const data = [];
        keys.map((v, k) => {
            data[v] = o[v];
        })
        setFavorites([...data]);
    })

    return (
        <FavoritesContainer>
            {favorites.length > 0 ?
                favorites.map((v, k) => (
                    <div key={k} onClick={() => router.push(`/comics/${k}`)}>
                        <img src={v} />
                    </div>

                ))
                :
                <p>You have no favorite Comics.</p>
            }
        </FavoritesContainer>
    )
}

export default FavoriteComics;