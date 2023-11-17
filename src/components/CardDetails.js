import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Wrraper2col from './Wrraper2col';
import { FaLocationDot, FaBed, FaBath, FaSquareParking, FaHouseCircleCheck, FaPen, FaTrashCan
 } from 'react-icons/fa6';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Button from '../components/Button';
import Contact from '../components/Contact';

const CardText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Title = styled.h2`
    color: #276ce7;
    font-size: 18px;
`;

const Location = styled.p`
    font-size: 14px;
    font-weight: bold;
`;

const Icon = styled(FaLocationDot)`
    color: green;
    font-size: 14px;
    margin-top: 2px;
`;

const ButtonLink = styled(Link).attrs(props => ({bg: props.bg || '#ad1313'}))`
    cursor: pointer;
    line-height: 35px;
    color: white;
    width: 35%;
    text-align: center;
    font-weight: bold;
    background-color: ${props => props.bg};
    padding: 0 2rem;
    border-radius: 5px;
//    display: inline-block;
`;

const BtnsDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

const DescText = styled.p`
    font-size: 14px;
`;

const Bold = styled.span`
    font-weight: bold;
`;

const Features = styled.div`
    display: flex;
    gap: 1rem;
`;

const FetTitle = styled.span`
    font-weight: bold;
    font-size: 12px;
`;

const CardImg = styled.div`
    width: 100%;
    min-height: 300px;
    
    @media (max-width: 840px){
       grid-row: 2; 
       height: 300px;
    }
`;

const Slide = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
    overflow: hidden;
`;


function CardDetails({data}){   
    const param = useParams();
    const [placeData, setPlaceData] = useState({});
    const [loading, setLoading] = useState(true);
    const [sendMessga, setSendMessage] = useState(false);
    const [user, setUser] = useState({});
    
    async function fetchUser(userRef){
        try{
        const dbRef = doc(db, 'users', userRef);
        const data  = await getDoc(dbRef);
        if(data){
            setUser(data.data());
            console.log(data.data());
        }
        }catch(error){
            console.log(error.message);
        }
    };
    
    async function fetchData(){
        try{
            const dbRef = doc(db, 'places', param.id);
            const data  = await getDoc(dbRef);
            if(data){
                setPlaceData(data.data());
                setLoading(false);
                fetchUser(data.data().userRef);
            }
        }catch(error){
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        fetchData();
    },[param.id]);
    
    if(loading) return <div>Loading</div>
    return(        
        <>
        <Wrraper2col>
            <CardText>
            <Title>
                {data.title}
            </Title>
            <Location><Icon/>{data.adress} </Location>
            <BtnsDiv>
                <ButtonLink>{data.type}</ButtonLink>
                <ButtonLink bg='green'>{data.offer} discount</ButtonLink>
            </BtnsDiv>
            <DescText><Bold>Description - </Bold> {data.description}</DescText>
            <Features>
                <FetTitle><FaBed/>{data.beds} Bed</FetTitle>
                <FetTitle><FaBath/> {data.baths} Bath</FetTitle>
                {data.parking && <FetTitle><FaSquareParking/> ParkingSpot</FetTitle>}
                {data.furnished && <FetTitle><FaHouseCircleCheck/> Furniture</FetTitle>}
            </Features>
            {(!sendMessga)&&<Button onClick={()=>{setSendMessage(true)}} type='button' backColor='#276ce7' width='100%' title='Contact Owner'/>}
            {sendMessga&&<Contact userRef={user} place={data}/>}
            </CardText>
            <CardImg>
            <MapContainer center={[placeData.geolocation.lat, placeData.geolocation.lng]} zoom={13} scrollWheelZoom={false}
                        style={{height: "100%", width: "100%"}}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[placeData.geolocation.lat, placeData.geolocation.lng]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
            </MapContainer>
            </CardImg>
        </Wrraper2col>
         </>
       
    )
}

export default CardDetails;