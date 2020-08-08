import NavBar from '../Navbar/Navbar';
import Head from "next/head";
import styled from 'styled-components';

const MyFooter = styled("footer")`
    width: 100%;
    position: fixed;
    text-align: center;
    left: 0;
    bottom:0;
    font-family: helvetica;
    background: #fff;
    color: #454545;
    border-top: 1px solid #454545;
    border-bottom: 1px solid #454545;
`;



const Layout = (props) => (

    <div>
        <Head>
            <title>Marvel Page</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavBar />
        <div className="container">
            {props.children}
        </div>
       
    </div>
)

export default Layout;