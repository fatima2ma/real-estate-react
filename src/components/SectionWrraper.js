import styled from 'styled-components';

const SectionWrrap = styled.div`
    max-width: 1400px;
    padding: 3rem 7rem;
    
    @media (max-width: 575px){
        padding: 0;
    }
`;

const Section = styled.div`
    padding: 1rem;

    &.shadow{
        box-shadow: 0 0 2px rgba(0,0,0,.1);
        border-radius: 5px;
    }
`;

function SectionWrraper({children, classStyle}){
    return(
        <SectionWrrap>
        <Section className={classStyle? classStyle:''}>
            {children}
        </Section>
        </SectionWrrap>
    )
}

export default SectionWrraper;