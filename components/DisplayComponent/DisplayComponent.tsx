import styled from 'styled-components';
import { useRouter, Router } from 'next/router'
import { useState , useEffect } from 'react';
import { GiBrokenHeart, GiHearts } from "react-icons/gi";
import { saveComic, getComic, deleteComic } from "../../utils/dataComics";
import { saveCharacter, getCharacter,deleteCharacter} from "../../utils/dataCharacters";


interface DisplayProps {
  url?: string;
  tipo: number;
  id: string;
  name: string;
  imageURL: string;
  description: string;
}
const Container = styled<{ hover: boolean }>("div")`
    display:flex;
    align-items: center;
    font-family: 'Oswald', sans-serif;
    flex-direction: column;
    background: #fff;
    
    -webkit-box-shadow: 6px 9px 25px -11px rgba(0,0,0,0.42);
    -moz-box-shadow: 6px 9px 25px -11px rgba(0,0,0,0.42);
    box-shadow: 6px 9px 25px -11px rgba(0,0,0,0.42);
    margin-bottom: 40px;
    transition: all .2s ease-in-out;
    ${({ hover }) => hover ? ':hover { transform: scale(1.02);}' : ''}
    ${({ hover }) => hover ? 'cursor:pointer;' : ''}
    div{
        width: 100%;
    }
    img{
        margin: 0 0;
        padding: 10px 0;
        max-width: 45%;
        height: auto;
    }
    .img {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      background-color: #1c1c1c;
    }
    .name {
      background-color: #cc1800;
      color: white;
      font-size: 18pt;
      font-weight: bolder;
      padding-left: 20px;
      -webkit-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
      box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    }
    .description{
        margin: 0 0;
        >p {
          padding: 20px;
        }
    }
    @media screen and (min-width: 992px) {
      min-height: 500px;
      min-width: 600px;
  }
`

const DisplayComponent: React.FC<DisplayProps> = ({ tipo,id,url, name, imageURL, description }) => {
  const router = useRouter();
  const [band,setBand] = useState(false);

  return (

    <Container onClick={() => url && router.push(url)} hover={!!url}> 
      <div className="name">
        <p>{name}</p>
      </div>
      <div className="img" >
        <img src={imageURL} alt="" />
      </div>
      <div className="description">
        <p>{description ? description : "We couldn't find a description."}</p>
      </div>
    </Container>

  );
}
export default DisplayComponent;