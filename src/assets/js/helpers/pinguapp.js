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
      const pinguAttributes = element.getAttribute('data-pingu').split(' ');

      pinguAttributes.forEach((compName) => {
        const Component = this.components[compName];

        new Component(element);
      });
    });
  }
}

export default PinguApp;
