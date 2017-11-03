/**
 * Init all components
 *
 * @class PinguApp
 */

import bows from 'bows';

import Bridge from '../../../components/Bridge/bridge';
// autoimportcomponent

class PinguApp {
  constructor() {
    window.pingu = {
      logger: bows,
      components: {},
    };

    localStorage.debug = true;

    this.components = {};

    this.components.Bridge = Bridge;
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
