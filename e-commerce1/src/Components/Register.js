import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cfnpassword: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();   // ✅ hook for navigation

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/user/saveWithMail`, formData);

      if (res.status === 200) {
        setMessage("🎉 Registration successful! Redirecting to login...");
        setFormData({
          username: "",
          email: "",
          password: "",
          cfnpassword: ""
        });

        // ✅ Redirect after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setMessage("⚠️ Registration failed. Try again!");
    }
  };

  const onChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3 mt-3">
              <label htmlFor="firstname" className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cfnpwd" className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                id="cfnpwd"
                placeholder="Enter confirm password"
                name="cfnpassword"
                value={formData.cfnpassword}
                onChange={onChangeHandler}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

          {/* ✅ Success/Error message */}
          {message && <p className="mt-3 text-success">{message}</p>}
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
}

export default Register;
