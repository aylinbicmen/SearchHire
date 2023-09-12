import { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { login } from '../actions/UserSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import { actions } from '../actions/UserPostDetailReducer';
import { PostType } from '../type';


export default function UserPostDetail() {
    
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const user = useSelector((state: RootState) => state.user);

    const { id } = useParams() as { id: string };
    const [post,setPost] = useState({} as PostType);

    const dispatch = useDispatch();

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    let messageElement: HTMLElement|null = document.getElementById("message");

    useEffect(() => {
       actions.getPostDetail(id).then((result) => setPost(result));
    },[]);

    if(user.id == post.userId){
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
                            <div className='w-75 m-auto d-flex flex-column justify-content-center'>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Title" className="form-label fw-bold">Başlık</label>
                                        <p className="form-control" id="Title">{post.title}</p>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Description" className="form-label fw-bold">Açıklama</label>
                                        <p className="form-control" id="Description">{post.description}</p>
                                    </div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="IsCompleted" className="form-label fw-bold">Tamamlandı</label>
                                        <p className="form-control" id="IsCompleted">{post.isCompleted == true ? "Evet" : "Hayır"}</p>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="CreatedDate" className="form-label fw-bold">İlan Tarihi</label>
                                        <p className="form-control" id="CreatedDate">{new Date(post.createdDate).toUTCString()}</p>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <Link to={'/userposts'} role="button" className="btn btn-outline-danger ps-3 pe-3 me-3"><i className="bi bi-arrow-left-circle"></i></Link>
                                    <Link to={'/userposts'} role="button" className="btn btn-danger me-3" onClick={() => {post.isCompleted = true; post.isActive = false; actions.setAsCompleted(post,post.id,post.masterUserId,messageElement)}}>Tamamlandı Olarak İşaretle</Link>
                                    <Link to={'/userposts'} role="button" className="btn btn-danger" onClick={() => {post.isActive = false; actions.deletePost(post,post.id,messageElement)}}>Sil</Link>       
                                </div> 

                                <div id='message'>
                                
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
                            <div className='w-75 m-auto d-flex flex-column justify-content-center'>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Title" className="form-label fw-bold">Başlık</label>
                                        <p className="form-control" id="Title">{post.title}</p>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Description" className="form-label fw-bold">Açıklama</label>
                                        <p className="form-control" id="Description">{post.description}</p>
                                    </div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="IsCompleted" className="form-label fw-bold">Tamamlandı</label>
                                        <p className="form-control" id="IsCompleted">{post.isCompleted == true ? "Evet" : "Hayır"}</p>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Description" className="form-label fw-bold">Hizmet</label>
                                        <p className="form-control" id="Description">{new Date(post.createdDate).toUTCString()}</p>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <Link to={'/userposts'} role="button" className="btn btn-outline-danger ps-3 pe-3"><i className="bi bi-arrow-left-circle"></i></Link>   
                                </div> 

                                <div id='message'>

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
}