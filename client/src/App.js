import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Upload from './components/upload';
import Display from './components/display';
import RouterSwitch from './router_switch';
import { checkConnection } from './models';
import { updateServices } from './store/actions';

function mapDispatchToProps (dispatch) {
  return {
    updateServices: svc => dispatch(updateServices(svc))
  };
}

function App(props) {
  const [serviceStatus, setServiceStatus] = useState(false);

  async function serviceConnect() {
    let res_promise = checkConnection();
    let res = await res_promise;
    if (res['status'] === 200){
      setServiceStatus(true);
      props.updateServices(res['data']);
    }
  }
  if (!serviceStatus){
    serviceConnect()
  }
  return (
    <Router>
      <nav>
        <div class="nav-wrapper grey">
          <a href="/" className="brand-logo" style={{'left': '1em'}}>ClusterBuster</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/ggg">Working Demo</a></li>
            <li><a href="/">Cloud Service</a></li>
            <li><a href="/">Data Service</a></li>
          </ul>
        </div>
      </nav>
      <RouterSwitch />
      <footer className="page-footer grey" style={{
        'position': 'fixed',
        'max-height': '100vh',
        'bottom': '0px',
        'width': '100%',
      }}>
        <small style={{'position': 'relative', 'left': '45%', 'bottom': '1em'}}>{serviceStatus ? "Service connected" : "Service not connected"}</small>
      </footer>
    </Router>
  );
}

const WrappedApp = connect(null, mapDispatchToProps)(App);

export default WrappedApp;
