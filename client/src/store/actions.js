import {CHANGE_SENT_STATUS, SERVICE_CONNECTED, CURRENT_IMAGE_ID, FORM_UPDATE, FORM_RESET} from './constants'

export function changeSentStatus() {
  return { type: "CHANGE_SENT_STATUS" }
};

export function serviceGotConnected() {
  return { type: "SERVICE_CONNECTED" }
}

export function setCurrentImageId(payload) {
  return { type: "CURRENT_IMAGE_ID", payload }
}

export function updateForm(payload) {
  return { type: "FORM_UPDATE", payload }
}

export function resetForm() {
  return { type: "FORM_RESET" }
}

export function updateServices(payload) {
  return { type: "UPDATE_SERVICES", payload }
}