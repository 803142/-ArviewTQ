import Component from '../component';
import './calendar.scss';
import { qs, qsAll } from '../../helper';

import template from './calendar.template';

class Calendar extends Component {
  constructor(componentPlace) {
    super();
    this.template = template.render();
    this.calendarComponentPlace = qs('[data-component="calendar"]', componentPlace);
  }

  init() {
    this.events.addEventList('nextMonthCalendar', [this.nextMonth.bind(this)]);
    this.events.addEventList('prevMonthCalendar', [this.prevMonth.bind(this)]);
    this.events.addEventList('setDataCalendar', [this.setData.bind(this)]);
  }

  render() {
    this.calendarComponentPlace.appendChild(this.template);
    this.dataTag = qs(` thead td:nth-child(2)`, this.template);
    this.input = qs(` input`, this.template);
    this.input.valueAsDate = new Date();
    this.drawCalendar(new Date().getFullYear(), new Date().getMonth());
    this.active = qs(`.active`, this.template);
  }

  nextMonth() {
    this.drawCalendar(this.dataTag.dataset.year, +this.dataTag.dataset.month + 1);
  }

  prevMonth() {
    this.drawCalendar(this.dataTag.dataset.year, +this.dataTag.dataset.month - 1);
  }

  setData([data]) {
    if (data) {
      const newActive = qs(`[data-name="${data}"]`, this.template);
      if (newActive) newActive.classList.toggle('active');
      if (this.active) this.active.classList.toggle('active');
      this.active = newActive;
      const { dataO } = this.state.storage;
      const D = new Date(dataO.getFullYear(), dataO.getMonth(), +data + 1);
      this.input.valueAsDate = D;
    } else {
      const { value } = this.input;
      const valueO = new Date(value);
      this.drawCalendar(valueO.getFullYear(), valueO.getMonth());
      this.events.dispatchEvent('setDataDayActions', [valueO.getDate()]);
    }
    this.state.toLocalStorage();
  }

  drawCalendar(year, month) {
    const Dlast = new Date(year, month + 1, 0).getDate();
    this.D = new Date(year, month, Dlast);
    const DNlast = new Date(this.D.getFullYear(), this.D.getMonth(), Dlast).getDay();
    const DNfirst = new Date(this.D.getFullYear(), this.D.getMonth(), 1).getDay();
    let calendar = '<tr>';
    const dayFormatted = `${this.state.data.month[this.D.getMonth()]} ${this.D.getFullYear()}`;
    if (DNfirst !== 0) {
      for (let i = 1; i < DNfirst; i += 1) calendar += '<td>';
    } else {
      for (let i = 0; i < 6; i += 1) calendar += '<td>';
    }
    for (let i = 1; i <= Dlast; i += 1) {
      let className = '';
      if (
        i === new Date().getDate() &&
        this.D.getFullYear() === new Date().getFullYear() &&
        this.D.getMonth() === new Date().getMonth()
      ) {
        className += 'today active';
      }
      const { dataAll } = this.state.storage;
      if (dataAll && dataAll[`${i}-${dayFormatted}`] && dataAll[`${i}-${dayFormatted}`].length) {
        className += ' not-empty';
      }

      calendar += `<td class="${className}" data-click="setDataDayActions" data-name="${i}">${i}`;
      if (new Date(this.D.getFullYear(), this.D.getMonth(), i).getDay() === 0) {
        calendar += '<tr>';
      }
    }
    for (let i = DNlast; i < 7; i += 1) calendar += '<td>&nbsp;';
    qs(` tbody`, this.template).innerHTML = calendar;

    this.dataTag.innerHTML = dayFormatted;
    this.dataTag.dataset.month = this.D.getMonth();
    this.dataTag.dataset.year = this.D.getFullYear();
    if (qsAll(` tbody tr`, this.template).length < 6) {
      qs(` tbody`, this.template).innerHTML +=
        '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
    this.state.storage.data = dayFormatted;
    this.state.storage.dataO = this.D;
  }
}
export default Calendar;
