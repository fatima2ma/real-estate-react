import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {styled} from 'styled-components';
import Button from '../components/Button';
import FormItem from '../components/FormItem';
import TextAreaItem from '../components/TextAreaItem';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import CheckItem from '../components/CheckItem';
import ItemContext from '../context/ItemContext';

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


function UpdatePlace(){
    const placeId = useParams();
    // const [place, setPlace] = useState({});
    // const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        type:'rent',
        title:'',
        beds:0,
        baths:0,
        parking:true,
        furnished:null,
        adress:'',
        latitude:0,
        langtude:0,
        description:'',
        offer:false,
        price:0,
        images:[],
    });

    const {placeData, loading, fetchItem, updateItem} = useContext(ItemContext);
    
    const {
       type,
        title,
        beds,
        baths,
        parking,
        furnished,
        adress,
        latitude,
        langtude,
        description,
        offer,
        price,
        images, 
    } = formData;  // recheck if is there any need for this
    
    useEffect(() => {
        fetchItem(placeId.id);
        console.log(loading);
        getFormData();
    },[placeId.id, fetchItem, placeData]);


    function getFormData(){
        console.log(loading);
        !loading && setFormData({
            ...placeData,
            langtude: placeData.geolocation.lng,
            latitude: placeData.geolocation.lat,
            images: placeData.imagesURLs,
        });
    }
    function onChange(e){
        //setFormData(placeData);
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
    
    // async function uploadImages(image){
    //     const storage = getStorage();
    //     const date = new Date();
    //     const fileName = `${image.name}_${date.getMilliseconds()}`;
    //     return new Promise((resolve, reject) => {
    //         const storageRef = ref(storage, fileName);
    //         const uploadTask = uploadBytesResumable(storageRef, image);
    //         if(uploadTask){
    //             uploadTask.on('state_changed', 
    //                 (snapshot) => {
    //                     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                     console.log('Upload is ' + progress + '% done');
    //                     switch(snapshot.state){
    //                         case 'paused':
    //                             console.log('upload paused');
    //                             break;
    //                         case 'running':
    //                             console.log('upload running');
    //                             break;
    //                     }
    //                 },(error) => {
    //                     reject(error);
    //                 },() => {
    //                     getDownloadURL(uploadTask.snapshot.ref).then((DownloadUrl) => {resolve(DownloadUrl)});
    //                 }
    //             );
    //         }
    //     })
    // }
    
    // function deleteImage(imageUrl){
    //     const storage = getStorage();
    //     const storageRef = ref(storage, imageUrl);
    //     deleteObject(storageRef).then(()=> {
    //         console.log('file deleted')
    //     }).catch((error)=>{
    //         console.log(error.message);
    //     })
    // }
    
    async function onSubmit(e){
        e.preventDefault();
        console.log(formData);
        updateItem(formData, placeId.id);
    //         //upload images
    //         const imagesURLs = await Promise.all([...images].map(image => 
    //             uploadImages(image)
    //         )).catch((error) => {
    //             console.log(error.message);
    //         })
    //         //console.log( place.imagesURLs[0]); 
    //         // delete images
    //         place.imagesURLs.map((image) => deleteImage(image));
    //         const geolocation = {};
    //         geolocation.lat = latitude;
    //         geolocation.lng = langtude;
    //     const formDataCopy = {
    //         ...formData,
    //         geolocation,
    //         imagesURLs,
    //     };
    //     delete formDataCopy.images;
    //     delete formDataCopy.latitude;            
    //     delete formDataCopy.langtude;
            
    //     const docRef = doc(db, "places", placeId.id);
    //     await updateDoc(docRef, formDataCopy)
    };
    return(
        <SectionWrraper>
            <CenteredForm>
                <SectionHeader title='Edit Place'/>
                {loading ? (<p>Loading....</p>) : (
                (placeData) && 
                <AddForm onSubmit={onSubmit}>
                    <CheckItem title='Sell/Rent' type='button' lbl='type' value='sell/rent' onChange={onChange} active={type}/> 
                    <FormItem onChange={onChange} type='text' title='Place Title' lbl='title' value={title} placeholder='' minLength='10' maxLength='32'/>
                    <HorStack>
                        <FormItem type='number' title='Beds' lbl='beds' onChange={onChange} min='1' max='50' value={beds}/>
                        <FormItem type='number' title='Paths' lbl='baths' onChange={onChange} min='1' max='50' value={baths}/>
                    </HorStack>
                    <CheckItem title='Parking' type='button' lbl='parking' value='yes/no' onChange={onChange} active={parking}/>
                    <CheckItem title='Furnished' type='button' lbl='furnished' value='yes/no' onChange={onChange} active={furnished}/>
                    <FormItem type='text' title='Adress' lbl='adress' placeholder='' onChange={onChange} value={adress}/>
                    <HorStack>
                        <FormItem type='number' title='langtude' lbl='langtude' onChange={onChange} min='-180.00000' max='180.00000' step='0.000001' value={langtude}/>
                        <FormItem type='number' title='latitude' lbl='latitude' onChange={onChange} min='-90.00000' max='90.00000' step='0.000001' value={latitude}/>
                    </HorStack>
                    <TextAreaItem title='Description' lbl='description' placeholder='' onChange={onChange} value={description}/>
                    <CheckItem title='Offer' type='button' lbl='offer' value='yes/no' onChange={onChange} active={offer}/>
                    <FormItem type='number' title='Reguler Price' lbl='price' onChange={onChange} min='50' max='400000000' value={price}/>
                    <FormItem type='file' title='Images' lbl='images' onChange={onChange} multiple={true} accept='.png,.jpg,.jpeg'/>
                    
                    <Button title='edit place' type='submit'/>
                </AddForm>
                )}
            </CenteredForm>
        </SectionWrraper>
    )
}

export default UpdatePlace;