const imageUploadField = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageUploadCancelButton = document.querySelector('.img-upload__cancel');

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


export {showImageEditorForm };
