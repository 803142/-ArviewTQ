import { simpleTag } from '../../helper';

const template = {
  createHeadding(heading) {
    const h3 = `<h3 class="accordeon_heading_h3">${heading}</h3>`;
    return simpleTag({ classTag: 'article-accordeon_heading' }, h3);
  },
  createContentWrapper() {
    return simpleTag({ classTag: 'article-accordeon-content' });
  },
  render() {
    return simpleTag({ classTag: 'content_article-accordeon', tagName: 'article' });
  },
};

export default template;
