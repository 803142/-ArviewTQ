const simpleTag = (elementInfo = {}, dynamicData) => {
  const { tagName = 'div', classTag = 'block', content, advanced } = elementInfo;
  const tag = document.createElement(tagName);
  const advancedProperties = ([name, value]) => {
    tag.setAttribute(name, value);
  };

  tag.className = classTag;
  if (advanced) {
    Object.entries(advanced).forEach(advancedProperties);
  }
  if (content) {
    tag.innerHTML = content;
  }
  if (dynamicData) {
    tag.innerHTML = dynamicData;
  }
  return tag;
};

const importAll = (r) => r.keys().map((req) => req);

const findTarget = (target, lookingAction) => {
  let pointTarget = target;
  while (pointTarget) {
    if (pointTarget.dataset) {
      if (pointTarget.dataset[lookingAction]) {
        const action = pointTarget.dataset[lookingAction];
        const { name } = pointTarget.dataset;
        if (action) return { action, name };
      }
    }
    pointTarget = pointTarget.parentNode;
  }
  return false;
};

const qs = (selector, scope) => (scope || document).querySelector(selector);

const qsAll = (selector, scope) => (scope || document).querySelectorAll(selector);

export { simpleTag, importAll, findTarget, qs, qsAll };
