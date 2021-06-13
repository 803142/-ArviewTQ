import { simpleTag } from '../../../helper';

const template = {
  createHeadding(heading) {
    return simpleTag({ classTag: 'heading' }, heading);
  },
  createContentWrapper() {
    return simpleTag({ classTag: 'description' });
  },
  createContentItem(item) {
    if (item) {
      const [[, value], [, ru]] = Object.entries(item);
      return simpleTag({ classTag: 'paragraph' }, `${ru}:${value}`);
    }
    return false;
  },
  render() {
    return simpleTag({ classTag: 'accordeon-article' });
  },
};

export default template;
