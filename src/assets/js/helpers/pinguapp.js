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

    this._registerComponents();
  }

  _registerComponents() {
    // document.querySelectorAll('[data-pingu]').forEach((element) => {
    //   element
    // });

    document.querySelectorAll('[data-pingu]').forEach((element) {
      var compName = element.getAttribute('data-pingu');
      var Component = this.components[compName];

      new Component();
    });
  }
}

export default PinguApp;
