import styled from 'styled-components';

const Wrraper = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;

    @media (max-width: 840px){
        grid-template-columns: 1fr;
    }
`;

function Wrraper2col({children}){
    return(
        <Wrraper>
            {children}
        </Wrraper>
    )
};

export default Wrraper2col;