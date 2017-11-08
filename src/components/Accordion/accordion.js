/**
 * @name: Accordion
 */

import PinguComponent from '../../assets/js/helpers/PinguComponent';

class Accordion extends PinguComponent {
  constructor(el) {
    const defaultOpts = {
      classes: {
        dom: {
          item: '.accordion__item',
          trigger: '.accordion__trigger',
          panel: '.accordion__panel',
        },
        state: {
          open: 'open',
        },
      },
      customEvents: {},
      multipleOpen: false,
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
   *
   * @param {Node} triggered button
   */
  getMatchingElements(node) {
    return {
      item: node.parentNode,
      panel: node.nextElementSibling,
    };
  }
}

export default Accordion;
