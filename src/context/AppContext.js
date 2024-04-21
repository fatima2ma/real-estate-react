import { AuthContextProvider } from './AuthContext';
import { DataContextProvider } from './DataContext';
import { CategoryContextProvider } from './CategoryContext';
import { ItemContextProvider } from './ItemContext';
import { FilterProvider } from './FilterContext';

const AppContext = ({children}) => {
    return(
        <AuthContextProvider>
            <DataContextProvider>
                <CategoryContextProvider>
                    <ItemContextProvider>
                        <FilterProvider>
                            {children}
                        </FilterProvider>
                    </ItemContextProvider>
                </CategoryContextProvider>
            </DataContextProvider>
        </AuthContextProvider>
    )
}

export default AppContext;