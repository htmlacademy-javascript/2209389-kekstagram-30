//содержимое шаблона
const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');


const createThumbnail = ({ url, description, likes, comments, id}) => {
  //клон шаблона
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;

};

const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};


export {renderThumbnails};


