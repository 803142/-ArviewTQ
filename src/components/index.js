import Accordeon from './accordeon';
import Modal from './modal';
import Calendar from './calendar';
import DayActions from './dayActions';

class Components {
  constructor() {
    this.map = new Accordeon();
    this.modal = new Modal();
    this.calendar = new Calendar();
    this.dayActions = new DayActions();
  }
}

export default Components;
