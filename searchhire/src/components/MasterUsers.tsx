import { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch } from 'react-redux';
import { login } from '../actions/UserSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import { actions } from '../actions/MasterUsersReducer';
import { UserType } from '../type';

export default function MasterUsers() {

    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const dispatch = useDispatch();

    const { specialtyId, cityId } = useParams() as { specialtyId: string, cityId: string };
    const[masterUsers,setMasterUsers] = useState([]);

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    useEffect(() => {
        actions.getMasters(specialtyId,cityId).then((result) => setMasterUsers(result));
      },[])

    return (
        <div style={{overflowX:"hidden"}}>
            <Navbar/>
            <h2 className='text-center mt-5 division-title'>Ustalar</h2>
            <div>
                <div className='mt-3 row d-flex justify-content-center p-3'>
                    {
                        masterUsers && masterUsers.map((masterUser: UserType) => 
                            <div className="card m-3" style={{width: "18rem"}}>
                                <img src={require(`../images/user.png`)} className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title c-title">{masterUser.name} {masterUser.surname}</h5>
                                    <Link to={`/masteruser/${masterUser.id}/${masterUser.cityId}`} role='button' className='btn btn-outline-dark'>Detay</Link>
                                </div>
                            </div>)
                    }
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </div>
    )
}