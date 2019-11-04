import expect from 'expect';

import Prov, { makeCwlInput, makeCwlOutput, expand } from '../src/Prov';

import * as fixtures from './fixtures';


describe('Prov fixtures', () => {
  Object.entries(fixtures).forEach(([k, v]) => {
    it(`converts ${k} W3C JSON to 4DN CWL`, () => {
      const prov = new Prov(v.prov, v.getNameForActivity, v.getNameForEntity);
      const cwl = prov.toCwl();
      expect(cwl).toEqual(v.cwl, `Mismatch (full after diff):\n${JSON.stringify(cwl, null, 2)}`);
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
  const prov = new Prov(
    fixtures.complex.prov,
    (id) => `ACT-${id}`,
    (id) => `ENT-${id}`,
  );

  it('getParentEntityNames', () => {
    expect(prov.getParentEntityNames('ACT-hubmap:act-4')).toEqual([
      'ENT-hubmap:ent-1', 'ENT-hubmap:ent-3', 'ENT-hubmap:ent-4',
    ]);
  });

  it('getChildEntityNames', () => {
    expect(prov.getChildEntityNames('ACT-hubmap:act-2')).toEqual([
      'ENT-hubmap:ent-4', 'ENT-hubmap:ent-7',
    ]);
  });

  it('getParentActivityNames', () => {
    expect(prov.getParentActivityNames('ENT-hubmap:ent-6')).toEqual([
      'ACT-hubmap:act-4',
    ]);
  });

  it('getChildActivityNames', () => {
    expect(prov.getChildActivityNames('ENT-hubmap:ent-1')).toEqual([
      'ACT-hubmap:act-1', 'ACT-hubmap:act-2', 'ACT-hubmap:act-4',
    ]);
  });

  it('has activityByName', () => {
    expect(prov.activityByName).toEqual(
      {
        'ACT-hubmap:act-1': {
          'prov:label': 'act-1',
        },
        'ACT-hubmap:act-2': {
          'prov:label': 'act-2',
        },
        'ACT-hubmap:act-3': {
          'prov:label': 'act-3',
        },
        'ACT-hubmap:act-4': {
          'prov:label': 'act-4',
        },
      },
    );
  });

  it('has entityByName', () => {
    expect(prov.entityByName).toEqual(
      {
        'ENT-hubmap:ent-1': {
          'prov:label': 'ent-1',
        },
        'ENT-hubmap:ent-2': {
          'prov:label': 'ent-2',
        },
        'ENT-hubmap:ent-3': {
          'prov:label': 'ent-3',
        },
        'ENT-hubmap:ent-4': {
          'prov:label': 'ent-4',
        },
        'ENT-hubmap:ent-5': {
          'prov:label': 'ent-5',
        },
        'ENT-hubmap:ent-6': {
          'prov:label': 'ent-6',
        },
        'ENT-hubmap:ent-7': {
          'prov:label': 'ent-7',
        },
      },
    );
  });
});

describe('PROV expansion', () => {
  it('should expand prefixes', () =>{
    expect(
      expand({
        'do:C': { 're:D': 'mi:E' },
        're:D': { 're:D': 'not-expanded' }
      },
      {
        do: 'deer#',
        re: 'drop-of-golden-sun#',
        mi: 'name-i-call-myself#'
      }
    )).toEqual({
      'deer#C': { 'drop-of-golden-sun#D': 'name-i-call-myself#E' },
      'drop-of-golden-sun#D': { 'drop-of-golden-sun#D': 'not-expanded' }
    })
  });
})

describe('cwl utils', () => {
  it('makeCwlInput reference', () => {
    expect(makeCwlInput('name1', [], { extras: 'go here!' }, true)).toEqual(
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
        source: [{
          for_file: 'name1',
          name: 'name1',
        }],
        prov: {
          extras: 'go here!',
        },
      },
    );
  });

  it('makeCwlInput with step', () => {
    expect(makeCwlInput('name1', ['step1'], { extras: 'go here!' })).toEqual(
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
        source: [{
          for_file: 'name1',
          name: 'name1',
          step: 'step1',
        }],
        prov: {
          extras: 'go here!',
        },
      },
    );
  });

  it('makeCwlOutput', () => {
    expect(makeCwlOutput('name1', ['step1'], { extras: 'go here!' })).toEqual(
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
        prov: {
          extras: 'go here!',
        },
      },
    );
  });
});
