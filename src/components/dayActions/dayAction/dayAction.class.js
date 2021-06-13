import { v4 as uuidv4 } from 'uuid';
import { simpleTag } from '../../../helper';
import template from './dayAction.template';

class DayAction {
  constructor({ id = uuidv4(), title = '', type, columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.columns = columns;
    this.template = template.render();
  }

  render() {
    const headding = template.createHeadding(this.title);
    const contentWrapper = template.createContentWrapper();
    this.columns.forEach((item) => {
      contentWrapper.appendChild(template.createContentItem(item));
    });
    const result = this.template;
    result.appendChild(headding);
    result.appendChild(contentWrapper);
    result.appendChild(
      simpleTag(
        {
          classTag: 'edit-button',
          tagName: 'button',
          advanced: { 'data-click': 'editActionEditForm', 'data-name': `${this.id}` },
        },
        'править'
      )
    );
    result.appendChild(
      simpleTag(
        {
          classTag: 'edit-button',
          tagName: 'button',
          advanced: { 'data-click': 'deleteActionForm', 'data-name': `${this.id}` },
        },
        'Удалить'
      )
    );
    return result;
  }
}

export default DayAction;
