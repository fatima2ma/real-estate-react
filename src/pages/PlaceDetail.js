import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import SectionWrraper from '../components/SectionWrraper';
import CardDetails from '../components/CardDetails';
import Slider from '../components/Slider';

function PlaceDetail(){    
    const param = useParams();
    const [placeData, setPlaceData] = useState({});
    async function fetchData(){
        try{
            const dbRef = doc(db, 'places', param.id);
            const data  = await getDoc(dbRef);
            if(data){
                setPlaceData(data.data());
                console.log(data.data());
            }
        }catch(error){
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        fetchData();
    },[param.id]);
    
    return(
        <>
        <Slider data={placeData.imagesURLs} sharedIcon={true}/>
        <SectionWrraper classStyle='shadow'>
            <CardDetails data={placeData}></CardDetails>
        </SectionWrraper>
        </>
    )
};

export default PlaceDetail;