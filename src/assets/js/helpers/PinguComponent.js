/**
 * This is just an example file
 */
import uniqueId from 'lodash/uniqueId';
import kebabCase from 'lodash/kebabCase';
import merge from 'lodash/merge';

class PinguComponent {
  constructor(el, _defaultOptions, _defaultData) {
    this.name = this.constructor.name;

    this.options = merge({}, _defaultOptions, this.parseOptions(el));
    // @TODO: TBD do we need this? really?
    this.data = merge({}, _defaultData);

    this.uuid = uniqueId(this.name);

    this.registerInWindow();
    this.registerNodes(el);

    this.log = window.pingu.logger(this.name);
    this.listeners = {};
  }

  /**
   * Register the instance in window, to be global accessible
   */
  registerInWindow() {
    window.pingu.components[this.name].instances[this.uuid] = this;
  }

  /**
   * Registering all the nodes, automatic grabbed by the options
   * @param {el} the element of the component
   */
  registerNodes(el) {
    const nodeClasses = this.options.classes.dom;

    this.nodes = { el };

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
   * Parsing the options from html-attribute
   * @param {node} the base element of the component
   */
  parseOptions(el) {
    const attributeName = `data-${kebabCase(this.name)}-options`;

    if (el.hasAttribute(attributeName)) {
      const options = el.getAttribute(attributeName);

      if (options.length > 0) return JSON.parse(el.getAttribute(attributeName));
    }

    return {};
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

    return classAttribute.match(regex);
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
    const newClassName = `${regexMatch[0]}--${modifier}`;

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

    selectedNode.classList.remove(regexMatch[0]);
  }

  /**
   * Checks if a given node (or el) has a modifier
   * @param {string} modifier
   * @param {Node} node
   */
  hasModifier(modifier, node) {
    const selectedNode = this.checkSelectedNode(node);
    const regexMatch = this.regexOnNode(modifier, selectedNode, false);

    return regexMatch !== null;
  }

  /**
   * Iterates over all nodes and returns all nodes, with the given Element
   * @param {string} modifier
   * @param {string} only of given key
   */
  getNodesByModifier(modifier, nodeType) {
    const nodeKeys = Object.keys(this.nodes);
    const foundNodes = [];
    const onlyByKey = typeof nodeType !== typeof undefined;

    nodeKeys.forEach((key) => {
      const nodes = this.nodes[key];
      const nodeList = typeof nodes.forEach === 'function' ? nodes : [nodes];

      nodeList.forEach((node) => {
        const regexMatch = this.regexOnNode(modifier, node, false);
        const isCorrectKey = onlyByKey ? key === nodeType : true;

        if (regexMatch !== null && isCorrectKey) foundNodes.push(node);
      });
    });

    return foundNodes;
  }

  /**
   * Adds and saves an event listener
   * @param {string} listenerName
   * @param {Node} node
   * @param {string} eventType
   * @param {function} handler
   * @param {object} options
   */
  addListener(listenerName, node, eventType, handler, options) {
    const isNodeList = typeof node === 'object';

    if (!isNodeList) {
      node.addEventListener(eventType, handler, options);

      this.listeners[listenerName] = {
        node,
        eventType,
        handler,
        options,
      };
    } else {
      node.forEach((nodeElement, index) => {
        nodeElement.addEventListener(eventType, handler, options);

        this.listeners[`${listenerName}${index}`] = {
          nodeElement,
          eventType,
          handler,
          options,
        };
      });
    }
  }

  /**
   * Removes a given event listener by name
   * @param {string} listenerName
   */
  removeListener(listenerName) {
    const listener = this.listeners[listenerName];

    listener.node.removeEventListener(listener.eventType, listener.handler);
  }

  /**
   *
   * @param {string} eventName
   * @param {*} eventData
   * @param {Node} node
   */
  dispatchCustomEvent(eventName, eventData, node) {
    const activeNode = typeof node === typeof undefined ? window : node;
    const event = new CustomEvent(`${this.name}.${eventName}`, eventData);

    activeNode.dispatchEvent(event);
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
    const listeners = Object.keys(this.listeners);

    listeners.forEach((listenerName) => {
      this.removeListener(listenerName);
    });

    delete window.pingu.components[this.name].instances[this.uuid];
  }
}

export default PinguComponent;
