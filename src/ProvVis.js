import React from 'react';

import Graph, { GraphParser } from '@hms-dbmi-bgm/react-workflow-viz';

import Prov from './Prov';

export default function ProvVis(props) {
  const {
    prov, getNameForActivity, getNameForEntity, renderDetailPane,
  } = props;
  const steps = new Prov(prov, getNameForActivity, getNameForEntity).toCwl();
  function renderDetailPaneWithNode(node) {
    if (node) {
      return renderDetailPane(node.meta.prov)
    }
  }
  return (
    <GraphParser
      parsingOptions={{
        parseBasicIO: false,
        showIndirectFiles: true,
        showParameters: false,
        showReferenceFiles: true,
      }}
      parentItem={{ name: 'Is this used?' }}
      steps={steps}
    >
      <Graph
        rowSpacingType="compact"
        minimumHeight={300}
        renderDetailPane={renderDetailPaneWithNode}
      />
    </GraphParser>
  );
}
