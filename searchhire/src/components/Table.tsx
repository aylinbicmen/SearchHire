import { PostListType } from '../type';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Table({posts}:PostListType) {

    return (
        <table className='table table-danger table-striped table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Başlık</th>
                    <th scope='col'>Tamamlandı</th>
                    <th scope='col'>Detaylar</th>
                </tr>
            </thead>
            <tbody>
                {
                    posts.map((post,i) => <tr key={i}>
                        <th scope='row' key={i+1} className='fw-normal'>{i+1}</th>
                        <th key={i+2} className='fw-normal'>{post.title}</th>
                        <th key={i+3} className='fw-normal'>{post.isCompleted == true ? "Evet" : "Hayır"}</th>
                        <th><Link to={`/userposts/${post.id}`} className='btn btn-outline-dark' role="button" aria-disabled="true">Detaylar</Link></th>
                    </tr>)
                }
            </tbody>
        </table>
    )
}