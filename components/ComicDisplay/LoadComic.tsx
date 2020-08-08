import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import MarvelURL from '../../variables/marvelUrl';
import axios from 'axios';
import ComicDisplay from './ComicDisplay';

const LoadComic : React.FC = () => {
    const router = useRouter();
    const { comicId } = router.query;
    const [comic, setComic] = useState([]);

    const cargarComic = async () => {
        const marvel = MarvelURL("comics/" + comicId + "?");
        axios.get(marvel[0])
            .then( res => {
                const data = res.data.data;
                console.log(data.results);
                setComic([...data.results]);
            })
            .catch( error => {
                console.log(error);
            }
                
            )
        
    }

    useEffect(() => {
        if (comicId) {
            cargarComic();
        }

    },[comicId])


    if (comic.length > 0) {
        return (

            <Layout>
                <ComicDisplay
                    id={comic[0].id}
                    title={comic[0].title}
                    issueNumber={comic[0].issueNumber}
                    description={comic[0].description? comic[0].description : "We couldn't find a description." }
                    imgURL={comic[0].thumbnail.path+"."+comic[0].thumbnail.extension}
                    characters={comic[0].characters.items.map(c => c.name)}
                    stories={comic[0].stories.items.map(c => c.name)}
                />
            </Layout>
        )
    } else {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>

        )
    }
}

export default LoadComic;