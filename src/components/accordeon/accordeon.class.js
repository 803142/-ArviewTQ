import Component from '../component';
import { qs, qsAll } from '../../helper';

class Accordeon extends Component {
  constructor() {
    super();
    this.accordeons = [];
  }

  init() {
    this.accordeons = [...qsAll('[class*=_article-accordeon]')];
    this.events.addEventList('accArticleClicked', [this.chengeAccordeonState.bind(this)]);
  }

  render() {
    this.accordeons.forEach((el, accIndex) => {
      [...qsAll('[class*=accordeon-article]', el)].forEach((item, index) => {
        const tempItem = item;
        tempItem.dataset.click = 'accArticleClicked';
        tempItem.dataset.name = `accordeon-${accIndex}|${index}`;
        if (tempItem.className.match('active')) {
          tempItem.classList.toggle('active');
        }
        if (index === 0) {
          tempItem.classList.toggle('active');
          this.accordeons[accIndex] = tempItem;
        }
      });
    });
  }

  chengeAccordeonState(addressArr) {
    const [addressStr] = addressArr;
    const [, index] = addressStr.split('accordeon-');
    const [address] = index.split('|');
    const pointTarget = qs(`[data-name="${addressStr}"]`);
    this.accordeons[address].classList.toggle('active');
    this.accordeons[address] = pointTarget;
    pointTarget.classList.toggle('active');
  }
}
export default Accordeon;
