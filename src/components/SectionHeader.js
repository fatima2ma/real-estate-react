import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Title = styled.h3`
    
`;

const SubTitle = styled(Link)`
    color: #276ce7;
    font-size: 13px;
`;

const Section_header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
`;

const Btn = styled(Link)`
    color: #fff;
    padding: .3rem 1rem;
    background: green;
    border-radius: 5px;
`;

function SectionHeader({title, subTitle, hasLink= false, category = ''}){
    return(
        <Section_header className='section-header'>
            <div>
            <Title>{title}</Title>
            {subTitle && <SubTitle to={`/places/${category}`}>{subTitle}</SubTitle>}
            </div>
            {hasLink && <Btn to='/new'>Add Place</Btn>}
        </Section_header>
    )
}

export default SectionHeader;