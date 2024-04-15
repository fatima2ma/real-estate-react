import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Slider from '../components/Slider';
import Button from '../components/Button';
import LoadingWrapp from '../components/LoadingWrapp';
import SectionLoading from '../components/SectionLoading';
import Loading from '../components/Loading';
import LoadBtn from '../components/LoadBtn';
import { useContext } from 'react';
import CategoryContext from '../context/CategoryContext';

const CardsWrraper = styled.ul`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

function Offers(){
    const params = useParams();
    console.log(params.categoryName);
    const {places, loading, lastFetched, loadMore, fetchData, fetchMoreData} = useContext(CategoryContext);

    function handlefetchMoreData(){
        fetchMoreData('offer', '==', true, lastFetched);
    }
    
    useEffect(() => {
       fetchData('offer', '==', true); 
    },[params.categoryName]);

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
        <SectionWrraper>
            {loading? (<>
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
            <SectionHeader title={`places for offers`}/>
            <MainContent>
            <CardsWrraper>
                {places && places.map(item => 
                <Card key={item.id}
                    id={item.id}
                    title={item.data.title}
                    thumbnail={item.data.imagesURLs[0]}
                    padge='17 days ago'
                    price={item.data.price}
                    location={item.data.adress}
                    beds={item.data.beds}
                    baths={item.data.baths}
                    />
                )}
            </CardsWrraper>
            <Button onClick={handlefetchMoreData} disabled={loadMore} type='button' backColor='#276ce7' width='25%' title='Load more'>
                {loadMore? <LoadBtn/> : ''}
            </Button>
            </MainContent>
            </>
            )}
        </SectionWrraper>
    )
};

export default Offers;