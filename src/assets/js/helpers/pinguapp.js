/**
 * Init all components
 *
 * @class PinguApp
 */


// autoimportcomponent

class PinguApp {
  constructor() {
    this.components = {};

    // addcomponenttothis

    this.registerComponents();
  }

  registerComponents() {
    document.querySelectorAll('[data-pingu]').forEach((element) => {
      const compName = element.getAttribute('data-pingu');
      const Component = this.components[compName];

      new Component(element);
    });
  }
}

export default PinguApp;
