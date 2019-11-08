import { PROV_NS } from '../../src/ProvData';

import realProv from './real-prov.json';
import realCwl from './real-cwl.json';
import complexProv from './complex-prov';
import complexCwl from './complex-cwl.json';
import simpleProv from './simple-prov';
import simpleCwl from './simple-cwl.json';

import cwlProv from './primary.cwlprov.json'

export const simple = {
  getNameForActivity: (id) => id.split('#').pop(),
  getNameForEntity: (id) => id.split('#').pop(),
  prov: simpleProv,
  cwl: simpleCwl,
};

export const complex = {
  getNameForActivity: (id) => id.split('/').pop(),
  getNameForEntity: (id) => id.split('/').pop(),
  prov: complexProv,
  cwl: complexCwl,
};

export const real = {
  getNameForActivity: (id, prov) => {
    const activity = prov.activity[id];
    return `${activity[`${PROV_NS}type`]} - ${activity[`${PROV_NS}label`]}`;
  },
  getNameForEntity: (id, prov) => {
    const entity = prov.entity[id];
    // NOTE: The initial entity node was not included in the sample data;
    // Fallback to ID, if needed. https://github.com/hubmapconsortium/prov-vis/issues/15
    return entity ? `${entity[`${PROV_NS}type`]} - ${entity[`${PROV_NS}label`]}` : id;
  },
  prov: realProv,
  cwl: realCwl,
};

export const cwl = {
  prov: cwlProv
}

// The React demo references the default export.
export default cwl;
