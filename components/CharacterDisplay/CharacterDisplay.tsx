import { useEffect, useState } from 'react';
import { GiBrokenHeart, GiHearts } from 'react-icons/gi';
import dataCharacters from '../../localstorage/dataCharacters';
import styled from 'styled-components';

const CharacterInfoDisplay = styled("div")`
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
     
            <CharacterInfoDisplay>
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
                    <span>Comics</span>
                    <ul>
                        {comics.length > 0?comics.map((v,k) =>(
                            <li key={k}>{v}</li>
                        )):<p>There are no comics associated with this Character.</p>}
                    </ul>
                </div>
                <div>
                    <span>Stories</span>
                    <ul>
                        {stories.length > 0?stories.map((v,k) =>(
                            <li key={k}>{v}</li>
                        )):<p>There are no stories associated with this Character.</p>}
                    </ul>
                </div>
            </CharacterInfoDisplay>
      
    );
}

export default CharacterDisplay;