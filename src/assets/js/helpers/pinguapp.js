/**
 * Init all components, @TODO: autoinsert components
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
  }

  _registerComponents() {
    // document.querySelectorAll('[data-pingu]').forEach((element) => {
    //   element
    // });
  }
}

export default PinguApp;
