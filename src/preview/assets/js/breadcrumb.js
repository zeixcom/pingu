// import anime from 'animejs';
import ecr from 'element-client-rect';

export default class Breadcrumb {
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
        trigger: 'pew_breadcrumb__trigger',
        item: 'pew_breadcrumb__item',
        panel: 'pew_breadcrumb__panel',
      },
      state: {
        triggerActive: 'pew_breadcrumb__trigger--active',
        panelShown: 'pew_breadcrumb__panel--shown',
        panelsOpen: 'pew_breadcrumb__panels--open',
      },
    };

    this.nodes = {
      triggers: this.el.querySelectorAll(`.${this.classes.dom.trigger}`),
      panels: this.el.querySelectorAll(`.${this.classes.dom.panel}`),
      panelWrapper: this.el.querySelector(`.${this.classes.dom.panel}s`),
    };
  }

  initListeners() {
    this.nodes.triggers.forEach((trigger, index) => {
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

  setInitialState() {}

  show(shownIndex) {
    const panel = this.nodes.panels[shownIndex];
    const trigger = this.nodes.triggers[shownIndex];
    const panelStyle = window.getComputedStyle(panel);

    // hide other triggers bzw panels
    this.nodes.triggers.forEach((element, index) => {
      if (index !== shownIndex) this.hide(index);
    });

    panel.classList.add(this.classes.state.panelShown);
    trigger.classList.add(this.classes.state.triggerActive);

    const maxHeight = ecr(panel).height
                      + parseInt(panelStyle.marginBottom, 10)
                      + parseInt(panelStyle.marginTop, 10);

    this.nodes.panelWrapper.style.maxHeight = maxHeight;
  }

  hide(index) {
    const panel = this.nodes.panels[index];
    const trigger = this.nodes.triggers[index];

    panel.classList.remove(this.classes.state.panelShown);
    trigger.classList.remove(this.classes.state.triggerActive);
  }
}