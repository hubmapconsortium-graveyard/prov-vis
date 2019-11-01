import React from 'react';
import { render } from 'react-dom';

import hubmapProvVis from '../../src';
import '@hms-dbmi-bgm/react-workflow-viz/dist/react-workflow-viz.min.css';

import defaultFixture from '../../tests/fixtures';

function Demo() {
  return (
    <div>
      <h1>prov-vis Demo</h1>
      <hubmapProvVis.ProvVis
        prov={defaultFixture.prov}
        getNameForActivity={defaultFixture.getNameForActivity}
        getNameForEntity={defaultFixture.getNameForEntity}
        renderDetailPane={(prov) => <pre>{JSON.stringify(prov)}</pre>}
      />
    </div>
  );
}

render(<Demo />, document.querySelector('#demo'));
