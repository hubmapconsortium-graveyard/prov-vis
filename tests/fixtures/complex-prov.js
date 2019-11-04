// Keep this as JS rather than JSON so it can be read in directly by the UMD demo.

export default {
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
    hubmap: 'https://hubmapconsortium.org/',
    prov: 'http://www.w3.org/ns/prov#',
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
  };
