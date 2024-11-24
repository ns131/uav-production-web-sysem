import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "../services/auth";
import AuthContext from '../context/AuthContext';
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
// import Slider from "../components/Slider";

const PrivateRoute = ({ children }) => {
    let { user } = useContext(AuthContext)
    if (!user) {
        return (
            <>
                {/*<Slider />*/}
                <Navigate to="/login" />;
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div style={{ minHeight: "80vh" }}>{children}</div>
            <Footer />
        </>
    );
};

export default PrivateRoute;
