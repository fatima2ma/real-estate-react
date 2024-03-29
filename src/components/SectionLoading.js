import styled from 'styled-components';

const SectionLoad = styled.div`
    flex-wrap: wrap;
    display: flex;
    gap: .5rem;
    justify-content: start;
`;

function SectionLoading({children}){
    return(
        <SectionLoad>{children}</SectionLoad>
    )
}

export default SectionLoading;