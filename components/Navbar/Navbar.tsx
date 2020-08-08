import Link from "next/link";
import { useRouter } from 'next/router'
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { GiOverkill, GiHearts, GiOpenBook } from 'react-icons/gi';

const NavDiv = styled("div")`
    display:flex;
    margin:0;
    padding-left:20px;
    background: #fff;
    align-items: center;
    font-family: helvetica;
    justify-content: center;
    color: #454545;
    font-size: 10px;
    border-top: 1px solid #454545;
    border-bottom: 1px solid #454545;
  
    .buttonContainer{
        margin-left : 22%;
        display:flex;
        flex-direction: row;
    }

    .button{
        margin:0 20px;
        color: #454545;
        cursor: pointer;
    }

    .button: hover{
        color: #f44;
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