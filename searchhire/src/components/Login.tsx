import { Link, useNavigate } from 'react-router-dom';
import loginRegister from '../images/login-register.jpg';
import {actions} from '../actions/LoginReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let messageElement: HTMLElement|null = document.getElementById("message");

    return (
        <div className="row" style={{maxHeight:"100%",maxWidth:"100%"}}>
            <div className='col-lg-6'>
                <form className='w-50 m-auto d-flex flex-column justify-content-center' style={{height:"45rem"}} onSubmit={(e) => actions.handleSubmit(e,email,password,dispatch,navigate,messageElement)}>
                    <h1 className='division-title text-center mb-5'>Giriş</h1>
                    <div className='mb-3'>
                        <label htmlFor="email" className="form-label fw-bold">E-posta Adresi</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => actions.handleChange(e,setEmail,e.target.value)}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label fw-bold">Şifre</label>
                        <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" minLength={8} onChange={(e) => actions.handleChange(e,setPassword,e.target.value)}/>
                    </div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="submit" className="btn btn-danger me-3">Giriş</button>
                        <Link to={'/'} role="button" className="btn btn-outline-danger ps-3 pe-3"><i className="bi bi-house-fill"></i></Link>   
                    </div>
                </form>

                <div id='message' className='d-flex justify-content-center'>
                    
                </div>
            </div>
            <div className="col-lg-6">
                <img src={loginRegister} alt="login" className='img-fluid'/>
            </div>
        </div>
    )
}