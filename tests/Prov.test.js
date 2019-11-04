import expect from 'expect';

import Prov, { _makeCwlInput, _makeCwlOutput, _expand } from '../src/Prov';

import * as fixtures from './fixtures';


describe('Prov fixtures', () => {
  Object.entries(fixtures).forEach(([k, v]) => {
    it(`converts ${k} W3C JSON to 4DN CWL`, () => {
      const prov = new Prov(v.prov, v.getNameForActivity, v.getNameForEntity);
      const cwl = prov.expandPrefixes().toCwl();
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
    fixtures.complex.prov
  ).expandPrefixes();

  it('getParentEntityNames', () => {
    expect(prov._getParentEntityNames('https://hubmapconsortium.org/act-4')).toEqual([
      'https://hubmapconsortium.org/ent-1',
      'https://hubmapconsortium.org/ent-3',
      'https://hubmapconsortium.org/ent-4',
    ]);
  });

  it('getChildEntityNames', () => {
    expect(prov._getChildEntityNames('https://hubmapconsortium.org/act-2')).toEqual([
      'https://hubmapconsortium.org/ent-4', 'https://hubmapconsortium.org/ent-7',
    ]);
  });

  it('getParentActivityNames', () => {
    expect(prov._getParentActivityNames('https://hubmapconsortium.org/ent-6')).toEqual([
      'https://hubmapconsortium.org/act-4',
    ]);
  });

  it('getChildActivityNames', () => {
    expect(prov._getChildActivityNames('https://hubmapconsortium.org/ent-1')).toEqual([
      'https://hubmapconsortium.org/act-1',
      'https://hubmapconsortium.org/act-2',
      'https://hubmapconsortium.org/act-4',
    ]);
  });
});

describe('PROV expansion', () => {
  it('should expand prefixes', () =>{
    expect(
      _expand({
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

describe('CWL utils', () => {
  it('_makeCwlInput reference', () => {
    expect(_makeCwlInput('name1', [], { extras: 'go here!' }, true)).toEqual(
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

  it('_makeCwlInput with step', () => {
    expect(_makeCwlInput('name1', ['step1'], { extras: 'go here!' })).toEqual(
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

  it('_makeCwlOutput', () => {
    expect(_makeCwlOutput('name1', ['step1'], { extras: 'go here!' })).toEqual(
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
