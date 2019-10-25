import expect from 'expect';

import Prov from '../src/Prov';

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
