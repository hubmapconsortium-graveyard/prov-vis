// Keep this as JS rather than JSON so it can be read in directly by the UMD demo.

export default {
  prefix: {
    ex: 'http://example.com#',
    prov: 'http://www.w3.org/ns/prov#',
  },
  entity: {
    'ex:input': { 'prov:label': 'Input', 'ex:note': 'Begins here...' },
    'ex:output': { 'prov:label': 'Output', 'ex:note': '... and ends here.' },
  },
  activity: {
    'ex:process': { 'prov:label': 'Process' },
  },
  wasGeneratedBy: {
    '_:1': {
      'prov:activity': 'ex:process',
      'prov:entity': 'ex:output',
    },
  },
  used: {
    '_:2': {
      'prov:activity': 'ex:process',
      'prov:entity': 'ex:input',
    },
  },
  agent: {
    'ex:j-austen': {
      'ex:DisplayName': 'Jane Austen',
      'prov:type': 'prov:Person',
    },
    'ex:example-com': {
      'ex:DisplayName': 'Example.com, incorporated',
      'prov:type': 'prov:Organization',
    },
  },
  actedOnBehalfOf: {
    '_:id6': {
      'prov:delegate': 'ex:j-austen',
      'prov:responsible': 'ex:example-com',
      'prov:activity': 'ex:process',
    },
  },
};
