import { simpleTag } from '../../../helper';

const template = {
  createHeadding(heading) {
    return simpleTag({ classTag: 'heading' }, heading);
  },
  createContentWrapper() {
    return simpleTag({ classTag: 'description' });
  },
  createContentItem(item) {
    const [[name, value]] = Object.entries(item);
    return simpleTag({ classTag: 'paragraph' }, `${name}:${value}`);
  },
  render() {
    return simpleTag({ classTag: 'accordeon-article' });
  },
};

export default template;
