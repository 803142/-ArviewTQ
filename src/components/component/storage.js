import * as baseData from '../../assets';

class Storage {
  constructor() {
    this.storage = {};
    this.appName = 'app';
    this.data = baseData;
  }

  toLocalStorage() {
    const myStorage = window.localStorage;
    myStorage.setItem(this.appName, JSON.stringify(this.storage));
  }

  getLocalStorage() {
    const myStorage = window.localStorage;
    const storage = myStorage[this.appName];
    if (storage) {
      this.storage = JSON.parse(storage);
      return true;
    }
    return this.data.baseData;
  }

  getStorage() {
    return this.storage;
  }

  setAppName(appName) {
    this.appName = `${appName}`;
  }
}

const storage = new Storage();

export default storage;
