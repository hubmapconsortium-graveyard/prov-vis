import React from 'react';
import ReactDOM from 'react-dom';

import ProvVis from './ProvVis';

function renderProvVis(id, prov, props={}) {
  const element = document.getElementById(id);
  ReactDOM.render(<ProvVis prov={prov} {...props} />, element);
}

export default {
  ProvVis,
  renderProvVis,
};
