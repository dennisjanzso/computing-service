import React, { useState, useEffect } from 'react';
import '../App.css';
import {sendImage} from '../models';
import { connect } from 'react-redux';
import { updateForm } from '../store/actions';
import Preloader from './preloader';

function mapDispatchToProps (dispatch) {
  return {
    updateForm: event => dispatch(updateForm(event))
  };
}

function File(props) {
  const [state, setState] = useState({
    status: '',
    file: null,
  });
  const fileUploaded = event => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files.length > 1) {
        setState({status: 'Too many files uploaded. Please upload one at a time.', file: null});
        return null;
      }
      if (event.target.files[0]['type'] !== props.type) {
        setState({status: 'Service can only handle PNG images. Please upload .png files only.', file: null});
        return null;
      }
      setState({file: event.target.files[0], status: ''});
      const data = event.target.files[0];
      data["id"] = props.id;
      props.updateForm(data)
    }
  }
  return (
    <div>
      <div class="file-field input-field">
        <div class="btn">
          <span>File</span>
          <input type="file" id='image-upload' onChange={fileUploaded} />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
      <small>{state.status}</small>
    </div>
  );
}

const WrappedFile = connect(null, mapDispatchToProps)(File);

export default WrappedFile;