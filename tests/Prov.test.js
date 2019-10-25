import expect from 'expect';

import Prov from '../src/Prov';

import { simple } from './fixtures';

describe('Prov', () => {
  it('converts W3C JSON to 4DN CWL', () => {
    const prov = new Prov(simple.prov);
    expect(prov.toCwl()).toEqual(simple.cwl);
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
