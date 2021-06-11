import { simpleTag } from '../../helper';

const template = {
  createControll() {
    return `
    <label for="title">Заголовок *</label>
    <input type="text" name="title" class="input" minlength="4" data-input="inputActionForm" required>
    <label for="type">Тип *</label>
    <select name="type" data-change="selectTypeActionForm">
    <option selected hidden required>
    </option>
    </select>
    <div class="data-atributes"></div>
    <button class="action-button">Добавить</button>`;
  },
  render() {
    return simpleTag(
      {
        classTag: 'form',
        tagName: 'form',
        advanced: { 'data-submit': 'submitActionForm', name: 'form' },
      },
      this.createControll()
    );
  },
};

export default template;
