import styled from 'styled-components';
import { FaLocationDot } from 'react-icons/fa6';

const CardsWrrap = styled.ul`
    column-count: 4;
    column-gap: 0em;
`;

const Card = styled.li`
    max-width: 400px;
    display: flex;
    flex-direction: row;
    break-inside: avoid;
`;

const CardText = styled.div`
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Location = styled.p`
    color: gray;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Icon = styled(FaLocationDot)`
    color: green;
    font-size: 12px;
    margin-top: 2px;
`;

const Title = styled.h3`
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Price = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: gray;
`;

const Feature = styled.span`
    font-size: 12px;
    font-weight: bold;

    &&:last-child{
        margin:0 1rem;
}
`; 

function CardsWithcolumns(){
    return(
        <CardsWrrap>
            <Card>
                <CardText>
                <Location><Icon/> Room 92/9 street</Location>
                <Title>Routes are perhaps..</Title>
                <Price>1,987$ / month</Price>
                <span><Feature>4 Beds</Feature> 
                <Feature>2 Baths</Feature></span>
                </CardText>
            </Card>
            <Card>
                <CardText>
                <Location><Icon/> Room 92/9 street</Location>
                <Title>Routes are perhaps...'</Title>
                <Price>1,987$ / month</Price>
                <span><Feature>4 Beds</Feature> 
                <Feature>2 Baths</Feature></span>
                </CardText>
            </Card>
            <Card>
                <CardText>
                <Location><Icon/> Room 92/9</Location>
                <Title>Routes are perhaps...</Title>
                <Price>1,987$ / month</Price>
                <span><Feature>4 Beds</Feature> 
                <Feature>2 Baths</Feature></span>
                </CardText>
            </Card>
            <Card>
                <CardText>
                <Location><Icon/> Room 92/9 street</Location>
                <Title>Routes are perhaps...</Title>
                <Price>1,987$ / month</Price>
                <span><Feature>4 Beds</Feature> 
                <Feature>2 Baths</Feature></span>
                </CardText>
            </Card>
            <Card>
                <CardText>
                <Location><Icon/> Room 92/9 street </Location>
                <Title>Routes are perhaps...</Title>
                <Price>1,987$ / month</Price>
                <span><Feature>4 Beds</Feature> 
                <Feature>2 Baths</Feature></span>
                </CardText>
            </Card>
        </CardsWrrap>
    )
}

export default CardsWithcolumns;