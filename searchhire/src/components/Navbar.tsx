import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { logout } from "../actions/UserSlice";

export default function Navbar() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    if(user.email !== "" && user.isMasterUser === true){
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <div className="d-flex justify-content-start">
                        <Link className="navbar-brand" to={'/'}><img src={logo} alt="Logo"/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/services'}>Hizmetler</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/workform'}>İş Formu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={`/posts/${user.specialtyId}`}>İlanlar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/about'}>Hakkımızda</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <div className="btn-group">
                            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle"></i> {user.name} {user.surname}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li><Link className="dropdown-item text-center" to={'/profile'}>Profil</Link></li>
                                <li><Link className="dropdown-item text-center" to={'/logout'} onClick={() => dispatch(logout())}>Çıkış Yap</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    else if(user.email !== "" && user.isMasterUser === false){
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <div className="d-flex justify-content-start">
                        <Link className="navbar-brand" to={'/'}><img src={logo} alt="Logo"/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/services'}>Hizmetler</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/workform'}>İş Formu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/about'}>Hakkımızda</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <div className="btn-group">
                            <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle"></i> {user.name} {user.surname}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li><Link className="dropdown-item text-center" to={'/profile'}>Profil</Link></li>
                                <li><Link className="dropdown-item text-center" to={'/logout'} onClick={() => dispatch(logout())}>Çıkış Yap</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    else{
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid">
                    <div className="d-flex justify-content-start">
                        <Link className="navbar-brand" to={'/'}><img src={logo} alt="Logo"/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/services'}>Hizmetler</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/login'}>İş Formu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbar-brand c-title" to={'/about'}>Hakkımızda</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link className="btn btn-danger me-2" to={'/register'}>Üye Ol</Link>
                        <Link className="btn btn-outline-danger" to={'/login'}>Giriş Yap</Link>
                    </div>
                </div>
            </nav>
        )
    }

    
}