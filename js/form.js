// форма
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageEditorField = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imageUploadCancelButton = document.querySelector('.img-upload__cancel');

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

// эффекты
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const pictureEffectChrome = document.querySelector('#effect-chrome');
const pictureEffectSepia = document.querySelector('#effect-sepia');
const pictureEffectMarvin = document.querySelector('#effect-marvin');
const pictureEffectPhobos = document.querySelector('#effect-phobos');
const pictureEffectHeat = document.querySelector('#effect-heat');
const effectDefaultValue = document.querySelector('#effect-none');


const hideSliderContainer = () => {
  effectSliderContainer.classList.add('hidden');
};

const showSliderContainer = () => {
  effectSliderContainer.classList.remove('hidden');
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// открытие и закрытие формы загрузки изображения:

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

const onEffectsListChange = (evt) => {
  showSliderContainer();
  // effectSliderContainer.classList.remove('hidden');
  if (evt.target === pictureEffectChrome) {

    effectSlider.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,

    });
    const onEffectSliderUpdate = () => {
      effectValue.value = effectSlider.noUiSlider.get();
      picturePreviewElement.style.filter = `grayscale(${effectValue.value})`;
    };
    effectSlider.noUiSlider.on('update', onEffectSliderUpdate);

  } else if (evt.target === pictureEffectSepia) {

    effectSlider.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    const onEffectSliderUpdate = () => {
      effectValue.value = effectSlider.noUiSlider.get();
      picturePreviewElement.style.filter = `sepia(${effectValue.value})`;
    };
    effectSlider.noUiSlider.on('update', onEffectSliderUpdate);
  } else if (evt.target === pictureEffectMarvin) {
    effectSlider.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    const onEffectSliderUpdate = () => {
      effectValue.value = effectSlider.noUiSlider.get();
      picturePreviewElement.style.filter = `invert(${effectValue.value}%)`;
    };
    effectSlider.noUiSlider.on('update', onEffectSliderUpdate);
  } else if (evt.target === pictureEffectPhobos) {
    effectSlider.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    const onEffectSliderUpdate = () => {
      effectValue.value = effectSlider.noUiSlider.get();
      picturePreviewElement.style.filter = `blur(${effectValue.value}px)`;
    };
    effectSlider.noUiSlider.on('update', onEffectSliderUpdate);
  } else if (evt.target === pictureEffectHeat) {
    effectSlider.noUiSlider.updateOptions ({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    const onEffectSliderUpdate = () => {
      effectValue.value = effectSlider.noUiSlider.get();
      picturePreviewElement.style.filter = `brightness(${effectValue.value})`;
    };
    effectSlider.noUiSlider.on('update', onEffectSliderUpdate);
  } else if (evt.target === effectDefaultValue) {
    picturePreviewElement.removeAttribute('style');
    effectSliderContainer.classList.add('hidden');

  }
};


effectsList.addEventListener('change', onEffectsListChange);


export {showImageEditorForm };
