import React, { useEffect, useState } from 'react';
import people from './images/people-puzzle.png';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import {actions} from './actions/AppReducer';
import AppBanner from './components/AppBanner';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions/UserSlice';
import { RootState } from './store/Store';

function App() {
  const [services,setServices] = useState([]);
  const [loggedIn,setLoggedIn] = useState(localStorage.getItem("token") != null ? String(localStorage.getItem("token")) : "");
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if(loggedIn != ""){
    dispatch(login(loggedIn));
  }
  
  useEffect(() => {
    actions.getTopServices().then((result) => setServices(result));
  },[])

  const [searchData,setSearchData] = useState("");
  const [emailSubscribe,setEmailSubscribe] = useState("");
  let messageElement: HTMLElement|null = document.getElementById("message");

  return (
    <div style={{overflowX:"hidden"}}>
      <Navbar/>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-lg-4 mt-5 pt-4'>
            <h1 className='main-title'>Her Türlü Hizmet için Tek Adres</h1>
            <h3 className='sub-title'>Ev olsun akademik olsun, tüm ihtiyaçlarınız için hizmet aramaya hemen başlayabilirsiniz. En uygun fiyatlarla en iyi hizmetlere erişmek hiç bu kadar kolay olmamıştı.</h3>
            <div className='row justify-content-center mt-5 pt-3'>
              <div className="col-md-8 mb-2">
                <input type="text" className="form-control" id="search" name='search' onChange={(e) => setSearchData(e.target.value)}/>
              </div>
              <div className="col-md-4 mb-2">
                <Link role='button' className='btn btn-danger' to={`/searchresults/${searchData}`}>ARA</Link>
              </div>
            </div>
          </div>
          <div className='col-lg-8'>
            <img src={people} alt="people" className='img-fluid'/>
          </div>
        </div>
      </div>
      <div className='mt-5 row d-flex justify-content-center p-3' style={{backgroundColor:"#f8f9fa"}}>
          <h4 className='text-center m-3 division-title'>Popüler Hizmetler</h4>
          {
            services && services.map((service,i) => <Card item={service} cityId={user.cityId} key={i}/>)
          }
      </div>
      <div className='row pt-2'>
        <div className='col-lg-6 vstack gap-3'>
          <div className='d-flex align-items-center'>
            <AppBanner imageName='click.png' title='Hızlı Hizmet' description='İhtiyacınız olan hizmete ulaşmak artık bir tık uzakta. Fırsatları kaçırmamak için hemen teklif alın!'/>
            <AppBanner imageName='quality.png' title='Kaliteli Hizmet' description='Profesyoneller tarafından sunulan hizmetlerden faydalanın. İşiniz garantimiz altında!'/>
          </div>
          <div className='d-flex align-items-center'>
            <AppBanner imageName='continuous.png' title='Sürekli İletişim' description='Müşterilerinizle sürekli iletişim imkani sunuyoruz. Mesajlarınızı kolayca takip edin!'/>
            <AppBanner imageName='safepay.png' title='Güvenli Ödeme' description='Ödemeyi düşünmeye gerek yok. Güvenli ödeme sistemimiz ile paranız güvende!'/>
          </div>
        </div>
        <div className='col-lg-6 d-flex justify-content-center vstack gap-3' style={{height:"25rem"}}>
        <div className='mb-3'>
            <h3 className='main-title'>Haber Bültenimize Katılmayı Unutmayın!</h3>
            <h6 className='sub-title'>Haber bültenimize katılarak her haftaki gelişmeleri takip edebilirsiniz.</h6>
          </div>
          <div className='row'>
              <div className="col-lg-8 mb-2">
                <input type="text" className="form-control" id="subscribe" name='subscribe' onChange={(e) => setEmailSubscribe(e.target.value)}/>
              </div>
              <div className="col-lg-4 mb-2">
                <button type="submit" className="btn btn-danger w-50" onClick={() => actions.userSubscribe(emailSubscribe,messageElement)}>Katıl</button>
              </div>
              <div id='message'>
                
              </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
