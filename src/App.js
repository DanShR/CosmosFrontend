import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from 'universal-cookie';
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences'
import Login from './components/Login'
import Registration from "./components/Registration";
import PasswordRecovery from "./components/PasswordRecovery";
import AboutMe from './components/AboutMe'
import PasswordReset from "./components/PasswordReset";
import ConfirmEmail from "./components/ConfirmEmail";
import './App.css'
import Posts from "./components/Posts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    }

    this.cookies = new Cookies();
    this.getToken = this.getToken.bind(this);
    this.setIsAuth = this.setIsAuth.bind(this);
  }

  componentDidMount() {
    const isAuth = !!this.getToken();
    this.setIsAuth(isAuth)
  }

  setIsAuth(isAuth) {
    this.setState({ isAuth: isAuth })
  }

  getToken() {
    return this.cookies.get('token')
  }

  render() {
    const authProps = {
      setIsAuth: this.setIsAuth
    }

    if (!this.state.isAuth) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/passwordreset/:token" element={<PasswordReset />} />
            <Route path="/registration" element={<Registration authProps={authProps} />} />
            <Route path="/passwordrecovery" element={<PasswordRecovery />} />
            <Route path="/confirmemail" element={<ConfirmEmail />} />
            <Route path="*" element={<Login authProps={authProps} />} />
          </Routes>
        </BrowserRouter>
      )
    }
    return (
      <div>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard authProps={authProps} />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/aboutme" element={<AboutMe />} />            
            <Route path="/posts/*" element={<Posts />} />          
            <Route path="/" element={<Navigate to='/posts' />} />
          </Routes>
        </BrowserRouter>
      </div>)
  }
}

export default App;
