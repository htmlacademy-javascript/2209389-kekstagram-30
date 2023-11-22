const ALERT_SHOW_TIME = 5000;

const pictureUploadSuccessMessage = document
  .querySelector('#success')
  .content.
  querySelector('.success');


const pictureDownloadErrorMessage = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

//ошибка отправки данных
const pictureUploadErrorMessage = document
  .querySelector('#error')
  .content.
  querySelector('.error');


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};


const isEnterKey = (evt) => evt.key === 'Enter';


//сообщение об удачной загрузке фото
const showSuccessUploadMessage = () => {
  document.body.append(pictureUploadSuccessMessage);
  const onSuccessUploadOkButtonClick = (evt) => {
    const successUploadCloseButton = document.querySelector('.success__button');
    if (evt.target === successUploadCloseButton) {
      pictureUploadSuccessMessage.remove();
      document.body.removeEventListener('keydown', onDocumentKeydown);
    }
  };
  pictureUploadSuccessMessage.addEventListener('click', onSuccessUploadOkButtonClick);
  function onDocumentKeydown (event) {
    if (event.key === 'Escape') {
      pictureUploadSuccessMessage.remove();
      document.body.removeEventListener('keydown', onDocumentKeydown);
    }
  }
  document.body.addEventListener('keydown', onDocumentKeydown);

  function onBodyClick (evt) {
    if (!(evt.target.closest('.success__inner'))) {
      pictureUploadSuccessMessage.remove();
      document.body.removeEventListener('click', onBodyClick);
    }
  }
  document.body.addEventListener('click', onBodyClick);

};

//кнопка закрытия сообщения об удачной загрузке


//сообщение об ошибке загрузки фотографий других пользователей
const showDownloadErrorAlert = () => {
  const alertContainer = pictureDownloadErrorMessage.cloneNode(true);
  document.body.append(alertContainer);
  setTimeout (() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
//сообщение об ошибке отправки фотографии


const showUploadErrorAlert = () => {
  document.body.append(pictureUploadErrorMessage);

  const onUploadErrorMessageClick = (evt) => {
    const uploadErrorMessageButton = document.querySelector('.error__button');
    if (evt.target === uploadErrorMessageButton) {
      document.body.removeEventListener('click', onUploadErrorMessageClick);
      pictureUploadErrorMessage.remove();
    }
  };
  pictureUploadErrorMessage.addEventListener('click', onUploadErrorMessageClick);
  function onDocumentKeydown (event) {
    if (event.key === 'Escape') {
      pictureUploadErrorMessage.remove();
      document.body.removeEventListener('keydown', onDocumentKeydown);
    }
  }
  document.body.addEventListener('keydown', onDocumentKeydown);
  function onBodyClick (evt) {
    if (!(evt.target.closest('.error__inner'))) {
      pictureUploadErrorMessage.remove();
      document.body.removeEventListener('click', onBodyClick);
    }
  }
  document.body.addEventListener('click', onBodyClick);
};


export {getRandomArrayElement, createIdGenerator, getRandomInteger, isEnterKey, showUploadErrorAlert, showDownloadErrorAlert, showSuccessUploadMessage};
