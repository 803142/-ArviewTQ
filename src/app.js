import Component from './components/component';
import Components from './components';
import { findTarget } from './helper';

class App extends Component {
  constructor(appTag) {
    super();
    this.app = appTag;
    this.components = new Components();
  }

  init() {
    this.state.setAppName(this.app.className);
    this.state.getLocalStorage();

    Object.keys(this.components).forEach((component) => this.components[component].init(this.app));
  }

  render() {
    Object.keys(this.components).forEach((component) =>
      this.components[component].render(this.app)
    );
  }

  start() {
    document.body.addEventListener('click', (clicked) => {
      const { target } = clicked;
      if (findTarget(target, 'click')) {
        const { action, name } = findTarget(target, 'click');
        this.events.dispatchEvent(`${action}`, `${name}`);
      }
    });
    document.body.addEventListener('input', (inputed) => {
      const { target } = inputed;
      if (target.dataset.input) {
        const { input, name } = target.dataset;
        this.events.dispatchEvent(`${input}`, `${name}`);
      }
    });
    document.body.addEventListener('change', (changed) => {
      const { target } = changed;
      if (target.dataset.change) {
        this.events.dispatchEvent(target.dataset.change, target.value);
      }
    });
    document.body.addEventListener('focusin', (focused) => {
      const { target } = focused;
      if (target.dataset.focusin) {
        this.events.dispatchEvent(target.dataset.focusin);
      }
    });
    document.body.addEventListener('focusout', (focused) => {
      const { target } = focused;
      if (target.dataset.focusout) {
        this.events.dispatchEvent(target.dataset.focusout);
      }
    });
    document.body.addEventListener('submit', (submited) => {
      submited.preventDefault();
      const { target } = submited;
      if (target.dataset.submit) {
        this.events.dispatchEvent(target.dataset.submit);
      }
    });
  }
}

export default App;
