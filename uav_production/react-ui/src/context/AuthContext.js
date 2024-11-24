import {createContext, useState, useEffect, useCallback} from 'react'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import RoutePaths from "../routes/RoutePaths";
import {toast} from "react-toastify";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        console.log("e:", e);
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value })
        });

        let data = await response.json();
        // With wrong credentials the code get stuck with parsing error message
        // because the response has text message not the access and request tocken in required format
        // performing a check on success of login will prevent this error.
        // a robust error handling can be implemented but below modification a work around to carry on with the tutorial

        if(data && response.ok){
            toast.success('Başarıyla giriş yapıldı.', {
                position: "bottom-left",
                draggable: true,
            });
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate(RoutePaths.HOME)
        } else {
            toast.error('Giriş bilgilerini kontrol edin!', {
                position: "bottom-left",
                draggable: true,
            });
        }
    }

    let logoutUser = useCallback(() => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate(RoutePaths.LOGIN);
    }, [setAuthTokens, setUser, navigate]);

    const updateToken = useCallback(async () => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })
       
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }, [authTokens, setAuthTokens, setUser, logoutUser, loading]);
    // }, [authTokens, setAuthTokens, setUser, logoutUser, loading]);

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    },[authTokens, loading, updateToken])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
