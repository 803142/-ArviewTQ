import { simpleTag } from '../../helper';

const template = {
  calendarTemplate: `<input class="input" type="date" name="date" id="date" data-change="setDataCalendar">
  <table class="aside_calendar" >
  <thead>
    <tr><td><span class="action-button" data-click="prevMonthCalendar">‹</span>
    <td colspan="5"><td>
    <span class="action-button" data-click="nextMonthCalendar">›</span>
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
  <tbody>
</table>`,
  render() {
    return simpleTag({ classTag: 'calendar-component' }, this.calendarTemplate);
  },
};

export default template;
