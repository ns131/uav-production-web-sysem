import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const [countdown, setCountdown] = useState(5); // 5 saniyeden başlar
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Geri sayım tamamlandığında ana sayfaya yönlendirme
        if (countdown === 0) {
            navigate("/");
        }

        // Temizleme işlemi
        return () => clearInterval(interval);
    }, [countdown, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Bu sayfa mevcut değil. {countdown} saniye içinde ana sayfaya yönlendirileceksiniz.</p>
        </div>
    );
};

export default NotFound;
