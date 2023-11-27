// import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
import { showImageEditorForm, setImageUploadFormSubmit, onImageUploadCancelButtonClick } from './form.js';
import './server.js';
import { getData } from './server.js';
import { initializeFilter } from './filters.js';


getData()
  .then ((pictures) => {
    renderGallery(pictures);
    initializeFilter(pictures);
  });

showImageEditorForm();


setImageUploadFormSubmit(onImageUploadCancelButtonClick);

