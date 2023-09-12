import { useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { login } from '../actions/UserSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import userProfile from '../images/userprofile.png';

export default function Profile() {
    
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    return(
        <div style={{overflowX:"hidden"}}>
            <Navbar/>
            <h2 className='text-center mt-5 division-title'>Merhaba, {user.name} {user.surname} <i className="bi bi-emoji-smile"></i></h2>
            <div className='row'>
                <div className='col-lg-2'>
                    <div className='m-auto d-flex flex-column justify-content-center ms-5' style={{height:"35rem"}}>
                        <ul className="list-group">
                            <Link to={""} className='list-group-item list-group-item-action active bg-danger'>Profil</Link>
                            <Link to={"/edituser"} className='list-group-item list-group-item-action'>Bilgileri Düzenle</Link>
                            <Link to={"/userposts"} className='list-group-item list-group-item-action'>İlanlarım</Link>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-10'>
                    <div className='w-75 m-auto d-flex flex-column justify-content-center' style={{height:"45rem"}}>
                        <div className='row'>
                            <div className='col-8'>
                                <img src={userProfile} alt="people" className='img-fluid' style={{width:"80%"}}/>
                            </div>
                            <div className='col-4'>
                                <h2 className='mt-5 pt-5 profile-title'>Profil bilgilerinizi düzenleyebilir ya da ilanlarınızı kontrol edebilirsiniz.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </div>
    )
}