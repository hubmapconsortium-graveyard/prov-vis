import React from 'react';
import ReactDOM from 'react-dom';

import ProvVis from './ProvVis';

function renderProvVis(id) {
  const element = document.getElementById(id);
  ReactDOM.render(<ProvVis />, element);
}

export default {
  ProvVis,
  renderProvVis,
};
