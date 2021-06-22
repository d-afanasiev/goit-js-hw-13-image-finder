export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=22136016-e39418b2246c5d0d9deda411e&q=${this.searchQuery}&per_page=12&page=${this.page}`;
    return fetch(url)
      .then(result => result.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
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
