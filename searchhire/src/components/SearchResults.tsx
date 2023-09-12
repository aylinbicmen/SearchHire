import { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch } from 'react-redux';
import { login } from '../actions/UserSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useParams } from 'react-router-dom';
import { actions } from '../actions/SearchResultsReducer';
import { PostType} from '../type';

export default function MasterUsers() {

    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const dispatch = useDispatch();

    const { searchData } = useParams() as { searchData: string };

    const[posts,setPosts] = useState([]);

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }

    useEffect(() => {
        actions.getResults(searchData).then((result) => setPosts(result));
      },[])

    const[currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 20;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = posts.slice(firstIndex,lastIndex);
    const npage = Math.ceil(posts.length/recordsPerPage);
    const numbers = [...Array(npage+1).keys()].slice(1);

    if(posts.length > 0){
        return (
            <div style={{overflowX:"hidden"}}>
                <Navbar/>
                <h2 className='text-center mt-5 division-title'>Sonuçlar</h2>
                    <div>
                        <div className='mt-3 row d-flex justify-content-center p-3'>
                            {
                                records && records.map((post:PostType) => 
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
    
                    <nav className='d-flex justify-content-center mt-5'>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <Link to={""} className='page-link' onClick={() => prePage}>Prev</Link>
                            </li>
                            {
                                numbers.map((n,i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <Link to={""} className='page-link' onClick={() => changeCPage(n)}>{n}</Link>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <Link to={""} className='page-link' onClick={() => nextPage()}>Next</Link>
                            </li>
                        </ul>
                    </nav>
    
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
                <h2 className='text-center mt-5 division-title'>Sonuçlar</h2>
                    
                <div className='mt-3 row d-flex justify-content-center p-3'>
                    <div className="alert alert-secondary text-center w-50 fw-bold" role="alert">
                        Sonuç Yok
                    </div>
                </div>

                <div className='footerFixer'>
                    <Footer />
                </div>
            </div>
        )
    }

    function prePage(){
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCPage(id:number){
        setCurrentPage(id);
    }

    function nextPage(){
        if(currentPage !== lastIndex){
            setCurrentPage(currentPage + 1);
        }
    }
}