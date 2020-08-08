import Layout from '../components/Layout/Layout';
import CharacterBrowser from '../components/CharacterBrowser';


const Home : React.FC = () => {
    return (
        <Layout>
            <CharacterBrowser />
        </Layout>
    );
}

export default Home;