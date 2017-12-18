// import anime from 'animejs';
import ecr from 'element-client-rect';

export default class Breadcrumb {
  /**
   * Creates an instance of Breadcrumb.
   * @param {node} el the breadcrumb node
   * @memberof Breadcrumb
   */
  constructor(el) {
    this.el = el;

    this.init();
    this.initListeners();
  }

  /**
   * init all the options, classes and node referenzes
   *
   * @memberof Breadcrumb
   */
  init() {
    this.options = {};

    this.classes = {
      dom: {
        panelTrigger: 'pew_breadcrumb__panel-trigger',
        item: 'pew_breadcrumb__item',
        panel: 'pew_breadcrumb__panel',
      },
      state: {
        triggerActive: 'pew_breadcrumb__panel-trigger--active',
        panelShown: 'pew_breadcrumb__panel--shown',
        panelsOpen: 'pew_breadcrumb__panels--open',
      },
    };

    this.nodes = {
      panelTriggers: this.el.querySelectorAll(`.${this.classes.dom.panelTrigger}`),
      panels: this.el.querySelectorAll(`.${this.classes.dom.panel}`),
      panelWrapper: this.el.querySelector(`.${this.classes.dom.panel}s`),
    };
  }

  /**
   * init all the event listeners
   *
   * @memberof Breadcrumb
   */
  initListeners() {
    this.nodes.panelTriggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (trigger.classList.contains(this.classes.state.triggerActive)) {
          this.nodes.panelWrapper.style.maxHeight = '';
          this.hide(index);
        } else {
          this.show(index);
        }
      });
    });
  }

  /**
   * to show the detail panel of a breadcrumb item
   *
   * @param {number} shownIndex the index to show
   * @memberof Breadcrumb
   */
  show(shownIndex) {
    const panel = this.nodes.panels[shownIndex];
    const trigger = this.nodes.panelTriggers[shownIndex];
    const panelStyle = window.getComputedStyle(panel);

    // hide other triggers bzw panels
    this.nodes.panelTriggers.forEach((element, index) => {
      if (index !== shownIndex) this.hide(index);
    });

    panel.classList.add(this.classes.state.panelShown);
    trigger.classList.add(this.classes.state.triggerActive);

    const maxHeight = ecr(panel).height
                      + parseInt(panelStyle.marginBottom, 10)
                      + parseInt(panelStyle.marginTop, 10);

    this.nodes.panelWrapper.style.maxHeight = maxHeight;
  }

  /**
   * to hide an shown detail panel of a breadcrumb item
   *
   * @param {number} index the index to hide
   * @memberof Breadcrumb
   */
  hide(index) {
    const panel = this.nodes.panels[index];
    const trigger = this.nodes.panelTriggers[index];

    panel.classList.remove(this.classes.state.panelShown);
    trigger.classList.remove(this.classes.state.triggerActive);
  }
}
