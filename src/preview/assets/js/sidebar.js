import merge from 'lodash/merge';

export default class Sidebar {
  /**
   * Creates an instance of Sidebar.
   * @param {node} el the sidebar node
   * @memberof Sidebar
   */
  constructor(el) {
    this.el = el;

    this.init();
    this.setInitialState();
    this.initListeners();
  }

  /**
   * init all the options, classes and node referenzes
   *
   * @memberof Sidebar
   */
  init() {
    const pewConfig = JSON.parse(localStorage.getItem('pew'));

    this.options = {
      isCollapsed: false,
    };

    if (pewConfig) {
      merge(this.options, pewConfig.sidebar);
    }

    this.classes = {
      dom: {
        collapse: 'pew_sidebar__collapse',
        item: 'pew_sidebar__item',
        link: 'pew_sidebar__link',
      },
      state: {
        collapsed: 'pew_sidebar--collapsed',
        active: 'pew_sidebar__item--active',
        noTransition: 'pew_sidebar--no-transitions',
      },
    };

    this.nodes = {
      collapse: this.el.querySelector(`.${this.classes.dom.collapse}`),
      items: this.el.querySelectorAll(`.${this.classes.dom.item}`),
      links: this.el.querySelectorAll(`.${this.classes.dom.link}`),
    };
  }

  /**
   * init all the event listeners
   *
   * @memberof Sidebar
   */
  initListeners() {
    this.nodes.collapse.addEventListener('click', e => this.handleCollapse(e));

    this.nodes.links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const item = link.parentNode;

        if (item.classList.contains(this.classes.state.active) && window.location.pathname === '/') {
          e.preventDefault();
        }
      });
    });

    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  /**
   * to set the inital state
   *
   * @memberof Sidebar
   */
  setInitialState() {
    if (this.options.isCollapsed) {
      this.collapse();
    }

    if (window.location.pathname === '/') {
      this.handleHashChange();
    } else {
      const componentItem = [...this.nodes.items].find(item => item.firstElementChild.getAttribute('href') === '/#components');
      this.setActiveItem(componentItem);
    }

    setTimeout(() => {
      this.el.classList.remove(this.classes.state.noTransition);
    }, 0);
  }

  /**
   * function to simply handle the button click to change the collapsed state
   *
   * @param {event} e
   * @memberof Sidebar
   */
  handleCollapse(e) {
    e.preventDefault();

    if (this.el.classList.contains(this.classes.state.collapsed)) {
      this.expand();
    } else {
      this.collapse();
    }

    this.updateLocalStorage();
  }

  /**
   * function to simply collapse the sidebar
   *
   * @memberof Sidebar
   */
  collapse() {
    this.el.classList.add(this.classes.state.collapsed);
    this.options.isCollapsed = true;
  }

  /**
   * function to simply expand the sidebar
   *
   * @memberof Sidebar
   */
  expand() {
    this.el.classList.remove(this.classes.state.collapsed);
    this.options.isCollapsed = false;
  }

  /**
   * to store the collapsed state of the sidebar, we need to update the localstorage
   *
   * @memberof Sidebar
   */
  updateLocalStorage() {
    let pewConfig = JSON.parse(localStorage.getItem('pew'));

    if (pewConfig) {
      pewConfig.sidebar.isCollapsed = this.options.isCollapsed;
    } else {
      pewConfig = {};
      pewConfig.sidebar = {
        isCollapsed: this.options.isCollapsed,
      };
    }

    localStorage.setItem('pew', JSON.stringify(pewConfig));
  }

  /**
   * on hashchange, set the correct item active
   *
   * @memberof Sidebar
   */
  handleHashChange() {
    const activeItem = [...this.nodes.items].find(item => item.firstElementChild.getAttribute('href').replace('/', '') === window.location.hash);

    if (activeItem) {
      this.setActiveItem(activeItem);
    }
  }

  /**
   * To set an item active, call this function
   *
   * @param {node} item the active item
   * @memberof Sidebar
   */
  setActiveItem(item) {
    [...item.parentNode.children].forEach(el => el.classList.remove(this.classes.state.active));
    item.classList.add(this.classes.state.active);
  }
}
