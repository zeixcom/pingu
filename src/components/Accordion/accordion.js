/**
 * @name: Accordion
 */

import anime from 'animejs';
import ecr from 'element-client-rect';

import PinguComponent from '../../assets/js/helpers/PinguComponent';

class Accordion extends PinguComponent {
  constructor(el) {
    const defaultOpts = {
      classes: {
        dom: {
          item: '.accordion__item',
          trigger: '.accordion__trigger',
          panel: '.accordion__panel',
          panelContent: '.accordion__panel-content',
        },
        state: {
          open: 'open',
        },
      },
      customEvents: {},
      multipleOpen: false,
      animation: {
        duration: 500,
        easing: 'linear',
      },
    };

    const defaultData = {};

    super(el, defaultOpts, defaultData);

    this.initEventListeners();
  }

  /**
   * Initializing all the event listeners necessary for the accordion
   */
  initEventListeners() {
    this.addListener('triggerClick', this.nodes.trigger, 'click', (e) => {
      e.stopPropagation();

      this.togglePanel(e.target);
    });
  }

  /**
   * Toggling the panel
   * @param {Node} node
   */
  togglePanel(node) {
    const elements = this.getMatchingElements(node);
    const isOpen = this.hasModifier(this.options.classes.state.open, elements.item);

    if (!isOpen) {
      if (!this.options.multipleOpen) this.closeOpenPanel();

      this.openPanel(node, elements);
    } else {
      this.closePanel(node, elements);
    }
  }

  /**
   * Opening a panel
   * @param {Node} node
   * @param {object} elements a collection of the according panel and item
   */
  openPanel(node, elements) {
    this.addModifier(this.options.classes.state.open, elements.item);

    node.setAttribute('aria-expanded', true);
    elements.panel.setAttribute('aria-hidden', false);

    anime({
      targets: elements.panel,
      maxHeight: ecr(elements.panelContent).height,
      duration: this.options.animation.duration,
      easing: this.options.animation.easing,
    });
  }

  /**
   * Closing a panel
   * @param {Node} node
   * @param {elements} elements a collection of the according panel and item
   */
  closePanel(node, elements) {
    this.removeModifier(this.options.classes.state.open, elements.item);

    node.setAttribute('aria-expanded', false);
    elements.panel.setAttribute('aria-hidden', true);

    anime({
      targets: elements.panel,
      maxHeight: 0,
      duration: this.options.animation.duration,
      easing: this.options.animation.easing,
    });
  }

  /**
   * Searches for elements with open panel and closes them
   */
  closeOpenPanel() {
    const openPanels = this.getNodesByModifier(this.options.classes.state.open, 'item');

    openPanels.forEach((openPanel) => {
      const trigger = openPanel.querySelector(this.options.classes.dom.trigger);

      this.closePanel(trigger, this.getMatchingElements(trigger));
    });
  }

  /**
   * Get all elements necessary according to the triggered button
   * @param {Node} triggered button
   */
  getMatchingElements(node) {
    const item = node.parentNode;

    return {
      item,
      panel: item.querySelector(this.options.classes.dom.panel),
      panelContent: item.querySelector(this.options.classes.dom.panelContent),
    };
  }
}

export default Accordion;
