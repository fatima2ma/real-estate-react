import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {styled} from 'styled-components';
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import Button from '../components/Button';
import FormItem from '../components/FormItem';
import TextAreaItem from '../components/TextAreaItem';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import CheckItem from '../components/CheckItem';
import ItemContext from '../context/ItemContext';
import DisplayImages from '../components/DisplayImages';
import Wrraper2col from '../components/Wrraper2col';
import LoadingModal from '../components/LoadingModal';

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

    & .formItems{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: space-between;
    }
`;

const ExtendedItem = styled.div`
    // grid-column: 1 / end;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    margin: 2rem 0;
`;


function UpdatePlace(){
    const params = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const auth = getAuth();
    // const [place, setPlace] = useState({});
    // const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
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

    const {placeData, id, loading, error, updated, progress, fetchItem, updateItem, deleteImage} = useContext(ItemContext);
    
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
    const [oldImages, setOldImages] = useState([]);
    const [mustDeleteImgs, setMustDeleteImgs] = useState([]);
    
    useEffect(() => {
        fetchItem(params.id);
        getFormData();
    },[id]);

    useEffect(() => {
        updated && toast.success('Place updated successfuly');
        updated && setShowModal(false);
    },[updated]);

    useEffect(() => {
        if (placeData && placeData.userRef !== auth.currentUser.uid) {
          toast.error("You can't edit this listing");
          navigate("/");
        }
      }, [auth.currentUser.uid, navigate]);

    function getFormData(){
        (!loading && placeData.geolocation.lng != undefined) && setFormData({
            ...placeData,
            langtude: placeData.geolocation.lng,
            latitude: placeData.geolocation.lat,
            // images: placeData.imagesURLs,
        });
        !loading && setOldImages(placeData.imagesURLs);
    }
    function onChange(e){
        //setFormData(placeData);
        let boolean = null;
        if(e.target.value === 'true') boolean = true;
        if(e.target.value === 'false') boolean = false;
        if(e.target.files){
            const selectedFiles = Array.from(e.target.files);
            setFiles([...selectedFiles]);
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
    //    console.log(formData.images);
    };
    
    async function onSubmit(e){
        e.preventDefault();
        // console.log(formData.images);
        deleteImage(mustDeleteImgs);
        updateItem(formData, params.id, oldImages);
        setShowModal(true);
        //if(error == '') navigate(`/place/${params.id}`);
    };
    return(
        <SectionWrraper>
            {/* <CenteredForm> */}
                <SectionHeader title='Edit Place'/>
                {loading ? (<p>Loading....</p>) : (
                (placeData) && 
                <AddForm onSubmit={onSubmit}>
                    <Wrraper2col>
                        <section className='formItems'>
                            <FormItem onChange={onChange} type='text' title='Place Title' lbl='title' value={title} placeholder='' minLength='10' maxLength='32'/>
                            <FormItem type='text' title='Adress' lbl='adress' placeholder='' onChange={onChange} value={adress}/>
                            <HorStack>
                                <FormItem type='number' title='langtude' lbl='langtude' onChange={onChange} min='-180.00000' max='180.00000' step='0.000001' value={langtude}/>
                                <FormItem type='number' title='latitude' lbl='latitude' onChange={onChange} min='-90.00000' max='90.00000' step='0.000001' value={latitude}/>
                            </HorStack>
                            <TextAreaItem title='Description' lbl='description' placeholder='' onChange={onChange} value={description}/>
                        </section>
                        <section className='formItems'>
                            <CheckItem title='Sell/Rent' type='button' lbl='type' value='sell/rent' onChange={onChange} active={type}/> 
                            <CheckItem title='Parking' type='button' lbl='parking' value='yes/no' onChange={onChange} active={parking}/>
                            <CheckItem title='Furnished' type='button' lbl='furnished' value='yes/no' onChange={onChange} active={furnished}/>                    
                            <CheckItem title='Offer' type='button' lbl='offer' value='yes/no' onChange={onChange} active={offer}/>
                            <HorStack>
                                <FormItem type='number' title='Beds' lbl='beds' onChange={onChange} min='1' max='50' value={beds}/>
                                <FormItem type='number' title='Paths' lbl='baths' onChange={onChange} min='1' max='50' value={baths}/>
                            </HorStack>                    
                            <FormItem type='number' title='Reguler Price' lbl='price' onChange={onChange} min='50' max='400000000' value={price}/>
                        </section>
                    {/* <FormItem type='file' title='Images' lbl='images' onChange={onChange} multiple='true' accept='.png,.jpg,.jpeg'/> */}
                    <ExtendedItem>
                        <DisplayImages files={files} oldImages={oldImages} setOldImages={setOldImages} mustDeleteImgs={mustDeleteImgs} setMustDeleteImgs={setMustDeleteImgs} progress={progress} setFiles={setFiles} onChange={onChange} deleteImage={deleteImage}/>
                    </ExtendedItem>
                    <Button title='Update Place' type='submit' width='50%' gridCol='1'/>
                    </Wrraper2col>
                </AddForm>
                )}
            {/* </CenteredForm> */}
            {showModal && createPortal(<LoadingModal setShowModal={() => setShowModal(!showModal)}/>, document.body)}
        </SectionWrraper>
    )
}

export default UpdatePlace;