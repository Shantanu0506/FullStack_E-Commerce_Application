import { Link } from "react-router-dom";


function ProductList(props) {
    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100 shadow">
                <img src={props.productUrl} className="card-img-top" alt={props.title} style={{ height: 200, objectFit: "contain" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text text-truncate">{props.des}</p>
                    <h6 className="text-success fw-bold">₹{props.price}</h6>
                    <span className="badge bg-primary">{props.category}</span>
                    <br />
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col"><Link to={`/productdetails/${props.id}`} className="btn btn-outline-success mt-2 btn-sm">
                            See More
                        </Link>
                        </div>
                        <div className="col-2"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductList;
