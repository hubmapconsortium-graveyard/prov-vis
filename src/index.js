import React from 'react';
import ReactDOM from 'react-dom';

import ProvVis from './ProvVis';

function renderProvVis(id, prov) {
  const element = document.getElementById(id);
  ReactDOM.render(<ProvVis prov={prov} />, element);
}

export default {
  ProvVis,
  renderProvVis,
};
