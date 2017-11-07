/**
 * @name: Header
 */

import PinguComponent from '../../assets/js/helpers/PinguComponent';

class Header extends PinguComponent {
  constructor($el) {
    const defaultOptions = {
      classes: {
        dom: {},
        state: {},
      },
      length: 2,
    };

    const defaultData = {
    };

    super($el, defaultOptions, defaultData);

    this.log('Header loaded');
  }
}

export default Header;
