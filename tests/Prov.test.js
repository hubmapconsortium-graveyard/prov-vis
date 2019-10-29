import expect from 'expect';

import Prov, { makeCwlInput, makeCwlOutput } from '../src/Prov';

import * as fixtures from './fixtures';

describe('Prov', () => {
  Object.entries(fixtures).forEach(([k, v]) => {
    it(`converts ${k} W3C JSON to 4DN CWL`, () => {
      const prov = new Prov(v.prov);
      expect(prov.toCwl()).toEqual(v.cwl);
    });
  });

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

describe('cwl utils', () => {
  it('successfully makeCwlInput reference', () => {
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

  it('successfully makeCwlInput with step', () => {
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

  it('successfully makeCwlOutput', () => {
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
