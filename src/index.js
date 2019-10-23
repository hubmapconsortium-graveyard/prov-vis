import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ProvVis from './ProvVis';

function renderProvVis(id) {
  const element = document.getElementById('prov-vis')
  ReactDOM.render(<ProvVis />, element);
}

export default {
  ProvVis,
  renderProvVis
}
