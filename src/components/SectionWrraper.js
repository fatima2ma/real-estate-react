import styled from 'styled-components';

const SectionWrrap = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 3rem 7rem;
    margin-inline: auto;
    
    @media (max-width: 575px){
        padding: 0;
    }

    &.fixedWidth{
        max-width: 1000px;
    }

    &.darkCard{
        position: relative;
        margin-bottom: 2rem;

        &:before{
            content: '';
            position: absolute;
            width: 100%;
            height: 60%;
            bottom: 0%;
            right: 0;
            z-index: -1;
            background: #eee; 
        }
    }
`;

const Section = styled.div`
    padding: 1rem;

    &.darkCard{
        background-color: #333;
        color: #fff;
        border-radius: 5px;
        position: relative;

        &:before{
            content: '';
            position: absolute;
            width: 50%;
            height: 50%;
            top: 75%;
            right: -10%;
            z-index: -1;
            background-image: radial-gradient(circle, #3949AB 12%, transparent 10%), 
                radial-gradient(circle, #3949AB 12%, transparent 10%);
            background-size: 18px 20px;
        }

        &:after{
            content: '';
            position: absolute;
            width: 80px;
            height: 80px;
            top: 28%;
            left: -20px;
            border-radius: 100%;
            border: 2px dashed #a8a8a8;
        }
    }

    &.shadow{
        box-shadow: 0 0 2px rgba(0,0,0,.1);
        border-radius: 5px;
    }
`;

function SectionWrraper({children, classStyle}){
    return(
        <SectionWrrap className={classStyle? classStyle:''}>
        <Section className={classStyle? classStyle:''}>
            {children}
        </Section>
        </SectionWrrap>
    )
}

export default SectionWrraper;