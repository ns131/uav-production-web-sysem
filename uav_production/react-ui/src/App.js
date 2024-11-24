import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import {Pages} from "./routes/Router";
import {ToastContainer} from "react-toastify";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Router >
          <AuthProvider>
              <div>
                  <Pages/>
              </div>
              <ToastContainer className={"fontSize14"}/>
          </AuthProvider>
      </Router>
  );
}

export default App;
