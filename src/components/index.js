import Accordeon from './accordeon';
import Calendar from './calendar';
import DayActions from './dayActions';
import Form from './form';

class Components {
  constructor() {
    this.map = new Accordeon();
    this.calendar = new Calendar();
    this.dayActions = new DayActions();
    this.form = new Form();
  }
}

export default Components;
