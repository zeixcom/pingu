/**
 * Init all components, TODO: autoinsert components
 *
 * @class PinguApp
 */

class PinguApp {
  constructor() {
    this.modules = {};
  }

  _registerComponents() {
    document.querySelectorAll('[data-pingu]').forEach((element) => {
      console.log(element);
    });
  }
}

export default PinguApp;
