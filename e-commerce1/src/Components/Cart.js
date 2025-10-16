import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const Checkout = () => {
        navigate("/checkout"); 
    };

    const fetchCart = () => {
        if (user && user.id) {
            axios.get(`${backendUrl}/product/showcart`, {
                params: { id: user.id }
            })
                .then((res) => setCartItems(res.data))
                .catch((err) => console.error("Error fetching cart:", err));
        }
    };

    const fetchTotal = () => {
        if (user && user.id) {
            axios.get(`${backendUrl}/product/showTotal`, {
                params: { id: user.id }
            })
                .then((res) => setTotal(res.data))
                .catch((err) => console.error("Error fetching total:", err));
        }
    };

    useEffect(() => {
        fetchCart();
        fetchTotal();
    }, []);

    const deletec = (cartId) => {
        axios.delete(`${backendUrl}/product/cart/delete/${cartId}`)
            .then(() => {
                alert("Deleted from cart");
                fetchCart();
                fetchTotal();
            })
            .catch(err => console.error("Error deleting item:", err));
    };

    const updateQuantity = (cartId, newQty) => {
        if (newQty < 1) return;
        axios.post(`${backendUrl}/product/addtocart`, null, {
            params: { uid: user.id, pid: cartId, q: newQty }
        })
            .then(() => {
                fetchCart();
                fetchTotal();
            })
            .catch(err => console.error("Error updating quantity:", err));
    };

    if (!user) {
        return <h4 className="text-center mt-5">⚠️ Please login first to view your cart</h4>;
    }

    if (cartItems.length === 0) {
        return <h4 className="text-center mt-5">🛒 Your cart is empty</h4>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-primary text-center">🛒 My Shopping Cart</h2>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
{cartItems.map((item, idx) => (
                <div key={idx} className="card mb-3 shadow-sm">
                    <div className="row g-0 align-items-center">
                        {/* Product Image */}
                        <div className="col-md-2 text-center">
                            <img
                                src={item.product.productUrl || "https://via.placeholder.com/100"}
                                alt={item.product.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: "120px" }}
                            />

                        </div>

                        {/* Product Details */}
                        <div className="col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">{item.product.title}</h5>
                                <p className="text-muted">{item.product.description}</p>
                                <p className="mb-1"><strong>Price:</strong> ₹{item.product.price}</p>
                                <p className="mb-1"><strong>Qty:</strong> <span className="mx-2">{item.quantity}</span></p>
                                <p className="mb-1"><strong>Subtotal:</strong> ₹{item.quantity * item.product.price}</p>

                            </div>
                        </div>

                        {/* Quantity Controls + Delete */}
                        <div className="col-md-4 text-center">
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deletec(item.id)}
                            >Remove</button>
                        </div>
                    </div>
                </div>
            ))}
                </div>
                <div className="col-md-3"></div>
            </div>

            

            {/* Total Section */}
            <div className="mt-4 text-center">
                <h4>Total Amount: <span className="text-success">₹{total}</span></h4>
                <button className="btn btn-warning mt-2" onClick={Checkout}>Proceed to Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
