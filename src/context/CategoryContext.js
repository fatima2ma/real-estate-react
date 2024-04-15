import {useState, useCallback, createContext} from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { collection, getDocs, query, where, limit, startAfter, doc, deleteDoc } from 'firebase/firestore';

export const CategoryContext = createContext();

export const CategoryContextProvider = ({children}) => {
    const [places, setPlaces] = useState({});
    const [loading, setLoading] = useState(true);
    const [lastFetched, setLastFetched] = useState();
    const [loadMore, setLoadMore] = useState(false);
    const params = useParams();
    
    const fetchData = useCallback(async (fieldName, operator, value) => {
        console.log('cat');
        try{
            const q = query(collection(db, 'places'), where(fieldName, operator, value), limit(4));
            const data = await getDocs(q);
            const tempList = [];
            if(data){
                const lastVisible = data.docs[data.docs.length - 1];
                setLastFetched(lastVisible);
                data.forEach(dataItem => {
                    tempList.push({
                        id: dataItem.id,
                        data: dataItem.data(),
                    })
                })
            }
            console.log(tempList);
            setPlaces(tempList);
            setLoading(false);
        }catch(e){
            setLoading(false);
            console.log(e.message);
        }
    },[places]);

    const fetchMoreData = useCallback(async(fieldName, operator, value, lastFetched) => {
        setLoadMore(true);
        try{
            const q = query(collection(db, 'places'), where(fieldName, operator, value), limit(4), startAfter(lastFetched));
            const data = await getDocs(q);
            if(data){
                const lastVisible = data.docs[data.docs.length - 1];
                setLastFetched(lastVisible);
                // console.log(lastFetched);
                const tempList = [];
                data.forEach(dataItem => {
                    tempList.push({
                        id: dataItem.id,
                        data: dataItem.data(),
                    })
                });
                setLoadMore(false);
                setPlaces((prevState) => [...prevState, ...tempList]);
            }
        }catch(error){
            setLoadMore(false);
            console.log(error.message);
        }
    },[]);

    const deleteData = useCallback(async (id) => {
        try{
            const result = await deleteDoc(doc(db, 'places', id));
            setPlaces(places.filter(place => place.id !== id));
        }catch(error){
            console.log(error);
        }
    })
    return(
        <CategoryContext.Provider value={{places, loading, lastFetched, loadMore, fetchData, fetchMoreData, deleteData}}>
            {children}
        </CategoryContext.Provider>
    )
    };

export default CategoryContext;

