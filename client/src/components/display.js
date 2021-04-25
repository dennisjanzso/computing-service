import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect } from "react-redux";
import { changeSentStatus, setCurrentImageId } from '../store/actions';
import {getImage, clearImage} from '../models';

const mapStateToProps = state => {
  return {
    sentStatus: state.sentStatus,
    currentImageId: state.currentImageId,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    changeSentStatus: event => dispatch(changeSentStatus()),
    setCurrentImageId: image_id => dispatch(setCurrentImageId(image_id))
  };
}

function ConnectedDisplay({sentStatus, changeSentStatus, currentImageId, setCurrentImageId}) {
  const [image, setImage] = useState(null);

  function wipeImage () {
    clearImage(currentImageId);
    setCurrentImageId(null);
  }

  async function getData () {
      let raw_data = getImage(currentImageId);
      let data = await raw_data;
      setImage(data);
      wipeImage();
  }

  function didUpdate () {
    if (sentStatus){
      getData();
      changeSentStatus()
    }
  }

  const downloadImage  = event => {
    const link = document.createElement("a");
    link.href = image;
    link.setAttribute("download", image['name']);
    document.body.appendChild(link);
    link.click();
  }

  useEffect(didUpdate);

  return (
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Processed image</span>
            {image === null ? <p>Image will display here when processed</p>
            : <div><div style={{display: 'block'}}><img src={image}/></div><div style={{display: 'block'}}><button className="waves-effect waves-light btn" onClick={downloadImage} >Download</button></div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

const Display = connect(mapStateToProps, mapDispatchToProps)(ConnectedDisplay);

export default Display;