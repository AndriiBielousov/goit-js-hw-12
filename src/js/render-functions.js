import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btn = document.querySelector(".js-btn");

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

function createGallery(images) {
  const markup = images
    .map(
      image => `
<li class="gallery-item">
<a class="gallery-link" href="${image.largeImageURL}">
<img class="gallery-image"
src="${image.webformatURL}"
alt="${image.tags}"/></a>
<div class="info-box">
<p class="info">Likes - ${image.likes}</p>
<p class="info">Views - ${image.views}</p>
<p class="info">Comments - ${image.comments}</p>
<p class="info">Downloads - ${image.downloads}</p>
</div>
</li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function showLoadMoreButton() {
  btn.classList.remove("hidden");
}

function hideLoadMoreButton() {
  btn.classList.add("hidden");
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};