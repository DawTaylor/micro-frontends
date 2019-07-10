import React from 'react';
import ReactDOM from 'react-dom';
import htmlToReact from 'html-to-react';

import App from './App';

class GreenRecos extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const sku = this.getAttribute('sku');
    this.log('connected', sku);
    this._innerHTML = this.innerHTML;
    this.mount();
    this.observer = new MutationObserver(() => this.update());
    this.observer.observe(this, { attributes: true });

  }
  getEvents(propTypes) {
    return Object.keys(propTypes)
      .filter(key => /on([A-Z].*)/.exec(key))
      .reduce((events, ev) => ({
        ...events,
        [ev]: args =>
          this.dispatchEvent(new CustomEvent(ev, { ...args }))
      }), {});
  }
  getProps(attributes, propTypes) {
    propTypes = propTypes || {};
    return [...attributes]
      .filter(attr => attr.name !== 'style')
      .map(attr => this.convert(propTypes, attr.name, attr.value))
      .reduce((props, prop) =>
        ({ ...props, [prop.name]: prop.value }), {});
  }
  convert(propTypes, attrName, attrValue) {
    const propName = Object.keys(propTypes)
      .find(key => key.toLowerCase() == attrName);
    let value = attrValue;
    if (attrValue === 'true' || attrValue === 'false')
      value = attrValue == 'true';
    else if (!isNaN(attrValue) && attrValue !== '')
      value = +attrValue;
    else if (/^{.*}/.exec(attrValue))
      value = JSON.parse(attrValue);
    return {
      name: propName ? propName : attrName,
      value: value
    };
  }
  mount() {
    const props = {
      ...this.getProps(this.attributes, App.propTypes),
      ...this.getEvents(App.propTypes),
      children: this.parseHtmlToReact(this.innerHTML)
    };
    ReactDOM.render(<App {...props} />, this);
  }
  parseHtmlToReact(html) {
    return html && new htmlToReact.Parser().parse(html);
  }
  disconnectedCallback() {
    this.unmount();
    this.observer.disconnect();
  }
  update() {
    this.unmount();
    this.mount();
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(this);
    const sku = this.getAttribute('sku');
    this.log('disconnected', sku);
  }
  log(...args) {
    console.log('🖼️ green-recos', ...args);
  }
}

export default GreenRecos;
