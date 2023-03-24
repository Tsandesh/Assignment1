class LocalStorageService {
  setToken(value, token) {
    localStorage.setItem(value, token);
  }

  getToken(value) {
    return localStorage.getItem(value);
  }

  deleteToken(value) {
    localStorage.clear(value);
  }

  hasToken(value) {
    return localStorage.getItem(value) !== null;
  }
}

export default new LocalStorageService();
