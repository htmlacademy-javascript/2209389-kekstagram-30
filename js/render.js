import { getPictures } from './data.js';
//контейнер
const pictureContainer = document.querySelector('.pictures');
//содержимое шаблона
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
//записали картинки в переменную
const randomizedPictures = getPictures();

//создаем фрагмент для вставки
const pictureFragment = document.createDocumentFragment();

randomizedPictures.forEach(({url, description, likes, comments}) => {
//клон шаблона
  const pictureTemplateElement = pictureTemplate.cloneNode(true);
  pictureTemplateElement.querySelector('.picture__img').src = url;
  pictureTemplateElement.querySelector('.picture__img').alt = description;
  pictureTemplateElement.querySelector('.picture__likes').textContent = likes;
  pictureTemplateElement.querySelector('.picture__comments').textContent = comments.length;

  //добавляем элементы в фрагмент
  pictureFragment.appendChild(pictureTemplateElement);
});

const renderPictures = () => pictureContainer.appendChild(pictureFragment);

export {renderPictures};