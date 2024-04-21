import {useState, useEffect} from 'react';
import { db } from '../firebase.config';
import { getDocs, collection, limit } from 'firebase/firestore';

function useFetchAll(){
    const [allplaces, setAllplaces] = useState([]);
    const [loading] = useState(true);
    
}

export default useFetchAll;