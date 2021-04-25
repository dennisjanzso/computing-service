import { useState, useEffect } from 'react';
import './App.css';
import Upload from './components/upload';
import Display from './components/display';
import { checkConnection } from './models'

function App() {
  const [serviceStatus, setServiceStatus] = useState(false);
  async function serviceConnect() {
    let res_promise = checkConnection();
    let res = await res_promise;
    if (res['status'] === 200){
      setServiceStatus(true);
    }
  }
  if (!serviceStatus){
    serviceConnect()
  }
  return (
    <div className="App">
      <Upload />
      <Display />
      <small>{serviceStatus ? "Service connected" : "Service not connected"}</small>
    </div>
  );
}

export default App;
