import { useContext, useEffect } from "react";
import { ThemeContext } from "../Contrext/ThemeContext";
import axios from "axios";

function Logout(){
    const{logout} =useContext(ThemeContext);

    useEffect(() => {
        axios.get('http://localhost:8080/user/logout');
    },[])
    return(
        <>
        <h5>This is my Loogut Page.</h5>
        {logout()}
        </>
    )
}
export default Logout;