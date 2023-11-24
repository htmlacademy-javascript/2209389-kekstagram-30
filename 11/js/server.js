import { showDownloadErrorAlert, showUploadErrorAlert } from './util';

const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const getData = () => fetch (
  `${SERVER_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() =>{
    throw new Error(showDownloadErrorAlert());
  });


const sendData = (body) => fetch (
  `${SERVER_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  },)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error (showUploadErrorAlert());
  });

export {getData, sendData};
