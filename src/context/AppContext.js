import { AuthContextProvider } from './AuthContext';
import { DataContextProvider } from './DataContext';
import { CategoryContextProvider } from './CategoryContext';
import { ItemContextProvider } from './ItemContext';

const AppContext = ({children}) => {
    return(
        <AuthContextProvider>
            <DataContextProvider>
                <CategoryContextProvider>
                    <ItemContextProvider>
                            {children}
                    </ItemContextProvider>
                </CategoryContextProvider>
            </DataContextProvider>
        </AuthContextProvider>
    )
}

export default AppContext;