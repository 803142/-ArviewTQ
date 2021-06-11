import Component from '../component';
import './dayActions.scss';
import { qs } from '../../helper';

import template from './dayActions.template';
import DayAction from './dayAction/dayAction.class';

class DayActions extends Component {
  constructor(componentPlace) {
    super();
    this.template = template.render();
    this.headding = template.createHeadding('');
    this.content = template.createContentWrapper();
    this.calendarComponentPlace = qs('[data-component="dayActions"]', componentPlace);
  }

  init() {
    this.events.addEventList('setDataDayActions', [this.setData.bind(this)]);
  }

  render() {
    this.calendarComponentPlace.appendChild(this.template);
    this.template.appendChild(this.headding);
    this.template.appendChild(this.content);
    if (!this.state.storage.day) {
      this.state.storage.day = new Date().getDay();
    }
    this.setData([this.state.storage.day]);
  }

  setData([day]) {
    this.state.storage.day = day;
    this.state.toLocalStorage();
    const headding = `${day}-${this.state.storage.data}`;
    const newHeadding = template.createHeadding(headding);
    this.headding.replaceWith(newHeadding);
    this.headding = newHeadding;
    this.events.dispatchEvent('setDataCalendar', day);
    this.drawData(headding);
  }

  drawData(data) {
    const dayData = this.state.storage.dataAll[data];
    const newContent = template.createContentWrapper();
    if (dayData) {
      dayData.forEach((item) => {
        const itemObject = new DayAction(item);
        newContent.appendChild(itemObject.render());
      });
    }
    this.content.replaceWith(newContent);
    this.content = newContent;
    this.events.dispatchEvent('accArticleNew');
  }
}
export default DayActions;
