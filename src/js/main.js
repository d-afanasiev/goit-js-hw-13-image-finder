import ApiService from './apiService';
import cards from '../partials/cards';

const refs = {
  formSearch: document.querySelector('.search-form'),
  containerGallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('[data-value="load-more"]'),
  gallery: document.querySelector('.gallery'),
};

const apiService = new ApiService();

refs.formSearch.addEventListener('submit', onSubmit);

refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchImages().then(appendGallery);
}

function onLoadMore() {
  apiService.fetchImages().then(appendGallery);
  setTimeout(scrollIntoView, 500);
}

function appendGallery(result) {
  refs.containerGallery.insertAdjacentHTML('beforeend', cards(result));
}

function scrollIntoView() {
  refs.containerGallery.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  });
}
