/**
 * @name: {% COMP_NAME %}
 */

import PinguComponent from '../../assets/js/helpers/PinguComponent';

class {% COMP_NAME %} extends PinguComponent {
  constructor($el) {
    const defaultOpts = {
      classes: {
        dom: {},
        state: {},
      },
      customEvents: {},
    };

    const defaultData = {};

    super($el, defaultOpts, defaultData);

    this.log('Bridge loaded');
  }
}

export default {% COMP_NAME %};
