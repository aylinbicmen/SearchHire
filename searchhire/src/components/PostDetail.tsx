import '../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import workImage from '../images/work.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { actions } from '../actions/PostDetailReducer';
import { PostType } from '../type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { login } from '../actions/UserSlice';

export default function PostDetail() {

    const { id } = useParams() as { id:string};

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const [post,setPost] = useState({} as PostType);

    let messageElement: HTMLElement|null = document.getElementById("message");

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }
    
    useEffect(() => {
        actions.getPostDetail(id).then((result) => setPost(result));
      },[])

    return (
        <>
            <Navbar/>

            <div className='d-flex flex-column justify-content-center align-items-center' style={{height:"45rem"}}>
                <div className='row'>
                    <div className='col'>
                        <img src={workImage} className="img-fluid" alt="..."/>
                    </div>
                    <div className='col mt-5'>
                        <p className='ps-3'><span className='fw-bold'>Başlık: </span>{post.title}</p>
                        <hr className='w-50'/>
                        <p className='ps-3'><span className='fw-bold'>Açıklama: </span>{post.title}</p>
                        <hr className='w-50'/>
                        <p className='ps-3 mb-3'><span className='fw-bold'>İlan Tarihi: </span>{new Date(post.createdDate).toUTCString()}</p>

                        <div className='d-flex flex-column justify-content-center mt-5 w-75' id='message'>
                            <button type="button" className="btn btn-danger" onClick={() => actions.setMasterUserId(Number(id),user.id,messageElement)}>İşi Al</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='footerFixer'>
                <Footer />
            </div>
        </>
    )
}