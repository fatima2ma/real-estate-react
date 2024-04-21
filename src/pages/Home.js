import styled from 'styled-components';
import { useState} from 'react';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Hero from '../components/Hero';
import Card from '../components/Card';
import LoadingWrapp from '../components/LoadingWrapp';
import SectionLoading from '../components/SectionLoading';
import Loading from '../components/Loading';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import 'react-toastify/dist/ReactToastify.css';

const CardsWrraper = styled.ul`
    display: grid;
    grid-gap: 1rem;
//    grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
   // margin: 1rem 0;
`;


function Home(){
    const auth = getAuth();
    const {sellplaces, rentplaces, loading} = useContext(DataContext);
    function onDeleteClick(id, userRef){
        if (userRef !== auth.currentUser.uid) {
            console.log(auth.currentUser.uid, userRef);
            toast.error("You can't edit this listing");
          };
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
        header: true,
        body: {
            type: 'list',
            title: false,
            items: 1,
        },
    });
    return(
        <> 
        {loading ? (
            <SectionWrraper>
                <SectionLoading>
                    <LoadingWrapp className={`${Titletree.title} LoadingWrapp`}><Loading tree={Titletree}/></LoadingWrapp>
                </SectionLoading>
                <SectionLoading>
                    {[...Array(4)].map((_, i) => 
                        <LoadingWrapp key={i} className={`${tree.title} LoadingWrapp`}><Loading tree={tree}/></LoadingWrapp>
                    )}
                </SectionLoading>
            </SectionWrraper>) : (
        <div>
        <Hero/>
        <SectionWrraper>
        <SectionHeader title='Rent offers' subTitle='Show more places' category='rent'/>
        <CardsWrraper>
        {rentplaces.map(place => (
            <Card title={place.data.title}
                id={place.id}
                thumbnail={place.data.imagesURLs[0]}
                padge='17 days ago'
                price={place.data.price}
                location={place.data.adress}
                beds={place.data.beds}
                baths={place.data.baths}
                deleteClick={() => onDeleteClick(place.id, place.data.userRef)}/>
        ))}
        </CardsWrraper>
        </SectionWrraper>
        <SectionWrraper>
        <SectionHeader title='Sell offers' subTitle='Show more places' category='sell'/>
        <CardsWrraper>
        {sellplaces.map(place => (
            <Card title={place.data.title}
                id={place.id}
                thumbnail={place.data.imagesURLs[0]}
                padge='17 days ago'
                price={place.data.price}
                location={place.data.adress}
                beds={place.data.beds}
                baths={place.data.baths}
                deleteClick={() => onDeleteClick(place.id, place.data.userRef)}/>
        ))}
        </CardsWrraper>
        </SectionWrraper>
        </div>
        )}
        </>
    )
}

//https://veerle.duoh.com/inspiration

export default Home;