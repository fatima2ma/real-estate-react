import styled from 'styled-components';

const Wrraper = styled.div`
    width: 50%;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 840px){
        width: 80%;
    }
`;

function MidWrraper({children}){
    return(
        <Wrraper>{children}</Wrraper>
    )
}

export default MidWrraper;