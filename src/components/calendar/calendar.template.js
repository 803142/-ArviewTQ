import { simpleTag } from '../../helper';

const template = {
  modalTemplate: `<input class="input" type="date" name="date" id="date" data-change="setData">
  <table class="aside_calendar" >
  <thead>
    <tr><td><span class="action-button" data-click="prevMonth">‹</span><td colspan="5"><td><span class="action-button" data-click="nextMonth">›</span>
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
  <tbody>
</table>`,
  render() {
    return simpleTag({ classTag: 'calendar-component' }, this.modalTemplate);
  },
};

export default template;
