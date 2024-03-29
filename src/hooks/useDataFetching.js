import {useState, useEffect} from 'react';
import { db } from '../firebase.config';
import { getDocs, collection, limit } from 'firebase/firestore';

function useDataFetching(){
    const [sellplaces, setSellplaces] = useState([]);
    const [rentplaces, setRentplaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ImagesSliderURLs, setImagesSliderURLs] = useState(null);    
    console.log('fetch');
    useEffect(() => {
        async function fetchData(){
            console.log('fetch');
            const tempSellData = [];
            const tempRentData = [];
            const tempSlider = [];
            try{
                const queryData = await getDocs(collection(db, 'places'), limit(4));
                if(queryData){
                    queryData.forEach(doc => {
                        doc.data().type === 'rent' ? tempRentData.push({id:doc.id, data: doc.data()}) 
                        : tempSellData.push({id:doc.id, data: doc.data()});
                        tempSlider.push(doc.data().imagesURLs);
                    });
                    setLoading(false);
                }
                console.log(tempSellData);
                setSellplaces(tempSellData);
                setRentplaces(tempRentData);
                setImagesSliderURLs(tempSlider[0]);
            }catch(error){
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    return [sellplaces, rentplaces, loading, ImagesSliderURLs];
}

export default useDataFetching;