/**
 * This is just an example file
 */
import uniqueId from 'lodash/uniqueId';
import kebabCase from 'lodash/kebabCase';

class PinguComponent {
  constructor($el, _defaultOptions) {
    this.name = this.constructor.name;
    this.options = Object.assign({}, _defaultOptions);

    this.log = window.pingu.logger(this.name);
    this.listeners = {};

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
   * Creates the proper regex and returns the match
   * @param {string} modifier
   * @param {Node} node
   * @param {boolean} isAdd (if it's adding modifier)
   */
  regexOnNode(modifier, node, isAdd) {
    const add2Regex = isAdd ? '' : `--${modifier}`;
    const regex = new RegExp(`${kebabCase(this.name)}[^\\s]*${add2Regex}`, 'g');
    const classAttribute = node.getAttribute('class');

    return classAttribute.match(regex)[0];
  }

  /**
   * Checks if the node param is a NodeList or undefined
   * @param {Node|undefined} node
   */
  checkSelectedNode(node) {
    if (typeof node === typeof NodeList) this.error('Modifiers cannot be added on a NodeList');

    return typeof node === typeof undefined ? this.nodes.el : node;
  }

  /**
   * Add modifier classes to any given node
   * @param {string} modifier
   * @param {Node|undefined} node
   */
  addModifier(modifier, node) {
    const selectedNode = this.checkSelectedNode(node);
    const regexMatch = this.regexOnNode(modifier, selectedNode, true);
    const newClassName = `${regexMatch}--${modifier}`;

    selectedNode.classList.add(newClassName);
  }

  /**
   * Removes modifier class on given node, if no node is given, then use base element
   * @param {string} modifier
   * @param {Node|undefined} node
   */
  removeModifier(modifier, node) {
    const selectedNode = this.checkSelectedNode(node);
    const regexMatch = this.regexOnNode(modifier, selectedNode, false);

    selectedNode.classList.remove(regexMatch);
  }

  /**
   * Adds and saves an event listener
   * @param {string} listenerName
   * @param {Node} node
   * @param {string} eventType
   * @param {fn} handler
   * @param {object} options
   */
  addListener(listenerName, node, eventType, handler, options) {
    node.addEventListener(eventType, handler, options);

    this.listeners[listenerName] = {
      node,
      eventType,
      handler,
      options,
    };
  }

  /**
   * Removes a given event listener by name
   * @param {string} listenerName
   */
  removeEventListener(listenerName) {
    const listener = this.listeners[listenerName];

    listener.node.removeEventListener(listener.eventType, listener.handler);
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
