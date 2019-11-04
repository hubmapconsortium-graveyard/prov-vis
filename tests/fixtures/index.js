import realProv from './real-prov.json';
import realCwl from './real-cwl.json';
import complexProv from './complex-prov';
import complexCwl from './complex-cwl.json';
import simpleProv from './simple-prov';
import simpleCwl from './simple-cwl.json';

export const simple = {
  getNameForActivity: (id) => id,
  getNameForEntity: (id) => id,
  prov: simpleProv,
  cwl: simpleCwl,
};

export const complex = {
  getNameForActivity: (id) => id,
  prov: complexProv,
  cwl: complexCwl,
};

export const real = {
  getNameForActivity: (id, prov) => {
    const activity = prov.activity[id];
    return `${activity['prov:type']} - ${activity['prov:label']}`;
  },
  getNameForEntity: (id, prov) => {
    const entity = prov.entity[id];
    // NOTE: The initial entity node was not included in the sample data;
    // Fallback to ID, if needed. https://github.com/hubmapconsortium/prov-vis/issues/15
    return entity ? `${entity['prov:type']} - ${entity['prov:label']}` : id;
  },
  prov: realProv,
  cwl: realCwl,
};

// The React demo references the default export.
export default simple;
