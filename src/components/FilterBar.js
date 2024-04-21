import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { FaFilter } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { FilterContext } from '../context/FilterContext';

const FilterbarShow = styled.aside`
    background: #333;
    padding: 1rem;
    max-width: 3rem;
    transition: all .4s ease;

    &.active{
        max-width: 200px; 
    }
`;

const FilterBarList = styled.ul`
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
  margin-bottom: 2rem;
`;

const ClearBtn = styled.span`
    cursor: pointer;
    margin-top: 1rem;
    font-size: 14px;
`;

function FilterBar(){
    const {state, dispatch} = useContext(FilterContext);;
    const [showFilter, setShowFilter] = useState(false);

    return(
    <FilterbarShow className={showFilter? 'active' : ''}>
        <FilterBtn onClick={() => setShowFilter(!showFilter)}>
            <FaFilter/>
        </FilterBtn>
        <FilterBarList className={showFilter? 'active' : ''}>            
            <li className='filterSection'>
                <span><FaFilterCircleDollar className='filter-icon'/></span>
                <div className='check-group'>
                    <input type='radio' onChange={() => dispatch({type: 'PRICE', payload:{price: 'asc'}})} checked={state.price == 'asc' ? true : false} name='price' id='price-low'/>
                    <label htmlFor='price-low'>low</label>
                </div>
                <div className='check-group'>
                    <input type='radio' onChange={() => dispatch({type: 'PRICE', payload: {price: 'desc'}})} checked={state.price === 'desc' ? true : false} name='price' id='price-high'/>
                    <label htmlFor='price-high'>high</label>
                </div>
            </li>
            <li className='filterSection'>
                <span><BiSolidOffer className='filter-icon'/></span>
                <div className='check-group'>
                    <input onChange={() => dispatch({type: "OFFER", payload: {offer: !state.offer}})} checked={state.offer || false} type='radio' name='offer' id='offer'/>
                    <label htmlFor='offer'>offer</label>
                </div>
            </li>
            <li className='filterSection'>
            <span><MdCategory className='filter-icon'/></span>
                <div className='check-group'>
                    <input type='radio' onChange={()=> dispatch({type: "CATEGORY", payload: {category: 'sell'}})} checked={state.category == 'sell'? true : false} name='type' id='sell'/>
                    <label htmlFor='sell'>sell</label>
                </div>
                <div className='check-group'>
                    <input type='radio' onChange={()=> dispatch({type: "CATEGORY", payload: {category: 'rent'}})} checked={state.category == 'rent'? true : false} name='type' id='rent'/>
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
            <ClearBtn><FaFilterCircleXmark onClick={()=>dispatch({type: 'CLEAR_FILTER'})}/></ClearBtn>
        </FilterBarList>      
    </FilterbarShow>
    );
}

export default FilterBar;