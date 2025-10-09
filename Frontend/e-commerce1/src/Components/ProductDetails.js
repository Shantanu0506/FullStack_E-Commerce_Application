import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import cart from '../images/shopping-cart.gif';
import back from '../images/backward.gif';
import heart from '../images/galaxy.gif'; // wishlist icon
import axios from "axios";

function PrductDetails() {
    const { pid } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [inCart, setInCart] = useState(false);   // cart साठी toggle
    const [wish, setWish] = useState(false);       // wishlist साठी toggle

    const user = JSON.parse(localStorage.getItem("user"));

    // Add to Cart logic
    const mycart = async () => {
        if (!user || !user.id) {
            alert("Please login first!");
            return;
        }

        if (!inCart) {
            try {
                await axios.post("http://localhost:8080/product/addtocart", null, {
                    params: {
                        uid: user.id,
                        pid: product.id,
                        q: qty
                    }
                });
                setInCart(true); // आता Go to Cart दिसेल
            } catch (err) {
                console.error("Error adding to cart:", err);
                alert("Something went wrong");
            }
        } else {
            // आधीच cart मध्ये असेल तर navigate कर
            navigate("/cart");
        }
    };

    // Wishlist toggle
    const toggleWishlist = () => {
        setWish(!wish);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/product/${pid}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error(err));
    }, [pid]);

    if (!product) {
        return <h3 className="text-center mt-5">Loading product details...</h3>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center text-primary fw-bold">Product Details</h2>

            <div className="card mx-auto shadow-lg border-0" style={{ maxWidth: 450 }}>
                <img
                    className="card-img-top p-3 rounded"
                    src={product.productUrl}
                    alt={product.title}
                    style={{ height: 250, objectFit: "contain" }}
                />

                <div className="card-body">
                    <h4 className="card-title fw-bold">{product.title}</h4>
                    <p className="card-text text-muted">{product.des}</p>
                    <h5 className="text-success fw-bold">₹{product.price}</h5>
                    <span className="badge bg-info text-dark">{product.category}</span>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        {/* Back Button */}
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            <img src={back} alt="home" width="28" height="28" className="me-1" /> Back
                        </button>

                        {/* Qty Selector */}
                        <select
                            className="form-select w-auto"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                        >
                            {[...Array(5)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        

                        {/* Wishlist */}
                        <button
                            className={`btn ${wish ? "btn-danger" : "btn-outline-danger"}`}
                            onClick={toggleWishlist}
                        >
                            <img src={heart} alt="wishlist" width="24" height="24" className="me-1" />
                            {wish ? "In Wishlist ❤️" : "Add to Wishlist"}
                        </button>
                        {/* Add to Cart / Go to Cart */}
                        <button
                            className={`btn ${inCart ? "btn-warning" : "btn-success"}`}
                            onClick={mycart}
                        >
                            <img src={cart} alt="cart" width="28" height="28" className="me-1" />
                            {inCart ? "Go to Cart" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrductDetails;
