/**
 * Init all components
 *
 * @class PinguApp
 */


import Bridge from '../../../components/Bridge/bridge';
// autoimportcomponent

class PinguApp {
  constructor() {
    this.components = {};

    this.components.Bridge = Bridge;
    // addcomponenttothis

    this.registerComponents();
  }

  registerComponents() {
    document.querySelectorAll('[data-pingu]').forEach((element) => {
      const compName = element.getAttribute('data-pingu');
      const Component = this.components[compName];

      new Component();
    });
  }
}

export default PinguApp;
