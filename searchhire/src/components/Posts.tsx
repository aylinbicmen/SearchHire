import { useEffect, useState } from 'react';
import '../App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/UserSlice';
import { RootState } from '../store/Store';
import { actions } from '../actions/PostsReducer';
import { Link, useParams } from 'react-router-dom';
import { PostType } from '../type';


export default function Posts() {

    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const { specialtyId } = useParams() as { specialtyId:string };
    const [posts,setPosts] = useState([]);

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }
    useEffect(() => {
        actions.getPostsBySpecialty(specialtyId).then((result) => setPosts(result));
      },[])
      
      if(user.specialtyId == 0 || user.cityId == 0){
        return (
            <div style={{overflowX:"hidden"}}>
                <Navbar/>
                <h2 className='text-center mt-5 division-title'>İlanlar</h2>
                <div className='d-flex justify-content-center mt-5'>
                    <div className="alert alert-danger p-4 text-center" role="alert">
                        <h4 className="alert-heading">Profil Düzenlenmeli!</h4>
                        <p>Profilinizden Adres ve Hizmet Alanı Bilgilerini Doldurduktan Sonra İlanları İnceleyebilirsiniz.</p>
                    </div>
                </div>
                <div className='footerFixer'>
                    <Footer />
                </div>
            </div>
        )
      }
      else{
        return (
            <div style={{overflowX:"hidden"}}>
                <Navbar/>
                <h2 className='text-center mt-5 division-title'>İlanlar</h2>
                <div>
                    <div className='mt-3 row d-flex justify-content-center p-3'>
                        {
                            posts && posts.map((post:PostType) => 
                                <div className="card m-3" style={{width: "18rem"}}>
                                    <img src={require(`../images/work.png`)} className="card-img-top" alt="..."/>
                                    <div className="card-body text-center">
                                        <h5 className="card-title c-title">{post.title}</h5>
                                        <Link to={`/post/${post.id}`} role='button' className='btn btn-outline-dark'>Detay</Link>
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
}