import {CHANGE_SENT_STATUS, SERVICE_CONNECTED, CURRENT_IMAGE_ID} from './constants'

export function changeSentStatus() {
  return { type: "CHANGE_SENT_STATUS" }
};

export function serviceGotConnected() {
  return { type: "SERVICE_CONNECTED" }
}

export function setCurrentImageId(payload) {
  return { type: "CURRENT_IMAGE_ID", payload }
}