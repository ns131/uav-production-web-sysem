import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import RoutePaths from "../routes/RoutePaths";

import Login from "../pages/Login";
import NotFound from "../components/NotFound";

// Pages
import HomePage from '../pages/HomePage';
import Employees from '../pages/Employees';
import Teams from '../pages/Teams';
import Production from '../pages/Production';
import Assembly from '../pages/Assembly';

const Pages = () => (
    <Routes>
        <Route path={RoutePaths.LOGIN} element={<Login/>}/>

        <Route path={RoutePaths.HOME} exact element={<PrivateRoute><HomePage/></PrivateRoute>}/>
        <Route path={RoutePaths.EMPLOYEES} element={<PrivateRoute><Employees/></PrivateRoute>}/>
        <Route path={RoutePaths.TEAMS} element={<PrivateRoute><Teams/></PrivateRoute>}/>
        <Route path={RoutePaths.TEAMS} element={<PrivateRoute><Teams/></PrivateRoute>}/>
        <Route path={RoutePaths.PRODUCTION} element={<PrivateRoute><Production/></PrivateRoute>}/>
        <Route path={RoutePaths.ASSEMBLY} element={<PrivateRoute><Assembly/></PrivateRoute>}/>
        <Route path={RoutePaths.NOT_FOUND} element={<PrivateRoute><NotFound/></PrivateRoute>}/>
    </Routes>
);

export { Pages };