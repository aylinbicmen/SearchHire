import { Link} from 'react-router-dom';
import '../App.css';
import loginRegister from '../images/login-register.jpg';

export default function Logout() {

    return (
        <div className="row" style={{maxHeight:"100%",maxWidth:"100%"}}>
            <div className='col-lg-6' id='successMessage'>
            <div className="w-75 m-auto d-flex flex-column justify-content-center" style={{height:"55rem"}}>
                        <div className="alert alert-success p-4" role="alert">
                            <h4 className="alert-heading text-center">Çıkış Yaptınız!</h4>
                            <p className='text-center'>Anasayfaya dönebilirsiniz.</p>
                            <div className='d-flex justify-content-center mt-3'>
                                <Link to={'/'} role="button" className="btn btn-outline-success"><i className="bi bi-house-fill"></i></Link>
                            </div>
                        </div>    
                    </div>
            </div>
            <div className="col-lg-6">
                <img src={loginRegister} alt="login" className='img-fluid'/>
            </div>
        </div>
    )
}