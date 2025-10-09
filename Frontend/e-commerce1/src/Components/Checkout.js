import { useEffect, useState } from "react";
import axios from "axios";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    paymentMethod: "COD",
  });

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  // fetch cart & total from backend
  const fetchCart = () => {
    if (user && user.id) {
      axios
        .get(`http://localhost:8080/product/showcart`, { params: { id: user.id } })
        .then((res) => setCartItems(res.data))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  };

  const fetchTotal = () => {
    if (user && user.id) {
      axios
        .get(`http://localhost:8080/product/showTotal`, { params: { id: user.id } })
        .then((res) => setTotal(res.data))
        .catch((err) => console.error("Error fetching total:", err));
    }
  };

  useEffect(() => {
    fetchCart();
    fetchTotal();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Razorpay order creation
  const createRazorpayOrder = async () => {
    try {
      if (!total || total <= 0) {
        alert("Total amount is invalid!");
        return null;
      }
      const response = await axios.post(
        `http://localhost:8080/order/create-razorpay-order?amount=${total}`
      );
      return response.data;
    } catch (error) {
      console.error("Error creating Razorpay order:", error.response?.data || error);
      alert("Error creating Razorpay order!");
    }
  };

  // Clear cart (backend + frontend)
  const clearCart = async () => {
    try {
      await axios.post(`http://localhost:8080/order/clear-cart`, { params: { userId: user.id } });
      setCartItems([]);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Open Razorpay checkout
  const openRazorpay = async () => {
    const order = await createRazorpayOrder();
    if (!order) return;

    const options = {
      key: "rzp_test_RKAFwcDZBv9IOe",
      amount: order.amount,
      currency: order.currency,
      name: "My Shop",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        console.log("Payment success:", response);

        // verify payment on backend
        await axios.post(`http://localhost:8080/order/verify-razorpay`, {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          userId: user.id,
          amount: total,
          email: formData.email
        });

            // ✅ Clear cart after successful payment
        await axios.post(`http://localhost:8080/order/clear-cart`, null, {
            params: { userId: user.id }
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          paymentMethod: "COD",
        });

        // Save last order in localStorage
        localStorage.setItem(
          "lastOrder",
          JSON.stringify({
            id: response.razorpay_order_id,
            total: total,
            status: "Paid",
            email: formData.email,
          })
        );

        alert("✅ Payment Successful!");
        window.location.href = "/"; // redirect to home
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("⚠️ Please login first");

    if (formData.paymentMethod === "COD") {
      // Save order, clear cart, reset form
      await clearCart();

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        paymentMethod: "COD",
      });

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          id: `COD_${Date.now()}`,
          total: total,
          status: "Pending",
          email: formData.email,
        })
      );

      alert("✅ Order placed successfully! (COD)");
      window.location.href = "/"; // redirect to home
    } else {
      openRazorpay();
    }
  };

  if (!user) {
    return (
      <h4 className="text-center mt-5">
        ⚠️ Please login first to checkout
      </h4>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary text-center">Checkout</h2>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <h4>Customer Information</h4>
            <input type="text" className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" className="form-control mb-2" name="phone" placeholder="Phone" onChange={handleChange} required />

            <h4 className="mt-3">Shipping Address</h4>
            <textarea className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} required />
            <input type="text" className="form-control mb-2" name="city" placeholder="City" onChange={handleChange} required />
            <input type="text" className="form-control mb-2" name="state" placeholder="State" onChange={handleChange} required />
            <input type="text" className="form-control mb-2" name="pincode" placeholder="Pincode" onChange={handleChange} required />
            <input type="text" className="form-control mb-2" name="country" placeholder="Country" onChange={handleChange} required />

            <h4 className="mt-3">Payment Method</h4>
            <select className="form-select mb-3" name="paymentMethod" onChange={handleChange}>
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Credit/Debit Card</option>
            </select>

            <button type="submit" className="btn btn-success">Place Order</button>
          </form>
        </div>

        <div className="col-md-3"></div>

        <div className="col-md-3">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cartItems.map((item, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.product.title}</strong>
                  <br />
                  Qty: {item.quantity} × ₹{item.product.price}
                </div>
                <span>₹{item.quantity * item.product.price}</span>
              </li>
            ))}
          </ul>
          <h5 className="text-end">Total: ₹{total}</h5>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
