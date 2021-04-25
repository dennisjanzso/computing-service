import React, { useState, useEffect } from 'react';
import '../App.css';
import {sendImage} from '../models';
import { connect } from 'react-redux';
import { changeSentStatus, setCurrentImageId } from '../store/actions';
import Preloader from './preloader';

const mapStateToProps = state => {
  return {
    sentStatus: state.sentStatus,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changeSentStatus: event => dispatch(changeSentStatus()),
    setCurrentImageId: image_id => dispatch(setCurrentImageId(image_id)),
  };
}

function makeId(length) {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}

function ConnectedUpload(props) {
  const [state, setState] = useState({
    status: '',
    uploaded: false,
    sent: false,
    recieved: false,
  });
  const fileUploaded = event => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length > 1) {
        setState({status: 'Too many files uploaded. Please upload one at a time.', uploaded: false});
        return null;
      }
      if (event.target.files[0]['type'] !== "image/png") {
        setState({status: 'Service can only handle PNG images. Please upload .png files only.', uploaded: false});
        return null;
      }
      setState({uploaded: true, status: ''});
    }
  }

  async function sendFile () {
    setState({sent: true, uploaded: false});
    let input = document.getElementById('image-upload');
    let img = input.files[0];
    let id = makeId(8);
    props.setCurrentImageId(id);
    input.value = '';
    let res = sendImage(img, id);
    let res_resolved = await res;
    setState({recieved: true, sent: false});
    props.changeSentStatus();
  }

  const didUpdate = event => {
    if (props.sentStatus) {
      setState({sent: false, recieved: false});
    } 
  }

  useEffect(didUpdate);

  return (
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Upload image</span>
            <div class="file-field input-field">
              <div class="btn">
                <span>File</span>
                <input type="file" id='image-upload' onChange={fileUploaded} />
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
            {state.uploaded ? <button className="waves-effect waves-light btn" onClick={sendFile} >Upload Image</button> : null}
            {state.sent ? <Preloader progressInfo="Uploading Image" /> : null}
            {state.recieved ? <Preloader progressInfo="Processing Image" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const Upload = connect(mapStateToProps, mapDispatchToProps)(ConnectedUpload);

export default Upload;
