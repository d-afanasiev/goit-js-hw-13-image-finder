const API_KEY = '22136016-e39418b2246c5d0d9deda411e';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalImageShow = 0;
    this.perPage = 40;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&per_page=${this.perPage}&page=${this.page}`;
    const fetchUrl = await fetch(url);
    const resultFetch = await fetchUrl.json();

    if (resultFetch.total === 0) {
      return false;
    }
    this.totalImageShow = this.perPage * this.page;
    const totalImageShow = this.totalImageShow;
    this.page += 1;

    return { ...resultFetch, totalImageShow };
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
