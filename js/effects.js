import { resetPictureZoomValue } from './form';

const pictureModalElement = document.querySelector('.img-upload');
const picturePreviewElement = pictureModalElement.querySelector('.img-upload__preview img');
const effectSliderContainer = pictureModalElement.querySelector('.img-upload__effect-level');

const effectValue = pictureModalElement.querySelector('.effect-level__value');
const effectSlider = pictureModalElement.querySelector('.effect-level__slider');
const effectsList = pictureModalElement.querySelector('.effects__list');

const pictureEffectChrome = pictureModalElement.querySelector('#effect-chrome');
const pictureEffectSepia = pictureModalElement.querySelector('#effect-sepia');
const pictureEffectMarvin = pictureModalElement.querySelector('#effect-marvin');
const pictureEffectPhobos = pictureModalElement.querySelector('#effect-phobos');
const pictureEffectHeat = pictureModalElement.querySelector('#effect-heat');
const effectDefaultValue = pictureModalElement.querySelector('#effect-none');


const hideSliderContainer = () => {
  effectSliderContainer.classList.add('hidden');
};

const showSliderContainer = () => {
  effectSliderContainer.classList.remove('hidden');
};

const removePicturePreviewStyle = () => {
  picturePreviewElement.removeAttribute('style');
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
    removePicturePreviewStyle();
    effectSliderContainer.classList.add('hidden');
    resetPictureZoomValue();
  }
};

effectSlider.noUiSlider.on ('update', () => {
  effectValue.setAttribute ('value', Number(effectSlider.noUiSlider.get(true)));
});


effectsList.addEventListener('change', onEffectsListChange);

export {hideSliderContainer, removePicturePreviewStyle};
