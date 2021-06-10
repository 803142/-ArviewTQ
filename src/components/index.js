import Accordeon from './accordeon';
import Modal from './modal';
import Calendar from './calendar';

class Components {
  constructor() {
    this.map = new Accordeon();
    this.modal = new Modal();
    this.calendar = new Calendar();
  }
}

export default Components;
