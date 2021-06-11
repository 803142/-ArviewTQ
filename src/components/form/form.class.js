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
    this.events.addEventList('submitActionForm', [this.submitForm.bind(this)]);
    this.events.addEventList('inputActionForm', [this.inputInForm.bind(this)]);
    this.events.addEventList('selectTypeActionForm', [this.selectTypeActionForm.bind(this)]);
  }

  render(app) {
    this.app = app;
  }

  createActionCreateForm() {
    this.draftAction = new DayAction();
    const modal = new Modal('form');
    modal.init(this.app);
    const componentPlace = modal.modal;
    this.formComponentPlace = qs('[data-component="form"]', componentPlace);
    this.formComponentPlace.replaceWith(this.template);
    const typeOptions = qs('[name="type"]', this.template);
    Object.entries(this.state.data.baseData.dataTypes).forEach((type) => {
      const [name, data] = type;
      const option = simpleTag({ tagName: 'option', advanced: { value: name } }, data.ru);
      typeOptions.appendChild(option);
    });
    this.events.dispatchEvent('openedModal');
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
    console.log(valueO);
  }

  selectTypeActionForm([type]) {
    // const newAction = new DayAction();
    const { form } = document.forms;
    const additionalInfo = qs('.data-atributes', form);
    const newAdditionalInfo = simpleTag({ classTag: 'data-atributes' });
    const { dataTypes } = this.state.data.baseData;
    const additionalTypeInfo = dataTypes[type].options;
    Object.entries(additionalTypeInfo).forEach((item) => {
      const [name, options] = item;
      const label = simpleTag({ tagName: 'label' }, options.ru);
      const input = simpleTag({
        tagName: 'input',
        classTag: 'input',
        advanced: { name, type: options.type },
      });
      newAdditionalInfo.appendChild(label);
      newAdditionalInfo.appendChild(input);
    });
    additionalInfo.replaceWith(newAdditionalInfo);
  }

  submitForm() {
    const { form } = document.forms;
    this.form = form;
    const valueO = [...form.elements]
      .filter((el) => el.nodeName === 'INPUT' || el.nodeName === 'SELECT')
      .map((filtered) => {
        const { value, name } = filtered;
        if (value < 4) return false;
        return { value, name };
      });
    console.log(valueO);
  }

  editActionEditForm([id]) {
    const dataAll = this.state.storage;
    const title = `${this.state.storage.day}-${this.state.storage.data}`;
    if (dataAll[title]) this.draftAction = dataAll[title].find((action) => action.id === id);
    this.events.dispatchEvent('openedModal');
  }
}
export default Form;
