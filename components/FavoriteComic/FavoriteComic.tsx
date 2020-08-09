import { useState, useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import {getAllComics} from "../../utils/dataComics";
import styled from "styled-components";

const FavoritesContainer = styled("div")`
  margin: 20px;
  background: #fff;
  -webkit-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
  box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  img {
    margin: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    @media screen and (max-width: 992px) {
      width : 50px;
      height: 50px;
    }
  }
`;

const FavoriteComics: React.FC = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const o = getAllComics();
    const keys = Object.keys(o);
    const data = [];
    keys.map((v, k) => {
      data[v] = o[v];
    });
    setFavorites([...data]);
  }, []);

  return (
    <FavoritesContainer>
      {favorites.length > 0 ? (
        favorites.map((v, k) => (
          <div key={k} onClick={() => router.push(`/comics/${k}`)}>
            <img src={v} />
          </div>
        ))
      ) : (
        <p>You have no favorite Comics.</p>
      )}
    </FavoritesContainer>
  );
};

export default FavoriteComics;
