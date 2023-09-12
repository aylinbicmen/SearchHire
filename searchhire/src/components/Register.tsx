import { Link} from 'react-router-dom';
import '../App.css';
import {actions} from '../actions/RegisterReducer';
import loginRegister from '../images/login-register.jpg';
import { useState } from 'react';

export default function Register() {
    const [user,setUser] = useState({});
    let messageElement = document.getElementById("successMessage");
    let messageDanger: HTMLElement|null = document.getElementById("message");

    return (
        <div className="row" style={{maxHeight:"100%",maxWidth:"100%"}}>
            <div className='col-lg-6' id='successMessage'>
                <form className='w-50 m-auto d-flex flex-column justify-content-center' style={{height:"55rem"}} onSubmit={(e) => actions.handleSubmit(e,user,messageElement,messageDanger)}>
                    <h1 className='division-title text-center mb-5'>Üye Ol</h1>
                    <div className='mb-3'>
                        <label htmlFor="name" className="form-label fw-bold">Ad</label>
                        <input type="text" className="form-control" id="Name" name="Name" aria-describedby="nameHelp" required onChange={(e) => actions.handleChange(e,setUser,user)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="surname" className="form-label fw-bold">Soyad</label>
                        <input type="text" className="form-control" id="Surname" name="Surname" aria-describedby="surnameHelp" required onChange={(e) => actions.handleChange(e,setUser,user)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className="form-label fw-bold">E-posta Adresi</label>
                        <input type="email" className="form-control" id="Email" name="Email" aria-describedby="emailHelp" required onChange={(e) => actions.handleChange(e,setUser,user)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label fw-bold">Şifre</label>
                        <input type="password" className="form-control" id="Password" name="Password" aria-describedby="passwordHelp" minLength={8} required onChange={(e) => actions.handleChange(e,setUser,user)}/>
                        <div id="passwordHelp" className="form-text">Şifre en az 8 karakter olmalıdır.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="IsMasterUser" className="form-label fw-bold">Hizmet vermek istiyorum</label>
                        <select className="form-control" id="IsMasterUser" name="IsMasterUser" onChange={(e) => actions.handleChange(e,setUser,user)}>
                            <option value={"0"}>SEÇİNİZ...</option>
                            <option value={"false"}>Hayır</option>
                            <option value={"true"}>Evet</option>
                        </select>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="submit" className="btn btn-danger me-3">Üye Ol</button>
                        <Link to={'/'} role="button" className="btn btn-outline-danger ps-3 pe-3"><i className="bi bi-house-fill"></i></Link>   
                    </div> 
                </form>
                <div className='d-flex justify-content-center' id='message' style={{marginTop:"-5rem"}}>
                    
                </div>
            </div>
            <div className="col-lg-6">
                <img src={loginRegister} alt="login" className='img-fluid'/>
            </div>
        </div>
    )
}