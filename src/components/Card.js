import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaLocationDot, FaPen, FaTrashCan } from 'react-icons/fa6';

const CardWrrap = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 400px;
    box-shadow: 0 0 3px #dadada;
//    min-width: 25%;
    margin-bottom: 1rem;
    border-radius: 5px;
    position: relative;
`;

const CardLink = styled(Link)`
    color: #000;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
//    height: 100%;
`;

//const Thumbnail = styled.div`
//    height: 160px;
//    width: 100%;
//    background-image: url('${props => props.src}');
//    background-position: center;
//    background-repeat: no-repeat;
//    background-size: cover;
//    border-top-left-radius: 5px;
//    border-top-right-radius: 5px;
//`;

const Thumb = styled.img`
    width: 100%;
    height: 60%;
    aspect-ratio: 9 / 6;
    object-fit: cover;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const CardText = styled.div`
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Padge = styled.span`
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    width: fit-content;
    padding: 5px 8px;
    border-radius: 5px;
    background: #276ce7;
    color: white;
    font-size: 11px;
    text-transform: uppercase;
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
    color: gray;
`;

const Price = styled.p`
    font-size: 12px;
    font-weight: bold;

    & > b{
        font-size: 20px;
    }
`;

const Feature = styled.span`
    font-size: 12px;
    font-weight: bold;
    color: gray;

    &&:last-child{
        margin:0 1rem;
    }
`; 

const Controls = styled.div`
    display: flex;
    gap: .8rem;
    align-items: center;
    justify-content: end;
    color: gray;
    font-size: 14px;
    padding: 0 1rem 1rem;

    && > *{
    transform: scale(1);
    transition: all .2s ease-in-out;
    cursor: pointer;
    }

    && > .red{
        color: #cc3957;
    }

    && >:hover{
        transform: scale(1.1);
    }
`;

function Card({title, thumbnail, padge, price, location, beds, baths, deleteClick, id='', controls = false}){
    const navigate = useNavigate();
    return(
        <CardWrrap>
            <CardLink to={`/place/${id}`}>
                <Thumb src={thumbnail}/>
                <CardText>
                    <Padge>{padge}</Padge>
                    <Location><Icon/> {location}</Location>
                    <Title>{title}</Title>
                    <Price><b>{price}</b> / month</Price>
                    <span><Feature>{beds} Beds</Feature> 
                    <Feature> {baths} Baths</Feature></span>                    
                </CardText>
            </CardLink>
        {controls &&    
        <Controls>
            <FaPen onClick={()=>navigate(`/place/${id}/edit`)}/> 
            <FaTrashCan className='red' onClick={deleteClick}/>
        </Controls>
        }
        </CardWrrap>
    )
}

export default Card;