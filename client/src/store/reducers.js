import {CHANGE_SENT_STATUS, SERVICE_CONNECTED, CURRENT_IMAGE_ID} from './constants';

const initialState = {
    sentStatus: false,
    serviceConnected: false,
    currentImageId: null,
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === CHANGE_SENT_STATUS) {
      return Object.assign({}, state, {
        sentStatus: !state.sentStatus
      });
    } else if (action.type === SERVICE_CONNECTED) {
      return Object.assign({}, state, {
        serviceConnected: true
      });
    } else if (action.type === CURRENT_IMAGE_ID) {
      return Object.assign({}, state, {
        currentImageId: action.payload
      });
    }
    return state;
  };
  
  export default rootReducer;