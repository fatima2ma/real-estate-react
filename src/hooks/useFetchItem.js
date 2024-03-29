import { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

function useFetchItem(Id){
    const [placeData, setPlaceData] = useState({});
    const [loading, setLoading] = useState(true);
    async function fetchData(){
        try{
            const dbRef = doc(db, 'places', Id);
            const data  = await getDoc(dbRef);
            if(data){
                setPlaceData(data.data());
                setLoading(false);
            }
        }catch(error){
            setLoading(false);
            console.log(error.message);
        }

    }
    console.log('fetchplaceData');
    useEffect(() => {
        fetchData();
    },[param.id]);

    return [placeData, loading];
}

export default useFetchItem;