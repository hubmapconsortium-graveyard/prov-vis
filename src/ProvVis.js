import React from 'react';

import Graph, { GraphParser } from '@hms-dbmi-bgm/react-workflow-viz';

import Prov from './Prov';

export default function ProvVis(props) {
  const { prov, getNameForActivity, getNameForEntity } = props;
  const steps = new Prov(prov, getNameForActivity, getNameForEntity).toCwl();
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
      <Graph rowSpacingType="compact" minimumHeight={300} />
    </GraphParser>
  );
}
