import styled from 'styled-components';
import { useRouter, Router } from 'next/router'

interface DisplayProps {
    url: string;
    name: string;
    imageURL: string;
    description: string;
}

const Container = styled("div")`
    display:flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid #444;
    background: #fff;
    cursor:pointer;
  
    margin-bottom: 40px;

    div{
        width: 100%;
        text-align: center;
    }

    img{
        margin: 0 0;
        padding: 10px 0;
        max-width: 45%;
        height: auto;
    }

    .name ,.img{
        border-bottom: 1px solid #444;
    }
    .description{
        margin: 0 0;
        padding: 0;
    }
`


const DisplayComponent: React.FC<DisplayProps> = ({ url, name, imageURL, description }) => {
    const router = useRouter();
    return (

      
            <Container onClick={ () => router.push(url) }>
                <div className="name">
                    <p>{name}</p>
                </div>
                <div className="img">
                    <img src={imageURL} alt="" />
                </div>
                <div className="description">
                    <p>{description? description : "We couldn't find a description."}</p>
                </div>
            </Container>
       

    );
}

export default DisplayComponent;