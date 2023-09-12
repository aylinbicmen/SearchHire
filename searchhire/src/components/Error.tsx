import {useState } from 'react';
import '../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/UserSlice';
import { RootState } from '../store/Store';


export default function About() {

    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    return(
        <>
            <Navbar/>
            
            <div className='d-flex flex-column justify-content-center' style={{height:"35rem"}} id='elementMessage'>

                <div className='m-auto d-flex flex-column justify-content-center'>
                    <div className="alert alert-danger h1" role="alert">
                        Hatalı Adres!
                    </div>
                </div>

            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </>
    )
}