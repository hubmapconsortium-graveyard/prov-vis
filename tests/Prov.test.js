import expect from 'expect';

import Prov from '../src/Prov';

import { simpleProv } from './fixtures';

describe('Prov', () => {
  it('converts W3C JSON to 4DN CWL', () => {
    const prov = new Prov(simpleProv);
    expect(prov.toCwl()).toEqual([
      {
        inputs: [
          {
            meta: {
              global: true,
            },
            name: 'bedfile',
            source: [],
          },
        ],
        name: 'bedtobeddb',
        outputs: [
          {
            meta: {
              global: true,
            },
            name: 'beddbfile',
            target: [
              {
                name: 'beddbfile',
              },
            ],
          },
        ],
      },
    ]);
  });
});
