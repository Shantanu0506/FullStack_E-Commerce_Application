
import { useContext } from 'react';
import { ThemeContext } from '../Contrext/ThemeContext';
import Search from './Search';
import all from '../images/galaxy.gif';
import computer from '../images/laptop.gif';
import accessories from '../images/earrings.gif';
import smarthome from '../images/smarthome.gif';
import footwear from '../images/running-shoes.gif';
import cloths from '../images/tshirt.gif';
import electronics from '../images/laundry.gif';
import lowprice from '../images/low-price.gif';
import highprice from '../images/money.gif';
import ProductList from './ProductList';

function Products() {
    const { profile, setUrl } = useContext(ThemeContext);


    return (

        <>

            <div className='container-fluid'>
                <div className='row'>
                     
                     {/* yithe filter items kelele aahet */}
                    <div className="col-sm-2 bg-primary ">
                        <div className="filter-menu p-3 shadow rounded bg-light">
                            <h5 className="mb-3 mt-3 text-center fw-bold">Categories</h5>
                            <ul className="list-unstyled">
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/all`)}
                                >
                                    <i className="bi bi-box-seam me-2"></i> 
                                    <img src={all} alt="home" width="28" height="28" className="me-1" />All Products
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/search/computers`)}
                                >
                                    <i className="bi bi-laptop me-2"></i> 
                                    <img src={computer} alt="home" width="28" height="28" className="me-1" />Computers
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/search/accessories`)}
                                >
                                    <i className="bi bi-headphones me-2"></i> 
                                    <img src={accessories} alt="home" width="28" height="28" className="me-1" />Accessories
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/search/footwear`)}
                                >
                                    <i className="bi bi-bag-heart me-2"></i>
                                    <img src={footwear} alt="home" width="28" height="28" className="me-1" /> Footwear
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/search/clothing`)}
                                >
                                    <i className="bi bi-person-bounding-box me-2"></i> 
                                    <img src={cloths} alt="home" width="28" height="28" className="me-1" />Clothing
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/search/smart%20home`)}
                                >
                                    <i className="bi bi-house-door me-2"></i> 
                                    <img src={smarthome} alt="home" width="28" height="28" className="me-1" />Smart Home
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/search/electronics`)}
                                >
                                    <i className="bi bi-phone me-2"></i>
                                    <img src={electronics} alt="home" width="28" height="28" className="me-1" /> Electronics
                                </li>
                            </ul>

                            <h5 className="mt-4 mb-2 text-center fw-bold">Filter by Price</h5>
                            <ul className="list-unstyled">
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/getAllpriceless?price=10000`)}
                                >
                                    <i className="bi bi-cash-coin me-2"></i>
                                    <img src={lowprice} alt="home" width="28" height="28" className="me-1" /> Under ₹10,000
                                </li>
                                <li
                                    className="menu-item"
                                    onClick={() => setUrl(`${backendUrl}/product/getAllpricegreat?price=10000`)}
                                >
                                    <i className="bi bi-graph-up-arrow me-2"></i>
                                    <img src={highprice} alt="home" width="28" height="28" className="me-1" /> Above ₹10,000
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* yite home chi main body */}
                    <div className='col-sm-10'>
                        <div className="row align-items-center mb-5 mt-3 bg-dark p-3 rounded shadow">
                            {/* Logo / Title */}
                            <div className="col-sm-4 text-center text-sm-start">
                                <h4
                                    className="fw-bold text-light"
                                    style={{ margin: 0, fontSize: 36 }}
                                >
                                    Our Products!
                                </h4>
                            </div>

                            {/* Search Box */}
                            <div className="col-sm-8 d-flex justify-content-end">
                                <Search />
                            </div>

                        </div>


                        {/* yithe product show krayla */}
                        <div className="row">
                            {Array.isArray(profile) && profile.length > 0 ? (
                                profile.map((p, ind) => (
                                    <ProductList {...p} key={ind} />
                                ))
                            ) : (
                                <p style={{ margin: 10 }}>NO profile to display !</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Products;
