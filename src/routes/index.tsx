import React from 'react';
import { Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '../hooks/useTheme';

import Home from '../pages/Home';
import Room from '../pages/Room';
import Appointmets from '../pages/Appointmets';
import SignIn from '../pages/SignIn';
import coca from '../styles/themes/coca';
import pepsi from '../styles/themes/pepsi';

import Route from './Route';

const Routes: React.FC = () => {

  const { title } = useTheme();

  return (
    <Switch>
        <ThemeProvider theme={title === 'coca' ? coca : pepsi}>
          <Route exact path="/" component={SignIn} />
          <Route isPrivate exact path="/home" component={Home} />
          <Route isPrivate exact path="/appointments" component={Appointmets} />
          <Route isPrivate exact path="/room/:id" component={Room} />
      </ThemeProvider>
    </Switch>
  )
};

export default Routes;
