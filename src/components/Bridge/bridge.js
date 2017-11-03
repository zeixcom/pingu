/**
 * @name: Bridge
 */

import PinguComponent from '../../assets/js/helpers/PinguComponent';

class Bridge extends PinguComponent {
  constructor($el) {
    const defaultOpts = {
      classes: {
        dom: {
          text: '.bridge__text',
          house: '.bridge__house',
        },
      },
    };

    super($el, defaultOpts);

    this.log('{% COMP_NAME %} loaded');
  }
}

export default Bridge;
