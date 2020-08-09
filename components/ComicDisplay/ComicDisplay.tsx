import { saveComic, getComic, deleteComic } from "../../utils/dataComics";
import { useEffect, useState } from "react";
import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import styled from "styled-components";
import DisplayComponent from "../DisplayComponent/DisplayComponent";
import { IconContext } from "react-icons";

const Container = styled.div`
  margin: 20px 100px;
  .icon{
    color: #cc1800;
    margin: 10px 0;
    text-align: center;
    :hover{
      color: #780000;
    }
  }
`;

const ComicInfoContainer = styled("div")`
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

interface Comic {
  id: string;
  issueNumber: string;
  title: string;
  description: string;
  imgURL: string;
  characters: string[];
  stories: string[];
}

const ComicDisplay: React.FC<Comic> = ({
  id,
  issueNumber,
  title,
  description,
  imgURL,
  characters,
  stories,
}) => {
  const [band, setBand] = useState(false);

  const modificarFavorito = (band, id, url) => {
    if (band) {
      saveComic(id, url);
    } else {
      deleteComic(id);
    }
    setBand(band);
  };

  useEffect(() => {
    setBand(getComic(id));
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
          tipo={2}
          description={description}
          name={title}
          imageURL={imgURL}
        />
        <ComicInfoContainer>
          <div className="container1">
            <div className="title">Characters</div>
            <ul>
              {characters.length > 0 ? (
                characters.map((v, k) => <li key={k}>{v}</li>)
              ) : (
                <p>There are no Characters associated with this comic.</p>
              )}
            </ul>
          </div>
          <div className="container1">
            <div className="title">Stories</div>
            <ul>
              {stories.length > 0 ? (
                stories.map((v, k) => <li key={k}>{v}</li>)
              ) : (
                <p>There are no stories associated with this comic.</p>
              )}
            </ul>
          </div>
        </ComicInfoContainer>
      </Container>
    </>
  );
};

export default ComicDisplay;
