import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Slider from '../components/Slider';
import img from '../img.jpg';

const CardsWrraper = styled.ul`
    display: grid;
    grid-gap: 1rem;
//    grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
   // margin: 1rem 0;
`; 

function Home(){
    const [items, setItems] = useState([]);
    const [sellplaces, setSellplaces] = useState([]);
    const [rentplaces, setRentplaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ImagesSliderURLs, setImagesSliderURLs] = useState(null);
    
    async function fetchData(){
        const tempSellData = [];
        const tempRentData = [];
        const tempSlider = [];
        try{
            const queryData = await getDocs(collection(db, 'places'));
            if(queryData){
                queryData.forEach(doc => {
                    doc.data().type === 'rent' ? tempRentData.push({id:doc.id, data: doc.data()}) 
                    : tempSellData.push({id:doc.id, data: doc.data()});
                    tempSlider.push(doc.data().imagesURLs);
                    setLoading(false);
                });
            }
        }catch(error){
            console.log(error);
            setLoading(false);
        }
        setItems(tempRentData, tempSellData);
        setSellplaces(tempSellData);
        setRentplaces(tempRentData);
        setImagesSliderURLs(tempSlider[0]);
    };
    
    useEffect(() => {
        fetchData();
    },[]);
    
    return(
        <> 
        {loading ? (<p>Loading...</p>) : (
        <div>
        <Slider data={ImagesSliderURLs}/> 
        <SectionWrraper>
        <SectionHeader title='Rent offers' subTitle='Show more places' category='rent'/>
        <CardsWrraper>
        {rentplaces.map(place => (
            <Card title={place.data.title}
                id={place.id}
                thumbnail={place.data.imagesURLs[0]}
                padge='17 days ago'
                price={place.data.price}
                location={place.data.adress}
                beds={place.data.beds}
                baths={place.data.baths}/>
        ))}
        </CardsWrraper>
        </SectionWrraper>
        <SectionWrraper>
        <SectionHeader title='Sell offers' subTitle='Show more places' category='sell'/>
        <CardsWrraper>
        {sellplaces.map(place => (
            <Card title={place.data.title}
                id={place.id}
                thumbnail={place.data.imagesURLs[0]}
                padge='17 days ago'
                price={place.data.price}
                location={place.data.adress}
                beds={place.data.beds}
                baths={place.data.baths}/>
        ))}
        </CardsWrraper>
        </SectionWrraper>
        </div>
        )}
        </>
    )
}

//https://veerle.duoh.com/inspiration

export default Home;