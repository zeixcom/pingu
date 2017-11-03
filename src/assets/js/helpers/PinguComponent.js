/**
 * This is just an example file
 */
import uniqueId from 'lodash/uniqueId';

class PinguComponent {
  constructor($el, _defaultOptions) {
    this.name = this.constructor.name;
    this.options = Object.assign({}, _defaultOptions);

    this.log = window.pingu.logger(this.name);

    this.uuid = uniqueId(this.name);

    this.registerInWindow();
    this.registerNodes($el);
  }

  /**
   * Register the instance in window, to be global accessible
   */
  registerInWindow() {
    window.pingu.components[this.name].instances[this.uuid] = this;
  }

  /**
   * Registering all the nodes, automatic grabbed by the options
   * @param {$el} the element of the component
   */
  registerNodes($el) {
    const nodeClasses = this.options.classes.dom;

    this.nodes = {
      el: $el,
    };

    Object.keys(nodeClasses).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(nodeClasses, key)) {
        const elementQuery = this.nodes.el.querySelectorAll(nodeClasses[key]);

        if (elementQuery.length === 0) {
          this.error(`A node for ${key} was not found`);
        } else {
          this.nodes[key] = elementQuery.length === 1 ? elementQuery[0] : elementQuery;
        }
      }
    });
  }

  /**
   * Add modifier classes to any given node
   * @param {string} modifier
   * @param {Node} node
   */
  addModifier(modifier, node) {
    if (typeof node === typeof []) this.error('Modifiers cannot be added on a NodeList');

    const selectedNode = typeof node === typeof undefined ? this.nodes.el : node;
    const regex = new RegExp(`${this.name}__[^\s]+`, 'g'); //eslint-disable-line
    const classAttribute = selectedNode.getAttribute('class');
    const regexMatch = classAttribute.match(regex)[0];
    const newClassName = `${regexMatch}--${modifier}`;

    node.classList.add(newClassName);
  }

  /**
   * A display of error
   * @param {string} msg
   */
  error(msg) {
    console.error(`${this.name} |`, msg); //eslint-disable-line
  }

  /**
   * Destroys the object
   */
  destroy() {
    delete window.pingu.components[this.name].instances[this.uuid];
  }
}

export default PinguComponent;
