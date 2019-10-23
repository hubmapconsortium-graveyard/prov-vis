import React, {Component} from 'react'
import {render} from 'react-dom'

import hubmapProvVis from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>prov-vis Demo</h1>
      <hubmapProvVis.ProvVisReactComponent/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
