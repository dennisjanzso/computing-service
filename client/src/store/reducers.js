import {CHANGE_SENT_STATUS, SERVICE_CONNECTED, CURRENT_IMAGE_ID, FORM_UPDATE, FORM_RESET, UPDATE_SERVICES} from './constants';

const initialState = {
    sentStatus: false,
    serviceConnected: false,
    currentImageId: null,
    formElements: [],
    services: {}
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
    } else if (action.type === FORM_UPDATE) {
      return Object.assign({}, state, {
        formElements: [...state.formElements, action.payload]
      });
    } else if (action.type === FORM_RESET) {
      return Object.assign({}, state, {
        formElements: []
      });
    } else if (action.type === UPDATE_SERVICES) {
      return Object.assign({}, state, {
        services: action.payload
      });
    }
    return state;
  };
  
  export default rootReducer;