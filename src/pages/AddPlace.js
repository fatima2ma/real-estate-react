import { useState } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import {styled} from 'styled-components';
import Button from '../components/Button';
import FormItem from '../components/FormItem';
import TextAreaItem from '../components/TextAreaItem';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import CheckItem from '../components/CheckItem';

const CenteredForm = styled.div`
    width: 40vw;
    margin: auto;
`;

const HorStack = styled.div`
    display: flex;
    gap: 2rem;
`;

const AddForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

function AddPlace(){
    const [formData, setFormData] = useState({
        type:'rent',
        title:'',
        beds:0,
        baths:0,
        parking:true,
        furnished:null,
        adress:'',
        langtude:0,
        latitude:0,
        description:'',
        offer:false,
        price:0,
        images:{},
    });
    
//    const {
//       type,
//        title,
//        beds,
//        baths,
//        parking,
//        furnished,
//        adress,
//        langtude,
//        latitude,
//        description,
//        offer,
//        price,
//        images, 
//    } = formData;
    
    function onChange(e){
        let boolean = null;
        if(e.target.value === 'true') boolean = true;
        if(e.target.value === 'false') boolean = false;
        if(e.target.files){
            setFormData(prevState => ({
                ...prevState,
                images: e.target.files,
            }))
        }
       if(!e.target.files){
           setFormData((prevState)=>({
               ...prevState,
                [e.target.id]: boolean ?? e.target.value,   
           }))
       }
    };
    
    async function onSubmit(e){
        e.preventDefault();
        const auth = getAuth();
        const storage = getStorage();        
        
        async function storeImage(image){
            let date = new Date;
            return new Promise((resolve, reject) => {
                const fileName = `${auth.currentUser.displayName}-${image.name}-${date.getMilliseconds()}`; 
                const storageRef = ref(storage, fileName);
                const uploadImage = uploadBytesResumable(storageRef, image);
                uploadImage.on("state_changed", (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            [...formData.images].map((image) => storeImage(image))
        ).catch((error) => {
            console.log(error);
            return;
        });
        
        const geolocation = {};
        geolocation.lat = formData.latitude;
        geolocation.lng = formData.langtude;
        
        const formDataCopy = {
            ...formData,
            imagesURLs: imagesURLs,
            geolocation: geolocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,            
        };
        
        delete formDataCopy.images;
        delete formDataCopy.latitude;
        delete formDataCopy.langtude;
        
        const docRef = await addDoc(collection(db, 'places'), formDataCopy);
        
    }
    
    console.log(getAuth().currentUser.uid);
    return(
        <SectionWrraper>
            <CenteredForm>
                <SectionHeader title='Add New Place'/>
                <AddForm onSubmit={onSubmit}>
                    <CheckItem title='Sell/Rent' type='button' lbl='type' value='sell/rent' onChange={onChange} active={formData.type}/> 
                    <FormItem onChange={onChange} type='text' title='Place Title' lbl='title' placeholder='' minLength='10' maxLength='32'/>
                    <HorStack>
                        <FormItem type='number' title='Beds' lbl='beds' onChange={onChange} min='1' max='50'/>
                        <FormItem type='number' title='Paths' lbl='baths' onChange={onChange} min='1' max='50'/>
                    </HorStack>
                    <CheckItem title='Parking' type='button' lbl='parking' value='yes/no' onChange={onChange} active={formData.parking}/>
                    <CheckItem title='Furnished' type='button' lbl='furnished' value='yes/no' onChange={onChange} active={formData.furnished}/>
                    <FormItem type='text' title='Adress' lbl='adress' placeholder='' onChange={onChange}/>
                    <HorStack>
                        <FormItem type='number' title='langtude' lbl='langtude' onChange={onChange} min='-180.00000' max='180.00000' step='0.000001'/>
                        <FormItem type='number' title='latitude' lbl='latitude' onChange={onChange} min='-90.00000' max='90.00000' step='0.000001'/>
                    </HorStack>
                    <TextAreaItem title='Description' lbl='description' placeholder='Description' onChange={onChange}/>
                    <CheckItem title='Offer' type='button' lbl='offer' value='yes/no' onChange={onChange} active={formData.offer}/>
                    <FormItem type='number' title='Reguler Price' lbl='price' onChange={onChange} min='50' max='400000000'/>
                    <FormItem type='file' title='Images' lbl='images' onChange={onChange} multiple={true} accept='.png,.jpg,.jpeg'/>
                    <Button title='add place' type='submit'/>
                </AddForm>
            </CenteredForm>
        </SectionWrraper>
    )
}

export default AddPlace;