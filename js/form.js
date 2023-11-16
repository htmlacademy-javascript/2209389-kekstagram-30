const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageEditorField = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageUploadCancelButton = document.querySelector('.img-upload__cancel');

const hashtagsTextInputField = document.querySelector('.text__hashtags');
// const trimmedHashtagsText = hashtagsText.trim();
const commentTextInputField = document.querySelector('.text__description');

const hashtagRegularExpression = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

//открытие и закрытие формы загрузки изображения

document.addEventListener('keydown', onDocumentKeydown);

const onImageUploadFieldChange = () => {
  imageEditorField.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
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

imageUploadForm.addEventListener('submit', (evt) => {
  if (! pristine.validate()) {
    evt.preventDefault();
  }
});

hashtagsTextInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

commentTextInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


export {showImageEditorForm };
