/**
 * Init all components
 *
 * @class PinguApp
 */

import bows from 'bows';

import Accordion from '../../../components/Accordion/accordion';
// autoimportcomponent

class PinguApp {
  constructor() {
    window.pingu = {
      logger: bows,
      components: {},
      debug: document.documentElement.classList.contains('dev'),
    };

    localStorage.debug = window.pingu.debug;

    this.components = {};

    this.components.Accordion = Accordion;
    // addcomponenttothis

    this.registerComponents();
  }

  registerComponents() {
    document.querySelectorAll('[data-pingu]').forEach((element) => {
      const pinguAttributes = element.getAttribute('data-pingu').split(' ');

      pinguAttributes.forEach((compName) => {
        const Component = this.components[compName];

        if (!window.pingu.components[compName]) {
          window.pingu.components[compName] = {
            proto: {},
            instances: {},
          };

          window.pingu.components[compName].proto = Component;
        }

        new Component(element);
      });
    });
  }
}

export default PinguApp;
