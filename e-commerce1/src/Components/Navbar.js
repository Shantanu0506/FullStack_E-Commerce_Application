import { NavLink } from "react-router-dom";
import logo from '../images/grocery-basket.gif';
import { useContext } from "react";
import { ThemeContext } from "../Contrext/ThemeContext";

function Navbar() {
    const { user, cartItems } = useContext(ThemeContext);

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <NavLink className="navbar-brand" to={"/home"}>
                            <img
                                src={logo}
                                alt="Logo"
                                width="40"
                                height="40"
                                className="me-2"
                            />S-Mart
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <li className="nav-item">
                            <NavLink className="nav-link active" to={"/home"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/about"}>About Us!</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/products"}>Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/contact"}>Contact Us!</NavLink>
                        </li>

                        {user === null ? (
                            <>
                                <li>
                                    <NavLink to={'/login'} className="nav-link">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/register'} className="nav-link">Register</NavLink>
                                </li>
                            </>
                        ) : (
                            <>                               
                                <li>
                                    <NavLink to={'/cart'} className="nav-link">
                                        My Cart ({cartItems.length})
                                    </NavLink>
                                </li>
                                 <li>
                                    <NavLink to={'/logout'} className="nav-link">Logout</NavLink>
                                </li>

                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
