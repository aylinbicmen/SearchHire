import { useEffect, useState } from 'react';
import '../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/UserSlice';
import { actions } from '../actions/WorkFormReducer';
import { RootState } from '../store/Store';
import { Link } from 'react-router-dom';
import { SpecialtyType } from '../type';


export default function WorkForm() {

    let messageElement = document.getElementById("elementMessage");
    let messageDanger: HTMLElement|null = document.getElementById("messageDanger");
    const [services,setServices] = useState([]);
    const [work,setWork] = useState({});
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    useEffect(() => {
        actions.getServices().then((result) => setServices(result));
      },[])

    return(
        <>
            <Navbar/>
            
            <div className='d-flex flex-column justify-content-center' style={{height:"35rem"}} id='elementMessage'>
                <h2 className='text-center mt-5 division-title'>İş Formu</h2>

                <form className='w-50 m-auto d-flex flex-column justify-content-center' onSubmit={(e) => actions.handleSubmit(e,work,messageElement,messageDanger)}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-bold">Başlık</label>
                        <input type="text" className="form-control" id="Title" name='Title' aria-describedby="titleHelp" onChange={(e) => actions.handleChange(e,setWork,work,user.id)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-bold">Açıklama</label>
                        <input type="text" className="form-control" id="Description" name='Description' aria-describedby="descriptionHelp" onChange={(e) => actions.handleChange(e,setWork,work,user.id)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="specialty" className="form-label fw-bold">Hizmet</label>
                        <select className="form-control" id="SpecialtyId" name="SpecialtyId" onChange={(e) => actions.handleChange(e,setWork,work,user.id)}>
                            <option value={"0"}>SEÇİNİZ...</option>
                            {
                                services && services.map((service: SpecialtyType) => (
                                    <option key={service.id} value={service.id}>{service.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="submit" className="btn btn-danger me-3">Gönder</button>
                        <Link to={'/'} role="button" className="btn btn-outline-danger ps-3 pe-3"><i className="bi bi-house-fill"></i></Link>   
                    </div>
                </form>

                <div className='d-flex justify-content-center' id='messageDanger'>
                    
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </>
    )
}