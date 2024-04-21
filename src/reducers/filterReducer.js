export const filterReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case "PLACES_LIST":
            return {places: payload.places}
        case "PRICE":
            return {...state, price: payload.price}
        case "OFFER":
            return{...state, offer: payload.offer}
        case "CATEGORY":
            return{...state, category: payload.category}
        case "CLEAR_FILTER":
            return{
                ...state, 
                price: null,
                category: null,
                offer: false
            }
        default:
            throw new Error('no case found');
    }
}