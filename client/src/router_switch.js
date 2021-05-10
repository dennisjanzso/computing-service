import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Home from './components/home';
import ServiceWrapper from './components/serviceWrapper';
import Upload from './components/upload';
import Display from './components/display';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RouterSwitch () {
  let query = useQuery();

  return(
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/service'>
        <ServiceWrapper id={query.get("id")}/>
      </Route>
      <Route path='/ggg'>
        <Upload />
        <Display />
      </Route>
    </Switch>
  )
}

export default RouterSwitch;