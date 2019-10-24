import expect from 'expect';

import Prov from '../src/Prov';

import { simple } from './fixtures';

describe('Prov', () => {
  it('converts W3C JSON to 4DN CWL', () => {
    const prov = new Prov(simple.prov);
    expect(prov.toCwl()).toEqual(simple.cwl);
  });
});
