import { useContext, useEffect, useState } from 'react';
import {styled} from 'styled-components';
import Button from '../components/Button';
import FormItem from '../components/FormItem';
import TextAreaItem from '../components/TextAreaItem';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import CheckItem from '../components/CheckItem';
import ItemContext from '../context/ItemContext';
import Wrraper2col from '../components/Wrraper2col';
import InputFileUpload from '../components/InputFileUpload';
import DisplayImages from '../components/DisplayImages';

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

    const [files, setFiles] = useState([]);
    const {addPlace, progress} = useContext(ItemContext);
    
    function onChange(e){
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
            console.log('e.target.files');
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
        addPlace(formData);       
    }

    return(
        <SectionWrraper>
            <AddForm onSubmit={onSubmit}>
            <SectionHeader title='Add New Place'/>
            <Wrraper2col>
                <section className='formItems'>
                    <FormItem onChange={onChange} type='text' title='Place Title' lbl='title' placeholder='' minLength='10' maxLength='32'/>
                    <FormItem type='text' title='Adress' lbl='adress' placeholder='' onChange={onChange}/>
                    <HorStack>
                        <FormItem type='number' title='langtude' lbl='langtude' onChange={onChange} min='-180.00000' max='180.00000' step='0.000001'/>
                        <FormItem type='number' title='latitude' lbl='latitude' onChange={onChange} min='-90.00000' max='90.00000' step='0.000001'/>
                    </HorStack>
                    <TextAreaItem title='Description' lbl='description' placeholder='Description' onChange={onChange} rows='6'/>
                </section>
                <section className='formItems'>
                    <CheckItem title='Sell/Rent' type='button' lbl='type' value='sell/rent' onChange={onChange} active={formData.type}/>
                    <CheckItem title='Parking' type='button' lbl='parking' value='yes/no' onChange={onChange} active={formData.parking}/>
                    <CheckItem title='Furnished' type='button' lbl='furnished' value='yes/no' onChange={onChange} active={formData.furnished}/>
                    <HorStack>
                        <FormItem type='number' title='Beds' lbl='beds' onChange={onChange} min='1' max='50'/>
                        <FormItem type='number' title='Paths' lbl='baths' onChange={onChange} min='1' max='50'/>
                    </HorStack>
                    <FormItem type='number' title='Reguler Price' lbl='price' onChange={onChange} min='50' max='400000000'/>
                </section>
                <ExtendedItem>
                    {/* <InputFileUpload onChange={onChange} files={files}/>  */}
                    <DisplayImages files={files} progress={progress} setFiles={setFiles} onChange={onChange}/>                 
                </ExtendedItem>
                <Button title='add place' type='submit' width='50%' gridCol='1'/>
            </Wrraper2col>
            </AddForm>
        </SectionWrraper>
    )
}

export default AddPlace;