import { Link } from "react-router-dom";
import "../css/Navbar.css"


function NavBar (){
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movies App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/favourites">Favourites</Link>
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}

export default NavBar;