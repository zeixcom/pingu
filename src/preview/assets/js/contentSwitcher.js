export default class ContentSwitcher {
  /**
   * Creates an instance of ContentSwitcher.
   * @param {node} el the content switcher node
   * @memberof ContentSwitcher
   */
  constructor(el) {
    this.el = el;

    this.init();
    this.initListeners();

    this.setInitialState();
  }

  /**
   * init all the options, classes and node referenzes
   *
   * @memberof ContentSwitcher
   */
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

  /**
   * init all the event listeners
   *
   * @memberof ContentSwitcher
   */
  initListeners() {
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  /**
   * to set the inital state
   *
   * @memberof ContentSwitcher
   */
  setInitialState() {
    this.handleHashChange();
  }

  /**
   * on hashchange, shwo the correct item and update the site title
   *
   * @memberof Sidebar
   */
  handleHashChange() {
    const id = window.location.hash.split('#')[1];
    const currentItem = [...this.nodes.items].find(item => item.getAttribute('data-target') === id);

    if (currentItem) {
      const siteTitle = currentItem.getAttribute('data-target-title');
      this.updateSiteTitle(siteTitle);
      this.setShownItem(currentItem);
    }
  }

  /**
   *
   *
   * @param {string} title the current page title
   * @memberof ContentSwitcher
   */
  updateSiteTitle(title) {
    const span = document.createElement('span');
    span.textContent = title;
    span.classList.add('pew_title__sub-title-text');

    this.nodes.siteTitle.innerHTML = '';
    this.nodes.siteTitle.appendChild(span);

    setTimeout(() => {
      span.classList.add('pew_title__sub-title-text--shown');
    }, 50);
  }

  /**
   * to show the next item and hide all others
   *
   * @param {node} shownItem
   * @memberof ContentSwitcher
   */
  setShownItem(shownItem) {
    [...this.nodes.items].forEach((item) => {
      if (item !== shownItem) {
        item.setAttribute('aria-hidden', true);
        item.classList.remove(this.classes.state.itemShown);
      }
    });

    shownItem.setAttribute('aria-hidden', false);
    shownItem.classList.add(this.classes.state.itemShown);

    // always start at top after switch
    window.scrollTo(0, 0);
  }
}
