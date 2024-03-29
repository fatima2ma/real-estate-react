import { createContext } from "react";
import useDataFetching from '../hooks/useDataFetching';

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    const [sellplaces, rentplaces, loading, ImagesSliderURLs] = useDataFetching();
    return(
        <DataContext.Provider value={{sellplaces, rentplaces, loading, ImagesSliderURLs}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;