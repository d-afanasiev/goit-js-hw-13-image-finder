import ApiService from './apiService';
import cards from '../partials/cards';
import LoadMoreBtn from './load-more-btn';

const refs = {
  formSearch: document.querySelector('.search-form'),
  containerGallery: document.querySelector('.gallery'),
  // btnLoadMore: document.querySelector('[data-value="load-more"]'),
  gallery: document.querySelector('.gallery'),
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

  fetchGallery();
}

function onLoadMore() {
  fetchGallery();
  setTimeout(scrollIntoView, 500);
}

function fetchGallery() {
  loadMoreBtn.disable();
  apiService.fetchImages().then(data => {
    appendGallery(data);
    loadMoreBtn.enable();
  });
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

function clearContainer() {
  refs.containerGallery.innerHTML = '';
}
