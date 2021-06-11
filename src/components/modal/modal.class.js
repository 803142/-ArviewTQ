import Component from '../component';
import './modal.scss';

import modal from './modal.template';

class Modal extends Component {
  constructor(component) {
    super();
    this.modal = modal.render(component);
  }

  init(app) {
    this.app = app;
    this.events.addEventList('openedModal', [this.addToDomModal.bind(this)]);
    this.events.addEventList('closedModal', [this.remooveModalFromDom.bind(this)]);
  }

  addToDomModal() {
    this.app.appendChild(this.modal);
  }

  remooveModalFromDom() {
    this.modal.remove();
    this.events.removeEvent('openedModal');
    this.events.removeEvent('closedModal');
  }
}
export default Modal;
