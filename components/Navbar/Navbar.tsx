import Link from "next/link";
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { GiOverkill, GiHearts, GiOpenBook } from 'react-icons/gi';

const NavDiv = styled("div")`
    display:flex;
    margin:0;
    padding-left:20px;
    background-color: #cc1800;
    color: white;
    font-size: 10pt;
    font-weight: bolder;
    align-items: center;
    font-family: 'Oswald', sans-serif;
    justify-content: center;
    -webkit-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 4px 17px -6px rgba(0,0,0,0.75);
  
    .buttonContainer{
        margin-left : 22%;
        display:flex;
        flex-direction: row;
    }

    .button{
        margin:0 20px;
        color: white;
        cursor: pointer;
    }

    .button: hover{
        color: #780000;
    }

    
`;

const NavBar : React.FC = () => {
    const router = useRouter()
    return  (
        <IconContext.Provider value={{ size: "3em" }}>
            <NavDiv>
                <h1>Marvel Page</h1>
                <div className="buttonContainer">
                    <div className="button"  onClick={ () => router.push('/')}><GiOverkill /></div>
                    <div className="button"  onClick={ () => router.push('/comics')}><GiOpenBook /></div>
                </div> 
            </NavDiv> 
        </IconContext.Provider>
    
    );
}

export default NavBar;