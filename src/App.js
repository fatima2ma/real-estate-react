import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
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
import AppContext from './context/AppContext';
import NotFound from './pages/NotFound';

function App() {
  return ( 
    <BrowserRouter>  
    <div className="App">      
      <AppContext>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/offers" element={<Offers/>}/>
            <Route path="/places" element={<Places/>}/>
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
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <Footer/>
        </AppContext>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
    </BrowserRouter>    
  );
}

export default App;
