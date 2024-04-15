import styled from 'styled-components';
import { useState} from 'react';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Slider from '../components/Slider';
import LoadingWrapp from '../components/LoadingWrapp';
import SectionLoading from '../components/SectionLoading';
import Loading from '../components/Loading';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const CardsWrraper = styled.ul`
    display: grid;
    grid-gap: 1rem;
//    grid-template-columns: repeat(4, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
   // margin: 1rem 0;
`;


function Home(){
    const {sellplaces, rentplaces, loading, ImagesSliderURLs} = useContext(DataContext);
   
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
        {/* <Slider data={ImagesSliderURLs}/>  */}
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
                baths={place.data.baths}/>
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
                baths={place.data.baths}/>
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