import { simpleTag } from '../../helper';

const modal = {
  modalTemplate: `<div class="modal-owerlay" data-click="closedContactFormModal">
    <div class="modal-window" data-click="preventClosedContactFormModal">

    </div>
  </div>  `,
  render() {
    return simpleTag({ classTag: 'modal-simple show' }, this.modalTemplate);
  },
};

export default modal;
