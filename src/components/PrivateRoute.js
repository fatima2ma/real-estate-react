import {Outlet, Navigate} from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

export default function PrivateRoute(){
    const {loggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus)
        return <p>Loading....</p>;
    
    return loggedIn ? <Outlet/> : <Navigate to='/signin'/>;
}