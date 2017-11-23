import SITE_TITLES from './data/siteTitles';

export default class ContentSwitcher {
  constructor(el) {
    this.el = el;

    this.init();
    this.initListeners();

    this.setInitialState();
  }

  init() {
    this.options = {};

    this.classes = {
      dom: {
        item: 'pew_content__item',
      },
      state: {
        itemShown: 'pew_content__item--shown',
      },
    };

    this.nodes = {
      items: this.el.querySelectorAll(`.${this.classes.dom.item}`),
      siteTitle: document.querySelector('.pew_title__sub-title'),
    };
  }

  initListeners() {
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  setInitialState() {
    this.handleHashChange();
  }

  handleHashChange() {
    const id = window.location.hash.split('#')[1];
    const currentItem = [...this.nodes.items].find(item => item.getAttribute('data-target') === id);

    if (currentItem) {
      this.updateSiteTitle(id);
      this.setShownItem(currentItem);
    }
  }

  updateSiteTitle(id) {
    const span = document.createElement('span');
    span.textContent = SITE_TITLES[id];
    span.classList.add('pew_title__sub-title-text');

    this.nodes.siteTitle.innerHTML = '';
    this.nodes.siteTitle.appendChild(span);

    setTimeout(() => {
      span.classList.add('pew_title__sub-title-text--shown');
    }, 50);
  }

  setShownItem(shownItem) {
    [...this.nodes.items].forEach((item) => {
      item.setAttribute('aria-hidden', true);
      item.classList.remove(this.classes.state.itemShown);
    });

    shownItem.setAttribute('aria-hidden', false);
    shownItem.classList.add(this.classes.state.itemShown);
  }
}
