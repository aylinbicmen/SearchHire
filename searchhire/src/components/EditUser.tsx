import { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { login } from '../actions/UserSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { actions } from '../actions/EditUserReducer';
import { CityType, ProvinceType, SpecialtyType } from '../type';

export default function EditUser() {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
    const [provinces,setProvinces] = useState([]);
    const [cities,setCities] = useState([]);
    const [userUpdate,setUserUpdate] = useState({Name:user.name,Surname:user.surname,Phone:user.phone,Address:user.address,CityId:user.cityId,Id:user.id,SpecialtyId:user.specialtyId});
    const [provinceId,setProvinceId] = useState(0);
    const[userProvince,setUserProvince] = useState(user.cityId);
    const [specialties,setSpecialties] = useState([]);
    let messageElement = document.getElementById("message");

    if(loggedIn != ""){
        dispatch(login(loggedIn));
    }
    
    useEffect(() => {
        actions.getAllProvinces().then((result) => setProvinces(result));
        if(provinceId != 0){
            actions.getCitiesByProvince(provinceId).then((result) => setCities(result));
        }
        else{
            var option = document.createElement("option");
            option.text = "SEÇİNİZ...";
            option.value = "0";
            option.selected = true;
            var select = document.getElementById("CityId");
            select!.innerHTML = "";
            select!.appendChild(option);
        }
        console.log(user.cityId);
      },[provinceId])

      useEffect(() => {
        actions.getSpecialties().then((result) => setSpecialties(result));
      },[])

    if(user.isMasterUser == true){
        return(
            <div style={{overflowX:"hidden"}}>
                <Navbar/>
                <h2 className='text-center mt-5 division-title'>Merhaba, {user.name} {user.surname} <i className="bi bi-emoji-smile"></i></h2>
                <div className='row'>
                    <div className='col-lg-2'>
                        <div className='m-auto d-flex flex-column justify-content-center ms-5' style={{height:"35rem"}}>
                            <ul className="list-group">
                                <Link to={"/profile"} className='list-group-item list-group-item-action'>Profil</Link>
                                <Link to={""} className='list-group-item list-group-item-action active bg-danger'>Bilgileri Düzenle</Link>
                                <Link to={"/userposts"} className='list-group-item list-group-item-action'>İlanlarım</Link>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-10'>
                        <div className='w-75 m-auto d-flex flex-column justify-content-center' style={{height:"35rem"}}>
                            <form onSubmit={(e) => actions.handleSubmit(e,userUpdate,user.id,messageElement)}>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Name" className="form-label fw-bold">Ad</label>
                                        <input type="text" className="form-control" id="Name" name="Name" aria-describedby="nameHelp" defaultValue={user.name} onChange={(e) => userUpdate.Name = e.target.value}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Surname" className="form-label fw-bold">Soyad</label>
                                        <input type="text" className="form-control" id="Surname" name="Surname" aria-describedby="surnameHelp" defaultValue={user.surname} onChange={(e) => userUpdate.Surname = e.target.value}/>
                                    </div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Phone" className="form-label fw-bold">Telefon</label>
                                        <input type="text" className="form-control" id="Phone" name="Phone" aria-describedby="phoneHelp" defaultValue={user.phone} onChange={(e) => userUpdate.Phone = e.target.value}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Address" className="form-label fw-bold">Adres</label>
                                        <input type="text" className="form-control" id="Address" name="Address" aria-describedby="addressHelp" defaultValue={user.address} onChange={(e) => userUpdate.Address = e.target.value}/>
                                    </div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Province" className="form-label fw-bold">İl</label>
                                        <select className="form-control" onChange={(e) => setProvinceId(Number(e.target.value))} id='Province'>
                                            <option key={0} value={"0"}>SEÇİNİZ...</option>
                                            {
                                                provinces && provinces.map((province: ProvinceType) => (
                                                    <option key={province.id} value={province.id}>{province.name}</option>
                                                    ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="City" className="form-label fw-bold">İlçe</label>
                                        <select className="form-control" id="CityId" name="CityId" onChange={(e) => userUpdate.CityId = Number(e.target.value)}>
                                                {
                                                    cities && cities.map((city: CityType) => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                        ))
                                                }
                                            </select>
                                    </div>
                                </div>
                                <div className='mb-3'>
                                <label htmlFor="City" className="form-label fw-bold">Hizmet Alanı</label>
                                        <select className="form-control" id="SpecialtyId" name="SpecialtyId" onChange={(e) => userUpdate.SpecialtyId = Number(e.target.value)}>
                                            <option key={0} value={"0"}>SEÇİNİZ...</option>
                                                {
                                                    specialties && specialties.map((Specialty: SpecialtyType) => (
                                                        <option key={Specialty.id} value={Specialty.id}>{Specialty.name}</option>
                                                        ))
                                                }
                                            </select>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="submit" className="btn btn-danger me-3">Düzenle</button>
                                    <Link to={'/profile'} role="button" className="btn btn-outline-danger ps-3 pe-3"><i className="bi bi-house-fill"></i></Link>   
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
    
                <div id='message' className='d-flex flex-column align-items-center ms-5'>
                    
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
                                <Link to={""} className='list-group-item list-group-item-action active bg-danger'>Bilgileri Düzenle</Link>
                                <Link to={"/userposts"} className='list-group-item list-group-item-action'>İlanlarım</Link>
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-10'>
                        <div className='w-75 m-auto d-flex flex-column justify-content-center' style={{height:"35rem"}}>
                            <form onSubmit={(e) => actions.handleSubmit(e,userUpdate,user.id,messageElement)}>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Name" className="form-label fw-bold">Ad</label>
                                        <input type="text" className="form-control" id="Name" name="Name" aria-describedby="nameHelp" defaultValue={user.name} onChange={(e) => userUpdate.Name = e.target.value}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Surname" className="form-label fw-bold">Soyad</label>
                                        <input type="text" className="form-control" id="Surname" name="Surname" aria-describedby="surnameHelp" defaultValue={user.surname} onChange={(e) => userUpdate.Surname = e.target.value}/>
                                    </div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Phone" className="form-label fw-bold">Telefon</label>
                                        <input type="text" className="form-control" id="Phone" name="Phone" aria-describedby="phoneHelp" defaultValue={user.phone} onChange={(e) => userUpdate.Phone = e.target.value}/>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="Address" className="form-label fw-bold">Adres</label>
                                        <input type="text" className="form-control" id="Address" name="Address" aria-describedby="addressHelp" defaultValue={user.address} onChange={(e) => userUpdate.Address = e.target.value}/>
                                    </div>
                                </div>
                                <div className='mb-3 row'>
                                    <div className='col'>
                                        <label htmlFor="Province" className="form-label fw-bold">İl</label>
                                        <select className="form-control" onChange={(e) => setProvinceId(Number(e.target.value))} id='Province'>
                                            <option key={0} value={"0"}>SEÇİNİZ...</option>
                                            {
                                                provinces && provinces.map((province: ProvinceType) => (
                                                    <option key={province.id} value={province.id}>{province.name}</option>
                                                    ))
                                            }
                                        </select>
                                    </div>
                                    <div className='col'>
                                        <label htmlFor="City" className="form-label fw-bold">İlçe</label>
                                        <select className="form-control" id="CityId" name="CityId" onChange={(e) => userUpdate.CityId = Number(e.target.value)}>
                                                {
                                                    cities && cities.map((city: CityType) => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                        ))
                                                }
                                            </select>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center mt-5'>
                                    <button type="submit" className="btn btn-danger me-3">Düzenle</button>
                                    <Link to={'/profile'} role="button" className="btn btn-outline-danger ps-3 pe-3"><i className="bi bi-house-fill"></i></Link>   
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
    
                <div id='message' className='d-flex flex-column align-items-center ms-5'>
                    
                </div>
    
                <div className='footerFixer'>
                    <Footer />
                </div>
            </div>
        )
    }
}