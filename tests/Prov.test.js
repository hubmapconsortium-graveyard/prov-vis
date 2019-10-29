import expect from 'expect';

import Prov, { makeCwlInput, makeCwlOutput } from '../src/Prov';

import * as fixtures from './fixtures';

describe('Prov fixtures', () => {
  Object.entries(fixtures).forEach(([k, v]) => {
    it(`converts ${k} W3C JSON to 4DN CWL`, () => {
      const prov = new Prov(v.prov);
      expect(prov.toCwl()).toEqual(v.cwl);
    });
  });
});

describe('Prov errors', () => {
  it('errors if input is invalid', () => {
    expect(() => new Prov({})).toThrow();
  });

  it('has expected error message', () => {
    let message;
    try {
      new Prov({}); // eslint-disable-line no-new
    } catch (e) {
      message = e.message;
    }
    expect(message).toContain("should have required property 'prefix'");
  });
});

describe('Prov methods', () => {
  /*
  E1 ═> A1 ═> E3 ═> A3 ═> E5
  ║╚═══════╗  ╚══════╗
  ╚═════╗  ╚════════╗║
        V           VV
  E2 ═> A2 ═> E4 ═> A4 ═> E6
        ║
        ╚═══> E7
  */
  /* eslint-disable object-curly-spacing */
  /* eslint-disable object-curly-newline */
  /* eslint-disable indent */
  const prov = new Prov({
    prefix: {
      hubmap: 'https://hubmapconsortium.org',
    },
    entity: {
      'hubmap:ent-1': {'prov:label': 'ent-1'},
      'hubmap:ent-2': {'prov:label': 'ent-2'},
      'hubmap:ent-3': {'prov:label': 'ent-3'},
      'hubmap:ent-4': {'prov:label': 'ent-4'},
      'hubmap:ent-5': {'prov:label': 'ent-5'},
      'hubmap:ent-6': {'prov:label': 'ent-6'},
      'hubmap:ent-7': {'prov:label': 'ent-7'},
    },
    activity: {
      'hubmap:act-1': {'prov:label': 'act-1'},
      'hubmap:act-2': {'prov:label': 'act-2'},
      'hubmap:act-3': {'prov:label': 'act-3'},
      'hubmap:act-4': {'prov:label': 'act-4'},
    },
    wasGeneratedBy: {
      '_:1': {'prov:entity': 'hubmap:ent-3',
              'prov:activity': 'hubmap:act-1'},
      '_:2': {'prov:entity': 'hubmap:ent-4',
              'prov:activity': 'hubmap:act-2'},
      '_:3': {'prov:entity': 'hubmap:ent-5',
              'prov:activity': 'hubmap:act-3'},
      '_:4': {'prov:entity': 'hubmap:ent-6',
              'prov:activity': 'hubmap:act-4'},
      '_:5': {'prov:entity': 'hubmap:ent-7',
              'prov:activity': 'hubmap:act-2'},
    },
    used: {
      '_:5': {'prov:activity': 'hubmap:act-1',
              'prov:entity': 'hubmap:ent-1'},

      '_:6': {'prov:activity': 'hubmap:act-2',
              'prov:entity': 'hubmap:ent-1'},
      '_:7': {'prov:activity': 'hubmap:act-2',
              'prov:entity': 'hubmap:ent-2'},

      '_:8': {'prov:activity': 'hubmap:act-3',
              'prov:entity': 'hubmap:ent-3'},

      '_:9': {'prov:activity': 'hubmap:act-4',
              'prov:entity': 'hubmap:ent-1'},
      '_:10': {'prov:activity': 'hubmap:act-4',
              'prov:entity': 'hubmap:ent-3'},
      '_:11': {'prov:activity': 'hubmap:act-4',
              'prov:entity': 'hubmap:ent-4'},
      },
    });
    /* eslint-enable */

  it('getParentEntities', () => {
    expect(prov.getParentEntities('hubmap:act-4')).toEqual([
      'hubmap:ent-1', 'hubmap:ent-3', 'hubmap:ent-4',
    ]);
  });

  it('getChildEntities', () => {
    expect(prov.getChildEntities('hubmap:act-2')).toEqual([
      'hubmap:ent-4', 'hubmap:ent-7',
    ]);
  });

  it('getParentActivities', () => {
    expect(prov.getParentActivities('hubmap:ent-6')).toEqual([
      'hubmap:act-4',
    ]);
  });

  it('getChildActivities', () => {
    expect(prov.getChildActivities('hubmap:ent-1')).toEqual([
      'hubmap:act-1', 'hubmap:act-2', 'hubmap:act-4',
    ]);
  });
});

describe('cwl utils', () => {
  it('makeCwlInput reference', () => {
    expect(makeCwlInput('name1', null, true)).toEqual(
      {
        meta: {
          global: true,
          in_path: true,
          type: 'reference file',
        },
        name: 'name1',
        run_data: {
          file: [
            {
              '@id': 'name1',
            },
          ],
        },
        source: {
          for_file: 'name1',
          name: 'name1',
        },
      },
    );
  });

  it('makeCwlInput with step', () => {
    expect(makeCwlInput('name1', 'step1')).toEqual(
      {
        meta: {
          global: true,
          in_path: true,
          type: 'data file',
        },
        name: 'name1',
        run_data: {
          file: [
            {
              '@id': 'name1',
            },
          ],
        },
        source: {
          for_file: 'name1',
          name: 'name1',
          step: 'step1',
        },
      },
    );
  });

  it('makeCwlOutput', () => {
    expect(makeCwlOutput('name1', ['step1'])).toEqual(
      {
        meta: {
          global: true,
          in_path: true,
        },
        name: 'name1',
        run_data: {
          file: [
            {
              '@id': 'name1',
            },
          ],
        },
        target: [
          {
            name: 'name1',
            step: 'step1',
          },
        ],
      },
    );
  });
});
