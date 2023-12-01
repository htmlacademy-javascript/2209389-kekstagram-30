import { hideSliderContainer, removeEffectValue, removePicturePreviewStyle} from './effects.js';
import { sendData } from './server.js';
import {showUploadErrorAlert, showSuccessUploadMessage} from './util.js';

const HASHTAG_REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;

const PICTURE_SCALE_STEP_VALUE = 25;
const MIN_PICTURE_SCALE_VALUE = 25;
const MAX_PICTURE_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 1;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];


const bodyElement = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditorField = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const effectsPreviews = imageUploadForm.querySelectorAll('.effects__preview');


const currentPictureZoomValue = document.querySelector('.scale__control--value');

const pictureScaleContainer = document.querySelector('.img-upload__scale,  scale');
const picturePreviewElement = document.querySelector('.img-upload__preview img');
const scaleControlReduceButton = document.querySelector('.scale__control--smaller');
const scaleControlIncreaseButton = document.querySelector('.scale__control--bigger');


const hashtagsTextInputField = document.querySelector('.text__hashtags');
const commentTextInputField = document.querySelector('.text__description');


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

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onImageUploadFieldChange = () => {
  const file = imageUploadInput.files[0];

  if (file && isValidType(file)) {
    picturePreviewElement.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreviewElement.src}')`;
    });
  }

  imageEditorField.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  hideSliderContainer();
};

const showImageEditorForm = () => {
  imageUploadInput.addEventListener ('change', onImageUploadFieldChange);
};


const onImageUploadCancelButtonClick = () => {
  imageUploadForm.reset();
  pristine.reset();
  removePicturePreviewStyle();
  picturePreviewElement.style.transform = `scale(${DEFAULT_SCALE_VALUE})`;
  imageEditorField.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  removeEffectValue();
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onImageUploadCancelButtonClick ();
  }
}

imageUploadCancelButton.addEventListener('click', onImageUploadCancelButtonClick);


//валидация

const normalizeHashtags = (hashtagString) => hashtagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));


const validateHashtagLength = (value) => normalizeHashtags(value).length <= MAX_HASHTAG_NUMBER;

function validateCommentLenght (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

const validateHashtagText = (value) =>
  normalizeHashtags(value).every((hashtag) => HASHTAG_REGULAR_EXPRESSION.test(hashtag));

const validateHashtagUniqueness = (value) => {
  const lowerCasedHashtags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
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

//  изменение размера превью

const onPictureScaleContainerClick = (evt) => {
  const currentValue = parseInt(currentPictureZoomValue.value, 10);

  if (evt.target === scaleControlReduceButton) {
    if(currentValue > MIN_PICTURE_SCALE_VALUE) {
      currentPictureZoomValue.value = `${parseInt(currentPictureZoomValue.value, 10) - PICTURE_SCALE_STEP_VALUE}%`;
      picturePreviewElement.style.transform = `scale(${currentPictureZoomValue.value})`;
    }
  } else if (evt.target === scaleControlIncreaseButton) {
    if (currentValue < MAX_PICTURE_SCALE_VALUE) {
      currentPictureZoomValue.value = `${parseInt(currentPictureZoomValue.value, 10) + PICTURE_SCALE_STEP_VALUE}%`;
      picturePreviewElement.style.transform = `scale(${currentPictureZoomValue.value})`;
    }
  }
};

const resetPictureZoomValue = () => {
  currentPictureZoomValue.value = `${parseInt(MAX_PICTURE_SCALE_VALUE, 10)}%`;
};

pictureScaleContainer.addEventListener('click', onPictureScaleContainerClick);


export {showImageEditorForm, setImageUploadFormSubmit, onImageUploadCancelButtonClick, resetPictureZoomValue };
