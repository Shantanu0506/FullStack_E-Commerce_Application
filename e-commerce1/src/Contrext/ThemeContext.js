import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ThemeContext = createContext();

function ThemeProvider(props) {
    const [profile, setProfile] = useState([]);
    const [url, setUrl] = useState(`http://localhost:8080/product/all`);
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const exist = prev.find(p => p.id === item.id);
            if (exist) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, qty: p.qty + item.qty } : p
                );
            }
            return [...prev, item];
        });
    };

    // 👈 Cart clear करण्यासाठी method add केले
    const clearCart = () => {
        setCartItems([]);
    };

    // login method
    const login = (userData) => {
        setUser(userData);
        // 👈 Login केल्यावर backend मधून cart load करा (optional)
        if (userData && userData.id) {
            loadCartFromBackend(userData.id);
        }
        console.log("Logged in user:", userData);
    };

    // logout method
    const logout = () => {
        setUser(null);
        clearCart(); // 👈 Logout केल्यावर cart clear करा
    };

    // 👈 Backend मधून cart load करण्यासाठी (optional)
    const loadCartFromBackend = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/product/showcart?id=${userId}`);
            const backendCartItems = response.data.map(item => ({
                id: item.product.id,
                title: item.product.title,
                price: item.product.price,
                qty: item.quantity,
                productUrl: item.product.productUrl
            }));
            setCartItems(backendCartItems);
        } catch (err) {
            console.error("Error loading cart:", err);
        }
    };

    // search method
    const searchTitle = (proTitle) => {
        axios.get(`http://localhost:8080/product/search?title=${proTitle}`)
            .then(response => setProfile(response.data))
            .catch(err => console.error(err));
    };

    // load products
    useEffect(() => {
        axios.get(url)
            .then(response => setProfile(response.data))
            .catch(err => console.error(err));
    }, [url]);

    
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            if (userData.id) {
                loadCartFromBackend(userData.id);
            }
        }
    }, []);

    return (
        <ThemeContext.Provider value={{
            profile, setProfile, setUrl, searchTitle,
            user, login, logout,
            cartItems, addToCart, clearCart
        }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
