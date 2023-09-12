import { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { login } from '../actions/UserSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { actions } from '../actions/UserPostsReducer';
import Table from './Table';

export default function UserPosts() {
    
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const user = useSelector((state: RootState) => state.user);

    const [userPosts,setUserPosts] = useState([]);

    const dispatch = useDispatch();

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    useEffect(() => {
        actions.getUserPosts(user.id).then((result) => setUserPosts(result));
    },[]);

   if(user.isMasterUser == false){
    return(
        <div style={{overflowX:"hidden"}}>
            <Navbar/>
            <h2 className='text-center mt-5 division-title'>Merhaba, {user.name} {user.surname} <i className="bi bi-emoji-smile"></i></h2>
            <div className='row'>
                <div className='col-lg-2'>
                    <div className='m-auto d-flex flex-column justify-content-center ms-5' style={{height:"35rem"}}>
                        <ul className="list-group">
                            <Link to={"/profile"} className='list-group-item list-group-item-action'>Profil</Link>
                            <Link to={"/edituser"} className='list-group-item list-group-item-action'>Bilgileri Düzenle</Link>
                            <Link to={""} className='list-group-item list-group-item-action active bg-danger'>İlanlarım</Link>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-10'>
                    <div className='w-75 m-auto d-flex flex-column justify-content-center' style={{height:"35rem"}}>
                        <Table posts={userPosts}/>
                    </div>
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </div>
    )
   }
   else{
    return(
        <div style={{overflowX:"hidden"}}>
            <Navbar/>
            <h2 className='text-center mt-5 division-title'>Merhaba, {user.name} {user.surname} <i className="bi bi-emoji-smile"></i></h2>
            <div className='row'>
                <div className='col-lg-2'>
                    <div className='m-auto d-flex flex-column justify-content-center ms-5' style={{height:"35rem"}}>
                        <ul className="list-group">
                            <Link to={"/profile"} className='list-group-item list-group-item-action'>Profil</Link>
                            <Link to={"/edituser"} className='list-group-item list-group-item-action'>Bilgileri Düzenle</Link>
                            <Link to={""} className='list-group-item list-group-item-action active bg-danger'>İlanlarım</Link>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-10'>
                    <div className='w-75 m-auto d-flex flex-column justify-content-center' style={{height:"35rem"}}>
                        <div className='mb-3 d-flex flex-row-reverse'>
                            <button type="button" className="btn btn-danger" onClick={() => actions.getMasterUserPosts(user.id).then((result) => setUserPosts(result))}>Aldığım İşler</button>
                            <button type="button" className="btn btn-danger me-3" onClick={() => actions.getUserPosts(user.id).then((result) => setUserPosts(result))}>Verdiğim İlanlar</button>
                        </div>
                        <Table posts={userPosts}/>
                    </div>
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </div>
    )
   }
}