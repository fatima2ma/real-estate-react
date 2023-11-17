import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { getAuth,
        updateEmail,
        updateProfile,
        verifyBeforeUpdateEmail,
        signOut} from 'firebase/auth';
import { collection,
        query,
        where,
        getDocs,
        doc,
        deleteDoc,
        updateDoc} from 'firebase/firestore';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import img from '../img.jpg';
import FormItem from '../components/FormItem';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import MidWrraper from '../components/MidWrraper';

const Form = styled.form`
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    text-align: start;
`;

const Btns = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
    justify-content: space-between;
    align-items: center;
`;

const LinkSt = styled(Link)`
    font-size: 14px;
    font-weight: bold;
    color: #276ce7;
    order: 2;
`;

const CardsWrraper = styled.ul`
    display: grid;
    grid-gap: 1rem;
//    grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    //margin: 1rem 0;
`; 

function Profile(){
    const auth = getAuth();
    console.log(auth.currentUser);
    const [formDataUser, setFormDataUser] = useState({
        email: auth.currentUser.email,
        username: auth.currentUser.displayName,
    });
    const [items, setItems] = useState([]);
    const {email, username} = formDataUser;
    
    async function fetchData(){
        const que = query(collection(db, 'places'), where('userRef', '==', 'h9TKLQkWgRPnZReH25vDU4JFarw1'));
        const docs = await getDocs(que);
        const temp = [];
        docs.forEach(doc => {
            //console.log(doc.id, '=>', doc.data());
            temp.push({id: doc.id, data: doc.data()});
        })
        setItems(temp);
    };  
    
    useEffect(() =>{
       fetchData();
    },[auth.currentUser.uid]);
    
    function onChange(e){
            setFormDataUser((prevStatus) => ({
                ...prevStatus,
                [e.target.id]: e.target.value,
            }))
    }
    
    async function onSubmit(e){
        e.preventDefault();
        //console.log(formDataUser.email);
//        if(auth.currentUser.email !== email){
//           const verfy = await verifyBeforeUpdateEmail(auth.currentUser, email);
//            auth.onAuthStateChanged(authuser => {
//                console.log(authuser);
//            })
//            await signOut(auth);
//        }
        if(auth.currentUser.displayName && auth.currentUser.displayName !== username )
            await updateProfile(auth.currentUser, {displayName: username});
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, formDataUser);         
    }
    
    async function onDeleteClick(id){
        console.log(id);
        try{
            const result = await deleteDoc(doc(db, 'places', id));
            setItems(items.filter(item => item.id !== id));
        }catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <SectionWrraper classStyle=''>
        <MidWrraper>
        <SectionHeader title='My Profiel' subTitle=''/>
        <Form onSubmit={onSubmit}>
            <FormItem type='email' placeholder='write yor email please...' onChange={onChange} lbl='email' value={formDataUser.email} id='email'/>
            <FormItem type='text' placeholder='write yor name please...' onChange={onChange} lbl='username' value={formDataUser.username} id='username'/>
            {/*<FormItem type='Password' placeholder='write yor password please...' lbl='password'/>*/}
            <Btns>
                <LinkSt to='/'>Sign out</LinkSt>
                <Button type='submit' backColor='gray' title='Update'/>
            </Btns>
        </Form>
        </MidWrraper>
        </SectionWrraper>
        <SectionWrraper>
        <SectionHeader title='Recent offers' subTitle='Show more places' hasLink={true}/>
        <CardsWrraper>
        {items.map(item => 
            <Card key={item.id}
                id={item.id}
                title={item.data.title}
                thumbnail={item.data.imagesURLs[0]}
                padge='17 days ago'
                price={item.data.price}
                location={item.data.adress}
                beds={item.data.beds}
                baths={item.data.paths}
                deleteClick={()=> onDeleteClick(item.id)}/>
        )}
            <Card title='Routes are perhaps the most important part of a React Router app'
                thumbnail={img}
                padge='17 days ago'
                price='1,987$'
                location='Room 92/9 street hyetsh eooxj kjfybbcgs bcyrtsld gftryu ndhyk'
                beds='4'
                baths='2'/>
            <Card title='Routes are perhaps the most important part of a React Router app'
                thumbnail={img}
                padge='17 days ago'
                price='1,987$'
                location='Room 92/9 street hyetsh eooxj kjfybbcgs bcyrtsld gftryu ndhyk'
                beds='4'
                baths='2'/>
            <Card title='Routes are perhaps the most important part of a React Router app'
                thumbnail={img}
                padge='17 days ago'
                price='1,987$'
                location='Room 92/9 street hyetsh eooxj kjfybbcgs bcyrtsld gftryu ndhyk'
                beds='4'
                baths='2'/>
            <Card title='Routes are perhaps the most important part of a React Router app'
                thumbnail={img}
                padge='17 days ago'
                price='1,987$'
                location='Room 92/9 street hyetsh eooxj kjfybbcgs bcyrtsld gftryu ndhyk'
                beds='4'
                baths='2'/>
        </CardsWrraper>
        </SectionWrraper>
        </>
    )
};

export default Profile;