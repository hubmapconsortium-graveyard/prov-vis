import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ProvVis from './ProvVis';

function renderProvVis(element) {
  ReactDOM.render(<ProvVis />, element);
}

export default {
  ProvVis,
  renderProvVis
}
