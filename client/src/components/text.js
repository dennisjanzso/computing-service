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

function Text(props) {
  const [state, setState] = useState({
    status: '',
    text: null,
  });

  const onChange = event => {
      console.log(event.target.value);
  }

  return (
    <div style={{'marginTop': '2em'}}>
        <div class="input-field col s6">
          <input onChange={onChange} placeholder="Enter text" id="text-input" type="text" class="validate" style={{'color': 'white'}}/>
          <label for="text-input">{props.label}</label>
        </div>
      <small>{state.status}</small>
    </div>
  );
}

const WrappedText = connect(null, mapDispatchToProps)(Text);

export default WrappedText;