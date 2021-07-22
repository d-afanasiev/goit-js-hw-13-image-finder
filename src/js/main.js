import { Notify } from 'notiflix';

import ApiService from './apiService';
import cards from '../partials/cards';
import LoadMoreBtn from './load-more-btn';

import * as basicLightbox from 'basiclightbox';

const refs = {
  formSearch: document.querySelector('.search-form'),
  containerGallery: document.querySelector('.gallery'),
  gallery: document.querySelector('.gallery'),
  arrowTop: document.querySelector('.arrow-top'),
  wrapperGallery: document.querySelector('.wrapper'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-value="load-more"]', hidden: true });
const apiService = new ApiService();

refs.formSearch.addEventListener('submit', onSubmit);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  loadMoreBtn.show();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  clearContainer();

  loadMoreBtn.disable();
  apiService
    .fetchImages()
    .then(data => {
      if (!data) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return loadMoreBtn.hide();
      }
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      appendGallery(data.hits);
      loadMoreBtn.enable();

      if (data.length === 0 || data.totalImageShow >= data.totalHits) {
        loadMoreBtn.hide();
      }
    })
    .catch(error => {
      errorMessage(error);
      loadMoreBtn.hide();
    });
}

function onLoadMore() {
  loadMoreBtn.disable();
  apiService
    .fetchImages()
    .then(data => {
      appendGallery(data.hits);
      loadMoreBtn.enable();
      if (data.totalImageShow >= data.totalHits) {
        loadMoreBtn.hide();
      }
      return data;
    })
    .then(data => {
      scrollIntoView(data);
    })
    .catch(error => {
      errorMessage(error);
      loadMoreBtn.hide();
    });
}

function appendGallery(result) {
  refs.containerGallery.insertAdjacentHTML('beforeend', cards(result));
}

function scrollIntoView(data) {
  let hitsLength = data.hits.length;
  if (hitsLength === 1) {
    hitsLength += 1;
  }
  let galleryItem = document.querySelectorAll('.gallery-item');
  let indexGalleryItem = galleryItem.length - (hitsLength - 1);
  galleryItem[indexGalleryItem].scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function clearContainer() {
  refs.containerGallery.innerHTML = '';
}

function errorMessage(message) {
  Notify.failure(message);
}

refs.containerGallery.addEventListener('click', showBigImage);

function showBigImage(e) {
  let currentImage = e.target.dataset.src;
  if (e.target.className === 'gallery-image') {
    const instance = basicLightbox.create(`
    <img src=${currentImage} width="800" height="600">
    `);

    instance.show();
  }

  return;
}

function arrowScrollTop() {
  if (window.scrollY > 50) {
    refs.arrowTop.classList.add('arrow-show');
    refs.arrowTop.classList.remove('arrow-hidden');
  } else {
    refs.arrowTop.classList.add('arrow-hidden');
    refs.arrowTop.classList.remove('arrow-show');
  }

  refs.arrowTop.addEventListener('click', () => {
    refs.wrapperGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

window.addEventListener('scroll', arrowScrollTop);
