// import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
import { showImageEditorForm, setImageUploadFormSubmit, hideImageEditorForm } from './form.js';
import './server.js';
import { getData } from './server.js';

// console.log(getPictures());

getData().then ((pictures) => {
  renderGallery(pictures);
});


showImageEditorForm();


setImageUploadFormSubmit(hideImageEditorForm);
