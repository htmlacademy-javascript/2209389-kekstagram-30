import { hideSliderContainer} from './effects.js';
import { sendData } from './server.js';
import {showUploadErrorAlert, showSuccessUploadMessage} from './util.js';

// форма
const bodyElement = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditorField = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
// изменение размера

const currentPictureZoomValue = document.querySelector('.scale__control--value');
const PICTURE_SCALE_STEP_VALUE = 25;
const MIN_PICTURE_SCALE_VALUE = 25;
const MAX_PICTURE_SCALE_VALUE = 100;
const pictureScaleContainer = document.querySelector('.img-upload__scale,  scale');
const picturePreviewElement = document.querySelector('.img-upload__preview img');

// хэштеги и комментарии

const hashtagsTextInputField = document.querySelector('.text__hashtags');
const commentTextInputField = document.querySelector('.text__description');
const hashtagRegularExpression = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// кнопка отправки формы
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = 'Сведения отправляются';
  } else {
    submitButton.textContent = 'Опубликовать';
  }
};

// открытие и закрытие формы загрузки изображения:

document.addEventListener('keydown', onDocumentKeydown);

document.addEventListener('keydown', onDocumentKeydown);

const onImageUploadFieldChange = () => {
  imageEditorField.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  hideSliderContainer();
};

const showImageEditorForm = () => {
  imageUploadInput.addEventListener ('change', onImageUploadFieldChange);
};


const hideImageEditorForm = () => {
  imageUploadForm.reset();
  pristine.reset();
  imageEditorField.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideImageEditorForm ();
  }
}

imageUploadCancelButton.addEventListener('click', hideImageEditorForm);

// конец блока с открытием и закрытием формы загрузки изображения

//валидация

const normalizedHashtags = (hashtagString) => hashtagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));


const validateHashtagLength = (value) => normalizedHashtags(value).length <= MAX_HASHTAG_NUMBER;

function validateCommentLenght (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

const validateHashtagText = (value) =>
  normalizedHashtags(value).every((hashtag) => hashtagRegularExpression.test(hashtag));

const validateHashtagUniqueness = (value) => {
  const lowerCasedHashtags = normalizedHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCasedHashtags.length === new Set(lowerCasedHashtags).size;
};

pristine.addValidator(
  hashtagsTextInputField,
  validateHashtagText,
  'Некорректный хэштег',
  1,
  true,
);

pristine.addValidator(
  hashtagsTextInputField,
  validateHashtagUniqueness,
  'Хэштеги не могут быть одинаковыми',
  2,
  true
);

pristine.addValidator(
  hashtagsTextInputField,
  validateHashtagLength,
  `Доступно не более ${MAX_HASHTAG_NUMBER} хэштегов`,
  3,
  true,);

pristine.addValidator(
  commentTextInputField,
  validateCommentLenght,
  `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`,
);

const setImageUploadFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formIsValid = pristine.validate();
    if (formIsValid) {
      toggleSubmitButton (true);
      sendData(new FormData(evt.target))
        .then(showSuccessUploadMessage)
        .then(onSuccess)
        .then(()=> toggleSubmitButton(false))
        .catch(() => {
          toggleSubmitButton (false);
          showUploadErrorAlert();
        });
    }
  });
};


hashtagsTextInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

commentTextInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// конец валидации хэштегов и комментария к фото

//  изменение размера превью

const onPictureScaleContainerClick = (evt) => {
  const currentValue = parseInt(currentPictureZoomValue.value, 10);

  if (evt.target.closest ('.scale__control--smaller')) {
    if(currentValue > MIN_PICTURE_SCALE_VALUE) {
      currentPictureZoomValue.value = `${parseInt(currentPictureZoomValue.value, 10) - PICTURE_SCALE_STEP_VALUE}%`;
      picturePreviewElement.style.transform = `scale(${currentPictureZoomValue.value})`;
    }
  } else if (evt.target.closest('.scale__control--bigger')) {
    if (currentValue < MAX_PICTURE_SCALE_VALUE) {
      currentPictureZoomValue.value = `${parseInt(currentPictureZoomValue.value, 10) + PICTURE_SCALE_STEP_VALUE}%`;
      picturePreviewElement.style.transform = `scale(${currentPictureZoomValue.value})`;
    }
  }
};

pictureScaleContainer.addEventListener('click', onPictureScaleContainerClick);

// конец блока изменения превью

// эффекты для изображения


export {showImageEditorForm, setImageUploadFormSubmit, hideImageEditorForm };
