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

    super($el, defaultOpts);

    this.log('{% COMP_NAME %} loaded');
  }
}

export default {% COMP_NAME %};
