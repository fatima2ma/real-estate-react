import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Header from './components/Header';
import Offers from './pages/Offers';
import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import Profile from './pages/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/Home';
import CardsWithcolumns from './pages/CardsWithcolumns';
import AddPlace from './pages/AddPlace';
import UpdatePlace from './pages/UpdatePlace';
import PrivateRoute from './components/PrivateRoute';
import Categoreis from './pages/Categoreis';

function App() {
  return ( 
    <BrowserRouter>  
    <div className="App">
      <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/offers" element={<Offers/>}/>
            <Route path="/places" element={<Home/>}/>
            <Route path="/places/:categoryName" element={<Categoreis/>}/>
            <Route path="/place/:id" element={<PlaceDetail/>}/>
            <Route path="/new" element={<PrivateRoute/>}>
                <Route path="/new" element={<AddPlace/>}/>
            </Route>
            <Route path='/place/:id/edit' element={<PrivateRoute/>}>
                <Route path="/place/:id/edit" element={<UpdatePlace/>}/> //search in display the name of the place in route
            </Route>
            <Route path='/profile' element={<PrivateRoute/>}>
                <Route path="/profile" element={<Profile/>}/>
            </Route>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/cards" element={<CardsWithcolumns/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
