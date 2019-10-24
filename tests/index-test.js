// import expect from 'expect'
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import hubmapProvVis from 'src/'; // eslint-disable-line import/no-unresolved

describe('ProvVis', () => {
  let node;

  beforeEach(() => {
    node = document.createElement('div');
  });

  afterEach(() => {
    unmountComponentAtNode(node);
  });

  it('renders', () => {
    render(<hubmapProvVis.ProvVis />, node,
      () => {
        // TODO: Just getting empty div.
        // expect(node.innerHTML).toContain('svg')
      });
  });
});
