import React, {Component} from 'react'
import {render} from 'react-dom'

import hubmapProvVis from '../../src'
import '@hms-dbmi-bgm/react-workflow-viz/dist/react-workflow-viz.min.css';

class Demo extends Component {
  render() {
    return <div>
      <h1>prov-vis Demo</h1>
      <hubmapProvVis.ProvVis prov={
        {
          prefix: {
            ex: 'http://example.org',
            w3: 'http://www.w3.org/',
          },
          entity: {
            'ex:input': {
              'rdfs:label': 'bedfile',
            },
            'ex:output': {
              'rdfs:label': 'beddbfile',
            },
          },
          activity: {
            'ex:run': {
              'rdfs:label': 'bedtobeddb',
            },
          },
          wasGeneratedBy: {
            '_:1': {
              'prov:activity': 'ex:run',
              'prov:entity': 'ex:output',
            },
          },
          used: {
            '_:2': {
              'prov:activity': 'ex:run',
              'prov:entity': 'ex:input',
            },
          },
        }
      }/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
