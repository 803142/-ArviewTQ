import Component from '../component';
import './form.scss';
import { qs, simpleTag } from '../../helper';

import template from './form.template';
import Modal from '../modal/modal.class';
import DayAction from '../dayActions/dayAction/dayAction.class';

class Form extends Component {
  constructor() {
    super();
    this.template = template.render();
  }

  init() {
    this.events.addEventList('createActionCreateForm', [this.createActionCreateForm.bind(this)]);
    this.events.addEventList('editActionEditForm', [this.editActionEditForm.bind(this)]);
    this.events.addEventList('editOptionsActionForm', [this.editOptionsActionForm.bind(this)]);
    this.events.addEventList('submitActionForm', [this.submitForm.bind(this)]);
    this.events.addEventList('inputActionForm', [this.inputInForm.bind(this)]);
    this.events.addEventList('selectTypeActionForm', [this.selectTypeActionForm.bind(this)]);
    this.events.addEventList('setStartOptions', [this.startValueOptions.bind(this)]);
    this.events.addEventList('deleteActionForm', [this.deleteActionForm.bind(this)]);
    this.events.addEventList('setStartTypeValue', [this.setStartTypeValue.bind(this)]);
  }

  render(app) {
    this.app = app;
  }

  createActionCreateForm([item]) {
    this.draftAction = new DayAction(item);
    const modal = new Modal('form');
    modal.init(this.app);
    const componentPlace = modal.modal;
    this.formComponentPlace = qs('[data-component="form"]', componentPlace);
    this.formComponentPlace.replaceWith(this.template);
    const title = qs('[name="title"]', this.template);
    if (item) title.value = this.draftAction.title;
    const typeOptions = qs('[name="type"]', this.template);
    const newTypeOptions = simpleTag({
      tagName: 'select',
      classTag: 'input',
      advanced: { name: 'type', 'data-change': 'selectTypeActionForm' },
    });
    Object.entries(this.state.data.baseData.dataTypes).forEach((type, index) => {
      const [name, data] = type;
      const option = simpleTag({ tagName: 'option', advanced: { value: name } }, data.ru);
      if (index === 0) {
        option.selected = true;
      }
      newTypeOptions.appendChild(option);
    });
    typeOptions.replaceWith(newTypeOptions);
    this.events.dispatchEvent('openedModal');
    this.events.dispatchEvent('selectTypeActionForm');
  }

  inputInForm() {
    const { form } = document.forms;
    this.form = form;
    const valueO = [...form.elements]
      .filter((el) => el.nodeName === 'INPUT' || el.nodeName === 'SELECT')
      .map((filtered) => {
        const { value, name } = filtered;
        return [value, name];
      });
    valueO.forEach((item) => {
      const [value, name] = item;
      this.draftAction[name] = value;
    });
  }

  selectTypeActionForm([type]) {
    const { form } = document.forms;
    const typeSelected = type || form.elements.type.value;
    const additionalInfo = qs('.data-atributes', form);
    const newAdditionalInfo = simpleTag({ classTag: 'data-atributes' });
    const { dataTypes } = this.state.data.baseData;
    const additionalTypeInfo = dataTypes[typeSelected].options;
    this.draftAction.type = type;
    this.draftAction.columns = [];
    Object.entries(additionalTypeInfo).forEach((item) => {
      const [name, options] = item;
      const itemO = {};
      itemO[name] = '-';
      itemO.ru = options.ru;
      this.draftAction.columns.push(itemO);
      const label = simpleTag({ tagName: 'label' }, options.ru);
      const input = simpleTag({
        tagName: 'input',
        classTag: 'input',
        advanced: {
          name,
          type: options.type,
          'data-input': 'editOptionsActionForm',
          'data-name': `${this.draftAction.id}`,
        },
      });
      newAdditionalInfo.appendChild(label);
      newAdditionalInfo.appendChild(input);
    });
    additionalInfo.replaceWith(newAdditionalInfo);
  }

  submitForm() {
    const { form } = document.forms;
    if (!form.elements.type.value) return;
    const date = `${this.state.storage.day}-${this.state.storage.data}`;
    const { dataAll } = this.state.storage;
    if (!dataAll[date]) dataAll[date] = [];
    let edditted = dataAll[date].find((item) => item.id === this.draftAction.id);
    if (edditted) {
      edditted = { ...this.draftAction };
    } else {
      dataAll[date] = [...dataAll[date], this.draftAction];
    }
    this.template = template.render();
    this.events.dispatchEvent('closedModal');
    this.events.dispatchEvent('setDataCalendar');
  }

  editActionEditForm([id]) {
    const item = this.findById(id);
    this.draftAction = item;
    this.events.dispatchEvent('createActionCreateForm', item);
    this.events.dispatchEvent('setStartTypeValue', item.type);
    this.events.dispatchEvent('setStartOptions', item.id);
  }

  editOptionsActionForm([id]) {
    const { form } = document.forms;
    this.form = form;
    const currentActive = this.findById(id);
    currentActive.columns.forEach((item) => {
      const [[name]] = Object.entries(item);
      const val = this.form.elements[name].value;
      const index = this.draftAction.columns.find((option) => option[name]);
      if (index) index[name] = val;
    });
  }

  setStartTypeValue([type]) {
    const { form } = document.forms;
    const additionalInfo = qs('.data-atributes', form);
    const newAdditionalInfo = simpleTag({ classTag: 'data-atributes' });
    const { dataTypes } = this.state.data.baseData;
    const additionalTypeInfo = dataTypes[type].options;
    Object.entries(additionalTypeInfo).forEach((item) => {
      const [name, options] = item;
      const neededOption = this.draftAction.columns.find((opt) => opt[`${name}`] === name);
      const label = simpleTag({ tagName: 'label' }, options.ru);
      const input = simpleTag({
        tagName: 'input',
        classTag: 'input',
        advanced: {
          name,
          type: options.type,
          value: `${neededOption}`,
          'data-input': 'editOptionsActionForm',
          'data-name': `${this.draftAction.id}`,
        },
      });
      newAdditionalInfo.appendChild(label);
      newAdditionalInfo.appendChild(input);
    });
    additionalInfo.replaceWith(newAdditionalInfo);
  }

  startValueOptions([id]) {
    const { form } = document.forms;
    const currentActive = this.findById(id);
    currentActive.columns.forEach((item) => {
      const [[name, value]] = Object.entries(item);
      form.elements[name].value = value;
    });
  }

  deleteActionForm([id]) {
    const { dataAll } = this.state.storage;
    const date = `${this.state.storage.day}-${this.state.storage.data}`;
    dataAll[date] = [...dataAll[date].filter((item) => item && item.id !== id)];
    this.events.dispatchEvent('setDataCalendar');
  }

  findById(id) {
    const date = `${this.state.storage.day}-${this.state.storage.data}`;
    const { dataAll } = this.state.storage;
    const currentActive = dataAll[date].find((item) => item.id === id);
    return currentActive;
  }
}
export default Form;
