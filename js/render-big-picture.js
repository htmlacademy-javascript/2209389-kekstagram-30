import { isEscapeKey, isEnterKey } from './util';
import { randomizedPictures } from './render-thumbnails';
console.log(randomizedPictures);
const bigPicture = document.querySelector('.big-picture');
const pictureContainer = document.querySelector('.pictures');
const bigPictureClose = bigPicture.querySelector('.cancel');

const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');

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

const getBigPicture = (evt) => {
bigPictureImg.src = evt.url;
likesCount.textContent = evt.likes;
commentTotalCount.textContent = evt.comments.length;
}

pictureContainer.addEventListener('click', (evt) => {
  randomizedPictures.forEach((datasetIdNumber) => {
    if(datasetIdNumber.id === Number(evt.target.dataset.id)) {
      console.log(datasetIdNumber);
      openBigPicture();
      getBigPicture(datasetIdNumber)

    }
  });

});

pictureContainer.addEventListener('keydown', (evt) => {
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

