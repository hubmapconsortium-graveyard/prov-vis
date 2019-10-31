import realProv from './real-prov.json';
import realCwl from './real-cwl.json';
import complexCwl from './complex-cwl.json';
import simpleCwl from './simple-cwl.json';

export const simple = {
  getNameForActivity: (id) => id,
  getNameForEntity: (id) => id,
  prov: {
    prefix: {
      ex: 'http://example.com',
    },
    entity: {
      'ex:input': { 'prov:label': 'Input', 'ex:note': 'Begins here...' },
      'ex:output': { 'prov:label': 'Output', 'ex:note': '... and ends here.' },
    },
    activity: {
      'ex:process': { 'prov:label': 'Process' },
    },
    wasGeneratedBy: {
      '_:1': {
        'prov:activity': 'ex:process',
        'prov:entity': 'ex:output',
      },
    },
    used: {
      '_:2': {
        'prov:activity': 'ex:process',
        'prov:entity': 'ex:input',
      },
    },
  },
  cwl: simpleCwl,
};

export const complex = {
  getNameForActivity: (id) => id,
  prov: {
    /*
    E1 ═> A1 ═> E3 ═> A3 ═> E5
    ║╚═══════╗  ╚══════╗
    ╚═════╗  ╚════════╗║
          V           VV
    E2 ═> A2 ═> E4 ═> A4 ═> E6
          ║
          ╚═══> E7
    */

    /* eslint-disable object-curly-newline */
    /* eslint-disable indent */
    prefix: {
      hubmap: 'https://hubmapconsortium.org',
    },
    entity: {
      'hubmap:ent-1': { 'prov:label': 'ent-1' },
      'hubmap:ent-2': { 'prov:label': 'ent-2' },
      'hubmap:ent-3': { 'prov:label': 'ent-3' },
      'hubmap:ent-4': { 'prov:label': 'ent-4' },
      'hubmap:ent-5': { 'prov:label': 'ent-5' },
      'hubmap:ent-6': { 'prov:label': 'ent-6' },
      'hubmap:ent-7': { 'prov:label': 'ent-7' },
    },
    activity: {
      'hubmap:act-1': { 'prov:label': 'act-1' },
      'hubmap:act-2': { 'prov:label': 'act-2' },
      'hubmap:act-3': { 'prov:label': 'act-3' },
      'hubmap:act-4': { 'prov:label': 'act-4' },
    },
    wasGeneratedBy: {
      '_:1': { 'prov:entity': 'hubmap:ent-3',
               'prov:activity': 'hubmap:act-1' },
      '_:2': { 'prov:entity': 'hubmap:ent-4',
               'prov:activity': 'hubmap:act-2' },
      '_:3': { 'prov:entity': 'hubmap:ent-5',
               'prov:activity': 'hubmap:act-3' },
      '_:4': { 'prov:entity': 'hubmap:ent-6',
               'prov:activity': 'hubmap:act-4' },
      '_:5': { 'prov:entity': 'hubmap:ent-7',
               'prov:activity': 'hubmap:act-2' },
    },
    used: {
      '_:5': { 'prov:activity': 'hubmap:act-1',
               'prov:entity': 'hubmap:ent-1' },

      '_:6': { 'prov:activity': 'hubmap:act-2',
               'prov:entity': 'hubmap:ent-1' },
      '_:7': { 'prov:activity': 'hubmap:act-2',
               'prov:entity': 'hubmap:ent-2' },

      '_:8': { 'prov:activity': 'hubmap:act-3',
               'prov:entity': 'hubmap:ent-3' },

      '_:9': { 'prov:activity': 'hubmap:act-4',
               'prov:entity': 'hubmap:ent-1' },
      '_:10': { 'prov:activity': 'hubmap:act-4',
                'prov:entity': 'hubmap:ent-3' },
      '_:11': { 'prov:activity': 'hubmap:act-4',
                'prov:entity': 'hubmap:ent-4' },
      },
    },
    /* eslint-enable */
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

// The demos reference the default export:
// Update this to update all the demos.
export default complex;
