import dataComics from '../../localstorage/dataComics'
import { useEffect, useState } from 'react';
import { GiBrokenHeart, GiHearts } from 'react-icons/gi';
import styled from 'styled-components';

const ComicInfoContainer = styled("div")`
    display:flex;
    align-items:center;
    flex-direction: column;
    margin: 10px 10%;
    background: #fff;
    border: 1px solid #444;
    text-align: center;
    div{
        width:100%;
        margin: 10px 0;
        border-bottom: 1px solid #444;
    }
    ul{
        list-style: none;
    }
`
    ;

interface Comic {
    id: string;
    issueNumber: string;
    title: string;
    description: string;
    imgURL: string;
    characters: string[];
    stories: string[];
}

const ComicDisplay: React.FC<Comic> = ({ id, issueNumber, title, description, imgURL, characters, stories }) => {
    const [band, setBand] = useState(false);

    const modificarFavorito = (band, id, url) => {
        const [getAllComics, saveComic, getComic, deleteComic] = dataComics();
        if (band) {
            saveComic(id, url);
        } else {
            deleteComic(id);
        }
        setBand(band);
    }

    useEffect(() => {
        const [getAllComics, saveComic, getComic, deleteComic] = dataComics();
        setBand(getComic(id));
    }, []);

    return (
        <ComicInfoContainer>
            {band ?
                <div onClick={() => { modificarFavorito(false, id, imgURL) }}>
                    <GiHearts />
                </div>
                : <div onClick={() => { modificarFavorito(true, id, imgURL) }}>
                    <GiBrokenHeart />
                </div>}
            <div>
                {issueNumber}
            </div>
            <div>
                {title}
            </div>
            <div>
                {description}
            </div>
            <div>
                <img src={imgURL} alt="" />
            </div>
            <div>
                <span>Characters</span>
                <ul>
                    {characters.length > 0 ? characters.map((v, k) => (
                        <li key={k}>{v}</li>
                    )) : <p>There are no Characters associated with this comic.</p>}
                </ul>
            </div>
            <div>
                <span>Stories</span>
                <ul>
                    {stories.length > 0?stories.map((v, k) => (
                        <li key={k}>{v}</li>
                    )):<p>There are no stories associated with this comic.</p>}
                </ul>
            </div>
        </ComicInfoContainer>
    );

}

export default ComicDisplay;