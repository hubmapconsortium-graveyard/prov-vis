import expect from 'expect';

import Prov from './Prov';

describe('Prov', () => {
  it('converts W3C JSON to 4DN CWL', () => {
    const w3cProv = {
      prefix: {
        ex: 'http://example.org',
        w3: 'http://www.w3.org/',
      },
      entity: {
        'ex:input': {
          'rdfs:label': 'bedfile',
        },
        'ex:output': {
          'rdfs:label': 'beddbfile',
        },
      },
      activity: {
        'ex:run': {
          'rdfs:label': 'bedtobeddb',
        },
      },
      wasGeneratedBy: {
        '_:1': {
          'prov:activity': 'ex:run',
          'prov:entity': 'ex:output',
        },
      },
      used: {
        '_:2': {
          'prov:activity': 'ex:run',
          'prov:entity': 'ex:input',
        },
      },
    };

    const prov = new Prov(w3cProv);
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
