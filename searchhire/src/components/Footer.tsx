import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center border-top bg-light p-4">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1 c-text">
            SearchHire
          </a>
          <span className="mb-3 mb-md-0 text-body-secondary c-text">© 2023 Tüm hakları saklıdır.</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><Link className="text-body-secondary c-text" to={'https://twitter.com/?lang=en'}><i className="bi bi-twitter"></i></Link></li>
          <li className="ms-3"><Link className="text-body-secondary c-text" to={'https://www.instagram.com/'}><i className="bi bi-instagram"></i></Link></li>
          <li className="ms-3"><Link className="text-body-secondary c-text" to={'https://www.facebook.com/'}><i className="bi bi-facebook"></i></Link></li>
        </ul>
      </footer>
    )
}