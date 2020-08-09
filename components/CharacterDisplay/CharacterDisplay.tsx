import { useEffect, useState } from "react";
import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import {
  saveCharacter,
  deleteCharacter,
  getCharacter,
} from "../../utils/dataCharacters";
import styled from "styled-components";
import DisplayComponent from "../DisplayComponent/DisplayComponent";
import { IconContext } from "react-icons";

const Container = styled.div`
  margin: 20px 100px;
  .icon{
    color: #cc1800;
    margin: 20px 0;
    text-align: center;

    :hover{
      color: #780000;
    }
  }
`;

const CharacterInfoDisplay = styled("div")`
  display: flex;
  flex-direction: column;
  font-family: "Oswald", sans-serif;

  div {
    -webkit-box-shadow: 0px 4px 17px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 4px 17px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 4px 17px -6px rgba(0, 0, 0, 0.75);
  }
  ul {
    list-style: none;
  }
  .title {
    background-color: #1c1c1c;
    color: white;
    font-size: 16pt;
    font-weight: 900;
    padding: 10px;
  }

  .container1 {
    margin-bottom: 20px;
  }
`;

interface Character {
  id: string;
  name: string;
  description: string;
  imgURL: string;
  comics: string[];
  stories: string[];
}

const CharacterDisplay: React.FC<Character> = ({
  id,
  name,
  description,
  imgURL,
  comics,
  stories,
}) => {
  const [band, setBand] = useState(false);
  const modificarFavorito = (band, id, url) => {
    if (band) {
      saveCharacter(id, url);
    } else {
      deleteCharacter(id);
    }
    setBand(band);
  };

  useEffect(() => {
    setBand(getCharacter(id));
  }, []);

  return (
    <>
      <Container>
      <IconContext.Provider value={{ size: "3em" }}>
      {band ? (
          <div className="icon"
            onClick={() => {
              modificarFavorito(false, id, imgURL);
            }}
          >
            <GiHearts />
          </div>
        ) : (
          <div className="icon"
            onClick={() => {
              modificarFavorito(true, id, imgURL);
            }}
          >
            <GiBrokenHeart />
          </div>
        )}
      </IconContext.Provider>
        
        <DisplayComponent
          id={id}
          tipo={1}
          description={description}
          name={name}
          imageURL={imgURL}
        />
        <CharacterInfoDisplay>
          <div className="container1">
            <div className="title">Comics</div>
            <ul>
              {comics.length > 0 ? (
                comics.map((v, k) => <li key={k}>{v}</li>)
              ) : (
                <p>There are no comics associated with this Character.</p>
              )}
            </ul>
          </div>
          <div className="container1">
            <div className="title">Stories</div>
            <ul>
              {stories.length > 0 ? (
                stories.map((v, k) => <li key={k}>{v}</li>)
              ) : (
                <p>There are no stories associated with this Character.</p>
              )}
            </ul>
          </div>
        </CharacterInfoDisplay>
      </Container>
    </>
  );
};
export default CharacterDisplay;
