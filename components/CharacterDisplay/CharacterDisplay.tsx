import { useEffect, useState } from 'react';
import { GiBrokenHeart, GiHearts } from 'react-icons/gi';
import dataCharacters from '../../localstorage/dataCharacters';

interface Character{
    id : string,
    name : string;
    description: string;
    imgURL: string;
    comics : string[];
    stories : string[];
}


const CharacterDisplay : React.FC<Character> = ({id,name , description, imgURL, comics, stories}) =>{

    const [band, setBand] = useState(false);

    const modificarFavorito = (band, id, url) => {
        const [getAllCharacters, saveCharacter, getCharacter, deleteCharacter] = dataCharacters();
        if (band) {
            saveCharacter(id, url);
        } else {
            deleteCharacter(id);
        }
        setBand(band);
    }

    useEffect(() => {
        const [getAllCharacters, saveCharacter, getCharacter, deleteCharacter] = dataCharacters();
        setBand(getCharacter(id));
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
                <div>{name}</div>
                <div>{description}</div>
                <div>
                    <img src={imgURL} alt="" />
                </div>
                <div>
                    <ul>
                        {comics.map((v,k) =>(
                            <li key={k}>{v}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul>
                        {stories.map((v,k) =>(
                            <li key={k}>{v}</li>
                        ))}
                    </ul>
                </div>
            </div>
      
    );
}

export default CharacterDisplay;