import AuthContext from '../context/AuthContext';
import {useContext} from "react";
import {toast} from "react-toastify";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { authTokens, logoutUser } = useContext(AuthContext);
const API_BASE_URL = 'http://127.0.0.1:8000/api/'; // Django backend temel URL

// API fonksiyonu, yalnızca veri çekmek için
export const apiGet = async (authTokens, endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
        });
        let data = await response.json()
        if(response.status === 200){
            return await data;
        } else if(response.statusText === 'Unauthorized'){
            toast.error('Geçersiz Token!', {
                position: "bottom-left",
                draggable: true,
            });
            console.log(`Geçersiz Token!`)
            logoutUser()
        }
    } catch (error) {
        toast.error('Hata oluştu!', {
            position: "bottom-left",
            draggable: true,
        });
        console.error('GET hatası:', error);
        return error;
    }
};

// Genel POST isteği
export const apiPost = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`POST isteği başarısız: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('POST hatası:', error);
        throw error;
    }
};
