import { useState, useCallback, createContext, useReducer } from "react";
import { db } from "../firebase.config";
import { getAuth } from 'firebase/auth';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import { addDoc, collection, serverTimestamp, getDoc, doc, updateDoc } from "firebase/firestore";

export const ItemContext = createContext();

export const ItemContextProvider = ({children}) => {
    const initialData = {
        placeData: {},
        loading: true,
        progress: 0,
        error: '',
    };

    const reducer = (state, action) => {
        switch (action.type){
            case 'GET_PLACE_SUCCESS': 
                return {
                    ...state,
                    placeData: action.payload,
                    loading: false
                };
            case 'GET_PLACE_ERROR':
                return{
                    ...state,
                    placeData: [],
                    loading: false,
                    error: action.payload,
                };
            case 'UPDATE_PLACE_DATA':
                return{
                    ...state,
                    placeData: [...state.placeData, action.payload],
                    loading: false,
                };
            case 'UPDATE_PLACE_DATA_ERROR':
                return{
                    ...state,
                    placeData: [...state.placeData],
                    loading: false,
                    error: action.payload,
                };
            case 'ADD_PLACE_SUCCESS':
                return{
                    ...state,
                    placeData: action.payload.formDataCopy,
                    progress: action.payload.prog,
                    loading: false,
                }
            case 'ADD_PLACE_ERROR':
                return{
                    ...state,
                    placeData: [],
                    loading: false,
                    error: action.payload,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialData);

    // const [placeData, setPlaceData] = useState({});
    // const [loading, setLoading] = useState(true);
    const fetchItem = useCallback(async (id) => {
        try{
            console.log('itemfetch');
            const dbRef = doc(db, 'places', id);
            const data  = await getDoc(dbRef);
            if(data){
                // setPlaceData(data.data());
                // setLoading(false);
                console.log(data.data());
                dispatch({type: 'GET_PLACE_SUCCESS', payload: data.data()});
            }
        }catch(e){
            // setLoading(false);
            // console.log(e.message);
            dispatch({type: 'GET_PLACE_ERROR', payload: e.messge});
        }        
    },[]);

    function deleteImage(imageUrl){
        const storage = getStorage();
        const storageRef = ref(storage, imageUrl);
        deleteObject(storageRef).then(()=> {
            console.log('file deleted')
        }).catch((error)=>{
            console.log(error.message);
        })
    }

    async function uploadImages(image){
        const storage = getStorage();
        const date = new Date();
        const fileName = `${image.name}_${date.getMilliseconds()}`;
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);
            if(uploadTask){
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch(snapshot.state){
                            case 'paused':
                                console.log('upload paused');
                                break;
                            case 'running':
                                console.log('upload running');
                                break;
                        }
                    },(error) => {
                        reject(error);
                    },() => {
                        getDownloadURL(uploadTask.snapshot.ref).then((DownloadUrl) => {resolve(DownloadUrl)});
                    }
                );
            }
        })
    }

    const updateItem = useCallback(async (data, id) => {
        console.log(data);
        //upload images
            const imagesURLs = await Promise.all([...data.images].map(image => 
                uploadImages(image)
            )).catch((error) => {
                console.log(error.message);
            })
            console.log(imagesURLs[0]); 
            delete data.images
            // imagesURLs.map((image) => deleteImage(image));
            const geolocation = {};
            geolocation.lat = data.latitude;
            geolocation.lng = data.langtude;
        const dataCopy = {
            ...data,
            geolocation,
            imagesURLs,
        };
        delete dataCopy.images;
        delete dataCopy.latitude;            
        delete dataCopy.langtude;
        try{    
            const docRef = doc(db, "places", id);
            await updateDoc(docRef, dataCopy);
            dispatch({type:'UPDATE_PLACE_DATA', payload: dataCopy});
        }catch(e){
            dispatch({type: 'UPDATE_PLACE_DATA_ERROR', payload: e.message})
        }
    },[]);

    const addPlace = useCallback(async(data) => {
        const auth = getAuth();
        const storage = getStorage();        
        let progress = [];
        async function storeImage(image){
            let date = new Date;
            return new Promise((resolve, reject) => {
                const fileName = `${auth.currentUser.displayName}-${image.name}-${date.getMilliseconds()}`; 
                const storageRef = ref(storage, fileName);
                const uploadImage = uploadBytesResumable(storageRef, image);
                uploadImage.on("state_changed", (snapshot) => {
                        progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log(`upload is start: ${progress}% done`);
                        switch(snapshot.state){
                            case "paused":
                                console.log('upload is puased');
                            break;
                            case "running":
                                console.log('upload is running');
                            break;
                        }
                    },(error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        })
                    }
                )
            })
            
        };
        
        const imagesURLs = await Promise.all(
            [...data.images].map((image) => storeImage(image))
        ).catch((error) => {
            console.log(error);
            return;
        });
        
        const geolocation = {};
        geolocation.lat = data.latitude;
        geolocation.lng = data.langtude;
        
        const formDataCopy = {
            ...data,
            imagesURLs: imagesURLs,
            geolocation: geolocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,            
        };
        
        delete formDataCopy.images;
        delete formDataCopy.latitude;
        delete formDataCopy.langtude;
        try{
            const docRef = await addDoc(collection(db, 'places'), formDataCopy);
            if(docRef){
                dispatch({
                    type: 'ADD_PLACE_SUCCESS',
                    payload: {formDataCopy: formDataCopy, prog: progress}
                })
            }
        }catch(e){
            dispatch({type: 'ADD_PLACE_ERROR', payload: e.message})
        }

    },[state.progress]);

    return(
        <ItemContext.Provider value={{...state, fetchItem, updateItem, addPlace}}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemContext;
