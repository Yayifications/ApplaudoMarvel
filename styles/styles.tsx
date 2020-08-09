import styled from 'styled-components';

const BrowseContainer = styled('div')`
    display:flex;
    justify-content:center;
    align-items: flex-start;
    .scroll{
        order:1;
        width: 50%
    }

    .filter{
        margin-left:20px;
       order:2; 
    }

`;

export default BrowseContainer;