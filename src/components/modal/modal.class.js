import Component from '../component';
import './modal.scss';

import modal from './modal.template';
import * as telInput from './lbr/input-tel.lbr';

class Modal extends Component {
  constructor() {
    super();
    this.telInput = telInput;
    this.accordeons = [];
  }

  init(app) {
    this.app = app;
    this.events.addEventList('openedContactFormModal', [this.addToDomModalForm.bind(this)]);
    this.events.addEventList('closedContactFormModal', [this.remooveModalFormFromDom.bind(this)]);
  }

  render() {
    this.modalForm = modal.render();
  }

  async addToDomModalForm() {
    this.app.appendChild(this.modalForm);
  }

  remooveModalFormFromDom() {
    this.modalForm.remove();
    this.modalForm = modal.render();
  }

  selectModalFormFromDom() {
    this.telInput.preventStartValueSelect();
  }
}
export default Modal;
