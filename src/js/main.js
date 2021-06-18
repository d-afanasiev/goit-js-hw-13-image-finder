import ApiService from './apiService';

const refs = {
  formSearch: document.querySelector('.search-form'),
  containerGallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('[data-value="load-more"]'),
};

const apiService = new ApiService();

refs.formSearch.addEventListener('submit', onSubmit);

refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  console.log(apiService.query);
  apiService.fetchImages();
}

function onLoadMore() {
  apiService.fetchImages();
}
