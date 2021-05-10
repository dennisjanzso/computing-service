import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { resetForm } from '../store/actions';
import Upload from './upload';
import File from './file';
import Text from './text';

const mapStateToProps = state => {
  return {
    formElements: state.formElements,
    services: state.services,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    resetForm: event => dispatch(resetForm())
  };
}

function FormBuilder(props) {
  const [state, setState] = useState({
    service: null,
    formCompleted: false,
  });

  useEffect(didUpdate);

  function didUpdate () {
    console.log(state)
    if (state.service === null) {
      var service_list = [];
      Object.keys(props.services).forEach(function(key) {
        service_list.push(props.services[key]);
      });
      service_list = service_list.filter(s => s.id == props.id);
      if (service_list.length === 1) {
        setState({service: service_list[0], formCompleted: false});
      }
    }
    if (!state.formCompleted && state.service !== null) {
      let ids_completed = [];
      props.formElements.forEach(el => {
        ids_completed.push(el.id);
      });
      Object.keys(state.service.inputs).forEach(key => {
        if (!ids_completed.includes(state.service.inputs[key].id)) {
          console.log(state)
          return;
        }
      });
      console.log("changing state", ids_completed)
      setState({service: state.service, formCompleted: true});
    }
  }

  function renderForm () {
    var formElements = [];

    {Object.keys(state.service.inputs).forEach(key => {
        if (key === "file") {
          formElements.push(<File type={state.service.inputs[key].type} id={state.service.inputs[key].id} />)
        }
        else if (key === 'text') {
          formElements.push(<Text id={state.service.inputs[key].id} label={state.service.inputs[key].label}/>)
        }
      })
    }

    return(
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{state.service.name}</span>
          <p>{state.service.description}</p>
          {formElements}
          {state.formCompleted ? <button onClick={props.sender} style={{'marginTop': '1em'}} className="waves-effect waves-light btn" >Run Service</button>
          : <button disabled onClick={props.sender} style={{'marginTop': '1em'}} className="waves-effect waves-light btn" >Run Service</button>}
        </div>
      </div>
    );
  }

  return (
    <div>
      {state.service === null ? <p>Could not resolve service</p> : renderForm()}
    </div>
  );
}

const WrappedFormBuilder = connect(mapStateToProps, mapDispatchToProps)(FormBuilder);

export default WrappedFormBuilder;