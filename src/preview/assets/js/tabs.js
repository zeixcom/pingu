export default class Tabs {
  /**
   * Creates an instance of Tabs.
   * @param {node} el the tabs node
   * @memberof Tabs
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
   * @memberof Tabs
   */
  init() {
    this.options = {};

    this.classes = {
      dom: {
        tab: 'pew_tabs__tab',
        panel: 'pew_tabs__panel',
      },
      state: {
        tabActive: 'pew_tabs__tab--active',
        panelActive: 'pew_tabs__panel--active',
      },
    };

    this.nodes = {
      tabs: this.el.querySelectorAll(`.${this.classes.dom.tab}`),
      panels: this.el.querySelectorAll(`.${this.classes.dom.panel}`),
    };
  }

  /**
   * init all the event listeners
   *
   * @memberof Tabs
   */
  initListeners() {
    this.nodes.tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();

        if (!tab.classList.contains(this.classes.state.tabActive)) {
          this.setActiveTab(index);
        }
      });
    });
  }

  /**
   * to set the inital state
   *
   * @memberof Tabs
   */
  setInitialState() {
    this.setActiveTab(0);
  }

  /**
   * to set an tab inactive
   *
   * @param {number} index the index of the tab
   * @memberof Tabs
   */
  setInactiveTab(index) {
    const tab = this.nodes.tabs[index];
    const panel = this.nodes.panels[index];

    tab.setAttribute('aria-selected', false);
    tab.setAttribute('tabindex', -1);
    tab.classList.remove(this.classes.state.tabActive);

    panel.setAttribute('aria-hidden', true);
    panel.classList.remove(this.classes.state.panelActive);
  }

  /**
   * to set an tab active
   *
   * @param {number} activeIndex the index of the active tab
   * @memberof Tabs
   */
  setActiveTab(activeIndex) {
    [...this.nodes.tabs].forEach((tab, index) => {
      if (index !== activeIndex) {
        this.setInactiveTab(index);
      }
    });

    const tab = this.nodes.tabs[activeIndex];
    const panel = this.nodes.panels[activeIndex];

    tab.setAttribute('aria-selected', true);
    tab.setAttribute('tabindex', 0);
    tab.classList.add(this.classes.state.tabActive);

    panel.setAttribute('aria-hidden', false);
    panel.classList.add(this.classes.state.panelActive);
  }
}
