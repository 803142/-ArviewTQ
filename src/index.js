import './style.scss';
import './assets/fonts/fonts.scss';
import './favicon.ico';
import { APPCONTAINERCLASS, BODYTAG } from './constants/app-constants';
import App from './app';

import { simpleTag, qs } from './helper';

window.onload = () => {
  let appTag = qs(`${APPCONTAINERCLASS}`);

  if (!appTag) {
    appTag = simpleTag({
      classTag: `${APPCONTAINERCLASS}`,
    });

    qs(BODYTAG).insertAdjacentElement('afterbegin', appTag);
  }

  const app = new App(appTag);
  app.init();
  app.render();
  app.start();
};
