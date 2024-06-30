import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // let URL = "http://localhost:3000";
    let URL = "https://modxtech-backend.onrender.com";
    let [user, setUser] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // if (userInfo) navigate("/");
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ URL, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}