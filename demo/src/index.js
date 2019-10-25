import React, {Component} from 'react'
import {render} from 'react-dom'

import hubmapProvVis from '../../src'
import '@hms-dbmi-bgm/react-workflow-viz/dist/react-workflow-viz.min.css';

import {simple} from '../../tests/fixtures'

class Demo extends Component {
  render() {
    return <div>
      <h1>prov-vis Demo</h1>
      <hubmapProvVis.ProvVis prov={simple.prov}/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
