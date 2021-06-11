import { simpleTag } from '../../helper';

const modal = {
  modalTemplate(component) {
    return `<div class="modal-owerlay" data-click="closedModal">
    <div class="modal-window" data-click="preventClosedContactFormModal">
    <div data-component = "${component}"></div>
    </div>
  </div>  `;
  },
  render(component) {
    return simpleTag({ classTag: 'modal-simple show' }, this.modalTemplate(component));
  },
};

export default modal;
