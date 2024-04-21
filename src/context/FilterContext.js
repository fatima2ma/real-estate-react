import { createContext, useContext, useReducer } from "react";
import { filterReducer } from '../reducers/filterReducer';

const filterInitialState = {
    places: [],
    price: null,
    category: null,
    offer: false,
}

export const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState);

    function initialPlacesList(places){
        return dispatch({
            type: 'PLACES_LIST',
            payload: {places: places}
        });
    }

    function price(places){
        if (state.price === 'asc') return places.sort((a,b) => a.data.price - b.data.price);
        if (state.price === 'desc') return places.sort((a,b) => b.data.price - a.data.price);
        return places;
    }

    function offer(places){
        return state.offer ? places.filter(place => place.data.offer === true) : places;
    }

    function category(places){
        console.log(places.filter(place => place.data.type === state.category));
        return state.category? places.filter(place => place.data.type === state.category) : places;
    }

    const filteredPlaces = category(offer(price(state.places)));

    const value = {
        state,
        dispatch,
        initialPlacesList,
        places: filteredPlaces,
    }
    return(
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

// export const useFilter = () => {
//     const context = useContext(FilterContext);
//     return context;
// }

export default FilterContext;