const imageUploadField = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageUploadCancelButton = document.querySelector('.img-upload__cancel');

const hashtagsText = document.querySelector('.text__hashtags');
// const trimmedHashtagsText = hashtagsText.trim();
const hashtagRegularExpression = /^#[a-zа-яё0-1]{1,19}$/i;

console.log(hashtagRegularExpression.test('#'));

//открытие и закрытие формы загрузки изображения

const onImageUploadFieldChange = () => {
  imageUploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const showImageEditorForm = () => {
  imageUploadField.addEventListener ('change', onImageUploadFieldChange);
};

const hideImageEditorForm = () => {
  imageUploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageEditorForm ();
  }
}

imageUploadCancelButton.addEventListener('click', hideImageEditorForm);

// конец блока с открытием и закрытием формы загрузки изображения



new Pristine (hashtagsText);

export {showImageEditorForm };
