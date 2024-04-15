import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import FormItem from '../components/FormItem';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import MidWrraper from '../components/MidWrraper';
import LoadingWrapp from '../components/LoadingWrapp';
import SectionLoading from '../components/SectionLoading';
import Loading from '../components/Loading';
import LoadBtn from '../components/LoadBtn';
import CategoryContext from '../context/CategoryContext';
import AuthContext from '../context/AuthContext';

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
    color: #eee;
    order: 2;
    border: 1px solid #eee;
    padding: .3rem;

    &:hover{
        color: #fff;
    }
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
    const [formDataUser, setFormDataUser] = useState({
        email: auth.currentUser.email,
        username: auth.currentUser.displayName,
    });
    const {email, username} = formDataUser;

    const {updateAuth} = useContext(AuthContext);
    const {places, loading, lastFetched, loadMore, fetchData, fetchMoreData, deleteData } = useContext(CategoryContext);
    
    useEffect(() =>{
       fetchData('userRef', '==', auth.currentUser.uid);
    },[auth.currentUser.uid]);

    function handlefetchMoreData(){
        fetchMoreData('userRef', '==', auth.currentUser.uid, lastFetched);
    }
    
    function onChange(e){
        setFormDataUser((prevStatus) => ({
            ...prevStatus,
            [e.target.id]: e.target.value,
        }))
    }
    
    function onSubmit(e){
        e.preventDefault();
        updateAuth(username);       
    }
    
    function onDeleteClick(id){
        deleteData(id);
    }

    const [tree, setTree] = useState({
        title: 'squareThumb',
        thumbnail: true,
        header: false,
        body: {
            type: 'list',
            title: true,
            items: 2,
        },
        subTitle: {
            type: 'subTitle',
            items: 3,
        },
        breakline: false,
    });

    const [Titletree, setTitleTree] = useState({
        title: 'titleTree',
        header: false,
        body: {
            type: 'list',
            title: false,
            items: 1,
        },
    });

    return(
        <>
        <SectionWrraper classStyle='darkCard'>
        <MidWrraper>
        <SectionHeader title='My Profile' subTitle=''/>
        <Form onSubmit={onSubmit}>
            <FormItem type='email' title='Email' placeholder='write yor email please...' disabled={true} onChange={onChange} lbl='email' value={formDataUser.email} id='email'/>
            <FormItem type='text' title='User Name' placeholder='write yor name please...' onChange={onChange} lbl='username' value={formDataUser.username} id='username'/>
            {/*<FormItem type='Password' placeholder='write yor password please...' lbl='password'/>*/}
            <Btns>
                <LinkSt to='/'>Sign out</LinkSt>
                <Button type='submit' classStyle='shadow' backColor='#3949AB' title='Update'/>
            </Btns>
        </Form>
        </MidWrraper>
        </SectionWrraper>
        <SectionWrraper>
        {loading ? (<>
            <SectionLoading>
                <LoadingWrapp className={`${Titletree.title} LoadingWrapp`}><Loading tree={Titletree}/></LoadingWrapp>
            </SectionLoading>
            <SectionLoading>
                {[...Array(3)].map((_, i) => 
                    <LoadingWrapp key={i} className={`${tree.title} LoadingWrapp`}><Loading tree={tree}/></LoadingWrapp>
                )}                       
            </SectionLoading>
        </>) : (
        <>
            <SectionHeader title='Recent offers' subTitle='' hasLink={true}/>
            <CardsWrraper>
            {places.map(item => 
                <Card key={item.id}
                    id={item.id}
                    title={item.data.title}
                    thumbnail={item.data.imagesURLs[0]}
                    padge='17 days ago'
                    price={item.data.price}
                    location={item.data.adress}
                    beds={item.data.beds}
                    baths={item.data.baths}
                    deleteClick={() => onDeleteClick(item.id)}/>
            )}
            </CardsWrraper>
            {places.length <= 0 ?
            <p className='desc'>You don't add any place yet.</p>
            :<Button onClick={handlefetchMoreData} disabled={loadMore} type='button' backColor='#276ce7' width='25%' title='Load more'>
                {loadMore? <LoadBtn/> : ''}
            </Button>
            }
        </>
        )}        
        </SectionWrraper>
        </>
    )
};

export default Profile;

// https://www.prama.gr
// https://www.w3.org/WAI/ARIA/apg/#dialog_modal