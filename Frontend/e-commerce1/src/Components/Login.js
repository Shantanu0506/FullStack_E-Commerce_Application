import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Contrext/ThemeContext";
import axios from "axios";

function Login() {
    const { login } = useContext(ThemeContext);

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // admin login
            if (user.email === "Shantanu@gmail.com" && user.password === "Shantanu@777") {
                alert("Welcome Shantanu Admin sir");
                localStorage.setItem("user", JSON.stringify({ email: user.email, role: "admin" }));
                navigate("/admin");
            } else {
                // normal user login
                const res = await axios.post("http://localhost:8080/user/login", user, {
                    withCredentials: true
                });

                console.log("Login Response:", res.data);

                if (res.data) {
                    // full user object save करा
                    login(res.data);
                    localStorage.setItem("user", JSON.stringify(res.data));
                    alert(`User login successfully: ${res.data.email}`);
                    navigate("/home");
                    setUser({ email: "", password: "" });
                } else {
                    alert("Invalid credentials");
                }
            }
        } catch (error) {
            alert(`Error : ${error.message}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
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
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </form>
        </>
    );
}

export default Login;
