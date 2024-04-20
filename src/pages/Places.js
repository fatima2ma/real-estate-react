import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionWrraper from '../components/SectionWrraper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingWrapp from '../components/LoadingWrapp';
import SectionLoading from '../components/SectionLoading';
import Loading from '../components/Loading';
import LoadBtn from '../components/LoadBtn';
import { useContext } from 'react';
import CategoryContext from '../context/CategoryContext';
import { FaFilter } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";

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

const FilterbarShow = styled.aside`
    background: #333;
    padding: 1rem;
    max-width: 3rem;
    transition: all .4s ease;

    &.active{
        max-width: 200px; 
    }
`;

const FilterBar = styled.ul`
    // border: 1px solid #fff;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #fff;
    & > .filterSection{
        display: flex;
        align-items: center;
        gap: 1rem;
        min-height: 30px;
        
        & .filter-icon{
            font-size: 15px;
        }
    }

    &  .check-group{
        display: flex;
        align-items: center;
        gap: .5rem;            
        height: 0;
        font-size: 14px;
        opacity: 0;
        transform-origin: left;
        transform: scaleX(0) translateX(-30px);
        transition: all .4s ease;

        & > label{
            line-height: 30px;
        }
    }
    
    &.active  .check-group{
        height: 30px;
        opacity: 1;
        transform: scaleX(1) translateX(0px);
    } 
`;

const FilterBtn = styled.button`
  background: transparent;
  cursor: pointer;
  color: #fff;
  margin-bottom: 1rem
`;

function Places() {
  const params = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const {places, loading, lastFetched, loadMore, fetchData, fetchMoreData} = useContext(CategoryContext);

    function handlefetchMoreData(){
        fetchMoreData('title', '!=', ' ', lastFetched);
    }
    
    useEffect(() => {
       fetchData('title', '!=', ' '); 
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
  return (
    <TowColContainer>
      <FilterbarShow className={showFilter? 'active' : ''}>
      <FilterBtn onClick={() => setShowFilter(!showFilter)}>
        <FaFilter/>
      </FilterBtn>
        <FilterBar className={showFilter? 'active' : ''}>            
            <li className='filterSection'>
                <span><FaFilterCircleDollar className='filter-icon'/></span>
                <div className='check-group'>
                    <input type='radio' name='price' id='price-low'/>
                    <label htmlFor='price-low'>low</label>
                </div>
                <div className='check-group'>
                    <input type='radio' name='price' id='price-high'/>
                    <label htmlFor='price-high'>high</label>
                </div>
            </li>
            <li className='filterSection'>
                <span><BiSolidOffer className='filter-icon'/></span>
                <div className='check-group'>
                    <input type='radio' name='offer' id='offer'/>
                    <label htmlFor='offer'>offer</label>
                </div>
            </li>
            <li className='filterSection'>
            <span><MdCategory className='filter-icon'/></span>
                <div className='check-group'>
                    <input type='radio' name='type' id='sell'/>
                    <label htmlFor='sell'>sell</label>
                </div>
                <div className='check-group'>
                    <input type='radio' name='type' id='rent'/>
                    <label htmlFor='rent'>rent</label>
                </div>
            </li>
            <li className='filterSection'>
                <span><FaRegStar className='filter-icon'/></span>
                <div className='check-group'>
                    <input type='radio' name='rate' id='rate-low'/>
                    <label htmlFor='rate-low'>low</label>
                </div>
                <div className='check-group'>
                    <input type='radio' name='rate' id='rate-high'/>
                    <label htmlFor='rate-high'>high</label>
                </div>
            </li>
        </FilterBar>
      
      </FilterbarShow>
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
    </TowColContainer>
  );
}

export default Places;