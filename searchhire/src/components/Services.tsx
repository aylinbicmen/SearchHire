import { useEffect, useState } from 'react';
import '../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/UserSlice';
import { actions } from '../actions/ServicesReducer';
import Card from './Card';
import { RootState } from '../store/Store';


export default function Services() {

    const [services,setServices] = useState([]);
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }
    useEffect(() => {
        actions.getServices().then((result) => setServices(result));
      },[])
      
    return(
        <div style={{overflowX:"hidden"}}>
            <Navbar/>
            <h2 className='text-center mt-5 division-title'>Tüm Hizmetler</h2>
            <div>
                <div className='mt-3 row d-flex justify-content-center p-3'>
                    {
                        services && services.map((service,i) => <Card item={service} cityId={user.cityId} key={i}/>)
                    }
                </div>
            </div>

            <Footer/>
        </div>
    )
}