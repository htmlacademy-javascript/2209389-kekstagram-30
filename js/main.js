// import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
import { showImageEditorForm, setImageUploadFormSubmit, hideImageEditorForm } from './form.js';
import './server.js';
import { getData } from './server.js';
import { initFilter } from './filters.js';


getData()
  .then ((pictures) => {
    renderGallery(pictures);
    initFilter(pictures);
  });

showImageEditorForm();


setImageUploadFormSubmit(hideImageEditorForm);

