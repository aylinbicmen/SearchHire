import '../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import userImage from '../images/user.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { actions } from '../actions/MasterUserDetailReducer';
import { CityType, ProvinceType, UserType } from '../type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { login } from '../actions/UserSlice';

export default function MasterUserDetail() {

    const { id, cityId } = useParams() as { id:string,cityId:string };

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    const [masterUser,setMasterUser] = useState({} as UserType);
    const [province,setProvince] = useState({} as ProvinceType);
    const [city,setCity] = useState({} as CityType);
    const [work,setWork] = useState({});

    let messageElement: HTMLElement|null = document.getElementById("message");
    
    useEffect(() => {
        actions.getMasterUser(id).then((result) => setMasterUser(result));
        actions.getProvinceByCity(cityId).then((result) => setProvince(result));
        actions.getCity(cityId).then((result) => setCity(result));
      },[])

    return (
        <>
            <Navbar/>

            <div className='d-flex flex-column justify-content-center align-items-center' style={{height:"45rem"}}>
                <div className='row'>
                    <div className='col'>
                        <img src={userImage} className="img-fluid" alt="..." style={{maxWidth:"50%"}}/>

                        <div id='message'>
                        
                        </div>
                    </div>
                    <div className='col'>
                        <p className='ps-3'><span className='fw-bold'>Ad Soyad: </span>{masterUser.name} {masterUser.surname}</p>
                        <hr className='w-50'/>
                        <p className='ps-3'><span className='fw-bold'>Yer: </span>{province.name} - {city.name}</p>
                        <hr className='w-50'/>
                        <p className='ps-3 mb-3'><span className='fw-bold'>İş Sayısı: </span>{masterUser.workDone}</p>

                        <h3 className='c-title mt-5 '>İş Formu</h3>

                        <form className='w-75 mt-4' onSubmit={(e) => actions.handleSubmit(e,work,messageElement)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label fw-bold">Başlık</label>
                                <input type="text" className="form-control" id="Title" name='Title' aria-describedby="titleHelp" onChange={(e) => actions.handleChange(e,setWork,work,user.id,Number(id),masterUser.specialtyId)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label fw-bold">Açıklama</label>
                                <input type="text" className="form-control" id="Description" name='Description' aria-describedby="descriptionHelp" onChange={(e) => actions.handleChange(e,setWork,work,user.id,Number(id),masterUser.specialtyId)}/>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-danger">Gönder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </>
    )
}