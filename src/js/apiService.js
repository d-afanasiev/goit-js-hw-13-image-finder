export default class ApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchImages() {
    const url = `https://pixabay.com/api/?key=22136016-e39418b2246c5d0d9deda411e&q=${this.searchQuery}&per_page=12&page=1`;
    fetch(url)
      .then(result => result.json())
      .then(console.log);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
