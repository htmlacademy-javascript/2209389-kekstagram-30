import { renderThumbnails } from "./render-thumbnails";

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
const thumbnail = evt.target.closest ('[data-thumbnail-id]');

if (! thumbnail) {
  return
}
evt.preventDefault();

const thumbnailId = +thumbnail.dataset.thumbnailId;
const pictureData = pictures.find(({id}) => id === thumbnailId);
// TODO: написать функцию
//const showPicture = (pictureData) => {};

  });
renderThumbnails(pictures, container)

};

export { renderGallery };
