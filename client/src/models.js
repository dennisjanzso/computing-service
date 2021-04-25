import axios from 'axios';

const api_url = 'http://127.0.0.1:5000';

function checkConnection () {
    return axios.get(api_url + '/')
    .then(response => {return response});
}

function clearImage (image_id) {
    return axios.get(api_url + '/cleanup-processed-image?id=' + image_id)
    .then(response => {return response});
}

function getImage (image_id) {
    return axios.get(api_url + '/get-processed-image?id=' + image_id, { responseType: 'arraybuffer' })
    .then(response => {
        let blob = new Blob(
            [response.data], 
            { type: response.headers['content-type'] }
        )
        let image = URL.createObjectURL(blob)
        return image
    });
}

function sendImage (img, id) {
    return axios.post(api_url + '/upload-image?id=' + id, img, {
        headers:{
            'Content-Type': 'image/png',
        }
    })
    .then(function(response){
        return response;
    })
}


export {sendImage, checkConnection, getImage, clearImage};