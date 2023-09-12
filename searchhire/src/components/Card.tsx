import { SpecialtyType } from '../type';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Card(props:{item : SpecialtyType,cityId:number}) {

    return (
        <div className="card m-3" style={{width: "18rem"}}>
            <img src={require(`../images/${props.item.imageName}`)} className="card-img-top" alt="..."/>
            <div className="card-body text-center">
                <h5 className="card-title c-title">{props.item.name}</h5>
                <Link to={`/masterusers/${props.item.id}/${props.cityId}`} role='button' className='btn btn-outline-dark'>Ustalar</Link>
            </div>
        </div>
    )
}