/**
 * Init all components
 *
 * @class PinguApp
 */


import Header from '../../../components/Header/header';
// autoimportcomponent

class PinguApp {
  constructor() {
    this.components = {};

    this.components.Header = Header;
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
