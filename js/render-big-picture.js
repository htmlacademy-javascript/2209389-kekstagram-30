import { isEscapeKey, isEnterKey } from './util';


const bigPicture = document.querySelector('.big-picture');
const thumbnailPicture = document.querySelector('.pictures');
const bigPictureClose = bigPicture.querySelector('.cancel');

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

}


function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);


}

thumbnailPicture.addEventListener('click', () => {
  openBigPicture();
});

thumbnailPicture.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openBigPicture();
  }
});

bigPictureClose.addEventListener ('click', () => {
  closeBigPicture();
});

bigPictureClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});


//детально рассмотреть изображение
//Окно должно открываться при клике на миниатюру


//поставить «лайк»
//почитать комментарии оставленные другими пользователями
