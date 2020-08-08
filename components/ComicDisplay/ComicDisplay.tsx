import dataComics from '../../localstorage/dataComics'
import { useEffect, useState } from 'react';
import { GiBrokenHeart, GiHearts } from 'react-icons/gi';

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
        <div>
            {band ?
                <div onClick={()=>{modificarFavorito(false,id,imgURL)}}>
                    <GiHearts />
                </div>
                : <div onClick={()=>{modificarFavorito(true,id,imgURL)}}>
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
                <ul>
                    {characters.map((v, k) => (
                        <li key={k}>{v}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {stories.map((v, k) => (
                        <li key={k}>{v}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default ComicDisplay;