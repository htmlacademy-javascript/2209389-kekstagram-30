import { renderThumbnails } from './render-thumbnails';
import { debounce } from './util';

const MAX_RANDOM_FILTER = 10;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const container = document.querySelector('.pictures');
const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');


const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));


const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,

  [FilterEnum.RANDOM]: (data) => {
    const indexes = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while(indexes.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!indexes.includes(index)) {
        indexes.push(index);
      }
    }
    return indexes.map((index) => data [index]);
  },
  [FilterEnum.DISCUSSED]:(data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};


const repaint = (event, filter, data) => {
  const filterData = filterHandlers[filter] (data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderThumbnails(filterData, container);
  const currentActiveEl = filterForm.querySelector('.img-filters__button--active');
  currentActiveEl.classList.remove('img-filters__button--active');
  event.target.classList.add('img-filters__button--active');
};


const debouncedRepaint = debounce (repaint);

const initializeFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (event) => {
    debouncedRepaint(event, FilterEnum.DISCUSSED, data);
  });
};
export {initializeFilter};
