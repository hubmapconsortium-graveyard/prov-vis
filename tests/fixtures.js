export const simpleProv = {
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

export const TODO = {};
