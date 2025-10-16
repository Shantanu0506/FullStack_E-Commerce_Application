import img from '../images/img (11).png';
import img1 from '../images/img (12).png';
import img2 from '../images/img (1).png';
import img3 from '../images/img (2).png';
import img4 from '../images/img (8).png';
import img5 from '../images/img (20).png';
import img6 from '../images/img (17).png';
import img7 from '../images/img (21).png';
import img8 from '../images/img (19).png';
import img9 from '../images/img (10).png';
import { NavLink } from 'react-router-dom';


function Home() {
    return (
        <>
            <div id="demo" className="carousel slide mt-2" data-bs-ride="carousel">

                {/* Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="5"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="6"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="7"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="8"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="9"></button>

                </div>

                {/* Slides */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img} alt="Plant 1" className="d-block mx-auto " style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img1} alt="Plant 2" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} alt="Plant 3" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img3} alt="Plant 1" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img4} alt="Plant 2" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img5} alt="Plant 3" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img6} alt="Plant 3" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img7} alt="Plant 1" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img8} alt="Plant 2" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img9} alt="Plant 3" className="d-block mx-auto" style={{ height: "600px", objectFit: "contain" }} />
                    </div>
                </div>

                {/* Controls */}
                <button className="carousel-control-prev " type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next " type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>

            </div>

            {/* Some space */}
            <div style={{ height: "50px" }}></div>

            {/* Simple content below carousel */}
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <img src={img} alt="Plant" className="card-img-top" style={{ height: "200px", objectFit: "contain" }} />
                            <div className="card-body">
                                <NavLink className="nav-link text-center fw-bold" to={"/products"}><h3>Smart Home</h3></NavLink>
                                <p>Fresh and healthy plants for your home.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src={img2} alt="Plant" className="card-img-top" style={{ height: "200px", objectFit: "contain" }} />
                            <div className="card-body">
                                 <NavLink className="nav-link text-center fw-bold" to={"/products"}><h3>Beautiful Footwear</h3></NavLink>
                                <p>Perfect for your garden and outdoor spaces.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src={img3} alt="Plant" className="card-img-top" style={{ height: "200px", objectFit: "contain" }} />
                            <div className="card-body">
                                <NavLink className="nav-link text-center fw-bold" to={"/products"}><h3>Accessories</h3></NavLink>
                                <p>Bring nature inside with our indoor collection.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col-1'></div>
                <div className='col-sm-10  bg-danger'>
                    <NavLink className="nav-link text-center fw-bold" to={"/products"}><h3>Explore Our More Products!</h3></NavLink>
                </div>
                <div className='col-1'></div>

            </div>

        </>
    )
}
export default Home;