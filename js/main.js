import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
import { showImageEditorForm } from './form.js';

renderGallery(getPictures());
showImageEditorForm();
