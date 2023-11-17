import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import {getDocs, 
        where, 
        query, 
        doc, 
        limit, 
        collection, 
        orderBy, 
        startAfter} from 'firebase/firestore';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Slider from '../components/Slider';
import Button from '../components/Button';

const CardsWrraper = styled.ul`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

function Offers(){
    const params = useParams();
    const [places, setPlaces] = useState();
    const [loading, setLoading] = useState(true);
    const [lastFetched, setLastFetched] = useState();
    
    async function fetchData(){
        //const category = params.categoryName;
        try{
            const q = query(collection(db, 'places'), where('offer', '==', true), limit(8));
            const dataSnap = await getDocs(q);
            const tempList = [];
            if(dataSnap){
                const lastVisible = dataSnap.docs[dataSnap.docs.length - 1]
                setLastFetched(lastVisible);                
                console.log(dataSnap.docs.length);
                dataSnap.forEach(doc => {
                    tempList.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                });
                setPlaces(tempList);
                setLoading(false);
            }
        }catch(error){
            console.log(error.message);
            setLoading(false);
        }
    }
    
    async function fetchMoreData(){
        const category = params.categoryName;
        try{
            const q = query(collection(db, 'places'), where('offer', '==', true), limit(4), startAfter(lastFetched));
            const dataSnap = await getDocs(q);
            if(dataSnap){
                const lastVisible = dataSnap.docs[dataSnap.docs.length - 1];
                setLastFetched(lastVisible);
                const tempList = [];
                dataSnap.forEach(doc => {
                    tempList.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                });
                setLoading(false);
                setPlaces((prevState) => [...prevState, ...tempList]);
            }
        }catch(error){
            setLoading(false);
            console.log(error.message);
        }
    }
    
    useEffect(() => {
       fetchData(); 
    },[])
    return(
        <SectionWrraper>
            <SectionHeader title={`places for offers`}/>
            {loading? (<div>Loading...</div>) : (
            <MainContent>
            <CardsWrraper>
                {places && places.map(item => 
                <Card key={item.id}
                    id={item.id}
                    title={item.data.title}
                    thumbnail={item.data.imagesURLs[0]}
                    padge='17 days ago'
                    price={item.data.price}
                    location={item.data.adress}
                    beds={item.data.beds}
                    baths={item.data.paths}
                    />
                )}
            </CardsWrraper>
            <Button onClick={fetchMoreData} type='button' backColor='#276ce7' width='25%' title='Load more'/>
            </MainContent>
            )}
        </SectionWrraper>
    )
};

export default Offers;