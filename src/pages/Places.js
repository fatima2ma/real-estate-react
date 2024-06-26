import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingWrapp from '../components/LoadingWrapp';
import SectionLoading from '../components/SectionLoading';
import Loading from '../components/Loading';
//import LoadBtn from '../components/LoadBtn';
import { useContext } from 'react';
//import CategoryContext from '../context/CategoryContext';
import { FilterContext } from '../context/FilterContext';
import FilterBar from '../components/FilterBar';
import DataContext from '../context/DataContext';

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

const TowColContainer = styled.div`
    display: flex;
    flex: 1 0 100%;
`;

function Places() {
    const navigate = useNavigate();
    const {alldata, loading} = useContext(DataContext);
    const { places, initialPlacesList} = useContext(FilterContext);
    // const [loading, setLoading] = useState(true);
    // const { lastFetched, loadMore, fetchData, fetchMoreData} = useContext(CategoryContext);
    // const {sellplaces, rentPlaces, placesData, loading} = useDataFetching(); 

    // function handlefetchMoreData(){
    //     fetchMoreData('title', '!=', ' ', lastFetched);
    // }

    useEffect(() => {
        console.log(alldata);
        initialPlacesList(alldata);       
    },[navigate, loading]);

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
  return (
    <TowColContainer>
      <FilterBar places={places}/>
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
            {/* <Button onClick={handlefetchMoreData} disabled={loadMore} type='button' backColor='#276ce7' width='25%' title='Load more'>
                {loadMore? <LoadBtn/> : ''}
            </Button> */}
            </MainContent>
            </>
            )}
        </SectionWrraper>
    </TowColContainer>
  );
}

export default Places;