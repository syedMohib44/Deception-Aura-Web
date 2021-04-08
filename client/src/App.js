/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './utils/privateRoute';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import AdminLogin from "./components/superadmin/AdminLogin";
import AdminHome from "./components/superadmin/Home";
import Register from "./components/Register";
import ContactUs from "./components/ContactUs";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Campaings from "./components/Campaings";
import ConsumerHome from "./components/ConsumerHomePage";
import ConsumerProduct from "./components/ConsumerProductPage";
require('dotenv').config();

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  //state.auth is in /reducers/index.js auth and message are combine using it.
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      //setShowModeratorBoard(currentUser.typeOfUser.includes("owner"));
      //setShowAdminBoard(currentUser.roles.includes("superadmin"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Deception Aura
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>

            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          <div className="navbar-nav ml-right">
            <li className="nav-item">
              <Link to={"/contact-us"} className="nav-link">
                Contant Us
                </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={ConsumerHome} />
            <Route exact path={"/business/:name/:id"} component={ConsumerProduct} />
            <Route exact path={["/superadmin", '/superadmin/login']} component={AdminLogin} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact-us" component={ContactUs} />
            <Route exact path="/profile" component={Profile} />
            {/* <PrivateiRoute path="/user" component={BoardUser} /> */}
            <PrivateRoute path="/superadmin/home" component={BoardAdmin} />
            <PrivateRoute path="/campaing/:id" component={Campaings} />
            <PrivateRoute exact path={["/user", "/user/home"]} component={Home} />
            <PrivateRoute path="/campaing/:id" component={Campaings} />
            <PrivateRoute path="/mod" component={BoardModerator} />
            <PrivateRoute path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
/* eslint-disable no-unused-vars */
