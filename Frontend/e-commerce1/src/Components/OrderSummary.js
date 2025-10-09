function OrderSummary() {
  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) {
    return <h3>No order found!</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Order Summary</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Total:</strong> ₹{order.total}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Email Sent To:</strong> {order.email}</p>
    </div>
  );
}

export default OrderSummary;
