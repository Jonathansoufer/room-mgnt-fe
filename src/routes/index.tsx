import React from "react";
import { Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useTheme } from "../hooks/useTheme";

import Home from "../pages/Home";
import Room from "../pages/Room";
import Appointments from "../pages/Appointments";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import coke from "../styles/themes/coke";
import pepsi from "../styles/themes/pepsi";

import Route from "./Route";

const Routes: React.FC = () => {
  const { title } = useTheme();

  return (
    <Switch>
      <ThemeProvider theme={title === "coke" ? coke : pepsi}>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route isPrivate exact path="/home" component={Home} />
        <Route isPrivate exact path="/appointments" component={Appointments} />
        <Route isPrivate exact path="/room/:id" component={Room} />
      </ThemeProvider>
    </Switch>
  );
};

export default Routes;
