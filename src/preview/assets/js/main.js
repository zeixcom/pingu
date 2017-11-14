import merge from 'lodash/merge';

require('prismjs/prism');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-yaml');
require('prismjs/plugins/toolbar/prism-toolbar');
require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard');

const SITE_TITLES = {
  pages: 'Pages',
  components: 'Components',
  styleguide: 'Styleguide',
};

class Sidebar {
  constructor(el) {
    this.el = el;

    this.init();
    this.initListeners();

    this.setInitialState();
  }

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

  initListeners() {
    this.nodes.collapse.addEventListener('click', e => this.handleCollapse(e));

    this.nodes.links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const item = link.parentNode;

        if (item.classList.contains(this.classes.state.active)) {
          e.preventDefault();
        }
      });
    });

    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  setInitialState() {
    if (this.options.isCollapsed) {
      this.collapse();
    }

    this.handleHashChange();

    setTimeout(() => {
      this.el.classList.remove(this.classes.state.noTransition);
    }, 0);
  }

  handleCollapse(e) {
    e.preventDefault();

    if (this.el.classList.contains(this.classes.state.collapsed)) {
      this.expand();
    } else {
      this.collapse();
    }

    this.updateLocalStorage();
  }

  collapse() {
    this.el.classList.add(this.classes.state.collapsed);
    this.options.isCollapsed = true;
  }

  expand() {
    this.el.classList.remove(this.classes.state.collapsed);
    this.options.isCollapsed = false;
  }

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

  handleHashChange() {
    const activeItem = [...this.nodes.items].find(item => item.firstElementChild.getAttribute('href') === window.location.hash);

    if (activeItem) {
      this.setActiveItem(activeItem);
    }
  }

  setActiveItem(item) {
    [...item.parentNode.children].forEach(el => el.classList.remove(this.classes.state.active));
    item.classList.add(this.classes.state.active);
  }
}

class ContentSwitcher {
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
      siteTitle: document.querySelector('.pew_title__site'),
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
    const currentItem = [...this.nodes.items].find(item => item.getAttribute('id') === id);

    if (currentItem) {
      this.updateSiteTitle(id);
      this.setShownItem(currentItem);
    }
  }

  updateSiteTitle(id) {
    const span = document.createElement('span');
    span.textContent = SITE_TITLES[id];
    span.classList.add('pew_title__site-title');

    this.nodes.siteTitle.innerHTML = '';
    this.nodes.siteTitle.appendChild(span);

    setTimeout(() => {
      span.classList.add('pew_title__site-title--shown');
    }, 50);
  }

  setShownItem(shownItem) {
    [...this.el.children].forEach((item) => {
      item.setAttribute('aria-hidden', true);
      item.classList.remove(this.classes.state.itemShown);
    });

    shownItem.setAttribute('aria-hidden', false);
    shownItem.classList.add(this.classes.state.itemShown);
  }
}

const sidebar = document.querySelector('.pew_sidebar');
const contentSwitcher = document.querySelector('.pew_content');

new Sidebar(sidebar);
new ContentSwitcher(contentSwitcher);

if (window.location.hash === '') {
  window.location.hash = 'pages';
}
