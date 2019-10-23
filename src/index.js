import React, {Component} from 'react'

class ProvVisReactComponent extends Component {
  render() {
    return <div>
      <h2>Welcome to React components</h2>
    </div>
  }
}

class ProvVisWebComponent extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = 'Hello world!';
  }
}


export default {
  ProvVisReactComponent,
  ProvVisWebComponent
}
